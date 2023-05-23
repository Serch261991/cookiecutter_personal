<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from 'vue-router'
import ActivityList from '../components/ActivityList.vue'

/*const gridView = 0;
const listView = 1;
const viewMode = ref(0);*/

/*const statusList = ref([
        { id: 1, name: 'Registro', icon: 'mdi-file-document-arrow-right-outline', total_request: 5 },
        { id: 2, name: 'Validación', icon: 'mdi-clipboard-text-search-outline', total_request: 1 },
        { id: 3, name: 'Autorización', icon: 'mdi-file-document-edit-outline', total_request: 3 },
        { id: 4, name: 'Ejecución', icon: 'mdi mdi-cog-play-outline', total_request: 0 },
        { id: 5, name: 'Conclusión', icon: 'mdi-playlist-check', total_request: 7 },
      ]);*/

const router = useRouter();
const paymentDialog = ref(false);

const typeReqs = ref([
        { id: 1, name: 'Ajuste por alta de pesión'},
        { id: 2, name: 'Ajuste de pensión por reactivación'},
      ]);

const selectedType = ref(1);

const employeeId = ref(null);

</script>

<template>
  <section>
    <div class="row mb-2 d-flex">
      <div class="ma-1 pa-1 me-auto">
        <h1>
          <v-icon icon="mdi-calculator" />
          Ajuste de Pensiones PostMortem
        </h1>
      </div>
      <div class="ma-1 pa-1">
        <v-btn-group density="compact">
          <v-btn @click="paymentDialog = true" rounded="lg" color="blue-darken-2" prepend-icon="mdi-plus"> Nuevo ajuste</v-btn>
        </v-btn-group>
      </div>
    </div>
  </section>
  
  <section>
    <v-card>
      <div class="d-flex">
        <v-card-item class="ma-2 pa-2 me-auto">
          <v-card-title>Tablero de control</v-card-title>
          <!-- <v-card-subtitle>Tablero</v-card-subtitle> -->
        </v-card-item>
        <!-- <v-card-item class="ma-2 pa-2">
          <v-btn-toggle
          v-model="viewMode"
          variant="outlined"
          divided
          mandatory>
            <v-btn @click="router.push(`/dashboard/activities/-1`)" icon="mdi-view-grid"></v-btn>
            <v-btn @click="router.push(`/dashboard/activities/0`)" icon="mdi-view-list"></v-btn>
          </v-btn-toggle>
        </v-card-item> -->
      </div>
      
      <v-divider :thickness="2"></v-divider>
      
      <v-card-text>
        
        <!-- <template v-if="viewMode === gridView">

          <v-container fluid>
            <v-row dense>
              <v-col class="mx-4"
              v-for="status in statusList"
              :key="status.id"
              >
                <v-card style="color: white;"
                color="#17a2b8"
                >
                  <v-card-item :title="status.name"></v-card-item>
                  <v-card-text class="py-0">
                    <v-row align="center" no-gutters>
                      <v-col class="text-h3" cols="6">
                        {{status.total_request}}
                      </v-col>
                  
                      <v-col cols="6" class="text-right">
                        <v-icon
                        color="rgba(0,0,0,.3)"
                        :icon="status.icon"
                        size="88"
                        >
                        </v-icon>
                      </v-col>
                    </v-row>
                  </v-card-text>
                  <br />
                  <v-divider></v-divider>
                  <v-card-actions>
                    <v-btn @click="router.push(`/dashboard/activities/${status.id}`)">
                      Ver
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
            </v-container>
            <v-divider></v-divider>
            <v-container fluid>
              <router-view :key="$route.fullPath"></router-view>
            </v-container>
        </template> -->
          
        <!-- <template>
          <router-view :key="$route.fullPath"></router-view>
        </template> -->
        <activity-list></activity-list>

      </v-card-text>
    </v-card>
  </section>

  <v-row justify="center">
    <v-dialog
      v-model="paymentDialog"
      persistent
      width="500"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Seleccione empleado y tipo de ajuste</span>
        </v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-row>
              <v-col
                cols="13"
                sm="10"
              >
                <v-text-field
                density="compact"
                  label="Ficha"
                  required
                  v-model="employeeId"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col
                cols="13"
                sm="10"
              >
              <v-select
              clearable
              required
              label="Selecciona tipo de ajuste"
              density="comfortable"
              :items="typeReqs"
              item-value="id"
              item-title="name"
              v-model="selectedType"
  ></v-select>
              </v-col>
              </v-row>
              <v-row>
              <v-col
                cols="13"
                sm="7"
              >
                <v-btn @click="router.push(`/payments/${selectedType}/${employeeId}`)" rounded="lg" color="blue-darken-2" prepend-icon="mdi-magnify"> Buscar</v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="paymentDialog = false"
          >
            Cerrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>