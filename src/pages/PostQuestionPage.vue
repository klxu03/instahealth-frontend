<template>
  <template v-if="isLoggedIn === true">
    <div class="q-ma-md column">
      <div class="text-h3 text-center text-bold q-mb-sm">Post a Question</div>
      <q-input
        v-model="question"
        class="q-mb-sm"
        label="Question"
        outlined
        dense
      />
      <q-editor v-model="editor"></q-editor>
      <q-btn label="Post" class="q-mt-md self-center" @click="postQuestion" />
    </div>
  </template>
  <template v-else-if="isLoggedIn === false">
    <div class="text-center text-h6">
      You need to be logged in to ask a question.
    </div>
  </template>
  <template>
    <page-loading-spinner />
  </template>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { api } from 'src/utils';
import { isLoggedIn } from 'src/state';
import PageLoadingSpinner from 'src/components/PageLoadingSpinner.vue';

export default defineComponent({
  components: { PageLoadingSpinner },
  setup() {
    const editor = ref('');
    const question = ref('');

    async function postQuestion() {
      console.log(editor.value);
      await api.post('question', {
        json: {
          question: question.value,
          content: editor.value,
        },
      });
    }

    return { editor, question, isLoggedIn, postQuestion };
  },
});
</script>
