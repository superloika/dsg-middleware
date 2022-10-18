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
            {text:"InvoiceDate", value: "invoice_date"},
            {text:"ItemNo", value: "item_code"},
            {text:"Description", value: "description_supplier"},
            {text:"SalesQty", value: "quantity"},
            {text:"SalesPrice", value: "price"},
            {text:"SalesAmount", value: "amount"},
            {text:"UOM", value: "uom"},
            {text:"Currency", value: "currency"},
            {text:"CustomerNo", value: "customer_code"},
            {text:"CustomerName", value: "customer_name"},
            {text:"CustomerAddress", value: "address_1"},
            {text:"CustomerCity", value: "address_2"},
            {text:"CustomerProvince", value: "address_3"},
            {text:"SalesmanNo", value: "sm_code"},
            {text:"SalesManName", value: "sm_name"},
            {text:"SalesmanPhoneNumber", value: "sm_contact_no"},
            {text:"SupervisorNo", value: "supervisor_contact_no"},
            {text:"SupervisorName", value: "supervisor_name"},
            {text:"InvoiceNo", value: "invoice_no"},
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


    // ************************* Templated Data History *******************************
    // custom cols (Templated Data History)
    generatedDataDBTableColumns: [
        // common
        'id',
        'generated_at',
        'uploaded_by',
        'doc_no',
        // principal template
        "invoice_date",
        "item_code",
        "description_supplier",
        "quantity",
        "price",
        "amount",
        "uom",
        "currency",
        "customer_code",
        "customer_name",
        "address_1",
        "address_2",
        "address_3",
        "sm_code",
        "sm_name",
        "sm_contact_no",
        "supervisor_contact_no",
        "supervisor_name",
        "invoice_no",
    ],
    generatedDataHistoryFilters: [
        [
            {text: 'Invoice Posting Date', value: 'invoice_date'},
            {text: 'Document #', value: 'doc_no'},
            {text: 'Product Code', value: 'item_code'},
            {text: 'Account Code', value: 'customer_code'},
            {text: 'Salesman', value: 'sm_code'},
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
