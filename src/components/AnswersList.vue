<template>
  <q-list class="column items-stretch" style="width: 600px">
    <template v-for="answer in answers" :key="answer.id">
      <q-item
        class="q-pa-md"
        style="width: 600px; margin-left: auto; margin-right: auto"
      >
        <q-item-section top avatar>
          <q-icon :name="getIconForRole(answer.role)" />
        </q-item-section>

        <q-item-section>
          <q-item-label> Answered by: {{ answer.authorName }} </q-item-label>
          <q-item-label caption lines="3">
            Ansewered{{ answer.content }}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
    </template>
  </q-list>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import {
  mdiHelp,
  mdiHeart,
  mdiHandRight,
  mdiEye,
  mdiTooth,
  mdiEarHearing,
  mdiHospitalBox,
} from '@quasar/extras/mdi-v5';
import { questions, Answer } from 'src/state';

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
  props: {
    answers: {
      type: Array as PropType<Answer>,
      required: true,
    },
  },
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
