import Vue from 'vue';
import AppStore from './AppStore';


const state = Vue.observable({
    principals: [],
    isLoadingPrincipals: false,
    // isImportDialogOpen: false,
    tableHeader: [
        { text: "Principal Name", value: "name" },
        { text: "Vendor Code", value: "vendor_code" },
        { text: "Middleware Code", value: "code" },
        { text: "Template Variation Count", value: "template_variation_count" },
        { text: "Main Vendor", value: "main_vendor_code" },
    ],
})

const actions = {
    async initPrincipals() {
        try {
            state.isLoadingPrincipals = true;
            const url = `${AppStore.state.siteUrl}master/principals/all`;
            const response = await axios.get(url);
            state.principals = [];
            state.principals = response.data;
        } catch (error) {
            console.log('MasterPrincipals_initPrincipals() - ERROR:', error);
        } finally {
            state.isLoadingPrincipals = false;
        }
    }
}


export default {
    state,
    ...actions,
}
