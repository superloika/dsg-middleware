import Vue from 'vue';
import AppStore from './AppStore';


const state = Vue.observable({
    // token: null,
    brUploadDialogOpen: false,
    // currentGeneratedBatches: [],
    return_indicators: [
        'Outright/Devuelto Good',
        'Outright/Devuelto Bad',
        'Trade Return Good',
        'Trade Return Bad'
    ],
    return_remarks: [
        'Cancelled by Outlet',
        'Cancelled by Salesperson',
        'Expired PO',
        'Late Delivery',
        'No Freezer Space',
        'Over Booking',
        'Overstock',
        'Poor quality',
        'Product age by MAA'
    ],
})

const actions = {
    async refresh(bu) {
        try {
            const url = `${AppStore.state.siteUrl}br/refresh`;
            const response = await axios.post(url, {
                bu: bu
            });
            console.log(response.data);
            console.log(state.token);
        } catch (error) {
            console.log('refresh() - ERROR:', error);
        } finally {

        }
    },

    async invoiceCreate(bu, data = []) {
        try {
            if(data) {
                const url = `${AppStore.state.siteUrl}br/invoiceCreate`;
                const response = await axios.post(url,
                    {
                        data: data,
                        bu: bu,
                    }
                );
                console.log(response.data);
                console.log(state.token);
                return response.data;
            }
        } catch (error) {
            console.log('invoiceCreate() - ERROR:', error);
        }
    },

    async preparePayload(generatedData) {
        let objInvoices = {};
        // let tempCount = 0;

        generatedData.forEach(e => {
            e.output_template.forEach(e => {
                e[1].forEach(e => {
                    if(e.status=='completed' || e.status=='uploaded') {
                        const isReturn = e.return_indicator != undefined;

                        // invoice level properties
                        if(!objInvoices[e.invoice_number]){
                            objInvoices[e.invoice_number] = {};
                        }

                        //invoice head details
                        objInvoices[e.invoice_number].upload_status = {};
                        objInvoices[e.invoice_number].customer_name = e.customer_name;
                        objInvoices[e.invoice_number].retailer_br_id = e.customer_code;
                        objInvoices[e.invoice_number].erp_invoice_number = e.invoice_number;
                        objInvoices[e.invoice_number].invoice_date = e.invoice_date //AppStore.state.strDateToday[0];
                        objInvoices[e.invoice_number].total_value = 0.0000;
                        objInvoices[e.invoice_number].isReturn = isReturn;
                        objInvoices[e.invoice_number].included = true;

                        if(isReturn) {
                            objInvoices[e.invoice_number].remarks = e.remarks;
                        }
                        if(e.status=='uploaded') {
                            objInvoices[e.invoice_number].status = 0;
                        }

                        // invoice custom fields properties
                        if(!objInvoices[e.invoice_number].customFields) {
                            objInvoices[e.invoice_number].customFields = [];
                        }
                        if(isReturn) {
                            objInvoices[e.invoice_number].customFields = [
                                {
                                    id: e.cf_dsp_name_id,
                                    value: e.cf_dsp_name_value
                                },
                                {
                                    id: e.cf_return_indicator_id,
                                    value: e.cf_return_indicator_value
                                },
                                {
                                    id: e.cf_return_invoice_reference_id,
                                    value: e.cf_return_invoice_reference_value
                                },
                            ];
                        } else {
                            objInvoices[e.invoice_number].customFields = [
                                {
                                    id: e.cf_dsp_name_id,
                                    value: e.cf_dsp_name_value
                                }
                            ];
                        }

                        // invoice items properties
                        if(!objInvoices[e.invoice_number].details) {
                            objInvoices[e.invoice_number].details = [];
                        }
                        //check if returned item
                        if(isReturn) {
                            e.quantity = -Math.abs(e.quantity);
                            e.amount_supplier = -Math.abs(e.amount_supplier);
                        }
                        const discount_value = (e.quantity * e.price_supplier) * e.discount_percentage / 100;
                        objInvoices[e.invoice_number].details.unshift({
                            item_name: e.description_supplier,
                            sku_external_id: e.item_code,
                            quantity: e.quantity,
                            sku_uom: e.uom_supplier,
                            price_per_item: e.price_supplier,
                            discount_value: discount_value,
                            gross_value:  e.amount_supplier - discount_value,
                        });
                    }
                });
            });
        });

        // calc total_value (invoice level)
        let invoices = Object.values(objInvoices);
        invoices.forEach(e => {
            e.details.forEach(i => {
                objInvoices[e.erp_invoice_number].total_value += i.gross_value;
            });
        });

        console.log('with total_value:', objInvoices);

        // chunk objInvoices by 50
        return _.chunk(Object.values(objInvoices), 50);
    },

}


export default {
    state,
    ...actions,
}
