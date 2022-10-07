import Vue from "vue";

const state = Vue.observable({
    customersTableHeader: [
        [
            { text: "Customer Code", value: "customer_code" },
            { text: "Salesman Name", value: "salesman_name" },
            { text: "Customer Name", value: "customer_name" },
        ],
    ],
    itemsTableHeader: [
        [
            {text:"Supplier Item Code", value:"item_code_supplier"},
            {text:"Supplier Item Description", value:"description_supplier"},
            {text:"Item Code", value:"item_code"},
            {text:"Description", value:"description"}
        ]
    ],

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
            {text:"Group", value: "group"},
        ],
    ],

    // ***********************************************************************************
    generatedDataHistoryFilters: [
        [
            {text: 'System Date', value: 'system_date'},
            {text: 'Invoice #', value: 'doc_no'},
            {text: 'Posting Date', value: 'posting_date'},
            {text: 'Source Group', value: 'group_code'},
        ]
    ],
});


const actions = {
};

export default {
    state,
    // ...actions
};
