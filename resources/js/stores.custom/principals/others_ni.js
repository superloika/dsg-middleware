import Vue from "vue";

const state = Vue.observable({
    // customersTableHeader: [
    //     [
    //         { text: "Customer Code", value: "customer_code" },
    //         { text: "Customer Code (Supplier)", value: "customer_code_supplier" },
    //         { text: "Name", value: "customer_name" },
    //     ],
    // ],
    // itemsTableHeader: [
    //     [
    //         {text:"Item Code", value:"item_code"},
    //         {text:"Item Code (Supplier)", value:"item_code_supplier"},
    //         {text:"Description (Supplier)", value:"description_supplier"},
    //     ]
    // ],
    // salesmenTableHeader: [
    //     [
    //         {text:"Group Code", value:"group_code"},
    //         {text:"Salesman Name", value:"sm_name"},
    //     ]
    // ],

    // templated data table header
    generatedDataTableHeader: [
        [
            {text:"Invoice #", value: "invoice_no"},
            {text:"Customer Code", value: "customer_code"},
            {text:"Customer Name", value: "customer_name"},
            {text:"Invoice Date (M/D/Y)", value: "invoice_date"},
            {text:"Item Code (NAV)", value: "alturas_item_code"},
            {text:"Item Code (Supplier)", value: "item_code"},
            {text:"Item Name (NAV)", value: "item_description"},
            {text:"Item Name (Supplier)", value: "description_supplier"},
            {text:"UOM", value: "uom"},
            {text:"Quantity", value: "quantity"},
            {text:"Price", value: "price"},
            {text:"Amount", value: "amount"},
            {text:"Salesman", value: "sm_name"},
            {text:"Group", value: "group"}
        ],
    ],

    // ***********************************************************************************
    generatedDataHistoryFilters: [
        [
            {text: 'Vendor Code', value: 'vendor_code'},
        ]
    ],

});


const actions = {
};

export default {
    state,
    // ...actions
};
