import Vue from "vue";

const state = Vue.observable({
    // customersTableHeader: [
    //     [
    //         { text: "Customer Code", value: "customer_code" },
    //         { text: "Customer Code (Supplier)", value: "customer_code_supplier" },
    //         { text: "Name", value: "customer_name" },
    //     ],
    // ],
    itemsTableHeader: [
        [
            {text:"Item Code", value:"item_code"},
            {text:"Item Code (Supplier)", value:"item_code_supplier"},
            {text:"Description (Nav)", value:"description"},
        ]
    ],
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
            {text:"Invoice Date (d/m/Y)", value: "invoice_date"},
            {text:"Item Code (NAV)", value: "alturas_item_code"},
            {text:"Item Code (Supplier)", value: "item_code"},
            {text:"Item Name (NAV)", value: "item_description"},
            {text:"Item Name (Supplier)", value: "description_supplier"},
            {text:"UOM", value: "uom"},
            {text:"Quantity", value: "quantity"},
            {text:"Price", value: "price"},
            {text:"Amount", value: "amount"},
            {text:"Salesman", value: "sm_code"},
            {text:"Group", value: "group"}
        ],
        [
            {text:"CM #", value: "invoice_no"},
            {text:"Customer Code", value: "customer_code"},
            {text:"Customer Name", value: "customer_name"},
            {text:"Invoice Date (d/m/Y)", value: "invoice_date"},
            {text:"Item Code (NAV)", value: "alturas_item_code"},
            {text:"Item Code (Supplier)", value: "item_code"},
            {text:"Item Name (NAV)", value: "item_description"},
            {text:"Item Name (Supplier)", value: "description_supplier"},
            {text:"UOM", value: "uom"},
            {text:"Quantity", value: "quantity"},
            {text:"Price", value: "price"},
            {text:"Amount", value: "amount"},
            {text:"Salesman", value: "sm_code"},
            {text:"Group", value: "group"},
            {text:"Invoice Reference #", value: "invoice_doc_no"},
            {text:"Remarks", value: "remarks"}
        ],
    ],

    // ***********************************************************************************
    generatedDataHistoryFilters: [
        [
            {text: 'System Date', value: 'system_date'},
            {text: 'Item Code', value: 'item_code'},
            {text: 'Customer Code', value: 'customer_code'},
            {text: 'Invoice #', value: 'doc_no'},
            {text: 'Source Group', value: 'group_code'},
        ]
    ],

    // misc
    posting_date_format: 'd/m/Y',

});


const actions = {
};

export default {
    state,
    // ...actions
};
