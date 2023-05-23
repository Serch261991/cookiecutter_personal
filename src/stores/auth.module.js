//import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('username'));
const password = JSON.parse(localStorage.getItem('password'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

  const initialState2 = password
  ? { status: { loggedIn: true }, password }
  : { status: { loggedIn: false }, password: null };

export const auth = {
  namespaced: true,
  state: initialState,
  state2: initialState2,
  actions: {
    login({ commit }, user, password) {
      console.log(user+','+password);
      if((user == 602290||user == 609089||user == 237496||user == 329785||user == 221963)/*&& password==="Pmx1"*/)
        return Promise.resolve(user);
      else
        return false;

      /*return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );*/
    },
    logout({ commit }) {
      //AuthService.logout();
      commit('logout');
    }
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    }
  }
};
