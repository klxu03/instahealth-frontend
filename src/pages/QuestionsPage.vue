<template>
  <q-page class="column items-center">
    <div class="text-h3 text-bold q-mt-md q-mb-sm">Recent Questions</div>
    <q-btn
      class="q-mb-md"
      label="Refresh"
      @click="fetchQuestions"
      color="primary"
    ></q-btn>
    <questions-list />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Question, questions } from 'src/state';
import { api } from 'src/utils';
import QuestionsList from 'src/components/QuestionsList.vue';

export default defineComponent({
  name: '',
  components: { QuestionsList },
  setup() {
    async function fetchQuestions() {
      const response = await api.get('questions');
      const result = (await response.json()) as Question[];

      questions.splice(0, questions.length);
      for (const question of result) {
        questions.push(question);
      }
    }

    void fetchQuestions();

    return {
      fetchQuestions,
    };
  },
});
</script>
