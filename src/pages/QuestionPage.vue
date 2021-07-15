<template>
  <template v-if="isQuestionLoaded">
    <div class="text-h3">{{ question }}</div>
    <div>{{ content }}</div>

    <q-editor v-model="editor"></q-editor>
    <q-btn label="Post" class="q-mt-md self-center" @click="answerQuestion" />
    <error-message class="q-mt-sm" :message="errorMessage" />
  </template>
  <template v-else>
    <page-loading-spinner />
  </template>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { api } from 'src/utils';
import { Question } from 'src/state';
import PageLoadingSpinner from 'components/PageLoadingSpinner.vue';

export default defineComponent({
  components: { PageLoadingSpinner },
  props: {
    question: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },
  },
  setup() {
    const route = useRoute();
    const editor = ref('');
    const errorMessage = ref('');

    const question = reactive<Question>({} as Question);
    const isQuestionLoaded = ref(false);

    async function fetchQuestion() {
      const response = await api.get(`questions/${route.params.id.toString()}`);
      const result = (await response.json()) as Question;
      Object.entries(result).forEach(([key, value]) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        question[key] = value;
      });
    }

    void fetchQuestion().then(() => {
      isQuestionLoaded.value = true;
    });

    async function answerQuestion() {
      await api.get(``)
    }

    return {
      isQuestionLoaded,
      editor,
      errorMessage,
      answerQuestion,
    };
  },
});
</script>
