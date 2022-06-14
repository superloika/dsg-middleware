import Vue from 'vue';
import AppStore from './AppStore';


const state = Vue.observable({
    invoices: {},
    isLoadingInvoices: false,
    tableHeader: [
        { text: "Status", value: "status" },
        { text: "Principal", value: "principals_name" },
        { text: "Uploaded", value: "created_at" },
        { text: "Type", value: "doc_type" },
        { text: "Document #", value: "doc_no" },
        { text: "Customer Code", value: "customer_code" },
        { text: "Posting Date", value: "posting_date" },
        { text: "Item Code", value: "item_code" },
        { text: "Quantity", value: "quantity" },
        { text: "u1", value: "u1" },
        { text: "u2", value: "u2" },
        { text: "Amount", value: "u3" },
        { text: "u4", value: "u4" },
        { text: "Salesman Code", value: "u5" },
        { text: "UOM", value: "uom" },
        { text: "Uploaded By", value: "username" },
    ],
})

const actions = {
    async initInvoices(searchKey='', principalCodeFilter='', invoiceStatus='', row_count=10) {
        try {
            state.isLoadingInvoices = true;
            if(searchKey==null) searchKey = '';
            const url = `${AppStore.state.siteUrl}invoices/all`
                + `?row_count=${row_count}`
                + `&search_key=${searchKey}`
                + `&principal_code=${principalCodeFilter}`
                + `&status=${invoiceStatus}`
                + `&page=${state.invoices.current_page ?? 1}`;
            const response = await axios.get(url);
            state.invoices = {};
            state.invoices = response.data;
        } catch (error) {
            console.log('initInvoices() - ERROR:', error);
        } finally {
            state.isLoadingInvoices = false;
        }
    }
}


export default {
    state,
    ...actions,
}