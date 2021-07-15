<template>
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

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { api } from 'src/utils';

export default defineComponent({
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

    return { editor, question, postQuestion };
  },
});
</script>
