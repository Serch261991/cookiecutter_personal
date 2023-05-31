<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
//import TimeLine from '@/components/TimeLine.vue';
//import CommentList from '@/components/CommentList.vue'
import FileList from '@/components/FileList.vue'
import { onBeforeMount } from 'vue'
import EmployeePMService from '@/services/EmployeePMService'
import PaymentConceptService from '@/services/PaymentConceptService'
import type { PaymentConceptData } from '@/services/PaymentConceptService/types'
import BeneficiaryPMService from '@/services/BeneficiaryPMService'
import type { BeneficiaryPmData } from '@/services/BeneficiaryPMService/types'
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const router = useRouter();
const route = useRoute();
const requestId = Number(route.params.requestId);
const typeName = ref('');
const totalPreviousreqs = ref(0);
const typeId = ref(0);
const employeePMService = new EmployeePMService();
const paymentConceptService = new PaymentConceptService();
const beneficiaryPMService = new BeneficiaryPMService();

const fixPaymentRequest = ref({
  id: 0,
  typeId: 0,
  activityId: 0,
  employeeId: 0,
  name: '',
  regime: '',
  pensionType: '',
  deceaseDate: '',
  paymentDate: '',
  numDaysMin: 0,
  numDays: 0,
  companyName: '',
  departament: '',
  attentionCenter: '',
  region: '',
  sap: '',
  beginDate: '',
  designatedEmployeeId: 0,
  designatedEmployeeName: '',
  designatedEmployeeAddress: ''
});


const tab = ref(null);
const calculatorDialog = ref(false);
const key = ref('');
const conceptList: Ref<PaymentConceptData[]> = ref([]);
const beneficiaryList: Ref<BeneficiaryPmData[]> = ref([]);
const fileListComponent = ref();


function cancel(){
  employeePMService.cancelFixPaymentRequest(requestId).then(() => {
    router.push({
      name: 'dashboard',
    });
  });
}

function nextStep(){

  fixPaymentRequest.value.activityId = fixPaymentRequest.value.activityId+1;
  employeePMService.updateNextStatus(fixPaymentRequest.value).then(() => {
    router.push({
      name: 'dashboard',
    });
  });
}

function previousStep(){
  fixPaymentRequest.value.activityId = fixPaymentRequest.value.activityId-1;
  employeePMService.updateNextStatus(fixPaymentRequest.value).then(() => {
    router.push({
      name: 'dashboard',
    });
  });
}

function getDesignatedEmployeeName(){
  employeePMService.findNameByEmployeeId(fixPaymentRequest.value.designatedEmployeeId).then((response) => {
    fixPaymentRequest.value.designatedEmployeeName = response.data;
  });
}

function saveDesignatedEmployee(){
  employeePMService.saveDesignatedEmployee(requestId,
    fixPaymentRequest.value.designatedEmployeeId, fixPaymentRequest.value.designatedEmployeeName, fixPaymentRequest.value.designatedEmployeeAddress);
}

onBeforeMount(() => {
  employeePMService.findFixPaymentRequest(requestId).then((response) => {
    fixPaymentRequest.value = response.data
    key.value =  'GRRHRL-'+fixPaymentRequest.value.region+'-'+requestId;

    paymentConceptService.findByEmployeeId(fixPaymentRequest.value.employeeId).then((response) => {
    conceptList.value = response.data
  });

  beneficiaryPMService.findByEmployeeId(fixPaymentRequest.value.employeeId).then((response) => {
    beneficiaryList.value = response.data
  });

  typeName.value = fixPaymentRequest.value.typeId == 1 ? 'Ajuste por alta de pensión' : 'Ajuste de pensión por reactivación';
  typeId.value = fixPaymentRequest.value.typeId;

  employeePMService.countByEmployeeId(fixPaymentRequest.value.employeeId).then((response) => {
    totalPreviousreqs.value = response.data;
  });

  });
});

</script>

