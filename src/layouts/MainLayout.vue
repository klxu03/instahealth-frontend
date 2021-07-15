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

        <q-btn
          class="q-mr-sm"
          label="Register"
          to="/register"
          color="secondary"
        />
        <q-btn label="Login" to="/login" color="accent" />
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
  components: { EssentialLink },
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      mdiMenu,
      links,
    };
  },
});
</script>
