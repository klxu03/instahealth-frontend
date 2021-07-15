<template>
  <q-btn :icon="mdiMagnify" label="Search Questions" no-caps />
  <q-btn :icon="mdiChatQuestion" label="Post a Question" no-caps />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mdiMagnify, mdiChatQuestion } from '@quasar/extras/mdi-v5';

export default defineComponent({
  setup() {
    return {
      mdiMagnify,
      mdiChatQuestion,
    };
  },
});
</script>
