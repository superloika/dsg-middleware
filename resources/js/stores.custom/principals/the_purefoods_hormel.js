import Vue from "vue";
// import AppStore from '../AppStore';

const state = Vue.observable({
    // strict_export: true,
    // beatroute_uploading: true,
    bu: 'ppfb',

    // principal masterfiles
    itemsTableHeader: [
        [
            {text:"Material Code",              value:"item_code_supplier"},
            {text:"Item Code",                  value:"item_code"},
            {text:"Supplier Item Description",  value:"description_supplier"},
            {text:"PCS/CASE",                   value:"conversion_qty"},
            {text:"CASE Price",                 value:"uom_price"},
            {text:"PCS Price",                  value:"conversion_uom_price"},
            {text:"UOM",                        value:"uom"},
            {text:"Conversion UOM",             value:"conversion_uom"},
        ]
    ],
    customersTableHeader: [
        [
            { text: "Customer Code (Supplier)", value: "customer_code_supplier" },
            { text: "Customer Code",            value: "customer_code" },
            { text: "Customer Name",            value: "customer_name" },
        ],
    ],

    // templated data table header
    generatedDataTableHeader: [
        [
            {text:"Invoice #",                  value: "invoice_no"},
            {text:"External Invoice #",         value: "invoice_number"},
            {text:"Customer Code (NAV)",        value: "alturas_customer_code"},
            {text:"Customer Code",              value: "customer_code"},
            {text:"Customer Name",              value: "customer_name"},
            {text:"Invoice Date (m/d/Y) (NAV)", value: "invoice_date"},
            {text:"Item Code (NAV)",            value: "alturas_item_code"},
            {text:"Item Code",                  value: "item_code"},
            {text:"Item Name (NAV)",            value: "item_description"},
            {text:"Item Name",                  value: "description_supplier"},
            {text:"UOM (NAV)",                  value: "uom"},
            {text:"UOM",                        value: "uom_supplier"},
            {text:"Quantity",                   value: "quantity"},
            {text:"Price (NAV)",                value: "price"},
            {text:"Price",                      value: "price_supplier"},
            {text:"Amount (NAV)",               value: "amount"},
            {text:"Amount",                     value: "amount_supplier"},
            // {text:"Line Discount %",            value: "discount_percentage"},
            // {text:"Discount Amount",            value: "discount_value"},
            {text:"Salesman",                   value: "sm_code"},
            {text:"Group",                      value: "group"}
        ],
        [
            {text:"Return Invoice #",           value: "invoice_no"},
            {text:"External Return Invoice #",  value: "invoice_number"},
            {text:"Customer Code (NAV)",        value: "alturas_customer_code"},
            {text:"Customer Code",              value: "customer_code"},
            {text:"Customer Name",              value: "customer_name"},
            {text:"Return Invoice Date (m/d/Y) (NAV)",   value: "invoice_date"},
            {text:"Item Code (NAV)",            value: "alturas_item_code"},
            {text:"Item Code",                  value: "item_code"},
            {text:"Item Name (NAV)",            value: "item_description"},
            {text:"Item Name",                  value: "description_supplier"},
            {text:"UOM (NAV)",                  value: "uom"},
            {text:"UOM",                        value: "uom_supplier"},
            {text:"Quantity",                   value: "quantity"},
            {text:"Price (NAV)",                value: "price"},
            {text:"Price",                      value: "price_supplier"},
            {text:"Amount (NAV)",               value: "amount"},
            {text:"Amount",                     value: "amount_supplier"},
            // {text:"Line Discount %",            value: "discount_percentage"},
            // {text:"Discount Amount",            value: "discount_value"},
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
            {text: 'System Date',   value: 'system_date'},
            {text: 'Posting Date',  value: 'posting_date'},
            {text: 'Item Code',     value: 'item_code'},
            {text: 'Customer Code', value: 'customer_code'},
            {text: 'Source Group',  value: 'group_code'},
            {text: 'Invoice #',     value: 'doc_no'},
        ]
    ],

    // misc
    posting_date_format: 'm/d/Y',

});


const actions = {

};

export default {
    state,
    ...actions
};
