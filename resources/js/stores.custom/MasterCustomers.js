import Vue from 'vue';
import AppStore from './AppStore';


const state = Vue.observable({
    customers: {},
    // isLoadingCustomers: false,
})

const actions = {
    async initCustomers(searchKey='', row_count=10) {
        try {
            // state.isLoadingCustomers = true;
            AppStore.state.showTopLoading = true;
            if(searchKey==null) searchKey = '';
            const url = `${AppStore.state.siteUrl}master/customers/all`
                + `?row_count=${row_count}`
                + `&search_key=${searchKey}`
                + `&page=${state.customers.current_page ?? 1}`;
            const response = await axios.get(url);
            state.customers = {};
            state.customers = response.data;
            // state.isLoadingCustomers = false;
            AppStore.state.showTopLoading = false;
        } catch (error) {
            console.log('MasterCustomers_initCustomers() - ERROR:', error);
        }
    }
}


export default {
    state,
    ...actions,
}
