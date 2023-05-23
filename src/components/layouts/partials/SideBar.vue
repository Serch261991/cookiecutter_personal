<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from 'pinia';

import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const drawer = ref(true);
const rail = ref(false);
const menuItems = ref([
        { id: 1, title: 'Inicio', icon: 'mdi-home', route: '/' },
        //{ id: 2, title: 'Ajuste de Pensiones PM', icon: 'mdi-calculator', route: '/about' },
        //{ id: 3, title: 'Movimientos de Personal', icon: 'mdi-human-capacity-increase', route: '/home' },
      ])
</script>

<template>
    <v-navigation-drawer
        v-model="drawer"
        :rail="rail"
        permanent
        @click="rail = false"
      >
        <v-list-item
          prepend-avatar="https://cutewallpaper.org/24/profile-icon-png/profile-user-svg-png-icon-free-download-24787-onlinewebfontscom.png"
          :title="user.nombre"
          :subtitle="user.ficha"
          nav
        >
          <template v-slot:append>
            <v-btn
              variant="text"
              icon="mdi-chevron-left"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item v-for="menuItem in menuItems" :key="menuItem.id"
          :prepend-icon="menuItem.icon" 
          :title="menuItem.title" 
          :to="menuItem.route">
        </v-list-item>
        </v-list>
      </v-navigation-drawer>
</template>

<!-- <script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SideBar',
  data () {
    return {
      drawer: true,
      menuItems: [
        { id: 0, title: 'Inicio', icon: 'mdi-home', route: '/' },
        { id: 1, title: 'Ajuste de Pensiones PM', icon: 'mdi-calculator', route: '/about' },
        { id: 2, title: 'Movimientos de Personal', icon: 'mdi-human-capacity-increase', route: '/dashboard' },
      ],
      rail: false,
    }
  },
})
</script> -->