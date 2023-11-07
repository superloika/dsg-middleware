import Vue from 'vue';
// import InvoicesStore from './InvoicesStore';
// import AppStore from '../AppStore';
let AppStore = Vue.prototype.AppStore;
// let BrStore = Vue.prototype.BrStore;
// let InvoicesStore = Vue.prototype.InvoicesStore;
// import axios from 'axios';


let state = Vue.observable({
    // current selected principal main vendor code
    selectedPrincipalCode: '',
    selectedPrincipal: [],

    // principal-specific configurations (e.g. table headers, posting date format, etc)
    configs: {},

    // masterfiles
    isUploadMasterCustomersOpen: false,
    isUploadMasterItemsOpen: false,
    isUploadMasterSalesmenOpen: false,
    items: {},
    customers: {},
    invoices: [],
    transactions: [],
    salesmen: [],

    // generated data
    currentGeneratedData: [],
    currentRawInvoices: [],
    textfileLineCount: 0,
    isGeneratingData: false,
    currentGeneratedDataSearchKey: '',
    selectedGroupBy: null,

    // invoice import
    isImportInvoicesVisible: true,

    invoicesGrandTotal: 0.00,

    settings: [],
    sheetImport: false,

    // Transactions table loading state
    isInitTransactions: false,

    confirmExportDialogOpen: false,
    isExportingTemplatedData: false,

    generateFilterShown: false,

    posting_date_range: [new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)],
});


