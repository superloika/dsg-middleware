import Vue from "vue";
import gspi from './gspi';

const state = Vue.observable({

    // // templated data table header
    // generatedDataTableHeader: [
    //     [
    //         {text:"Invoice #", value: "invoice_no"},
    //         {text:"Customer Code", value: "customer_code"},
    //         {text:"Customer Name", value: "customer_name"},
    //         {text:"Invoice Date (m/d/y)", value: "invoice_date"},
    //         {text:"Item Code (NAV)", value: "alturas_item_code"},
    //         {text:"Item Code (Supplier)", value: "item_code"},
    //         {text:"Item Name (NAV)", value: "item_description"},
    //         {text:"Item Name (Supplier)", value: "description_supplier"},
    //         {text:"UOM", value: "uom"},
    //         {text:"Quantity", value: "quantity"},
    //         {text:"Price", value: "price"},
    //         {text:"Amount", value: "amount"},
    //         {text:"Salesman", value: "sm_code"},
    //         {text:"Group", value: "group"}
    //     ],
    // ],

    // // ***********************************************************************************
    // generatedDataHistoryFilters: [
    //     [
    //         {text: 'System Date', value: 'system_date'},
    //         {text: 'Item Code', value: 'item_code'},
    //         {text: 'Customer Code', value: 'customer_code'},
    //         {text: 'Source Group', value: 'group_code'},
    //     ]
    // ],

    ...gspi.state
});


const actions = {

};

export default {
    state,
    ...actions
};