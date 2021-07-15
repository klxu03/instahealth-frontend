<template>
  <template v-if="isLoggedIn === true">
    <div class="row justify-around q-pa-lg">
      <div class="column">
        <div class="text-h4 text-bold text-center q-mb-sm">
          Recent Questions
        </div>
        <questions-list />
      </div>
      <div class="column items-center q-gutter-y-sm">
        <q-btn
          :icon="mdiMagnify"
          label="Recent Questions"
          to="/questions"
          no-caps
        />
        <q-btn
          :icon="mdiChatQuestion"
          label="Post a Question"
          to="/post"
          no-caps
        />
      </div>
    </div>
  </template>
  <template v-else-if="isLoggedIn === false">
    <div class="text-center q-mt-md text-h6">
      Please log in to view your dashboard.
    </div>
  </template>
  <template v-else>
    <page-loading-spinner />
  </template>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { mdiMagnify, mdiChatQuestion } from '@quasar/extras/mdi-v5';
import { account, isLoggedIn } from 'src/state';
import PageLoadingSpinner from 'src/components/PageLoadingSpinner.vue';
import { questions } from 'src/state';
import QuestionsList from 'src/components/QuestionsList.vue';
import { fetchQuestions } from 'src/utils';

export default defineComponent({
  components: { PageLoadingSpinner, QuestionsList },
  setup() {
    void fetchQuestions();

    const myQuestions = computed(() => {
      const questionsArr = [];
      for (const question of questions) {
        questionsArr.push(question);
      }
      return questionsArr;
    });

    return {
      mdiMagnify,
      mdiChatQuestion,
      isLoggedIn,
      account,
      myQuestions,
    };
  },
});
</script>
