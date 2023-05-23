<script setup lang="ts">

import { ref, onBeforeMount } from "vue";
import type { Ref } from 'vue'
import { useRouter } from 'vue-router'
import ActivityService from "@/services/ActivityService";
import type { ActivityData } from "@/services/ActivityService/types";

//const route = useRoute();
const router = useRouter();

const activityService = new ActivityService();
const activityList: Ref<ActivityData[]> = ref([]);

 onBeforeMount(() => {
  activityService.getAll().then((response) => {
    activityList.value = response.data
  });
 });


</script>
<template>
    <v-sheet class="w-50">
        <v-list rounded density="compact">
            <v-list-item border
              v-for="activity in activityList"
              :key="activity.id"
              :value="activity.id"
              @click="router.push(`/payment-adjustment/list/${activity.id}`)"
            >
                <template v-slot:append>
                    <span class="badge">
                    {{ activity.total }}
                    </span>
                </template>
                <v-list-item-title> <strong>{{ activity.name }}</strong></v-list-item-title>
            </v-list-item>
        </v-list>
    </v-sheet>
</template>

<style scoped>
.badge {
  background-color: rgb(55, 115, 247);
  color: white;
  padding: 4px 8px;
  text-align: center;
  border-radius: 5px;
  font-weight: bolder;
}

</style>