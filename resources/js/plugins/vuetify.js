// src/plugins/vuetify.js

import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

const myCustomLightTheme = {
    dark: false,
    colors: {
        background: '#FFFFFF',
        surface: '#FFFFFF',
        primary: '#6200EE',
        'primary-darken-1': '#3700B3',
        secondary: '#03DAC6',
        'secondary-darken-1': '#018786',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
    },
}

const opts = {
    theme: {
        // defaultTheme: 'myCustomLightTheme',
        light: true,
        // dark: true,
        // variations: true,

        options: {
            customProperties: true,
        },

        sizes: {
            // xs: 24,
            // sm: 32,
            // md: 48,
            // lg: 64,
            xs: 16,
            sm: 24,
            md: 36,
            lg: 48,
        },

        themes: {
            light: {
                error: '#FF5252',
                info: '#2196F3',
                success: '#4CAF50',
                // primary: '#2dba02',
                primary: '#6200EA',
                // accent: "#7dd663",
                accent: "#7C4DFF",
            },
            // light: {
            //     error: '#FF5252',
            //     info: '#2196F3',
            //     success: '#4CAF50',
            //     primary: '#ff5100',
            //     accent: "#ff8e59",
            // },
            dark: {
                primary: '#BA68C8',
            },
            myCustomLightTheme,
        }
    }
};

export default new Vuetify(opts);
