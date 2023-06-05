<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import type { Ref } from 'vue'
import FileService from "@/services/FileService";
import type { AppFile } from "@/services/FileService/types";
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';
import { notify } from "@kyvg/vue3-notification";
import { useConfirm} from 'vuetify-use-dialog'

const createConfirm = useConfirm()

async function deleteConfirm(appFileId: number) {
  try {
    const isConfirmed = await createConfirm({title:'',
                                             content: 'Esta apunto de eliminar un documento. ¿Desea continuar?', 
                                             confirmationText: 'Aceptar', 
                                             cancellationText:'Cancelar', 
                                             cardProps:{width:500,
                                                        prependIcon:'mdi-alert',
                                                        title:'Advertencia',
                                                        color:'white darken-4',
                                                        class:"mx-auto"
                                                      },
                                             confirmationButtonProps:{color:"black"},
                                            });

    if (isConfirmed){
      deleteFile(appFileId);
    }
    
  }
  catch {
    
  }
}

async function validationFileConfirm(reqFileId: number, validationFlag: string) {
  try {
    const content = ref('');
    if(validationFlag == 'N') {
      content.value = 'Esta apunto de rechazar un archivo. ¿Desea continuar?';
    }
    else {
      content.value = 'Esta apunto de validar un archivo. ¿Desea continuar?';
    }

    const isConfirmed = await createConfirm({title:'',
                                             content: content.value, 
                                             confirmationText: 'Aceptar', 
                                             cancellationText:'Cancelar', 
                                             cardProps:{width:500,
                                                        prependIcon:'mdi-alert',
                                                        title:'Advertencia',
                                                        color:'white darken-4',
                                                        class:"mx-auto"
                                                      },
                                             confirmationButtonProps:{color:"black"},
                                            });

    if (isConfirmed){
      saveFileValidation(reqFileId, validationFlag);
    }
    
  }
  catch {
    
  }
}



const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const props = withDefaults(
  defineProps<{
    typeId: number,
    requestId: number,
    activityId: number
  }>(),
  {}
)

const documentsType1 = ref([
  { id: 0, name: '-- Seleciona --' },
  { id: 1, name: 'Formato de Solicitud de Pagos Valorizados PM' },
  { id: 2, name: 'Formato SIVIPROF estatus terminado' },
  { id: 3, name: 'Orden de pago pensión PM' },
  { id: 4, name: 'Formato de alcances y adeudos' },
  { id: 5, name: 'Identificación oficial de cada beneficiario' },
  { id: 6, name: 'Pantalla de alta de acreedor' },
  { id: 9, name: 'INE de empleado de recolección de cheque' }
]);

const documentsType2 = ref([
  { id: 0, name: '-- Seleciona --' },
  { id: 1, name: 'Formato de Solicitud de Pagos Valorizados PM' },
  { id: 2, name: 'Formato SIVIPROF estatus terminado' },
  { id: 5, name: 'Identificación oficial de cada beneficiario' },
  { id: 6, name: 'Pantalla de alta de acreedor' },
  { id: 8, name: 'Formato de Acreditación de Supervivencia de beneficiarios PM' },
  { id: 9, name: 'INE de empleado de recolección de cheque' }
]);

const fileService = new FileService();
const fileList: Ref<AppFile[]> = ref([]);
const file = ref([]);

defineExpose({fileList});

const appFile = ref({
  appFileId: 0,
  requestId: 0,
  reqFileId: 0,
  documentTypeId: 0,
  documentTypeName: '',
  key: '',
  description: '',
  name: '',
  path: '',
  extension: '',
  contentType: '',
  validationFlag: ''
});

function saveFile(){

  if(fileList.value.find(x => x.documentTypeId == appFile.value.documentTypeId)){
    //alert('Ya se agregó un documento de este tipo');
    notify({
      title: "Advertencia",
      text: "Ya se agregó un documento de este tipo.",
      type: 'warn',
      duration: 5000,
      speed: 1000
    });
    return;
  }
  
  var input : any| null | "";
  var file = "";
  input = document.getElementById("file");
  file = input.files[0];
  appFile.value.validationFlag="P"
  appFile.value.path = "tramite_"+props.requestId;
  appFile.value.name = input.files[0].name;

  fileService.savdFileRequest(props.requestId, appFile.value).then(() => {
    fileService.findFilesByRequest(props.requestId).then((response) => {
    fileList.value = response.data;
    appFile.value.documentTypeId=0;
    appFile.value.key='';
    
  });
  fileService.uploadFile(file, props.requestId, 1).then(() => {
    notify({
      title: "Exito",
      text: "Datos guardados correctamente.",
      type: 'success',
      duration: 5000,
      speed: 1000
    });
  });
  });
}


