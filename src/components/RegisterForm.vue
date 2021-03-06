<template>
  <q-card
    style="width: 500px"
    class="column items-stretch q-gutter-y-md q-pa-md"
  >
    <div class="text-h3 text-center q-mt-none" style="font-weight: bold">
      Register
    </div>
    <q-input label="Email" type="email" v-model="email" outlined />
    <q-input label="Password" type="password" v-model="password" outlined />
    <q-input
      label="Confirm Password"
      type="password"
      v-model="confirmPassword"
      outlined
    />
    <div class="row justify-center">
      <div class="column justify-center">I am a:</div>
      <q-radio v-model="medicalRole" val="patient" label="Patient" />
      <q-radio v-model="medicalRole" val="doctor" label="Doctor" />
    </div>
    <div v-if="medicalRole === 'doctor'">
      <div class="text-center text-h6 text-bold q-mb-sm">Speciality:</div>
      <q-select outlined v-model="doctorRole" :options="doctorRoles" />
    </div>
    <q-btn label="Register" @click="register" color="primary" />
    <error-message :message="errorMessage" />
  </q-card>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { api, fetchAccount } from 'src/utils';
import ErrorMessage from 'components/ErrorMessage.vue';
import { useRouter } from 'vue-router';
import { isLoggedIn } from 'src/state';
import { HTTPError } from 'ky';

const doctorRoles = [
  {
    value: 'familyDoctor',
    label: 'Family Doctor',
  },
  {
    value: 'cardiologist',
    label: 'Cardiologist',
  },
  {
    value: 'dermatologist',
    label: 'Dermatologist',
  },
  {
    value: 'optometrist',
    label: 'Optometrist',
  },
  {
    value: 'dentist',
    label: 'Dentist',
  },
  {
    value: 'otolaryngologist',
    label: 'Otolaryngologist',
  },
];

export default defineComponent({
  components: { ErrorMessage },
  setup() {
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const errorMessage = ref('');
    const medicalRole = ref('patient');
    const doctorRole = ref(doctorRoles[0]);
    const roleString = ref('patient');

    watch(medicalRole, (roleValue) => {
      if (roleValue === 'patient') {
        roleString.value = 'patient';
      } else if (roleValue === 'doctor') {
        roleString.value = doctorRole.value.value;
      }
    });

    watch(doctorRole, (role) => {
      roleString.value = role.value;
    });

    const router = useRouter();

    async function register() {
      if (password.value !== confirmPassword.value) {
        errorMessage.value =
          'Password is not the same as the confirm password.';
        return;
      }

      errorMessage.value = '';

      try {
        const response = await api.post('register', {
          json: {
            email: email.value,
            password: password.value,
            role: roleString.value,
          },
        });
        const result = (await response.json()) as { id: string };
        localStorage.setItem('accountId', result.id);
        await fetchAccount(result.id);
        isLoggedIn.value = true;
        await router.push('/');
      } catch (e: unknown) {
        errorMessage.value =
          (await (e as HTTPError).response?.text()) ?? (e as Error).toString();
      }
    }

    return {
      register,
      email,
      password,
      confirmPassword,
      errorMessage,
      roleString,
      doctorRole,
      medicalRole,
      doctorRoles,
    };
  },
});
</script>
