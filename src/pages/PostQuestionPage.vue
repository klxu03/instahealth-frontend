<template>
  <template v-if="isLoggedIn === true">
    <div class="q-ma-md column">
      <div class="text-h3 text-center text-bold q-mb-sm">Post a Question</div>
      <q-input
        v-model="authorName"
        class="q-mb-sm"
        label="Name"
        outlined
        dense
      />
      <q-input
        v-model="question"
        class="q-mb-sm"
        label="Question"
        outlined
        dense
      />
      <q-editor v-model="editor"></q-editor>
      <q-btn label="Post" class="q-mt-md self-center" @click="postQuestion" />
      <error-message class="q-mt-sm" :message="errorMessage" />
    </div>
  </template>
  <template v-else-if="isLoggedIn === false">
    <div class="text-center text-h6 q-mt-md">
      You must be logged in to ask a question.
    </div>
  </template>
  <template>
    <page-loading-spinner />
  </template>
</template>

<script lang="ts">
import PageLoadingSpinner from 'src/components/PageLoadingSpinner.vue';
import { isLoggedIn, questions } from 'src/state';
import { api } from 'src/utils';
import { defineComponent, ref } from 'vue';
import ErrorMessage from 'components/ErrorMessage.vue';
import { HTTPError } from 'ky';
import { Notify } from 'quasar';

export default defineComponent({
  components: { PageLoadingSpinner, ErrorMessage },
  setup() {
    const authorName = ref('');
    const editor = ref('');
    const question = ref('');
    const errorMessage = ref('');

    async function postQuestion() {
      try {
        errorMessage.value = '';
        const response = await api.post('questions', {
          json: {
            authorName: 'Kevin Xu',
            datePosted: Date.now(),
            question: question.value,
            content: editor.value,
            role: 'patient',
          },
        });

        const result = (await response.json()) as { id: number };

        Notify.create({
          message: 'Question successfully posted!',
          type: 'positive',
        });

        questions.push({
          id: result.id,
          question: question.value,
          content: editor.value,
          role: 'patient',
        });
      } catch (e: unknown) {
        errorMessage.value =
          (await (e as HTTPError).response?.text()) ?? (e as Error).toString();
      }
    }

    return {
      editor,
      question,
      isLoggedIn,
      postQuestion,
      errorMessage,
      authorName,
    };
  },
});
</script>
