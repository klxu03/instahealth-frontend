<template>
  <template v-if="isLoggedIn === true">
    <div class="row justify-around q-pa-lg">
      <div class="column">
        <div class="text-h4 text-bold">My Questions</div>
      </div>
      <div class="column items-center q-gutter-y-sm">
        <q-btn :icon="mdiMagnify" label="Search Questions" no-caps />
        <q-btn :icon="mdiChatQuestion" label="Post a Question" no-caps />
      </div>
    </div>
  </template>
  <template v-else-if="isLoggedIn === false">
    <div class="text-center q-mt-md text-h6">
      Please log in to view your dashboard.
    </div>
  </template>
  <template v-else>
    <div
      style="height: 100%; width: 100%"
      class="column justify-center items-center"
    >
      <q-spinner-cube size="100px" />
    </div>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mdiMagnify, mdiChatQuestion } from '@quasar/extras/mdi-v5';
import { account, isLoggedIn } from 'src/state';

export default defineComponent({
  setup() {
    return {
      mdiMagnify,
      mdiChatQuestion,
      isLoggedIn,
      account,
    };
  },
});
</script>
