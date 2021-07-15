<template>
  <q-card>
    <q-btn label="Email" v-model="email" />
    <q-btn label="Password" v-model="password" />
    <div v-if="errorMessage">{{ errorMessage }}</div>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { api } from 'src/utils';

export default defineComponent({
  setup() {
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');

    async function login() {
      errorMessage.value = '';

      try {
        await api.post('/login', {
          json: {
            email: email.value,
            password: password.value,
          },
        });
      } catch (e: unknown) {
        errorMessage.value = (e as Error).toString();
      }
    }

    return {
      login,
      email,
      password,
    };
  },
});
</script>
