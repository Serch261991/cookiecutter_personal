<script setup lang="ts">

import SideBar from "@/components/layouts/partials/SideBar.vue";
import NavBar from "@/components/layouts/partials/NavBar.vue";

</script>

<template>   
    <v-layout>
        <nav-bar />
        <side-bar />
        <v-main>
          <v-container fluid>
            <router-view/>
          </v-container>
        </v-main>
    </v-layout>
  </template>