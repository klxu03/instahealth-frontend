<template>
  <q-page class="column items-center">
    <q-list>
      <q-item
        v-for="question in questions"
        :key="question.title"
        class="q-pa-md"
      >
        <q-item-section top avatar>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ question.question }}</q-item-label>
          <q-item-label caption>{{ question.content }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
    </q-list>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const questions = [
  {
    question: 'Why is there a ring on my arm?',
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
