import Vue from "vue";
import century_canning from "./century_canning";

const state = Vue.observable({
    // // customersTableHeader: [
    // //     [
    // //         { text: "Customer Code", value: "customer_code" },
    // //         { text: "Principal Customer Code", value: "customer_code_supplier" },
    // //     ],
    // // ],
    // itemsTableHeader: [
    //     [
    //         {text:"Item Code", value:"item_code"},
    //         // {text:"Description", value:"description"},
    //         {text:"Supplier Item Code", value:"item_code_supplier"},
    //         {text:"Supplier Item Description", value:"description_supplier"},
    //         // {text:"CASE", value:"case"},
    //         // {text:"PCS", value:"conversion_qty"},
    //     ]
    // ],
    // salesmenTableHeader: [
    //     [
    //         {text:"Group Code", value:"group_code"},
    //         {text:"Salesman Code - NOAH", value:"sm_code_supplier"},
    //         {text:"Location Code - NOAH", value:"location_code_supplier"},
    //     ]
    // ],

    // // templated data table header(s)
    // generatedDataTableHeader: [
    //     [
    //         {text:"Distributor ID", value: "distributor_id"},
    //         {text:"Salesman", value: "sales_agent_id"},
    //         {text:"Docno", value: "doc_no"},
    //         {text:"Location", value: "location"},
    //         {text:"Ordered Date", value: "order_date"},
    //         {text:"Request Delivery Date", value: "request_delivery_date"},
    //         {text:"Payment Term", value: "payment_term_code"},
    //         {text:"Account Code", value: "customer_code"},
    //         {text:"Product Code", value: "item_code"},
    //         {text:"Bulk Qty", value: "bulk_qty"},
    //         {text:"Loose Qty", value: "loose_qty"},
    //         {text:"System Date", value: "system_date"},
    //         {text:"User", value: "default_user"},
    //     ],
    //     // [
    //     //     {text:"Distributor ID", value: "distributor_id"},
    //     //     {text:"Sales Agent ID", value: "sales_agent_id"},
    //     //     {text:"Invoice No (Doc No)", value: "doc_no"},
    //     //     {text:"Location", value: "location"},
    //     //     {text:"Invoice Date", value: "invoice_date"},
    //     //     {text:"Payment Term Code", value: "payment_term_code"},
    //     //     {text:"Customer No", value: "customer_code"},
    //     //     {text:"Product Code", value: "item_code"},
    //     //     {text:"Bulk Qty", value: "bulk_qty"},
    //     //     {text:"Loose Qty", value: "loose_qty"},
    //     //     {text:"System Date", value: "system_date"},
    //     //     {text:"Default User", value: "default_user"},
    //     //     {text:"Invoice No", value: "invoice_no"},
    //     //     {text:"Expiry Date", value: "expiry_date"},
    //     // ],
    // ],

    // generatedDataHistoryFilters: [
    //     [
    //         {text: 'Order Date', value: 'order_date'},
    //         {text: 'Invoice #', value: 'doc_no'},
    //         {text: 'Product Code', value: 'item_code'},
    //         {text: 'Customer Code', value: 'customer_code'},
    //         {text: 'Salesman', value: 'sm_code_supplier'},
    //         {text: 'Location', value: 'location'},
    //         {text: 'Invoice Posting Date', value: 'posting_date'},
    //         {text: 'Source Group', value: 'group_code'},
    //     ]
    // ],

    ...century_canning.state

});


const actions = {
};

export default {
    state,
    // ...actions
};
