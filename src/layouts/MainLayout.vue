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
      <div style="font-weight: bold" class="text-h4" text-cente q-mt-mdr>
        InstaHealth
      </div>

      <q-list>
        <q-item to="/">Dashboard</q-item>
        <q-item to="/questions">Questions</q-item>
        <q-item to="/post">Post a Question</q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { mdiMenu } from '@quasar/extras/mdi-v5';

export default defineComponent({
  name: 'MainLayout',
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      mdiMenu,
    };
  },
});
</script>
