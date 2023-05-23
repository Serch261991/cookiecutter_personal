<script lang="ts">
import logo from "../../../assets/logoPemex_blanco.svg";
import store from "../../../stores";

export default {

  name: "NarBar",
  data() {
    return {
      logo: logo
      }
    },
  methods: {
    logOut() {
      store.dispatch('auth/logout');
      this.$router.push('/');
    }
  },
};



</script>

<template>
   <v-app-bar clipped-left app dense color="black darken-3" dark>
    <!-- <v-app-bar-nav-icon>
        <v-icon>mdi-view-headline</v-icon>
    </v-app-bar-nav-icon> -->
    <v-toolbar-title class="pl-1">
        <v-img
        width="auto"
        contain
        :src=logo
        transition="scale-transition"/>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <!-- <v-menu offset-y left max-width="320"> -->
    <v-menu>
        <template v-slot:activator="{ props }">
                <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
              </template>
  
              <v-list>

                <v-list-item
            title="Salir"
          >
            <template v-slot:append>
                <v-btn
                variant="text"
                icon="mdi mdi-logout"
                @click="logOut()"
                ></v-btn>
            </template>
          </v-list-item>

                
                <!-- <v-list-item
                  v-for="(item, i) in items"
                  :key="i"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item> -->
              </v-list>
    </v-menu>
   </v-app-bar>
  </template>

