<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { onBeforeMount } from 'vue'
import EmployeePMService from '@/services/EmployeePMService'

const router = useRouter();
const route = useRoute();
const typeId = Number(route.params.typeId);
const employeeId = Number(route.params.employeeId);
const typeName = typeId == 1 ? 'Ajuste por alta de pensión' : 'Ajuste de pensión por reactivación';
const employeePMService = new EmployeePMService();

const employee = ref({
  employeeId: 0,
  name: '',
  lastName1: '',
  lastName2: '',
  fullName: '',
  regime: '',
  pensionType: '',
  deceaseDate: '',
  companyName: '',
  centerId: '',
  departamentId: '',
  departamentName: '',
  attentionCenterId: '',
  attentionCenterName: '',
  grrhrl: '',
  sap: '',
  beginDate: '',
  paymentDate: ''
});

const fixPaymentRequest = ref({
  id: 0,
  typeId: 0,
  employeeId: 0,
  activityId: 0,
  name: '',
  regime: '',
  pensionType: '',
  deceaseDate: '',
  companyName: '',
  departament: '',
  attentionCenter: '',
  region: '',
  sap: '',
  beginDate: '',
  designatedEmployeeId: 0,
  designatedEmployeeName: '',
  designatedEmployeeAddress: '',
  paymentDate: '',
  numDaysMin: 0,
  numDays: 0
});

const requestId = ref(-1);

function saveRequest() {
  employeePMService.saveFixPaymentRequest(fixPaymentRequest.value).then((response) => {
    requestId.value = response.data;
    router.push({
      name: 'payment-adjustment',
      params: {
        requestId: requestId.value
      },
    });
  });

}

onBeforeMount(() => {
  employeePMService.findByEmployeeId(employeeId).then((response) => {
    employee.value = response.data;

    fixPaymentRequest.value.employeeId = employee.value.employeeId;
    fixPaymentRequest.value.name = employee.value.fullName;
    fixPaymentRequest.value.regime = employee.value.regime;
    fixPaymentRequest.value.pensionType = employee.value.pensionType;
    fixPaymentRequest.value.companyName = employee.value.companyName;
    fixPaymentRequest.value.departament = employee.value.departamentName;
    fixPaymentRequest.value.region = employee.value.grrhrl;
    fixPaymentRequest.value.sap = employee.value.sap;
    fixPaymentRequest.value.attentionCenter = employee.value.attentionCenterName;
    fixPaymentRequest.value.deceaseDate = employee.value.deceaseDate;
    fixPaymentRequest.value.beginDate = employee.value.beginDate;
    fixPaymentRequest.value.typeId = typeId;
    fixPaymentRequest.value.paymentDate = employee.value.paymentDate
  })
})
</script>

<template>
  <section>
    <div class="row mb-2 d-flex">
      <div class="ma-1 pa-1 me-auto">
        <h1>
          <v-icon icon="mdi-calculator" />
          Registro de Solicitud de Ajuste
        </h1>
      </div>
      <div class="ma-1 pa-1">
        <v-btn-group density="compact">
          <v-btn @click="saveRequest()" color="success" prepend-icon="mdi-arrow-right">
            Continuar con el Registro</v-btn
          >
        </v-btn-group>
      </div>
    </div>
  </section>

  <section>
    <v-card>
      <div class="d-flex">
        <v-card-item class="ma-2 pa-2 me-auto">
          <v-card-title>Datos Generales </v-card-title>
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
                  v-model="employee.grrhrl"
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
</template>
