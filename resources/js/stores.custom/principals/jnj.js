import Vue from "vue";

const state = Vue.observable(
{
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
            {text:"Description (Nav)", value:"description"},
            {text:"Item Code (Supplier)", value:"item_code_supplier"},
            {text:"Description (Supplier)", value:"description_supplier"},
        ]
    ],
    salesmenTableHeader: [
        [
            {text:"SM_NAME", value:"sm_name"},
            {text:"SM_CODE_NAV", value:"sm_code"},
            {text:"SM_CODE_SUPPLIER", value:"sm_code_supplier"},
            {text:"GROUP_CODE", value:"group_code"},
        ]
    ],

    // templated data table header
    generatedDataTableHeader: [
        [
            {text:"Invoice #", value: "invoice_no"},
            {text:"Customer Code", value: "customer_code"},
            {text:"Customer Name", value: "customer_name"},
            {text:"Invoice Date (m/d/Y)", value: "invoice_date"},
            {text:"Item Code (NAV)", value: "alturas_item_code"},
            {text:"Item Code (Supplier)", value: "item_code"},
            {text:"Item Name (NAV)", value: "item_description"},
            {text:"Item Name (Supplier)", value: "description_supplier"},
            {text:"UOM", value: "uom"},
            {text:"Quantity", value: "quantity"},
            {text:"Price", value: "price"},
            {text:"Amount", value: "amount"},
            {text:"Salesman", value: "sm_name"},
            {text:"Salesman Code", value: "sm_code_supplier"},
            {text:"Group", value: "group"}
        ],
        [
            {text:"CM #", value: "invoice_no"},
            {text:"Customer Code", value: "customer_code"},
            {text:"Customer Name", value: "customer_name"},
            {text:"Invoice Date (M/D/Y)", value: "invoice_date"},
            {text:"Item Code (NAV)", value: "alturas_item_code"},
            {text:"Item Code (Supplier)", value: "item_code"},
            {text:"Item Name (NAV)", value: "item_description"},
            {text:"Item Name (Supplier)", value: "description_supplier"},
            {text:"UOM", value: "uom"},
            {text:"Quantity", value: "quantity"},
            {text:"Price", value: "price"},
            {text:"Amount", value: "amount"},
            {text:"Salesman", value: "sm_name"},
            {text:"Salesman Code", value: "sm_code_supplier"},
            {text:"Group", value: "group"},
            {text:"Invoice Reference #", value: "invoice_doc_no"},
            {text:"Remarks", value: "remarks"},
        ],
    ],

    // ***********************************************************************************
    generatedDataHistoryFilters: [
        [
            {text: 'System Date', value: 'system_date'},
            {text: 'Salesman', value: 'sm_name'},
            {text: 'Salesman Code', value: 'sm_code'},
            {text: 'Item Code', value: 'item_code'},
            {text: 'Customer Code', value: 'customer_code'},
            {text: 'Source Group', value: 'group_code'},
        ]
    ],

    // misc
    posting_date_format: '',
}
);


const actions = {
};

export default {
    state,
    // ...actions
};
