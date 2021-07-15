<template>
  <q-page class="column items-center">
    <div class="text-h3 text-bold q-mt-md q-mb-sm">Recent Questions</div>
    <q-btn
      class="q-mb-md"
      label="Refresh"
      @click="fetchQuestions"
      color="primary"
    ></q-btn>
    <q-list class="column items-stretch" style="width: 600px">
      <template v-for="question in questions" :key="question.id">
        <q-item
          :to="`/question/${question.id}`"
          class="q-pa-md"
          style="width: 600px; margin-left: auto; margin-right: auto"
        >
          <q-item-section top avatar>
            <q-icon :name="getIconForRole(question.role)" />
          </q-item-section>

          <q-item-section>
            <q-item-label>
              {{ question.question }}
            </q-item-label>
            <q-item-label caption lines="3">
              {{ question.content }}
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-icon :name="mdiChevronRight" />
          </q-item-section>
        </q-item>
        <q-separator />
      </template>
    </q-list>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  mdiHelp,
  mdiHeart,
  mdiHandRight,
  mdiEye,
  mdiTooth,
  mdiEarHearing,
  mdiHospitalBox,
  mdiChevronRight,
} from '@quasar/extras/mdi-v5';
import { Question, questions } from 'src/state';
import { api } from 'src/utils';

const roleToIconMap = {
  patient: mdiHelp,
  cardiologist: mdiHeart,
  dermatologist: mdiHandRight,
  optometrist: mdiEye,
  dentist: mdiTooth,
  otolarynogolist: mdiEarHearing,
  familyDoctor: mdiHospitalBox,
};

export default defineComponent({
  name: '',
  setup() {
    function getIconForRole(role: string) {
      return roleToIconMap[role as keyof typeof roleToIconMap];
    }

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
      questions,
      getIconForRole,
      mdiChevronRight,
      fetchQuestions,
    };
  },
});
</script>
