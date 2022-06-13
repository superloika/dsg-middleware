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
            {text:"PCS per CASE", value:"conversion_qty"},
        ]
    ],

    // templated data table header
    generatedDataTableHeader: [
        [
            {text:"Distributor ID", value: "distributor_id"},
            {text:"Salesman", value: "sales_agent_id"},
            {text:"Docno", value: "doc_no"},
            {text:"Location", value: "location"},
            {text:"Ordered Date", value: "order_date"},
            {text:"Request Delivery Date", value: "request_delivery_date"},
            {text:"Payment Term", value: "payment_term_code"},
            {text:"Account Code", value: "customer_code"},
            {text:"Product Code", value: "item_code"},
            {text:"Bulk Qty", value: "bulk_qty"},
            {text:"Loose Qty", value: "loose_qty"},
            {text:"System Date", value: "system_date"},
            {text:"User", value: "default_user"},
        ],
        [
            {text:"Distributor ID", value: "distributor_id"},
            {text:"Sales Agent ID", value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},
            {text:"Invoice No (Doc No)", value: "doc_no"},
            {text:"Location", value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},
            {text:"Invoice Date", value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},
            {text:"Payment Term Code", value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},
            {text:"Customer No", value: "customer_code"},
            {text:"Product Code", value: "item_code"},
            {text:"Bulk Qty", value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},
            {text:"Loose Qty", value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},
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
    generatedDataDBTableColumns: [
        // common
        'id',
        'generated_at',
        'uploaded_by',
        'doc_no',
        'item_code',
        'customer_code',
        // principal template
        'distributor_id',
        'sales_agent_id', // salesman code
        'invoice_no',
        'location',
        'invoice_date',
        'payment_term_code',
        'bulk_qty',
        'loose_qty',
        'default_user',
        'system_date',
        'expiry_date',
        'order_date',
        'request_delivery_date',
    ],
    generatedDataHistoryFilters: [
        [
            {text: 'Order Date', value: 'order_date'},
            {text: 'Document #', value: 'doc_no'},
            {text: 'Product Code', value: 'item_code'},
            {text: 'Account Code', value: 'customer_code'},
            {text: 'Salesman', value: 'sales_agent_id'},
            {text: 'Location', value: 'location'},
            {text: 'Invoice Posting Date', value: 'invoice_date'},
        ]
    ],
});


const actions = {
};

export default {
    state,
    // ...actions
};
