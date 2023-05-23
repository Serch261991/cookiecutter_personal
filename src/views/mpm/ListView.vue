<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { onBeforeMount } from "vue";
import EmployeePMService from "@/services/EmployeePMService";
import type { FixPaymentRequest } from '@/services/EmployeePMService/types'

const employeePMService = new EmployeePMService();
const fixPaymentRequestList: Ref<FixPaymentRequest[]> = ref([]);

const route = useRoute();
const router = useRouter();
const activityId = Number(route.params.activityId);

onBeforeMount(() => {

    employeePMService.findFixPaymentRequestByActivity(activityId).then((response) => {
        fixPaymentRequestList.value = response.data
  });

});



</script>

<template>
    <section>
      <div class="row mb-2 d-flex">
        <div class="ma-1 pa-1 me-auto">
          <h1>
            <v-icon icon="mdi-calculator" />
            Trámites de Ajuste de Pensión PM
          </h1>
        </div>
      </div>
    </section>
    
    <section>
      <v-card>
        <div class="d-flex">
          <v-card-item class="ma-2 pa-2 me-auto">
            <v-card-title>Lista</v-card-title>
            <!-- <v-card-subtitle>Tablero</v-card-subtitle> -->
          </v-card-item>
        </div>
        
        <v-divider :thickness="2"></v-divider>
        
        <v-card-text>
            <v-container fluid>
                <v-table density="compact">
                      <thead>
                        <tr>
                          <th class="text-left"></th>
                          <th class="text-left">Folio</th>
                          <th class="text-left">Ficha</th>
                          <th class="text-left">Nombre</th>
                          <th class="text-left">Sociedad</th>
                          <th class="text-left">Region</th>
                          <th class="text-left">SAP</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in fixPaymentRequestList" :key="item.id">
                          <td>
                            <v-btn 
                            density="compact"
                            icon="mdi-magnify"
                            color="blue-darken-2"
                            @click="router.push(`/payment-adjustment/${item.id}`)"
                            ></v-btn>
                          </td>
                          <td>{{ 'GRRHRL-'+item.region+'-'+item.id}}</td>
                          <td>{{ item.employeeId }}</td>
                          <td>{{ item.name }}</td>
                          <td>{{ item.companyName }}</td>
                          <td>{{ item.region }}</td>
                          <td>{{ item.sap }}</td>
                        </tr>
                      </tbody>
                    </v-table>
            </v-container>
            
        </v-card-text>
      </v-card>
    </section>

  </template>