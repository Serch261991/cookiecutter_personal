<script setup lang="ts">
import { ref } from 'vue'

import {useAuthStore} from "../stores/index";

// const schema = Yup.object().shape({
//     username: Yup.string().required('Username is required'),
//     password: Yup.string().required('Password is required')
// });

const username = ref('');
const password = ref('');

async function onSubmit() {
    const authStore = useAuthStore();
    //const { username, password } = values;
    await authStore.login(username.value, password.value);
}
</script>

<template>
    <v-app id="inspire">
      <v-content>
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center" style="background-image:url('../assets/images/aguila_pemex.png') background-position: center;background-size: cover; height: auto;" >
            <v-col cols="12" sm="8" md="10" style="padding-top: 9%;">
              <v-card class="elevation-12">
                <v-window>
                  <v-window-item :value="1">
                    <v-row>
                      <v-col cols="12" md="8">
                        <v-card-text class="mt-12">
                          <div class="text-center mt-4">
                            <img src="../assets/images/logo_ch.png" style="width:40%;height:50%" />
                          </div>
                          <v-card-text>
                          </v-card-text>
                          <h1 class="text-center display-2 teal--text text--accent-3">Ajuste de Pagos PostMortem</h1>
                          <v-card-text>
                          </v-card-text>
                          <h4 class="text-center mt-4">Ingrese ficha y contraseña</h4>
                          <v-card-text>
                          </v-card-text>
                          <v-row align="center" justify="center">
                            <v-col cols="6" md="6">
                              <v-form>
                              <v-text-field type="number" id="username" label="Ficha" v-model="username" color="teal accent-3"/>
                              <v-text-field type="password" id="password" label="Contraseña" v-model="password" color="teal accent-3"/>
                            </v-form>
                            </v-col>
                          </v-row>
                        </v-card-text>
                        <div class="text-center mt-3">
                          <v-btn rounded color="teal accent-3" dark type="submit" @click="onSubmit()" style="background-color: #9e2244!important; border: #9e2244!important;">Iniciar sesión</v-btn>
                        </div>
                        <v-card-text>
                        </v-card-text>
                      </v-col>
                      <v-col cols="12" md="4" class="teal accent-3">
                        <img src="../assets/images/torre.jpg" style="width:100%;height:100%" />
                      </v-col>
                    </v-row>
                  </v-window-item>
                </v-window>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-content>
    </v-app>
</template>


<!-- /*import store from "../stores";
export default {
  
  name: "LoginView",
  components: {
  },
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
    }
  },
  computed: {
    loggedIn() {
      return store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/main");
    }
  },
  methods: {
    login() {
      store.dispatch("auth/login", this.form.username, this.form.password).then(
        (r:any) => {
          if(this.form.password!="Pmx1")
          {
            alert("Usuario no autorizado");
            return;
          }
          if(r ==false)
            {
              alert("Usuario no autorizado")
            }
            else {
              this.$router.push("/main");
            }
        },
        (error:any) => {
          console.log(error);
        }
      );
    },
  },
};*/

/*
import { SET_AUTHENTICATION, SET_USERNAME } from "../stores/storeconstants";
import store from '../stores/index'

export default {
  name: 'LoginView',
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      output: "",
    }
  },
  setup() {
    return {
      results: store.state.interResults
    }
  },
  methods: {
    login() {
      //make sure username OR password are not empty
      if (this.form.username != "" || this.form.username != "") {
        this.output = "Authentication complete"

        //stores true to the set_authentication and username to the set_username 
        store.commit(`auth/${SET_AUTHENTICATION}`, true);
        store.commit(`auth/${SET_USERNAME}`, this.form.username);
        store.dispatch("auth/login", this.form.username).then(
        () => {
          this.$router.push("/main");
        },
        (error:any) => {
          
          console.log("Error: " + error.toString());
        });
      } else {
        store.commit(`auth/${SET_AUTHENTICATION}`, false);
        this.output = "Username and password can not be empty"
      }},
  },


}*/ -->
