import Vue from 'vue';
import AppStore from './AppStore';


const state = Vue.observable({
    principals: [],
    isLoadingPrincipals: false,
    isImportDialogOpen: false,
})

const actions = {
    async initPrincipals() {
        try {
            state.isLoadingPrincipals = true;
            const url = `${AppStore.state.siteUrl}master/principals/all`;
            const response = await axios.get(url);
            state.principals = [];
            state.principals = response.data;
            state.isLoadingPrincipals = false;
        } catch (error) {
            console.log('MasterPrincipals_initPrincipals() - ERROR:', error);
        }
    }
}


export default {
    state,
    ...actions,
}
