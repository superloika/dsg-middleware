import Vue from "vue";

const state = Vue.observable({
    customersTableHeader: [
        [
            { text: "Customer Code", value: "customer_code" },
            { text: "Customer Code (Supplier)", value: "customer_code_supplier" },
            { text: "Name", value: "customer_name" },
        ],
    ],
    itemsTableHeader: [
        [
            {text:"Item Code", value:"item_code"},
            {text:"Item Code (Supplier)", value:"item_code_supplier"},
            {text:"Description (Supplier)", value:"description_supplier"},
            {text:"UOM", value:"uom"},
            {text:"Conversion Quantity", value:"conversion_qty"},
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
            {text:"Item Name (NAV)", value: "description"},
            {text:"Item Name (Supplier)", value: "description_supplier"},
            {text:"Bulk Quantity", value: "bulk_qty"},
            {text:"Loose Quantity", value: "loose_qty"},
            {text:"Price", value: "price"},
            {text:"Amount", value: "amount"},
            {text:"Base UOM", value: "base_uom"},
            {text:"Conversion UOM", value: "uom"},
            {text:"Salesman Name", value: "sm_name"},
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
            {text: 'Item Code', value: 'item_code'},
            {text: 'Customer Code', value: 'customer_code'},
        ]
    ],
    generatedDataDBTableColumns: [
        // common
        'id',
        'principal_code',
        'template_variation',
        'generated_at',
        'uploaded_by',
        'status',
        'doc_no',
        // principal template
        // principal template
        'invoice_no',
        'customer_code',
        'alturas_customer_code',
        'customer_name',
        'invoice_date',
        'alturas_item_code',
        'item_code',
        'description',
        'description_supplier',
        'bulk_qty',
        'loose_qty',
        'price',
        'amount',
        'base_uom',
        'uom',
        'sm_name',
        'system_date'
    ],
});


const actions = {
};

export default {
    state,
    // ...actions
};
