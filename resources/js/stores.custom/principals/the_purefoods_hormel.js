import Vue from "vue";
import magnolia_inc from "./magnolia_inc";

const state = Vue.observable({
    // // principal masterfiles
    // itemsTableHeader: [
    //     [
    //         // {text:"Material Code",              value:"item_code_supplier"},
    //         // {text:"Item Code",                  value:"item_code"},
    //         // {text:"Supplier Item Description",  value:"description_supplier"},
    //         // {text:"PCS/CASE",                   value:"conversion_qty"},
    //         // {text:"CASE Price",                 value:"uom_price"},
    //         // {text:"PCS Price",                  value:"conversion_uom_price"},
    //     ]
    // ],
    // customersTableHeader: [
    //     [
    //         // { text: "Customer Code (Supplier)", value: "customer_code_supplier" },
    //         // { text: "Customer Code",            value: "customer_code" },
    //         // { text: "Customer Name",            value: "customer_name" },
    //     ],
    // ],

    // // templated data table header
    // generatedDataTableHeader: [
    //     [
    //         // {text:"Invoice #", value: "invoice_no"},
    //         // {text:"Customer Code", value: "customer_code"},
    //         // {text:"Customer Name", value: "customer_name"},
    //         // {text:"Invoice Date (m/d/y)", value: "invoice_date"},
    //         // {text:"Item Code (NAV)", value: "alturas_item_code"},
    //         // {text:"Item Code (Supplier)", value: "item_code"},
    //         // {text:"Item Name (NAV)", value: "item_description"},
    //         // {text:"Item Name (Supplier)", value: "description_supplier"},
    //         // {text:"UOM", value: "uom"},
    //         // {text:"Quantity", value: "quantity"},
    //         // {text:"Price", value: "price"},
    //         // {text:"Amount", value: "amount"},
    //         // {text:"Salesman", value: "sm_code"},
    //         // {text:"Group", value: "group"}
    //     ],
    // ],

    // // ***********************************************************************************
    // generatedDataHistoryFilters: [
    //     [
    //         // {text: 'System Date', value: 'system_date'},
    //         // {text: 'Item Code', value: 'item_code'},
    //         // {text: 'Customer Code', value: 'customer_code'},
    //         // {text: 'Source Group', value: 'group_code'},
    //         // {text: 'Invoice #', value: 'doc_no'},
    //     ]
    // ],
    ...magnolia_inc.state
});


const actions = {

};


export default {
    state,
    // ...actions
};
