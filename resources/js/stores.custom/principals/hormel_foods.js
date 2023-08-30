import Vue from "vue";
import the_purefoods_hormel from "./the_purefoods_hormel";

const state = Vue.observable({
    ...the_purefoods_hormel.state
});


const actions = {

};


export default {
    state,
    ...actions
};
