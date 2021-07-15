<template>
  <q-card
    style="width: 500px"
    class="column items-stretch q-gutter-y-md q-pa-md"
  >
    <div class="text-h3 text-center q-mt-none" style="font-weight: bold">
      Register
    </div>
    <q-input label="Email" v-model="email" outlined />
    <q-input label="Password" v-model="password" outlined />
    <q-input label="Confirm Password" v-model="confirmPassword" outlined />
    <div class="row justify-center">
      <div class="column justify-center">I am a:</div>
      <q-radio v-model="role" val="patient" label="Patient" />
      <q-radio v-model="role" val="doctor" label="Doctor" />
    </div>
    <div v-if="role === 'doctor'">
      <div class="text-center text-h6 text-bold q-mb-sm">Speciality:</div>
      <q-select outlined v-model="doctorRole" :options="doctorRoles" />
    </div>
    <q-btn label="Register" @click="register" color="primary" />
    <error-message :message="errorMessage" />
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { api } from 'src/utils';
import ErrorMessage from 'components/ErrorMessage.vue';

const doctorRoles = [
  'Family Doctor',
  'Cardiologist',
  'Dermatologist',
  'Optometrist',
  'Dentist',
];

export default defineComponent({
  components: { ErrorMessage },
  setup() {
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const errorMessage = ref('');
    const role = ref('patient');
    const doctorRole = ref(doctorRoles[0]);

    async function register() {
      if (password.value !== confirmPassword.value) {
        errorMessage.value =
          'Password is not the same as the confirm password.';
        return;
      }

      errorMessage.value = '';

      try {
        await api.post('register', {
          json: {
            email: email.value,
            password: password.value,
            role: role.value,
          },
        });
      } catch (e: unknown) {
        errorMessage.value = (e as Error).toString();
      }
    }

    return {
      register,
      email,
      password,
      confirmPassword,
      errorMessage,
      role,
      doctorRole,
      doctorRoles,
    };
  },
});
</script>
