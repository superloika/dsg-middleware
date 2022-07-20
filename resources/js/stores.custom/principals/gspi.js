import Vue from "vue";

const state = Vue.observable({
    customersTableHeader: [
        [
            { text: "Customer Code",   value: "customer_code" },
            { text: "Name",            value: "customer_name" },
            { text: "Barangay",        value: "address_1" },
            { text: "Town",            value: "address_2" },
            { text: "Province",        value: "address_3" },
        ],
    ],
    itemsTableHeader: [
        [
            {text:"Item Code", value:"item_code"},
            {text:"Item Code (Supplier)", value:"item_code_supplier"},
            {text:"Description (Supplier)", value:"description_supplier"},
            {text:"Description", value:"description"},
            {text:"Price in PCS", value:"conversion_uom_price"},
            {text:"Price in CASE", value:"uom_price"},
        ]
    ],
    salesmenTableHeader: [
        [
            {text:"Salesman Code", value:"sm_code"},
            {text:"Salesman Contact", value:"sm_contact_no"},
            {text:"Division", value:"division"},
            {text:"Salesman Name", value:"sm_name"},
            {text:"Supervisor Contact", value:"supervisor_contact_no"},
            {text:"Supervisor", value:"supervisor_name"},
        ]
    ],

    // templated data table header(s)
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
        // [
        //     {text:"Distributor ID", value: "distributor_id"},
        //     {text:"Sales Agent ID", value: "sales_agent_id"},
        //     {text:"Invoice No (Doc No)", value: "doc_no"},
        //     {text:"Location", value: "location"},
        //     {text:"Invoice Date", value: "invoice_date"},
        //     {text:"Payment Term Code", value: "payment_term_code"},
        //     {text:"Customer No", value: "customer_code"},
        //     {text:"Product Code", value: "item_code"},
        //     {text:"Bulk Qty", value: "bulk_qty"},
        //     {text:"Loose Qty", value: "loose_qty"},
        //     {text:"System Date", value: "system_date"},
        //     {text:"Default User", value: "default_user"},
        //     {text:"Invoice No", value: "invoice_no"},
        //     {text:"Expiry Date", value: "expiry_date"},
        // ],
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


    // ************************* Templated Data History *******************************
    // custom cols (Templated Data History)
    generatedDataDBTableColumns: [
        // common
        'id',
        'generated_at',
        'uploaded_by',
        'doc_no',
        // principal template
        'item_code',
        'customer_code',
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
    // ************************* /Templated Data History *******************************

});


const actions = {
};

export default {
    state,
    // ...actions
};
