import { createStore } from 'vuex'
import auth from './auth/index'

export default createStore({
  state: {
    username:""
  },
  getters: {
  },
  mutations: {
    
  },
  actions: {
    login (state,username) {
      if(username == 94000953) {
        state.username = username;
        localStorage.setItem('username', username);
        alert('Logged in');
        return Promise.resolve(true);
      }
      else {
        return Promise.resolve(error);
      }
    },
    logout(state){
      state.username ="";
      localStorage.removeItem('username');
      alert('Logged out');
    },
    initialiseStore(state) {
      if(localStorage.getItem('username')){
        state.username = localStorage.getItem('username');
       }
    }
  },
  modules: {
    auth
  }
})