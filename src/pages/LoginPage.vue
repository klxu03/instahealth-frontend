<template>
  <div style="width: 100%; margin-top: 50px" class="column items-center">
    <login-form />
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue';
import LoginForm from 'src/components/LoginForm.vue';
import { isLoggedIn } from 'src/state';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: { LoginForm },
  setup() {
    const router = useRouter();
    watch(isLoggedIn, async (loggedIn) => {
      if (loggedIn === true) {
        await router.replace('/');
      }
    });
  },
});
</script>
