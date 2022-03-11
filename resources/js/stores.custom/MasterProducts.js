import Vue from 'vue';
import AppStore from './AppStore';


const state = Vue.observable({
    products: [],
    isLoadingProducts: false,
    isImportDialogOpen: false,
})

const actions = {
    async initProducts() {
        try {
            state.isLoadingProducts = true;
            const url = `${AppStore.state.siteUrl}master/products/all`;
            const response = await axios.get(url);
            state.products = [];
            state.products = response.data;
            state.isLoadingProducts = false;
        } catch (error) {
            console.log('MasterProducts_initProducts() - ERROR:', error);
        }
    }
}


export default {
    state,
    ...actions,
}
