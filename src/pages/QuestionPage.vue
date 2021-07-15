<template>
  <template v-if="isQuestionLoaded">
    <div class="text-h3">{{ question }}</div>
    <div>{{ content }}</div>
  </template>
  <template v-else>
    <q-spinner-cube />
  </template>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { api } from 'src/utils';

type Question = {
  id: number;
  question: string;
  content: string;
  authorName: string;
  datePosted: string;
};

export default defineComponent({
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

    return {
      isQuestionLoaded,
    };
  },
});
</script>
