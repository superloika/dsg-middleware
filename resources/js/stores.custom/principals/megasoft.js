import Vue from "vue";

const state = Vue.observable({
    customersTableHeader: [
        [
            { text: "Customer Code", value: "customer_code" },
            { text: "Name", value: "customer_name" },
            { text: "Address", value: "address" },
            { text: "Principal Customer Code", value: "customer_code_supplier" },
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
            {text:"Distributor ID", value: "distributor_id"},
            {text:"Salesman", value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},
            {text:"Docno", value: "doc_no"},
            {text:"Location", value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},
            {text:"Ordered Date", value: "order_date"},
            {text:"Request Delivery Date", value: "request_delivery_date"},
            {text:"Payment Term", value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},
            {text:"Account Code", value: "customer_code"},
            {text:"Product Code", value: "item_code"},
            {text:"Bulk Qty", value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},
            {text:"Loose Qty", value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},
            {text:"System Date", value: "system_date"},
            {text:"User", value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},
        ],
        [
            {text:"Distributor ID", value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},
            {text:"Sales Agent ID", value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},
            {text:"Invoice No (Doc No)", value: "doc_no"},
            {text:"Location", value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},
            {text:"Invoice Date", value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},
            {text:"Payment Term Code", value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},
            {text:"Customer No", value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},
            {text:"Product Code", value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},
            {text:"Bulk Qty", value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},
            {text:"Loose Qty", value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},
            {text:"System Date", value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},
            {text:"Default User", value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},
            {text:"Invoice No", value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},
            {text:"Expiry Date", value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},
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
            {text: 'Order Date', value: 'order_date'},
            {text: 'Route Code', value: 'route_code'},
            {text: 'Item Code', value: 'item_code'},
            {text: 'Customer Code', value: 'customer_code'},
        ]
    ],
    generatedDataDBTableColumns: [
        // common
        'id',
        'generated_at',
        'uploaded_by',
        'doc_no',
        // principal template
        'distributor_id',
        'sales_agent_id',
        'invoice_no',
        'location',
        'invoice_date',
        'payment_term_code',
        'bulk_qty',
        'loose_qty',
        'system_date',
        'default_user',
        'expiry_date',
        'request_delivery_date',
    ],
});


const actions = {
};

export default {
    state,
    // ...actions
};
