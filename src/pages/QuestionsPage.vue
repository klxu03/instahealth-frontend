<template>
  <q-page class="column items-center" style='width: 100%'>
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
import { fetchQuestions } from 'src/utils';
import QuestionsList from 'src/components/QuestionsList.vue';

export default defineComponent({
  name: '',
  components: { QuestionsList },
  setup() {
    void fetchQuestions();

    return {
      fetchQuestions,
    };
  },
});
</script>
