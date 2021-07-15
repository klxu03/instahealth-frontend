<template>
  <template v-if="isQuestionLoaded">
    <q-card class="q-ma-md q-pa-md items-stretch column">
      <div class="row">
        <div class="column">
          <div class="row">
            <div class="text-h6 text-bold q-mr-sm">Question:</div>
            <div class="text-h6">{{ question.question }}</div>
          </div>
          <div class="row">
            <div class="text-bold q-mr-xs q-mb-xs">Categories:</div>
            <div>
              {{
                question.categories.length > 0
                  ? question.categories
                      .map((category) => categoryToRole[category])
                      .join(', ')
                  : 'None'
              }}
            </div>
            <q-btn
              v-if="account.role !== 'patient'"
              :icon="mdiPencil"
              round
              dense
              size="6px"
              style="margin-top: 2px"
              class="self-start q-ml-xs"
              color="accent"
              @click="editCategory"
            >
              <q-tooltip>
                Did our auto-classifier make a mistake with the category?
              </q-tooltip>
            </q-btn>
          </div>
          <div class="q-mb-xs" v-html="question.content" />
        </div>
      </div>
      <q-separator />

      <template v-for="answer in question.answers" :key="answer.id">
        <div class="row q-py-sm items-center">
          <div class="text-bold q-mr-xs">
            {{ answer.authorName }} ({{ formatRole(answer.role) }}):
          </div>
          <div v-html="answer.content" />
          <q-space />
          <q-btn :icon="mdiCash" round color="green" dense @click="tipDoctor">
            <q-tooltip>Tip the doctor who answered the question!</q-tooltip>
          </q-btn>
        </div>
        <q-separator />
      </template>

      <template v-if="isLoggedIn === true">
        <template v-if="account.role === 'patient'">
          <div class="q-mt-md text-center">
            You must be a doctor to post an answer.
          </div>
        </template>
        <template v-else>
          <div class="text-center text-h6 text-bold q-mt-md">
            Post an Answer:
          </div>
          <q-input
            class="q-mb-sm"
            v-model="answererName"
            label="Name"
            outlined
            dense
          />
          <q-editor v-model="editor"></q-editor>
          <q-btn
            label="Post"
            class="q-mt-md self-center"
            @click="answerQuestion"
          />
          <error-message class="q-mt-sm" :message="errorMessage" />
        </template>
      </template>
      <template v-else>
        <div class="q-mt-md text-center">Please log in to post an answer.</div>
      </template>
    </q-card>
  </template>
  <template v-else>
    <page-loading-spinner />
  </template>
  <q-dialog v-model="isCategoryDialogVisible">
    <q-card class="q-pa-md column">
      <div class="text-h6 text-bold q-mb-sm">Change Question Category:</div>
      <q-input label="New Category" outlined v-model="newCategory"></q-input>
      <q-btn
        class="q-mt-md self-center"
        label="Change"
        color="green"
        @click="confirmCategoryChange"
      ></q-btn>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { api, fetchQuestions, formatRole } from 'src/utils';
import { Question, account, isLoggedIn, questions } from 'src/state';
import PageLoadingSpinner from 'components/PageLoadingSpinner.vue';
import { Notify } from 'quasar';
import ErrorMessage from 'components/ErrorMessage.vue';
import { HTTPError } from 'ky';
import { mdiCash, mdiPencil } from '@quasar/extras/mdi-v5';

export default defineComponent({
  components: { PageLoadingSpinner, ErrorMessage },
  setup() {
    const route = useRoute();
    const editor = ref('');
    const errorMessage = ref('');
    const answererName = ref('');

    const isQuestionLoaded = ref(false);

    const router = useRouter();
    const questionId = route.params.id?.toString();

    let question = computed(() => {
      return questions.find(
        (question) => question.id.toString() === questionId
      ) as Question;
    });

    if (questionId == null) {
      void router.replace('/questions');
    } else {
      void fetchQuestions().then(() => {
        if (question.value === undefined) {
          Notify.create({
            message: `Could not load question ${route.params.id.toString()}`,
            type: 'negative',
          });
          void router.replace('/questions');
        } else {
          isQuestionLoaded.value = true;
        }
      });
    }

    async function answerQuestion() {
      try {
        const response = await api.post('answer', {
          json: {
            id: questionId,
            content: editor.value,
            role: account.role,
            authorName: answererName.value,
          },
        });

        const result = (await response.json()) as { id: number };

        const question = questions.find(
          (question) => question.id.toString() === questionId
        );

        if (question !== undefined) {
          question.answers.push({
            id: result.id,
            content: editor.value,
            role: account.role,
            authorName: answererName.value,
          });
        }

        Notify.create({
          message: 'Successfully posted your answer!',
          type: 'positive',
        });
      } catch (e: unknown) {
        errorMessage.value =
          (await (e as HTTPError).response?.text()) ?? (e as Error).toString();
      }
    }

    function tipDoctor() {
      alert("Sorry, but this functionality hasn't been implemented yet.");
    }

    const newCategory = ref('');
    const isCategoryDialogVisible = ref(false);
    function editCategory() {
      isCategoryDialogVisible.value = true;
    }

    function confirmCategoryChange() {
      question.value.categories = [newCategory.value];
      isCategoryDialogVisible.value = false;
    }

    const categoryToRole = {
      heart: 'Cardiologist',
      skin: 'Dermatologist',
      eye: 'Optometrist',
      teeth: 'Dentist',
      ear: 'Otolaryngologist',
    };

    return {
      isQuestionLoaded,
      editor,
      errorMessage,
      answererName,
      answerQuestion,
      isLoggedIn,
      question,
      formatRole,
      account,
      mdiCash,
      mdiPencil,
      editCategory,
      tipDoctor,
      isCategoryDialogVisible,
      newCategory,
      confirmCategoryChange,
      categoryToRole,
    };
  },
});
</script>
