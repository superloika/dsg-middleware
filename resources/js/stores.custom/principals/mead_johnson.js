import Vue from "vue";

const state = Vue.observable({

    customersTableHeader: [
        [
            { text: "Distributor",      value: "distributor_code" },
            { text: "Customer Code",    value: "customer_code" },
            { text: "Customer Name",    value: "customer_name" },
            { text: "Outlet Type",      value: "outlet_type" },
            { text: "Salesman Name",    value: "salesman_name" },
            // { text: "Operation Type",   value: "operation_type" },
        ],
    ],
    itemsTableHeader: [
        [
            {text:"Item Code",                  value:"item_code"},
            {text:"Description",                value:"description"},
            {text:"Supplier Item Code",         value:"item_code_supplier"},
            {text:"Supplier Item Description",  value:"description_supplier"},
        ],
        [
            {text:"Return Invoice #",           value: "invoice_no"},
            // {text:"External Return Invoice #",  value: "invoice_number"},
            {text:"Customer Code (NAV)",        value: "alturas_customer_code"},
            // {text:"Customer Code (Supplier)",   value: "customer_code"},
            {text:"Customer Name",              value: "customer_name"},
            {text:"Return Invoice Date (Y-m-d) (NAV)",   value: "invoice_date"},
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
    salesmenTableHeader: [
        [
            {text:"Salesman Name",  value:"sm_name"},
            {text:"Route Code",     value:"route_code"},
        ]
    ],


    // templated data table header
    generatedDataTableHeader: [
        [
            {text:"Order Date (Date) (YYYY/MM/DD)", value: "order_date"},
            {text:"Customer Code (nv20)",           value: "customer_code"},
            {text:"Route Code (nv20)",              value: "route_code"},
            {text:"Product Category Code (nv20)",   value: "product_category_code"},
            {text:"Ship To (nv40)",                 value: "ship_to"},
            {text:"Order Number (nv20)",            value: "order_no"},
            {text:"Remarks (nv50)",                 value: "remarks"},
            {text:"Product Code (nv20)",            value: "item_code"},
            {text:"Quantity (numeric 25,4)",        value: "quantity"},
        ],
    ],


    // transactions table header
    // transactionsTableHeader: [
    //     [
    //         {text:"Upload Date",    value:"updated_at"},
    //         {text:"Customer Code",  value:"customer_code"},
    //         {text:"Account Name",   value:"customer_name"},
    //         {text:"Sales Invoice",  value:"doc_no"},
    //         {text:"Item Code",      value:"item_code"},
    //         {text:"Description",    value:"description"},
    //         {text:"UOM",            value:"uom"},
    //         {text:"Quantity",       value:"quantity"},
    //         {text:"Amount",         value:"u3"},
    //     ]
    // ],


    // ************************* Templated Data History *******************************
    // custom cols (Templated Data History)
    // generatedDataDBTableColumns: [
    //     // common
    //     'id',
    //     'generated_at',
    //     'uploaded_by',
    //     'doc_no',
    //     // principal template
    //     'order_date',
    //     'customer_code',
    //     'route_code',
    //     'product_category_code',
    //     'ship_to',
    //     'order_no',
    //     'remarks',
    //     'item_code',
    //     'quantity'
    // ],
    generatedDataHistoryFilters: [
        [
            {text: 'Route Code',    value: 'route_code'},
            {text: 'Order Date',    value: 'order_date'},
            {text: 'Item Code',     value: 'item_code'},
            {text: 'Customer Code', value: 'customer_code'},
            {text: 'Invoice #', value: 'doc_no'},
            {text: 'Source Group', value: 'group_code'},
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
