import Vue from 'vue';
import AppStore from './AppStore';


const state = Vue.observable({
    items: {},
    isLoadingItems: false,
    tableHeader: [
        { text: "Item Code", value: "item_code" },
        { text: "Item Description", value: "description" },
        { text: "Vendor Code", value: "vendor_code" },
        { text: "Vendor", value: "principal_name" },
    ],
})

const actions = {
    async initItems(searchKey='', row_count=10) {
        try {
            state.isLoadingItems = true;
            if(searchKey==null) searchKey = '';
            const url = `${AppStore.state.siteUrl}master/items/all`
                + `?row_count=${row_count}`
                + `&search_key=${searchKey}`
                + `&page=${state.items.current_page ?? 1}`;
            const response = await axios.get(url);
            state.items = {};
            state.items = response.data;
        } catch (error) {
            console.log('initItems() - ERROR:', error);
        } finally {
            state.isLoadingItems = false;
        }
    }
}


export default {
    state,
    ...actions,
}
