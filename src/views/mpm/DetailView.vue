<script setup lang="ts">
import { ref } from "vue";
import type { Ref } from "vue";
import { useRoute } from "vue-router";
//import TimeLine from '@/components/TimeLine.vue';
import CommentList from '@/components/CommentList.vue';
import FileList from '@/components/FileList.vue';
import { onBeforeMount } from "vue";
import EmployeePMService from "@/services/EmployeePMService";
import PaymentConceptService from "@/services/PaymentConceptService";
import type { PaymentConceptData } from "@/services/PaymentConceptService/types"
import BeneficiaryPMService from "@/services/BeneficiaryPMService";
import type { BeneficiaryPmData } from "@/services/BeneficiaryPMService/types"


const route = useRoute();
const typeId = route.params.typeId;
const employeeId = Number(route.params.employeeId);
const typeName = typeId == '1'?'Ajuste por alta de pesión':'Ajuste de pensión por reactivación';
const type1= typeId == '1'?'a':'b';
const employeePMService = new EmployeePMService();
const paymentConceptService = new PaymentConceptService();
const beneficiaryPMService = new BeneficiaryPMService();

const employee =  ref( {
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
});

const tab = ref(null);
const calculatorDialog = ref(false);
const folio = ref("GRRHRL-ALT-1");
const conceptList: Ref<PaymentConceptData[]> = ref([]);
const beneficiaryList: Ref<BeneficiaryPmData[]> = ref([]);

onBeforeMount(() => {


  employeePMService.findByEmployeeId(employeeId)
  .then((response) => {
    employee.value = response.data;
  });

  
  paymentConceptService.findByEmployeeId(employeeId)
  .then((response) => {
    conceptList.value = response.data;
   });

  beneficiaryPMService.findByEmployeeId(employeeId)
  .then((response) => {
    beneficiaryList.value = response.data;
  });

});



</script>

<template>
    <section>
      <div class="row mb-2 d-flex">
        <div class="ma-1 pa-1 me-auto">
          <h1>
            <v-icon icon="mdi-calculator" />
            Registro de Ajuste de Pensión PM
          </h1>
        </div>
        <div class="ma-1 pa-1">
            <v-btn-group density="compact">
            <v-btn @click="calculatorDialog = true" color="blue-darken-2" prepend-icon="mdi-calculator-variant">Calcular</v-btn>
          </v-btn-group>
          <v-divider :thickness="10" vertical/>
          <v-btn-group density="compact" >
            <v-btn color="error" prepend-icon="mdi-close"> Cancelar</v-btn>
            <v-btn color="warning" prepend-icon="mdi-arrow-left"> Regresar</v-btn>
            <v-btn color="success" prepend-icon="mdi-arrow-right"> Enviar</v-btn>
          </v-btn-group>
        </div>
      </div>
    </section>
    
    <section>
      <v-card>
        <div class="d-flex">
          <v-card-item class="ma-2 pa-2 me-auto">
            <v-card-title>Datos Generales <span class="badge">
                    1 trámite anterior
                    </span> </v-card-title>
            <!-- <v-card-subtitle>Tablero</v-card-subtitle> -->
          </v-card-item>
        </div>
        
        <v-divider :thickness="2"></v-divider>
        
        <v-card-text>
            <v-container fluid>

                <v-form>
   
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            label="Folio"
            density="comfortable"
            required
            v-model="folio"
            readonly
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
        <v-text-field
            label="Ficha"
            density="comfortable"
            required
            v-model="employee.employeeId"
            readonly
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
        <v-text-field
            label="Nombre"
            density="comfortable"
            required
            v-model="employee.fullName"
            readonly
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
        <v-text-field
            label="Régimen"
            density="comfortable"
            required
            v-model="employee.regime"
            readonly
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
        <v-text-field
            label="Sociedad"
            density="comfortable"
            required
            v-model="employee.companyName"
            readonly
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
        <v-text-field
            label="Departamento"
            density="comfortable"
            required
            v-model="employee.departamentName"
            readonly
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
        <v-text-field
            label="GRRHRL"
            density="comfortable"
            required
            v-model="employee.grrhrl"
            readonly
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
        <v-text-field
            label="SAP"
            density="comfortable"
            required
            v-model="employee.sap"
            readonly
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
        <v-text-field
            label="Centro de Atención"
            density="comfortable"
            required
            v-model="employee.attentionCenterName"
            readonly
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
        <v-text-field
            label="Fecha de fallecimiento"
            density="comfortable"
            required
            v-model="employee.deceaseDate"
            readonly
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            label="Tipo de pensión"
            density="comfortable"
            required
            v-model="employee.pensionType"
            readonly
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            label="Tipo de ajuste"
            density="comfortable"
            required
            v-model="typeName"
            readonly
          ></v-text-field>
        </v-col>
      </v-row>
   
  </v-form>
                
            </v-container>
          
            <v-divider :thickness="2"></v-divider>
  
            <v-container fluid>
                <v-tabs v-model="tab" align-tabs="start">
                    <v-tab value="1">Comentarios</v-tab>
                    <v-tab value="2">Archivos</v-tab>
                    <!--<v-tab value="3">Historial</v-tab>-->
                </v-tabs>
                <v-window v-model="tab">
                    <v-window-item value="1">
                        <comment-list/>
                    </v-window-item>
                    <v-window-item value="2">
                        <file-list :type1="type1" />
                    </v-window-item>
                    <!--<v-window-item value="3">
                        <time-line />
                    </v-window-item>-->
                </v-window>
            </v-container>
        </v-card-text>
      </v-card>
    </section>
    <v-row justify="center">
    <v-dialog
      v-model="calculatorDialog"
      persistent
      width="75%"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Cálculo</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-tabs v-model="tab" align-tabs="start">
                    <v-tab value="1">Beneficiario: 1480</v-tab>
                    <v-tab value="2">Benefirciario: 1481</v-tab>
                    <!--<v-tab value="3">Historial</v-tab>-->
                </v-tabs>
                <v-window v-model="tab">
                    <v-window-item value="1">
                      <v-table
                density="compact">
              <thead>
            <tr>
        <th class="text-left">
          Concepto
        </th>
        <th class="text-left">
          Referencia
        </th>
        <th class="text-left">
          Importe Total
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in conceptList"
        :key="item.key"
      >
      <td>{{ item.description }}</td>
      <td>{{ item.key }}</td>
        <td>{{ item.amount }}</td>
      </tr>
    </tbody>
  </v-table>
                    </v-window-item>
                    <v-window-item value="2">
                        
                    </v-window-item>
                </v-window>
              </v-col>
              <v-divider :thickness="2"></v-divider>
              <br/><br/><br/><br/>
              <v-col cols="12">
                <v-table
                density="compact">
              <thead>
            <tr>
        <th class="text-left">
          SOCIEDAD
        </th>
        <th class="text-left">
          CC-NOMINA
        </th>
        <th class="text-left">
          ACREEDOR
        </th>
        <th class="text-left">
          NOMBRE
        </th>
        <th class="text-left">
          PORCENTAJE
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in beneficiaryList"
        :key="item.key"
      >
      <td>{{ employee.companyName }}</td>
      <td>{{ item.key }}</td>
        <td>---</td>
        <td>---</td>
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
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="calculatorDialog = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="blue-darken-1"
            variant="text"
            @click="calculatorDialog = false"
          >
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