import Vue from "vue";

const state = Vue.observable({
    customersTableHeader: [
        [
            { text: "Customer Code", value: "customer_code" },
            { text: "Name", value: "customer_name" },
            { text: "Address", value: "address" },
            // { text: "Principal Customer Code", value: "customer_code_supplier" },
        ],
    ],
    itemsTableHeader: [
        [
            {text:"Item Code", value:"item_code"},
            {text:"Description", value:"description"},
            {text:"Supplier Item Code", value:"item_code_supplier"},
            {text:"Supplier Item Description", value:"description_supplier"},
            {text:"UOM", value:"uom"},
            {text:"Conversion UOM", value:"conversion_uom"},
            {text:"Conversion Quantity", value:"conversion_qty"},
        ]
    ],

    // templated data table header
    generatedDataTableHeader: [
        [
            // {text:"Distributor ID", value: "distributor_id"},
            // {text:"Salesman", value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},
            {text:"Docno", value: "doc_no"},
            // {text:"Location", value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},
            {text:"Ordered Date", value: "order_date"},
            {text:"Request Delivery Date", value: "request_delivery_date"},
            // {text:"Payment Term", value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},
            {text:"Account Code", value: "customer_code"},
            {text:"Product Code", value: "item_code"},
            {text:"Bulk Qty", value: "bulk_qty"},
            {text:"Loose Qty", value: "loose_qty"},
            {text:"System Date", value: "system_date"},
            // {text:"User", value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},
        ],
    ],

    // transactions table header
    transactionsTableHeader: [
        [
            {text:"Upload Date", value:"updated_at"},
            {text:"Customer Code", value:"customer_code"},
            {text:"Account Name", value:"customer_name"},
            {text:"Sales Invoice", value:"doc_no"},
            {text:"Item Code", value:"item_code"},
            {text:"Description", value:"description"},
            {text:"UOM", value:"uom"},
            {text:"Quantity", value:"quantity"},
            {text:"Amount", value:"u3"},
        ]
    ],


    // ***********************************************************************************
    generatedDataHistoryFilters: [
        [
            {text: 'Generated Date', value: 'generated_at'},
            {text: 'Customer Code', value: 'customer_code'},
            {text: 'Item Code', value: 'item_code'},
        ]
    ],
    generatedDataDBTableColumns: [
        // common
        'id',
        'generated_at',
        'uploaded_by',
        'doc_no',
        // principal template
        'customer_code',
        'item_code',
        'bulk_qty',
        'loose_qty',
    ],
});


const actions = {
};

export default {
    state,
    // ...actions
};
