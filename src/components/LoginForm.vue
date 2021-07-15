<template>
  <q-card
    style="width: 500px"
    class="column items-stretch q-gutter-y-md q-pa-md"
  >
    <div class="text-h3 text-center q-mt-none" style="font-weight: bold">
      Login
    </div>
    <q-input label="Email" type="email" v-model="email" outlined />
    <q-input label="Password" type="password" v-model="password" outlined />
    <q-btn label="Login" @click="login" color="primary" />
    <error-message :message="errorMessage" />
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { api, fetchAccount } from 'src/utils';
import ErrorMessage from 'components/ErrorMessage.vue';
import { useRouter } from 'vue-router';
import { Account, isLoggedIn } from 'src/state';
import { HTTPError } from 'ky';

export default defineComponent({
  components: { ErrorMessage },
  setup() {
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');

    const router = useRouter();

    async function login() {
      errorMessage.value = '';

      try {
        const response = await api.post('login', {
          json: {
            email: email.value,
            password: password.value,
          },
        });
        const result = (await response.json()) as { id: string };
        localStorage.setItem('accountId', result.id.toString());
        await fetchAccount(result.id);
        isLoggedIn.value = true;
        await router.push('/');
      } catch (e: unknown) {
        errorMessage.value =
          (await (e as HTTPError).response?.text()) ?? (e as Error).toString();
      }
    }

    return {
      login,
      email,
      password,
      errorMessage,
    };
  },
});
</script>
