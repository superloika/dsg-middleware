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
            // {text:"Item Name (Supplier)", value: "description_supplier"},
            {text:"UOM", value: "uom"},
            {text:"Quantity", value: "quantity"},
            {text:"Price", value: "price"},
            {text:"Amount", value: "amount"},
            {text:"Salesman", value: "sm_code"},
            {text:"Group", value: "group"}
        ],
        [
            {text:"Return Invoice #",           value: "invoice_no"},
            // {text:"External Return Invoice #",  value: "invoice_number"},
            {text:"Customer Code (NAV)",        value: "alturas_customer_code"},
            // {text:"Customer Code (Supplier)",   value: "customer_code"},
            {text:"Customer Name",              value: "customer_name"},
            {text:"Return Invoice Date (m/d/Y) (NAV)",   value: "invoice_date"},
            {text:"Item Code (NAV)",            value: "alturas_item_code"},
            {text:"Item Code (Supplier)",       value: "item_code"},
            {text:"Item Name (NAV)",            value: "item_description"},
            // {text:"Item Name (Supplier)",       value: "description_supplier"},
            {text:"UOM",                        value: "uom"},
            // {text:"UOM",                        value: "uom_supplier"},
            {text:"Quantity",                   value: "quantity"},
            {text:"Price",                      value: "price"},
            // {text:"Price",                      value: "price_supplier"},
            {text:"Amount",                     value: "amount"},
            // {text:"Amount",                     value: "amount_supplier"},
            {text:"Line Discount %",            value: "discount_percentage"},
            {text:"Discount Amount",            value: "discount_amount"},
            {text:"Salesman",                   value: "sm_code"},
            {text:"Group",                      value: "group"},
            // additional return stuff
            {text:"Return Indicator",           value: "return_indicator"},
            {text:"Return Reason",              value: "remarks"},
            {text:"Invoice Reference #",        value: "invoice_doc_no"},
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

});


const actions = {
};

export default {
    state,
    // ...actions
};
