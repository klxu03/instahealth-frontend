<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="row">
        <q-btn
          flat
          dense
          round
          :icon="mdiMenu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <div class="text-h6 q-mx-md text-bold">InstaHealth</div>

        <div style="position: relative; flex-grow: 1" class="q-mr-sm">
          <q-input dark dense standout v-model="searchText" class="q-mx-sm">
            <template v-slot:append>
              <q-icon v-if="searchText === ''" :name="mdiMagnify" />
              <q-icon
                v-else
                :name="mdiClose"
                class="cursor-pointer"
                @click="searchText = ''"
              />
            </template>
          </q-input>
          <div
            v-if="searchText !== ''"
            style="
              position: absolute;
              padding: 10px;
              left: 5px;
              background-color: white;
              border: 1px solid black;
              border-radius: 5px;
              z-index: 999;
              width: calc(100% - 10px);
            "
          >
            <questions-list @click="searchText = ''" :filter="searchText" />
          </div>
        </div>

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
  mdiMagnify,
  mdiClose,
} from '@quasar/extras/mdi-v5';
import EssentialLink from 'components/EssentialLink.vue';

import { isLoggedIn } from 'src/state';
import { useRouter } from 'vue-router';
import { fetchAccount, fetchQuestions } from 'src/utils';
import QuestionsList from 'src/components/QuestionsList.vue';

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

export default defineComponent({
  name: 'MainLayout',
  components: { EssentialLink, QuestionsList },
  setup() {
    const accountId = localStorage.getItem('accountId');
    if (accountId != null) {
      void fetchAccount(accountId)
        .then(() => {
          isLoggedIn.value = true;
        })
        .then(fetchQuestions)
        .catch(() => {
          // If couldn't log user in, log them out
          isLoggedIn.value = false;
          localStorage.removeItem('accountId');
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

    const searchText = ref('');
    return {
      searchText,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      mdiMenu,
      mdiMagnify,
      mdiClose,
      links,
      isLoggedIn,
      logout,
    };
  },
});
</script>
