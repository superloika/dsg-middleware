// src/plugins/vuetify.js

import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

const opts = {
    theme: {
        light: true,
        variations: false,

        themes: {
            light: {
                primary: '#1976D2',
                error: '#FF5252',
                info: '#2196F3',
                success: '#4CAF50',
                primary: '#2fc900',
                accent: "#7dd663",
            },
        }
    }
};

export default new Vuetify(opts);
