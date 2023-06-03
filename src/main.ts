import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { createPinia } from 'pinia';
import { loadFonts } from './plugins/webfontloader'
import { fakeBackend } from './helpers';
import Notifications from '@kyvg/vue3-notification'
import VuetifyUseDialog from 'vuetify-use-dialog'

fakeBackend();

loadFonts()
  
  createApp(App)
  .use(router)
  .use(vuetify)
  .use(createPinia())
  .use(Notifications)
  .use(VuetifyUseDialog)
  .mount('#app')