<template>
  <q-btn label="Post Question" />
  <q-editor v-model="editor"></q-editor>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const editor = ref();

    return { editor };
  },
});
</script>
