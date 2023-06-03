<script setup lang="ts">
import AppLayout from './components/layouts/AppLayout.vue';
</script>

<template>
  <v-app>
    <app-layout v-if="!['login'].includes($route.name)"/>
    <RouterView v-if="['login'].includes($route.name)"/>
    <notifications />
  </v-app>
</template>