<template>
  <section>
    <div class="row mb-2 d-flex">
      <div class="ma-1 pa-1 me-auto">
        <h1>
          <v-icon icon="mdi-calculator" />
          Completar Solicitud de Ajuste
        </h1>
      </div>
      <div class="ma-1 pa-1">
        <v-btn-group density="compact">
          <v-btn
            @click="calculatorDialog = true"
            color="blue-darken-2"
            prepend-icon="mdi-calculator-variant"
            >Cálculo</v-btn
          >
        </v-btn-group>
        <v-divider :thickness="10" vertical />
        <v-btn-group v-if="fixPaymentRequest.activityId<6" density="compact">
          <v-btn @click="cancel()" color="error" prepend-icon="mdi-close"> Cancelar</v-btn>
          <v-btn v-if="fixPaymentRequest.activityId != 1" @click="previousStep()" color="warning" prepend-icon="mdi-arrow-left"> Regresar</v-btn>
          <v-btn @click="nextStep()" color="success" prepend-icon="mdi-arrow-right"> Enviar</v-btn>
        </v-btn-group>
      </div>
    </div>
  </section>

  <section>
    <v-card>
      <div class="d-flex">
        <v-card-item class="ma-2 pa-2 me-auto">
          <v-card-title
            >Datos Generales <span v-if="totalPreviousreqs>0 && fixPaymentRequest.activityId<6" class="badge"> {{totalPreviousreqs}} trámite(s) anterior(es) </span>
          </v-card-title>
          <!-- <v-card-subtitle>Tablero</v-card-subtitle> -->
        </v-card-item>
      </div>

      <v-divider :thickness="2"></v-divider>

      <v-card-text>
        <v-container fluid>
          <v-form>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  label="Tipo de ajuste"
                  density="comfortable"
                  required
                  v-model="typeName"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  label="Folio"
                  density="comfortable"
                  required
                  v-model="key"
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  label="Ficha"
                  density="comfortable"
                  required
                  v-model="fixPaymentRequest.employeeId"
                  readonly
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  label="Nombre"
                  density="comfortable"
                  required
                  v-model="fixPaymentRequest.name"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  label="Régimen"
                  density="comfortable"
                  required
                  v-model="fixPaymentRequest.regime"
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  label="Fecha de fallecimiento"
                  density="comfortable"
                  required
                  v-model="fixPaymentRequest.deceaseDate"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  label="Tipo de pensión"
                  density="comfortable"
                  required
                  v-model="fixPaymentRequest.pensionType"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  label="Inicio de Pensión"
                  density="comfortable"
                  required
                  v-model="fixPaymentRequest.beginDate"
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  label="Sociedad"
                  density="comfortable"
                  required
                  v-model="fixPaymentRequest.companyName"
                  readonly
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  label="GRRHRL"
                  density="comfortable"
                  required
                  v-model="fixPaymentRequest.region"
                  readonly
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  label="SAP"
                  density="comfortable"
                  required
                  v-model="fixPaymentRequest.sap"
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Departamento"
                  density="comfortable"
                  required
                  v-model="fixPaymentRequest.departament"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  label="Centro de Atención"
                  density="comfortable"
                  required
                  v-model="fixPaymentRequest.attentionCenter"
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
  </section>
  <br />
  <section>
    <v-card>
      <div class="d-flex">
        <v-card-item class="ma-2 pa-2 me-auto">
          <v-card-title>Recolección de cheque </v-card-title>
          <!-- <v-card-subtitle>Tablero</v-card-subtitle> -->
        </v-card-item>
      </div>

      <v-divider :thickness="2"></v-divider>
      <v-card-text>
        <v-container fluid>
          <v-form>
            <v-row>
              <v-col cols="12" md="2">
                <v-text-field
                  variant="solo"
                  single-line
                  hide-details
                  label="Ficha"
                  density="comfortable"
                  required
                  v-model="fixPaymentRequest.designatedEmployeeId"
                  append-inner-icon="mdi-magnify"
                  @click:append-inner="getDesignatedEmployeeName()"
                  :readonly="!(user.perfil.id==1)"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  label="Nombre"
                  density="comfortable"
                  required
                  v-model="fixPaymentRequest.designatedEmployeeName"
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  variant="solo"
                  label="Dirección"
                  density="comfortable"
                  required
                  v-model="fixPaymentRequest.designatedEmployeeAddress"
                  :readonly="!(user.perfil.id==1)"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="2">
                <v-btn v-if="user.perfil.id==1"
                density="compact"
                @click="saveDesignatedEmployee()" 
                color="blue-darken-2" 
                prepend-icon="mdi-content-save"> Guardar</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
    </v-card>
  </section>
  <br />
  <section>
    <v-card>
      <v-card-text>
        <v-container fluid>
          <v-tabs v-model="tab" align-tabs="start">
            <v-tab value="1">Archivos</v-tab>
            <!-- <v-tab value="2">Comentarios</v-tab> -->
            <!--<v-tab value="3">Historial</v-tab>-->
          </v-tabs>
          <v-window v-model="tab">
            <v-window-item value="1">
              <file-list :typeId="typeId" :requestId="requestId" :activityId="fixPaymentRequest.activityId" ref="fileListComponent" />
            </v-window-item>
            <v-window-item value="2">
              <!-- <comment-list /> -->
            </v-window-item>
            <!--<v-window-item value="3">
                        <time-line />
                    </v-window-item>-->
          </v-window>
        </v-container>
      </v-card-text>
    </v-card>
  </section>
  <br /><br />
  <v-row justify="center">
    <v-dialog v-model="calculatorDialog" persistent width="75%">
      <v-card>
        <v-card-title>
          <span class="text-h5">Cálculo</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <strong>Fecha de ultimo pago: {{ fixPaymentRequest.paymentDate }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                Días excedentes: {{ fixPaymentRequest.numDaysMin }} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                Días pago: {{ fixPaymentRequest.numDays }}</strong>
            </v-row>
            <br/><br/>
            <v-divider :thickness="2"></v-divider>
            <v-row>
              <v-col cols="12">
                <v-tabs v-model="tab" align-tabs="start">
                  <v-tab v-for="item in beneficiaryList" :key="item.key" :value="item.key">Beneficiario: {{item.key}}</v-tab>
                  <!--<v-tab value="3">Historial</v-tab>-->
                </v-tabs>
                <v-window v-model="tab">
                  <v-window-item v-for="item1 in beneficiaryList" :key="item1.key" :value="item1.key">
                    <v-table density="compact">
                      <thead>
                        <tr>
                          <th class="text-left">Concepto</th>
                          <th class="text-left">Referencia</th>
                          <th class="text-left">Importe</th>
                          <th class="text-left">Demasia</th>
                          <th class="text-left">Pago</th>
                        </tr>
                      </thead>
                      <tbody>
                        <template v-for="item in conceptList" :key="item.key">
                          <tr v-if="((item1.key=='1480'||item1.key=='1481'||item1.key=='1482'||item1.key=='1483'||item1.key=='1484'||item1.key=='1485'||item1.key=='1486')&&item.key=='1470')||item1.key=='1480'">
                          <td>{{ item.description }}</td>
                          <td>{{ item.key }}</td>
                          <td>{{ item.amount }}</td>
                          <td>
                            <span v-if="(item.key=='1470'||item.key=='2007'||item.key=='2004'||item.key=='2019')&&item1.key=='1480'">{{ ((-item.amount)*5).toFixed(2) }}</span>
                          </td>
                          <td v-if="item.key!='9041'&&item.key!='9042'&&item.key!='9043'&&item.key!='9044'&&item.key!='9045'&&item.key!='9046'&&item.key!='9047'&&item.key!='9049'&&item.key!='9050'&&item.key!='9051'&&item.key!='9080'&&item.key!='9082'&&item.key!='9084'&&item.key!='9090'&&item.key!='2004'">
                            <span v-if="item.key=='1470'">
                              {{ (((item.amount)*fixPaymentRequest.numDays)*(item1.percent/100)).toFixed(2) }}
                            </span>
                            <span v-else>
                              {{ (item.amount*fixPaymentRequest.numDays).toFixed(2) }}
                            </span>
                          </td>
                          <td v-else>
                            {{ item.key=='2004'?'':-item.amount }}
                          </td>
                        </tr>
                        </template>
                      </tbody>
                    </v-table>
                  </v-window-item>
                  <v-window-item value="5"> </v-window-item>
                  <v-window-item value="6"> </v-window-item>
                </v-window>
              </v-col>
              <v-divider :thickness="2"></v-divider>
              <br /><br /><br /><br />
              <v-col cols="12">
                <v-table density="compact">
                  <thead>
                    <tr>
                      <th class="text-left">SOCIEDAD</th>
                      <th class="text-left">CC-NOMINA</th>
                      <th class="text-left">ACREEDOR</th>
                      <th class="text-left">NOMBRE</th>
                      <th class="text-left">PORCENTAJE</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in beneficiaryList" :key="item.key">
                      <td>{{ fixPaymentRequest.companyName }}</td>
                      <td>{{ item.key }}</td>
                      <td>{{ 'RO' + fixPaymentRequest.employeeId.toString().padStart(6,'0') + item.key.charAt(item.key.length - 1).padStart(2,'0') }}</td>
                      <td>{{ item.name }}</td>
                      <td>{{ item.percent }}</td>
                    </tr>
                  </tbody>
                </v-table>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="calculatorDialog = false">
            Cancelar
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="calculatorDialog = false">
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<style scoped>
.badge {
  background-color: orange;
  color: black;
  padding: 4px 8px;
  text-align: center;
  border-radius: 5px;
  font-weight: bolder;
  font-size: small;
}
</style>