const actions = {
    initialize() {
        console.log(`%cInitializing PrincipalsStore... [${state.selectedPrincipalCode}]`,
            'background:#222; color:#bada55; font-size:16px;');
        this.initItems();
        this.initCustomers();
        this.initInvoices(
            state.selectedPrincipalCode,
            AppStore.state.strDateToday
        );
        this.initTransactions(
            state.selectedPrincipalCode,
            AppStore.state.strDateToday
        );
        this.initInvoicesGrandTotal();
        this.initSettings();
        // this.initCurrentGeneratedData();

        this.initSalesmen();

        this.initConfigs();
    },

    cleanup() {
        console.log(`%cCleaning up PrincipalsStore a little bit...`,
            'background:#222; color:#bada55; font-size:16px;');
        // state.selectedPrincipalCode = '';

        // masterfiles
        state.isUploadMasterCustomersOpen = false;
        state.isUploadMasterItemsOpen = false;
        state.items = {};
        state.customers = {};
        state.invoices = [];
        state.transactions = [];

        // generated data
        state.currentGeneratedData = [];
        state.currentRawInvoices = [];
        state.textfileLineCount = 0;
        state.isGeneratingData = false;
        state.selectedGroupBy = null;

        // invoice import
        state.isImportInvoicesVisible = true;

        state.invoicesGrandTotal = 0.00;

        state.settings = [];
        state.sheetImport = false;
        state.currentGeneratedDataSearchKey = '';
        state.isInitTransactions = false;
        state.confirmExportDialogOpen = false;
        state.isExportingTemplatedData = false;

        state.salesmen = [];

        state.generateFilterShown = false;

        state.posting_date_range =
            [new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .substr(0, 10)];

        state.configs = {};
    },

    /**
     * Initialize the current selected principal's items list
     */
    async initItems(searchKey='', row_count=10) {
        try {
            if(searchKey==null) searchKey = '';
            const url = encodeURI(
                AppStore.state.siteUrl + 'principals/' +
                state.selectedPrincipalCode + '/items'
                + `?row_count=${row_count}`
                + `&search_key=${searchKey}`
                + `&page=${state.items.current_page ?? 1}`
            );
            // AppStore.state.showTopLoading = true;
            let result = await axios.get(url);
            state.items = {};
            state.items = result.data;
            // AppStore.state.showTopLoading = false;

        } catch (error) {
            console.log('PrincipalsStore.initItems() - ERROR:', error);
        }
    },

    /**
     * Initialize the current selected principal's customer list
     */
    async initCustomers(searchKey='', row_count=10) {
        try {
            if(searchKey==null) searchKey = '';
            const url = encodeURI(
                AppStore.state.siteUrl + 'principals/' +
                state.selectedPrincipalCode + '/customers'
                + `?row_count=${row_count}`
                + `&search_key=${searchKey}`
                + `&page=${state.customers.current_page ?? 1}`
            );
            // AppStore.state.showTopLoading = true;
            let result = await axios.get(url);

            state.customers = {};
            state.customers = result.data;
            // AppStore.state.showTopLoading = false;
        } catch (error) {
            console.log('PrincipalsStore.initCustomers() - ERROR:', error);
        }
    },


    /**
     * Initialize the current selected principal's salesmen list
     */
    async initSalesmen() {
        try {
            const url = encodeURI(
                AppStore.state.siteUrl + 'principals/' +
                state.selectedPrincipalCode + '/salesmen'
            );
            // AppStore.state.showTopLoading = true;
            let result = await axios.get(url);

            state.salesmen = [];
            state.salesmen = result.data;
            // AppStore.state.showTopLoading = false;
        } catch (error) {
            console.log('PrincipalsStore.initSalesmen() - ERROR:', error);
        }
    },

    /**
     * Initialize the current selected principal's uploaded/saved invoices
     */
    // async initInvoices(principal_code, date) {
    //     date.sort();
    //     try {
    //         const url = encodeURI(
    //             AppStore.state.siteUrl + 'principals/invoices?date=' + date
    //             + '&principal_code=' + principal_code
    //         );
    //         AppStore.state.showTopLoading = true;
    //         let result = await axios.get(url);

    //         state.invoices = [];
    //         state.invoices = result.data;
    //         AppStore.state.showTopLoading = false;
    //     } catch (error) {
    //         console.log('PrincipalsStore.initInvoices() - ERROR:', error);
    //     }
    // },

    /**
     * Generate templated data based on pending invoices
     */
    async initCurrentGeneratedData(template_variations_count=1, status='', posting_date_format='m/d/Y') {
        try {
            state.isGeneratingData = true;
            AppStore.overlay(true, 'Generating data, please wait...');
            const url = encodeURI(
                AppStore.state.siteUrl + 'principals/'
                + state.selectedPrincipalCode + '/generate-templated-data'
                + '?principal_code=' + state.selectedPrincipalCode
                + '&group_by=' + state.selectedGroupBy
                + '&posting_date_range=' + state.posting_date_range
                + '&status=' + status
                + '&posting_date_format=' + posting_date_format
                // + '?template_variations_count=' + template_variations_count
            );
            // {cancelToken:axiosSource.token}
            let result = await axios.get(url,
                {
                    // signal: window.abortCtrl.signal,
                    cancelToken: window.cancelTokenSource.token,
                }
            );
            state.isGeneratingData = false;
            state.currentGeneratedData = [];
            // state.currentGeneratedData = Object.entries(result.data.output_template_variations);

            state.currentGeneratedData =
            // [
                result.data.output_template_variations.map(e => {
                    return {
                        name: e.name,
                        output_template: Object.entries(e.output_template),
                    }
                });
            // ];

            // state.currentGeneratedData = result.data.output_template_variations;

            console.log('================= TEMPLATED DATA: =================',
                state.currentGeneratedData);
        } catch (error) {
            console.log('PrincipalsStore.initCurrentGeneratedData() - ERROR:', error);
            AppStore.toast(error, 3000, 'error');
        } finally {
            AppStore.overlay(false);
        }
    },


    /**
     * Initialize the current selected principal's transactions
     */
    async initTransactions(principal_code, date, invoice_status="completed") {
        date.sort();
        try {
            const url = encodeURI(
                AppStore.state.siteUrl
                + 'principals'
                + '/transactions'
                + '?date=' + date
                + '&principal_code=' + principal_code
                + '&invoice_status=' + invoice_status
            );
            // AppStore.state.showTopLoading = true;
            state.isInitTransactions = true;
            let result = await axios.get(url);

            if(result.data.success==true) {
                state.transactions = [];
                state.transactions = result.data.data;
                // AppStore.state.showTopLoading = false;
                state.isInitTransactions = false;
            } else {
                console.log('initTransactions()', result.data.message);
            }
        } catch (error) {
            console.log('PrincipalsStore.initTransactions() - ERROR:', error);
        }
    },


    /**
     * ============================================= exportToExcel() =================================
     * Exports a json array of data to Excel
     * ===============================================================================================
     * jsonData Structure (Array of arrays):
     * [
     *   0: [
     *        0: "Group text"
     *        1: [Array of data lines]
     *   ]
     * ]
     *
     */
    async exportToExcel(headers = [], jsonData=[], includeTotals=[], fileName='', extension='xlsx') {
        console.log("Exporting from PrincipalsStore....");
        console.log("headers:", headers);
        console.log("jsonData:", jsonData);

        const alpha = Array.from(Array(26)).map((e, i) => i + 65);
        const alphabet = alpha.map((x) => String.fromCharCode(x));

        try {
            // fileName = `${state.selectedPrincipalCode}_${fileName}_` +
            //     `${state.posting_date_range.sort()}.${extension}`;

            fileName = `${fileName}_` +
                `${state.posting_date_range.sort()}.${extension}`;
            let wBook = XLSX.utils.book_new();

            for(let i=0; i<jsonData.length; i++) {
                const sheetName = jsonData[i][0].replace(/\//ig,'-');
                console.log('SHEEEEEEEEEEEET NAME:', sheetName);
                const lines = jsonData[i][1];
                console.info(lines);

                // if(sheetName != 'Unmapped') {
                    if(lines.length > 0) {
                        let wSheet = XLSX.utils.json_to_sheet(
                            lines, { origin: 'A2', skipHeader: true }
                        );

                        // if row for total is to be included
                        if(includeTotals != null && includeTotals.length > 0) {
                            const LEN_TOTAL = lines.length + 3;
                            const LASTCOL = alphabet[Object.keys(lines[0]).length-1];
                            wSheet['!ref'] = `A1:${LASTCOL}${LEN_TOTAL}`;
                            wSheet[`A${LEN_TOTAL}`] = {t:'s',v:'TOTAL'};

                            includeTotals.forEach(e => {
                                const COL = alphabet[e];
                                wSheet[`${COL}${LEN_TOTAL}`]
                                    = {t:'n',f:`=SUM(${COL}2:${COL}${LEN_TOTAL-2})`};
                            });
                        }

                        XLSX.utils.sheet_add_aoa(wSheet, [headers]);
                        XLSX.utils.book_append_sheet(wBook, wSheet, sheetName);
                    }
                // }
            }
            XLSX.writeFile(wBook, fileName, { flag: "w+" });
        } catch (error) {
            console.error('exportToExcel()', error);
            AppStore.toast(error,null,'error');
        }
    },


    /**
     * Export to simple Excel
     */
    toExcel_simple(
        sheetName, data, headerFormatSource, includeTotals,
        fileName, extension='xlsx', tableHeadersIndex=0
    ){
        const tempData = [
            [
                sheetName,
                data
            ]
        ];

        const config = this.getHeaderAndFormat(headerFormatSource);

        this.exportToExcel(
            config[tableHeadersIndex].header,
            this.generatedDataSubset(
                tempData,
                config[tableHeadersIndex].format
            ),
            includeTotals,
            fileName,
            extension
        );
    },


    /**
     * Returns exactly the same structure as generatedData
     * but picks only the matching properties specified in subsetKeys.
     */
    generatedDataSubset(generatedData=[], subsetKeys=[],) {
        return generatedData.map(element => {
            let uploadable = [];

            /**
             * If customer_notfound & item_notfound properties
             * are defined, filter out only those with both 0 values (the uploadable ones)
             */
            if(element[1][0].customer_notfound == undefined
                && element[1][0].item_notfound == undefined
                && element[1][0].salesman_notfound == undefined
            ) {
                uploadable = element[1];
            } else {
                // uploadable = element[1].filter(line => {
                //     return line.item_notfound==0 && line.customer_notfound==0
                //         && line.salesman_notfound==0;
                // });

                // export all (including unmapped lines)
                uploadable = element[1];
            }

            // console.log('LOOOOOOOOOOOOOOOOOOOOOOOOOKKKKKKKKKKKKKKKKKKKKKK');
            // console.log(uploadable);
            // return;

            // const filteredUploadable = uploadable.filter(e=>{
            //     if(InvoicesStore.state.exportWithCompleted) {
            //         return e;
            //     } else {
            //         return e.status == 'pending';
            //     }
            // });

            return [
                element[0],
                uploadable.map(line => {
                    return subsetKeys.reduce((r, item)=> {
                        r[item] = line[item];
                        return r;
                    }, {});
                })
            ];
        });
    },

    /**
     * Initialize the current selected principal's grand total amount
     * of uploaded/saved invoices
     */
    // async initInvoicesGrandTotal(status='completed') {
    //     try {
    //         const url = encodeURI(
    //             AppStore.state.siteUrl +
    //             'invoices/grandtotal?principal_code='
    //             + state.selectedPrincipalCode
    //             + '&status=' + status
    //         );
    //         let result = await axios.get(url);
    //         state.invoicesGrandTotal = !isNaN(result.data) ? result.data : 0;
    //     } catch (error) {
    //         console.log('initInvoicesGrandTotal() - ERROR:', error);
    //     }
    // },

    /**
     * Initialize the current selected principal's settings
     */
    async initSettings() {
        try {
            const url = encodeURI(
                AppStore.state.siteUrl +
                'principals/settings?principal_code=' +
                state.selectedPrincipalCode
            );

            let result = await axios.get(url);
            // result.data.forEach(setting => {
            //     state.settings
            // });
            if(result.data.error == undefined) {
                state.settings = [];
                state.settings = result.data;
                // state.settings = result.data.map(e=>{
                //     if(e.type=='toggle') {
                //         e.value = parseInt(e.value);
                //     }
                //     return e;
                // });

                // console.log('SETTINGS:', state.settings);
                // console.log(
                //     'route_code_mapping',
                //     eval(state.settings.find(e => e.name=='route_code_mapping').value)
                // );
            }
        } catch (error) {
            console.log('initSettings():', error);
        }
    },


    /**
     * Update the current selected principal's settings
     */
    async saveSettings() {
        try {
            AppStore.state.showTopLoading = true;
            const url = encodeURI(
                AppStore.state.siteUrl +
                'principals/settings'
            );
            const payload = {
                principal_code: state.selectedPrincipalCode,
                settings: state.settings
            }
            let result = await axios.post(url, payload);
            if(result.data.success == true) {
                AppStore.toast(result.data.message);
                this.initCurrentGeneratedData();
            }
        } catch (error) {
            console.log('saveSettings():', error);
            AppStore.toast(error,3000, 'error');
        } finally {
            AppStore.state.showTopLoading = false;
        }

    },

    /**
     * Get setting value
     */
    getSetting(settingName) {
        let value = null;
        state.settings.forEach(e=>{
            if(e.name==settingName) {
                value = e;
                return;
            }
        })
        return value;
    },

    /**
     * Returns an object containing the arrays of headers
     * and its content column format/sequence
     */
    getHeaderAndFormat() {
        let tempArray = [];
        state.configs.generatedDataTableHeader
            .forEach(el=>{
                const tempObj = {
                    header: el.map(e=>{
                            return e.text;
                        }),
                    format: el.map(e=>{
                            return e.value;
                        }),
                };
                tempArray.push(tempObj);
            });
        return tempArray;
    },

    /**
     * Delete site cookies
     */
     deleteAllCookies() {
        let cookies = document.cookie.split(";");

        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            let eqPos = cookie.indexOf("=");
            let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    },

    /**
     * Get principal-specific configs (e.g. table headers for templated data, items, customers etc.)
     */
    async initConfigs() {
        try {
            const url = encodeURI(
                AppStore.state.siteUrl + 'principals/' +
                state.selectedPrincipalCode + '/configs'
            );
            let result = await axios.get(url);
            state.configs = {};
            state.configs = result.data;
            // AppStore.state.showTopLoading = false;

        } catch (error) {
            console.error('PrincipalsStore.initConfigs() - ERROR:', error);
        }
    },

};


export default {
    state, ...actions,
}
