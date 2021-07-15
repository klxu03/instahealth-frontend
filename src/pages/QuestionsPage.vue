<template>
  <q-page class="column items-center">
    <q-card v-for="question in questions" :key="question.title">
      {{ question.content }}
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const questions = [
  {
    title: 'Why is there a ring on my arm?',
    content:
      'I have this ring on my arm, and I would like to know if it should be a concern or not.',
  },
];

export default defineComponent({
  name: '',
  setup() {
    return {
      questions,
    };
  },
});
</script>
