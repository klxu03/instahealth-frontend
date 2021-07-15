<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          :icon="mdiMenu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>InstaHealth</q-toolbar-title>

        <template v-if="isLoggedIn">
          <q-btn label="Logout" @click="logout" color="secondary" />
        </template>
        <template v-else>
          <q-btn
            class="q-mr-sm"
            label="Register"
            to="/register"
            color="secondary"
          />
          <q-btn label="Login" to="/login" color="accent" />
        </template>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-1">
      <div style="font-weight: bold" class="text-h4 text-center q-my-md">
        InstaHealth
      </div>

      <q-list>
        <essential-link
          v-for="link in links"
          :key="link.title"
          :title="link.title"
          :route="link.route"
          :icon="link.icon"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import {
  mdiMenu,
  mdiViewDashboard,
  mdiForum,
  mdiCommentQuestion,
} from '@quasar/extras/mdi-v5';
import EssentialLink from 'components/EssentialLink.vue';
import ky from 'ky';

const links = [
  {
    title: 'Dashboard',
    route: '/',
    icon: mdiViewDashboard,
  },
  {
    title: 'Questions',
    route: '/questions',
    icon: mdiForum,
  },
  {
    title: 'Post a Question',
    route: '/post',
    icon: mdiCommentQuestion,
  },
];

import { account, Account, isLoggedIn } from 'src/state';
import { useRouter } from 'vue-router';
import delay from 'delay';

export default defineComponent({
  name: 'MainLayout',
  components: { EssentialLink },
  setup() {
    async function getAccount(accountId: string) {
      // const response = await ky.get('account', {
      //   json: {
      //     id: accountId,
      //   },
      // });
      // const result = (await response.json()) as Account;
      await delay(500);

      const result = {
        id: 1,
        name: 'Kevin Xu',
        role: 'patient',
      };

      account.id = result.id;
      account.name = result.name;
      account.role = result.role;
    }

    const accountId = localStorage.getItem('accountId');
    if (accountId != null) {
      void getAccount(accountId).then(() => {
        isLoggedIn.value = true;
      });
    } else {
      isLoggedIn.value = false;
    }

    const leftDrawerOpen = ref(false);

    const router = useRouter();
    async function logout() {
      localStorage.removeItem('accountId');
      isLoggedIn.value = false;
      await router.push('/login');
    }

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      mdiMenu,
      links,
      isLoggedIn,
      logout,
    };
  },
});
</script>
