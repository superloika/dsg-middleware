import axios from 'axios';
import Vue from 'vue';
import AppStore from './AppStore';
import PrincipalsStore from './PrincipalsStore';


const state = Vue.observable({
    invoices: {},
    isLoadingInvoices: false,
    tableHeader: [
        { text: "Status", value: "status" },
        // { text: "Principal", value: "principals_name" },
        { text: "Uploaded", value: "created_at" },
        // { text: "Uploaded By", value: "username" },
        // { text: "Filename", value: "filename" },
        { text: "Group", value: "group" },
        { text: "Batch #", value: "batch_number" },

        { text: "Vendor Code", value: "vendor_code" },
        { text: "Customer Code", value: "customer_code" },
        { text: "Customer Name", value: "customer_name" },
        { text: "Invoice #", value: "doc_no" },
        { text: "Posting Date", value: "posting_date" },
        { text: "Shipment Date", value: "shipment_date" },
        { text: "Item Code", value: "item_code" },
        { text: "Item Description", value: "item_description" },
        { text: "UOM", value: "uom" },
        { text: "Quantity", value: "quantity" },
        { text: "Price", value: "price" },
        { text: "Amount", value: "amount" },
        { text: "Quantity/UOM", value: "qty_per_uom" },
        { text: "UOM Code", value: "uom_code" },
        { text: "Salesman Code", value: "sm_code" },
    ],
    selectedInvoices: [],
    invoicesTotalAmount: 0.00,
    isUploadSummaryShown: false,
    // transactions table header
    transactionsTableHeader: [
        [
            // {text:"Upload Date",    value:"updated_at"},
            {text:"Invoice #",  value:"doc_no"},
            {text:"Posting Date (m/d/Y)",  value:"posting_date"},
            {text:"Customer Code",  value:"customer_code"},
            {text:"Account Name",   value:"customer_name"},
            {text:"Item Code",      value:"item_code"},
            {text:"Description",    value:"item_description"},
            {text:"UOM",            value:"uom"},
            {text:"Quantity",       value:"quantity"},
            {text:"Amount",         value:"amount"},
        ]
    ],
    isExtractInvoicesShown: false,
    groups: [
        // {name:'test', value:1}
    ],
    invoices_upload_logs: [],
    invoiceStatuses: [
        {
            status: "Pending",
            value: "pending"
        },
        {
            status: "Completed",
            value: "completed"
        },
        {
            status: "Uploaded",
            value: "uploaded"
        },
        {
            status: "All",
            value: "all"
        },
    ],
    invoiceStatus: "",
})

