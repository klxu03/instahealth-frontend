<template>
  <q-list
    class="column items-center text-black"
    style="width: 100%"
    v-if="filteredQuestions.length > 0"
  >
    <template v-for="question in filteredQuestions" :key="question.id">
      <q-item
        :to="`/question/${question.id}`"
        class="q-pa-md self-stretch"
        style="
          max-width: 600px;
          width: 100%;
          margin-left: auto;
          margin-right: auto;
        "
      >
        <q-item-section top avatar>
          <q-icon :name="getIconForCategory(question.categories[0])" />
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
  <div v-else class="text-black">No questions found.</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import {
  mdiHeart,
  mdiHandRight,
  mdiEye,
  mdiTooth,
  mdiEarHearing,
  mdiHospitalBox,
  mdiChevronRight,
  mdiMedicalBag,
} from '@quasar/extras/mdi-v5';
import { questions } from 'src/state';

const roleToCategoryMap = {
  heart: mdiHeart,
  skin: mdiHandRight,
  eye: mdiEye,
  teeth: mdiTooth,
  ear: mdiEarHearing,
  general: mdiHospitalBox,
};

export default defineComponent({
  props: {
    filter: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    function getIconForCategory(category: string) {
      const icon =
        roleToCategoryMap[category as keyof typeof roleToCategoryMap];
      if (icon !== undefined) {
        return icon;
      } else {
        return mdiMedicalBag;
      }
    }

    const filteredQuestions = computed(() => {
      return questions.filter(
        (question) =>
          question.content.includes(props.filter) ||
          question.question.includes(props.filter)
      );
    });

    return {
      questions,
      getIconForCategory,
      mdiChevronRight,
      filteredQuestions,
    };
  },
});
</script>
