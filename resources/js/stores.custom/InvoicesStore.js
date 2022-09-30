import axios from 'axios';
import Vue from 'vue';
import AppStore from './AppStore';
import PrincipalsStore from './PrincipalsStore';


const state = Vue.observable({
    invoices: {},
    isLoadingInvoices: false,
    tableHeader: [
        { text: "Status", value: "status" },
        { text: "Principal", value: "principals_name" },
        { text: "Uploaded", value: "created_at" },
        { text: "Uploaded By", value: "user_fullname" },
        { text: "Filename", value: "filename" },
        { text: "Group", value: "group" },
        { text: "Batch #", value: "batch_number" },

        { text: "Vendor Code", value: "vendor_code" },
        { text: "Customer Code", value: "customer_code" },
        { text: "Invoice #", value: "doc_no" },
        { text: "Posting Date", value: "posting_date" },
        { text: "Item Code", value: "item_code" },
        { text: "Item Description", value: "item_description" },
        { text: "UOM", value: "uom" },
        { text: "Quantity", value: "quantity" },
        { text: "Price", value: "price" },
        { text: "Amount", value: "amount" },
        { text: "Quantity/UOM", value: "qty_per_uom" },
        { text: "UOM Code", value: "uom_code" },
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
})

const actions = {
    async initInvoices(
        searchKey='', principalCodeFilter='', invoiceStatus='', row_count=10, selectedTerminal=''
    ) {
        try {
            state.isLoadingInvoices = true;
            if(searchKey==null) searchKey = '';
            const url = `${AppStore.state.siteUrl}invoices/all`
                + `?row_count=${row_count}`
                + `&search_key=${searchKey}`
                + `&principal_code=${principalCodeFilter}`
                + `&status=${invoiceStatus}`
                + `&terminal=${selectedTerminal}`
                + `&page=${state.invoices.current_page ?? 1}`;
            const response = await axios.get(url);
            state.invoices = {};
            state.invoices = response.data.invoices;
            state.invoicesTotalAmount = response.data.sum;
        } catch (error) {
            console.log('initInvoices() - ERROR:', error);
        } finally {
            state.isLoadingInvoices = false;
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
                "generatedDataTableHeader"
            );

            console.log('XXXXXXXXXXXXXXXXXXXXXXXXXX', config);

            // config.forEach(e=>{
            for(let i=0;i<config.length;i++) {
                // export templated data to Excel
                console.log('GENDATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                PrincipalsStore.state.currentGeneratedData[i].output_template
                );
                PrincipalsStore.exportToExcel(
                    config[i].header,
                    PrincipalsStore.generatedDataSubset(
                        // this.AppStore.flattenGendata(this.generatedData),
                        PrincipalsStore.state.currentGeneratedData[i].output_template,
                        config[i].format
                    ),
                    null,
                    PrincipalsStore.state.selectedPrincipalCode + '_templated_' + (i+1)
                );
            };

            PrincipalsStore.state.isExportingTemplatedData = false;
            PrincipalsStore.state.confirmExportDialogOpen = false;
            // this.PrincipalsStore.state.currentGeneratedData = [];
            // this.PrincipalsStore.state.currentRawInvoices = [];

            PrincipalsStore.initInvoicesGrandTotal();
            // this.initInvoices(
            //     this.selectedPrincipalCode,
            //     AppStore.state.strDateToday
            // );
            PrincipalsStore.initCurrentGeneratedData();
        } catch (error) {
            console.log("setInvoicesComplete():", error);
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
    }

}


export default {
    state,
    ...actions,
}
