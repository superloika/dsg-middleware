// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'


Vue.use(Vuetify)

const opts = {
    theme: {
        light: true,
        variations: false,

    },
}

export default new Vuetify(opts)
