<template>
  <template v-if="isQuestionLoaded">
    <q-card class="q-ma-md q-pa-md">
      <div class="row">
        <div class="text-h6 text-bold q-mr-sm">Question:</div>
        <div class="text-h6">{{ question.question }}</div>
      </div>
      <div class="q-mb-xs">{{ question.content }}</div>
      <q-separator />
      <template v-if="isLoggedIn === true">
        <div class="text-center text-h6 text-bold">Post an Answer:</div>
        <q-editor v-model="editor"></q-editor>
        <q-btn
          label="Post"
          class="q-mt-md self-center"
          @click="answerQuestion"
        />
        <error-message class="q-mt-sm" :message="errorMessage" />
      </template>
      <template v-else>
        <div class="q-mt-md text-center">Please log in to post an answer.</div>
      </template>
    </q-card>
  </template>
  <template v-else>
    <page-loading-spinner />
  </template>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { api } from 'src/utils';
import { Question, account, isLoggedIn } from 'src/state';
import PageLoadingSpinner from 'components/PageLoadingSpinner.vue';
import { Notify } from 'quasar';
import ErrorMessage from 'components/ErrorMessage.vue';

export default defineComponent({
  components: { PageLoadingSpinner, ErrorMessage },
  setup() {
    const route = useRoute();
    const editor = ref('');
    const errorMessage = ref('');
    const answererName = ref('');

    const question = reactive<Question>({} as Question);
    const isQuestionLoaded = ref(false);

    const router = useRouter();
    const questionId = route.params.id?.toString();

    async function fetchQuestion() {
      try {
        const response = await api.get(`questions/${questionId}`);
        const result = (await response.json()) as Question;
        Object.entries(result).forEach(([key, value]) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          question[key] = value;
        });
      } catch (e) {
        Notify.create({
          message: `Could not load question ${route.params.id.toString()}`,
          type: 'negative',
        });
        await router.replace('/questions');
      }
    }

    if (questionId == null) {
      void router.replace('/questions');
    } else {
      void fetchQuestion().then(() => {
        isQuestionLoaded.value = true;
      });
    }

    async function answerQuestion() {
      await api.post('answer', {
        json: {
          id: questionId,
          content: editor.value,
          role: account.role,
          authorName: answererName.value,
        },
      });
    }

    return {
      isQuestionLoaded,
      editor,
      errorMessage,
      answererName,
      answerQuestion,
      isLoggedIn,
      question,
    };
  },
});
</script>
