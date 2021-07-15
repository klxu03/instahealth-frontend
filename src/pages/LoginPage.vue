<template>
  <div style="width: 100%; margin-top: 50px" class="column items-center">
    <login-form />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoginForm from 'src/components/LoginForm.vue';

export default defineComponent({
  components: { LoginForm },
});
</script>