function downloadFile(fileName: string) {
  
  fileService.downloadFile(props.requestId,fileName).then((response) => {

    var fileURL = window.URL.createObjectURL(new Blob([response.data]));
    var fileLink = document.createElement('a');
    fileLink.href = fileURL;
    fileLink.setAttribute('download', fileName);
    document.body.appendChild(fileLink);
    fileLink.click();
  });
  
}

function saveFileValidation(reqFileId: number, validationFlag: string){
 fileService.updateFileRequestValidation(reqFileId, validationFlag).then(() => {
  notify({
      title: "Exito",
      text: "Datos guardados correctamente.",
      type: 'success',
      duration: 5000,
      speed: 1000
    });
    /*fileService.findFilesByRequest(props.requestId).then((response) => {
    fileList.value = response.data;
  }); */ 
  }); 
}

function deleteFile(appFileId: number){
 fileService.deleteFileRequest(appFileId).then(() => {
    fileService.findFilesByRequest(props.requestId).then((response) => {
    fileList.value = response.data;
    notify({
      title: "Exito",
      text: "Datos guardados correctamente.",
      type: 'success',
      duration: 5000,
      speed: 1000
    });
  }); 
  }); 
}

onBeforeMount(() => {
  fileService.findFilesByRequest(props.requestId).then((response) => {
    fileList.value = response.data
  });
})
</script>

<template>
  <div v-if="user.perfil.id==1" class="w-50 ma-5" style="max-width: 500px">
    <form density="compact">
      <v-file-input
        accept="application/pdf"
        density="comfortable"
        clear-icon="mdi-close-circle"
        prepend-icon="mdi-paperclip"
        show-size
        clearable
        label="Documento"
        v-model="file"
        name="file"
        id="file"
      ></v-file-input>
      <v-text-field
        density="comfortable"
        clear-icon="mdi-close-circle"
        prepend-icon="mdi-file-key-outline"
        show-size
        clearable
        label="Folio"
        v-model="appFile.key"
      ></v-text-field>
      <v-select
        clearable
        label="Selecciona tipo de documento"
        density="comfortable"
        prepend-icon="mdi-file-document-outline"
        :items="props.typeId == 1 ? documentsType1 : documentsType2"
        v-model="appFile.documentTypeId"
        item-title="name"
        item-value="id"
      ></v-select>
      <v-btn
        density="compact"
        prepend-icon="mdi-plus"
        class="me-4 ml-10"
        color="blue-darken-2"
        @click="saveFile()"
      >
        Agregar
      </v-btn>
    </form>
  </div>

  <v-divider />

  <div class="w-50 ma-5">
    <v-list border density="compact" lines="two">
      <template v-for="item in fileList" :key="item.appFileId" >
        <v-list-item  class="my-2">
        <v-list-item-title>
          <strong>{{item.documentTypeName}}</strong>
        </v-list-item-title>
        <v-list-item-subtitle>
          <strong v-if="item.key">Folio: {{item.key}}</strong>
        </v-list-item-subtitle>
        <template v-if="user.perfil.id==2" v-slot:prepend>
          <v-icon v-if="item.validationFlag=='S'" icon="mdi-check-bold" color="success" />
          <v-icon v-if="item.validationFlag=='P'" icon="mdi-information-outline" color="warning" />
          <v-icon v-if="item.validationFlag=='N'" icon="mdi-close-thick" color="error" />
        </template>
        <template v-slot:append>
          <v-btn-group density="comfortable">
            <v-btn @click="downloadFile(item.name)" color="blue-darken-2" icon="mdi-tray-arrow-down"></v-btn>
            <v-btn v-if="activityId==1" @click="deleteConfirm(item.appFileId)/*deleteFile()*/"  color="blue-grey-lighten-5" icon="mdi-delete"></v-btn>
            <v-btn v-if="activityId==2" @click="validationFileConfirm(item.reqFileId, 'S');item.validationFlag='S';" color="success" icon="mdi-check-bold"></v-btn>
            <v-btn v-if="activityId==2" @click="validationFileConfirm(item.reqFileId, 'N');item.validationFlag='N';" color="error" icon="mdi-close-thick"></v-btn>
          </v-btn-group>
        </template>
      </v-list-item>
      <v-divider />
      </template>
    </v-list>
  </div>
</template>
