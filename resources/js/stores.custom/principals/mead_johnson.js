import Vue from "vue";
// import PrincipalsStore from "./PrincipalsStore";


const state = Vue.observable({
    title: '',
    // customersTableHeader: [
    //     { text: "Distributor Code", value: "distributor_code" },
    //     { text: "Customer Code", value: "customer_code" },
    //     { text: "Customer Name", value: "customer_name" },
    //     { text: "Outlet Type", value: "outlet_type" },
    //     { text: "Salesman Name", value: "salesman_name" },
    //     { text: "Route Code", value: "route_code" },
    //     { text: "Operation Type", value: "operation_type" },
    //     { text: "Status", value: "status" },
    //     { text: "Address_1", value: "address_1" },
    //     { text: "Address_4", value: "address_4" },
    //     { text: "Address_5", value: "address_5" },
    //     { text: "postal_code", value: "postal_code" },
    // ],
    customersTableHeader: [
        { text: "Customer Code", value: "customer_code" },
        { text: "Name", value: "customer_name" },
        { text: "Outlet Type", value: "outlet_type" },
        { text: "Salesman Name", value: "salesman_name" },
        { text: "Operation Type", value: "operation_type" },
        // { text: "Route Code", value: "route_code" },
    ],
    itemsTableHeader: [
        {text:"Item Code", value:"item_code"},
        {text:"Description", value:"description"},
        {text:"Supplier Item Code", value:"item_code_supplier"},
        {text:"Supplier Item Description", value:"description_supplier"},
    ],
    generatedDataTableHeader: [
        {text:"Order Date (Date) (YYYY/MM/DD)", value: "order_date"},
        {text:"Customer Code (nv20)", value: "customer_code"},
        {text:"Route Code (nv20)", value: "route_code"},
        {text:"Product Category Code (nv20)", value: "item_category_code"},
        {text:"Ship To (nv40)", value: "ship_to"},
        {text:"Order Number (nv20)", value: "order_no"},
        {text:"Remarks (nv50)", value: "remarks"},
        {text:"Product Code (nv20)", value: "item_code"},
        {text:"Quantity (numeric 25,4)", value: "quantity"},
    ],
    uploadedInvoicesTableHeader: [
        // {text:"Status", value:"status"},
        {text:"Upload Date", value:"upload_date"},
        {text:"Document Type", value:"doc_type"},
        {text:"Document #", value:"doc_no"},
        {text:"Customer Code", value:"customer_code"},
        {text:"Posting Date", value:"posting_date"},
        {text:"Item Code", value:"item_code"},
        {text:"Quantity", value:"quantity"},
        {text:"u1", value:"u1"},
        {text:"u2", value:"u2"},
        {text:"u3", value:"u3"},
        {text:"u4", value:"u4"},
        {text:"u5", value:"u5"},
        {text:"UOM", value:"uom"},
    ],
    transactionsTableHeader: [
        {text:"Upload Date", value:"upload_date"},
        {text:"Customer Code", value:"customer_code"},
        {text:"Account Name", value:"customer_name"},
        {text:"Sales Invoice", value:"doc_no"},
        {text:"Item Code", value:"item_code"},
        {text:"Description", value:"description"},
        {text:"UOM", value:"uom"},
        {text:"Quantity", value:"quantity"},
        {text:"Amount", value:"u3"},
    ],
    generatedDataHistoryFilters: [
        {text: 'Order Date', value: 'order_date'},
        {text: 'Route Code', value: 'route_code'},
    ],
    generatedDataDBTableColumns: [
        // common
        'id',
        'generated_at',
        'uploaded_by',
        'doc_no',
        // principal template
        'order_date',
        'customer_code',
        'route_code',
        'product_category_code',
        'ship_to',
        'order_no',
        'remarks',
        'item_code',
        'quantity'
    ]
});


const actions = {
    // generatedDataHeader() {
    //     return state.generatedDataTableHeader.map(e=>{
    //         return e.text;
    //     });
    // },

    // generatedDataFormat() {
    //     return state.generatedDataTableHeader.map(e=>{
    //         return e.value;
    //     });
    // },

    // transactionsHeader() {
    //     return state.transactionsTableHeader.map(e=>{
    //         return e.text;
    //     });
    // },

    // transactionsFormat() {
    //     return state.transactionsTableHeader.map(e=>{
    //         return e.value;
    //     });
    // },
};

export default {
    state,
    ...actions
};
