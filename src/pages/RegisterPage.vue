<template>
  <div
    style="width: 100%; margin-top: 50px"
    class="column items-center justify-center"
  >
    <register-form />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import RegisterForm from 'src/components/RegisterForm.vue';

export default defineComponent({
  components: { RegisterForm },
});
</script>
