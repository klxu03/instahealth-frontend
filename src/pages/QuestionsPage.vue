<template>
  <q-page class="column items-center">
    <div class="text-h3 text-bold q-mt-md">Recent Questions</div>
    <q-list class="column items-stretch" style="width: 100%">
      <q-item
        :to="`/question/${question.id}`"
        v-for="question in questions"
        :key="question.id"
        class="q-pa-md"
        style="max-width: 600px; margin-left: auto; margin-right: auto"
      >
        <q-item-section top avatar>
          <q-icon :name="getIconForRole(question.role)" />
        </q-item-section>

        <q-item-section>
          <q-item-label>
            {{ question.question }}
          </q-item-label>
          <q-item-label caption lines="3">{{ question.content }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
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
} from '@quasar/extras/mdi-v5';

const questions = [
  {
    id: 1,
    question: 'Why is there a ring on my arm?',
    content:
      'I have this ring on my arm, and I would like to know if it should be a concern or not. I have this ring on my arm, and I would like to know if it should be a concern or not. I have this ring on my arm, and I would like to know if it should be a concern or not.',
    role: 'patient',
  },
];

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

    return {
      questions,
      getIconForRole,
    };
  },
});
</script>
