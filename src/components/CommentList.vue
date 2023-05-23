<template>
    <div class="w-50 ma-5" style="max-width: 500px;">
        <form @submit.prevent density="compact">
    <v-textarea
    rows="3"
    clearable
    label="Comentario"
    prepend-icon="mdi-comment"
    clear-icon="mdi-close-circle">
    </v-textarea>
    <v-btn
    prepend-icon="mdi-plus"
      class="me-4 ml-10"
      type="submit"
    >
      Agregar
    </v-btn>
  </form>
    </div>
    
    <v-divider inset/>

    <v-list
    density="compact"
      lines="two">
      <v-list-item class="my-2" prepend-avatar="https://cutewallpaper.org/24/profile-icon-png/profile-user-svg-png-icon-free-download-24787-onlinewebfontscom.png">
        <v-list-item-subtitle>
            <strong>609089 - Sergio Iván agregó un comentario el 26/03/2023 18:00</strong>
        </v-list-item-subtitle>
        
            Se envía para revisión
        
      </v-list-item>
      <v-divider inset/>
      <v-list-item class="my-2" prepend-avatar="https://cutewallpaper.org/24/profile-icon-png/profile-user-svg-png-icon-free-download-24787-onlinewebfontscom.png">
        <v-list-item-subtitle>
            <strong>602290 - Luis Mario agregó un comentario el 26/03/2023 18:00</strong>
        </v-list-item-subtitle>

            Validado para generación de pagos
       
      </v-list-item>
    </v-list>
</template>