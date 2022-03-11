import Vue from 'vue';
import AppStore from './AppStore';


const state = Vue.observable({
    customers: [],
    isLoadingCustomers: false,
    isImportDialogOpen: false,
})

const actions = {
    async initCustomers() {
        try {
            state.isLoadingCustomers = true;
            const url = `${AppStore.state.siteUrl}master/customers/all`;
            const response = await axios.get(url);
            state.customers = [];
            state.customers = response.data;
            state.isLoadingCustomers = false;
        } catch (error) {
            console.log('MasterCustomers_initCustomers() - ERROR:', error);
        }
    }
}


export default {
    state,
    ...actions,
}
