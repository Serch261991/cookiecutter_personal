import { defineStore } from 'pinia';

import { fetchWrapper } from "../helpers";
import router from "../router/index";
import { useAlertStore } from "../stores/alert.store.js";

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),
    actions: {
        async login(username, password) {
            try {
                console.log(username)
                console.log(password)
                if(password == "Pmx1") {
                    const user = await fetchWrapper.post(`${baseUrl}/authenticate`, { username, password });    

                    // update pinia state
                    this.user = user;

                    // store user details and jwt in local storage to keep user logged in between page refreshes
                    localStorage.setItem('user', JSON.stringify(this.user));

                    // redirect to previous url or default to home page
                    router.push(this.returnUrl || '/main');
                }
            } catch (error) {
                alert("Usuario no autorizado");
                const alertStore = useAlertStore();
                alertStore.error(error);                
            }
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push('/');
        }
    }
});
