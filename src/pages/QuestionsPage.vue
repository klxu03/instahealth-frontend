<template>
  <q-page class="column items-center">
    <div class="text-h3 text-bold q-mt-md q-mb-sm">Recent Questions</div>
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
            <q-item-label caption lines="3">{{
              question.content
            }}</q-item-label>
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

const questions = [
  {
    id: 1,
    question: 'Mild occasional lightheadedness',
    content: 'I have mild occasional lightheadedness',
    role: 'patient',
  },
  {
    id: 2,
    question: 'Severe weight loss',
    content: 'I have severe weight loss',
    role: 'patient',
  },
  {
    id: 3,
    question: 'Mild ringing in the ears',
    content: 'I have mild ringing in the ears',
    role: 'patient',
  },
  {
    id: 4,
    question: 'Critical shortness of breath',
    content: 'I have critical shortness of breath',
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
      mdiChevronRight,
    };
  },
});
</script>