const actions = {
    async initInvoices(
        searchKey='', principal_code='', row_count=10, selectedTerminal='', upload_date_range=''
    ) {
        try {
            state.isLoadingInvoices = true;
            AppStore.state.showTopLoading = true;
            if(searchKey==null) searchKey = '';
            if(upload_date_range==null||upload_date_range=='') {
                upload_date_range = [new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                    .toISOString()
                    .substr(0, 10)];
            }
            const url = `${AppStore.state.siteUrl}invoices/all`
                + `?row_count=${row_count}`
                + `&search_key=${searchKey}`
                + `&principal_code=${principal_code}`
                + `&status=${state.invoiceStatus}`
                + `&terminal=${selectedTerminal}`
                + `&upload_date_range=${upload_date_range}`
                + `&page=${state.invoices.current_page ?? 1}`;
            const response = await axios.get(url);
            state.invoices = {};
            state.invoices = response.data.invoices;
            // state.invoicesTotalAmount = response.data.sum;
        } catch (error) {
            console.log('initInvoices() - ERROR:', error);
        } finally {
            state.isLoadingInvoices = false;
            AppStore.state.showTopLoading = false;
        }
    },

    async deleteInvoices() {
        try {
            const url = `${AppStore.state.siteUrl}invoices/delete`;
            const response = await axios.post(
                url,
                {selectedInvoices: state.selectedInvoices}
            );
        } catch (error) {
            console.log('deleteInvoices() - ERROR:', error);
        } finally {
            this.initInvoices();
            state.selectedInvoices = [];
        }
    },

    async resetInvoices() {
        try {
            const url = `${AppStore.state.siteUrl}invoices/reset`;
            const response = await axios.post(
                url,
                {selectedInvoices: state.selectedInvoices}
            );
        } catch (error) {
            console.log('resetInvoices() - ERROR:', error);
        } finally {
            this.initInvoices();
            state.selectedInvoices = [];
        }
    },


    // subject for removal
    async syncTextfiles() {
        try {
            const url = `${AppStore.state.siteUrl}invoices/sync-textfiles`;
            await axios.post(
                url
            );
        } catch (error) {
            console.log('syncTextfiles() - ERROR:', error);
        } finally {
            this.initInvoices();
            state.selectedInvoices = [];
        }
    },


    /**
     * Export templated data to Excel and set invoices' status to 'complete'
     */
     async setInvoicesComplete() {
        try {
            PrincipalsStore.state.isExportingTemplatedData = true;
            const url =
                AppStore.state.siteUrl +
                "invoices/set-invoices-complete"
                ;

            const payload = {
                generated_data: PrincipalsStore.state.currentGeneratedData
            };
            await axios.post(url, payload);

            const config = PrincipalsStore.getHeaderAndFormat(
                {
                    storeName: PrincipalsStore.state.selectedPrincipalCode,
                    propertyName: 'generatedDataTableHeader'
                }
            );
            console.log('HEADER AND FORMAT', config);

            // config.forEach(e=>{
            for(let i=0;i<config.length;i++) {
                // export templated data to Excel
                const output_template = PrincipalsStore.state.currentGeneratedData[i].output_template;
                console.log('GENERATED DATA (output_template)', output_template);
                // return;

                if(output_template.length) {
                    PrincipalsStore.exportToExcel(
                        config[i].header,
                        PrincipalsStore.generatedDataSubset(
                            // this.AppStore.flattenGendata(this.generatedData),
                            output_template,
                            config[i].format
                        ),
                        null,
                        PrincipalsStore.state.selectedPrincipalCode + '_templated_' + (i+1)
                    );
                }
            };

            PrincipalsStore.state.isExportingTemplatedData = false;
            PrincipalsStore.state.confirmExportDialogOpen = false;
            // this.PrincipalsStore.state.currentGeneratedData = [];
            // this.PrincipalsStore.state.currentRawInvoices = [];

            // PrincipalsStore.initInvoicesGrandTotal();
            // this.initInvoices(
            //     this.selectedPrincipalCode,
            //     AppStore.state.strDateToday
            // );
            PrincipalsStore.initCurrentGeneratedData(null, state.invoiceStatus);
        } catch (error) {
            console.log("setInvoicesComplete():", error);
        }
    },


    /**
     * set invoices' status to 'uploaded'
     */
     async setInvoicesUploaded(batch) {
        try {
            const url =
                AppStore.state.siteUrl +
                "invoices/setInvoicesUploaded"
                ;

            const payload = {
                batch: batch
            };

            const res = await axios.post(url, payload);

            return res.data;
        } catch (error) {
            console.log("setInvoicesUploaded():", error);
        }
    },


    /**
     * set invoices' status from 'uploaded' back to 'completed'
     */
     async setInvoicesCancelled(batch) {
        try {
            const url =
                AppStore.state.siteUrl +
                "invoices/setInvoicesCancelled"
                ;

            const payload = {
                batch: batch
            };

            const res = await axios.post(url, payload);

            return res.data;
        } catch (error) {
            console.log("setInvoicesCancelled():", error);
        }
    },


    async extractRawInvoicesToExcel(principal_code, posting_date) {
        try {
            const res = await axios.post(
                AppStore.state.siteUrl
                + 'invoices/extract-raw-invoices-to-excel',
                {
                    principal_code: principal_code,
                    posting_date: posting_date,
                },
            );

            let wBook = XLSX.utils.book_new();
            const fileName = `${principal_code}_invoices_${posting_date}.xlsx`;

            const jsonData = Object.entries(res.data);
            console.log('jsonData', jsonData);

            for(let i=0; i<jsonData.length; i++) {
                const sheetName = jsonData[i][0].replace(/\//ig,'-');
                const lines = jsonData[i][1];
                console.info(lines);

                if(lines.length > 0) {
                    let wSheet = XLSX.utils.json_to_sheet(
                        lines, { origin: 'A1', skipHeader: false }
                    );

                    XLSX.utils.sheet_add_aoa(wSheet,[[]]);
                    XLSX.utils.book_append_sheet(wBook, wSheet, sheetName);
                }
            }
            XLSX.writeFile(wBook, fileName, { flag: "w+" });
        } catch (error) {
            console.error('exportToExcel()', error);
            AppStore.toast(error,null,'error');
        }
    },

    async initGroups() {
        await axios.get(
            AppStore.state.siteUrl + 'invoices/groups'
        ).then(res=>{
            state.groups = res.data;
        });
    },

    async initUploadLogs() {
        await axios.get(
            AppStore.state.siteUrl + 'invoices/invoices-upload-logs'
        ).then(res=>{
            state.invoices_upload_logs = res.data;
        });
    },

    async initInvoicesTotalAmount(
        searchKey='', principal_code='', row_count=10, selectedTerminal='',upload_date_range=''
    ) {
        try {
            if(searchKey==null) searchKey = '';
            if(upload_date_range==null||upload_date_range=='') {
                upload_date_range = [new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                    .toISOString()
                    .substr(0, 10)];
            }
            const url = `${AppStore.state.siteUrl}invoices/grand-total`
                + `?row_count=${row_count}`
                + `&search_key=${searchKey}`
                + `&principal_code=${principal_code}`
                + `&status=${state.invoiceStatus}`
                + `&terminal=${selectedTerminal}`
                + `&upload_date_range=${upload_date_range}`
                + `&page=${state.invoices.current_page ?? 1}`;
            const response = await axios.get(url);
            state.invoicesTotalAmount = response.data.sum;
        } catch (error) {
            console.log('initInvoices() - ERROR:', error);
        }
    }

}


export default {
    state,
    ...actions,
}
