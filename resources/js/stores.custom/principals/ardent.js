import Vue from "vue";
import gspi from './gspi';

const state = Vue.observable({
    ...gspi.state
});


const actions = {

};

export default {
    state,
    ...actions
};
