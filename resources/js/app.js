/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require("./bootstrap");

window.Vue = require("vue");

import Vue from "vue";
import vuetify from "./plugins/vuetify";
import router from "./router";

/**
 * Attach CsrfToken and AuthUser from the global window object
 * into Vue prototype so that it will be easily accessible inside a component template
 */
Vue.prototype.CsrfToken = window.CsrfToken;
Vue.prototype.AuthUser = window.AuthUser;

const storeFiles = require.context("./stores.custom", false, /\.js$/i);
try {
    storeFiles.keys().forEach(key => {
        const storeName = key.split("/").pop().split(".")[0];
        Vue.prototype[storeName] = storeFiles(key).default;
    });
} catch (error) {
    console.log('Custom Store Auto-require (ERROR): ', error);
}


/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

const files = require.context("./globals/", true, /\.vue$/i);
files.keys().forEach(key =>
    Vue.component(
        key.split("/").pop().split(".")[0],
        files(key).default
    )
);

// Vue.component('example-component', require('./components/ExampleComponent.vue').default);


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
const app = new Vue({
    vuetify,
    router,
    el: "#app",

    data() {
        return {
        };
    },

    created() {

    },

    mounted() {
        console.log(`%cApp mounted!`,
            'background:#222; color:#bada55; font-size:16px;');
        console.log("AUTH USER: ", window.AuthUser);
        console.log("APP URL: ", this.AppStore.state.siteUrl);
    }
});
