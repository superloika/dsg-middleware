// THE CENTRAL STORE

import Vue from "vue";
import Vuex from "vuex";

import modules from "./modules";

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
    modules,
    state: {
        siteUrl: 'http://localhost:8000/',
        authUser: null,
        csrfToken: null,
    },
    actions: {

    },
    mutations: {
        SET_AUTH_USER(state) {
            try {
                let authUserMeta = window.document.querySelector('meta[name="auth-user"]');
                let parsedData = JSON.parse(authUserMeta.content);
                let type = 'admin';
                const {name,email,id, user_type} = parsedData;
                state.authUser = {name,email,id,user_type}
            } catch (error) {
                console.log('ERROR getting authenticated user details')
            }

        },
        SET_CSRF_TOKEN(state) {
            try {
                const csrfTokenMeta = window.document.querySelector('meta[name="csrf-token"]');
                state.csrfToken = csrfTokenMeta.content;
            } catch (error) {
                console.log('ERROR getting csrf_token')
            }
        },
    },
    getters: {
        getAuthUser(state) {
            return state.authUser;
        },
        getCsrfToken(state) {
            return state.csrfToken;
        },
        getSiteUrl(state) {
            return state.siteUrl;
        },
    },

    strict: debug
});
