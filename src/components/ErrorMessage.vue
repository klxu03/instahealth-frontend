<template>
  <div v-if="message" class="text-center" style="color: red">
    {{ message }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    message: {
      type: String,
      required: true,
    },
  },
});
</script>
