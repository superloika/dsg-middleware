import Vue from 'vue';
import AppStore from './AppStore';


const state = Vue.observable({
    products: {},
})

const actions = {
    async initProducts(searchKey='', row_count=10) {
        try {
            AppStore.state.showTopLoading = true;
            if(searchKey==null) searchKey = '';
            const url = `${AppStore.state.siteUrl}master/products/all`
                + `?row_count=${row_count}`
                + `&search_key=${searchKey}`
                + `&page=${state.products.current_page ?? 1}`;
            const response = await axios.get(url);
            state.products = {};
            state.products = response.data;
            AppStore.state.showTopLoading = false;
        } catch (error) {
            console.log('initProducts() - ERROR:', error);
        }
    }
}


export default {
    state,
    ...actions,
}
