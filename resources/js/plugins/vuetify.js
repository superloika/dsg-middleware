// src/plugins/vuetify.js

import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

const opts = {
    theme: {
        light: true,
        // dark: true,
        variations: false,

        themes: {
            light: {
                error: '#FF5252',
                info: '#2196F3',
                success: '#4CAF50',
                primary: '#2dba02',
                // primary: '#000000',
                accent: "#7dd663",
            },
            // light: {
            //     error: '#FF5252',
            //     info: '#2196F3',
            //     success: '#4CAF50',
            //     primary: '#ff5100',
            //     accent: "#ff8e59",
            // },
        }
    }
};

export default new Vuetify(opts);
