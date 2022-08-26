import Vue from 'vue';
// import AppStore from '../AppStore';
let AppStore = Vue.prototype.AppStore;
// import axios from 'axios';


let state = Vue.observable({
    selectedPrincipalCode: '',

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

    // invoice import
    isImportInvoicesVisible: true,

    invoicesGrandTotal: 0.00,

    settings: [],
    sheetImport: false,

    // Transactions table loading state
    isInitTransactions: false,

    confirmExportDialogOpen: false,
    isExportingTemplatedData: false,
});


const actions = {
    initialize() {
        console.log(`%cInitializing PrincipalsStore...`,
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
        this.initCurrentGeneratedData(state.selectedPrincipalCode,);

        this.initSalesmen();
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
    async initCurrentGeneratedData(principal_code, template_variations_count=1) {
        try {
            state.isGeneratingData = true;
            const url = encodeURI(
                AppStore.state.siteUrl + 'principals/'
                + principal_code + '/generate-templated-data'
                // + '?group_by=route_code'
                // + '?template_variations_count=' + template_variations_count
            );
            // {cancelToken:axiosSource.token}
            let result = await axios.get(url);
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
        }
    },

    /**
     * Export templated data to Excel and set invoices' status to 'complete'
     */
    async setInvoicesComplete() {
        try {
            state.isExportingTemplatedData = true;
            const url =
                AppStore.state.siteUrl +
                "principals" +
                `/${state.selectedPrincipalCode}/set-invoices-complete`;

            const payload = {
                // raw_invoices: this.PrincipalsStore.state.currentRawInvoices,
                // generated_data: this.generatedData
                generated_data: state.currentGeneratedData
            };

            let response = await axios.post(url, payload);

            const config = this.getHeaderAndFormat(
                "generatedDataTableHeader"
            );

            console.log('XXXXXXXXXXXXXXXXXXXXXXXXXX', config);

            // config.forEach(e=>{
            for(let i=0;i<config.length;i++) {
                // export templated data to Excel
                console.log('GENDATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                state.currentGeneratedData[i].output_template
                );
                this.exportToExcel(
                    config[i].header,
                    this.generatedDataSubset(
                        // this.AppStore.flattenGendata(this.generatedData),
                        state.currentGeneratedData[i].output_template,
                        config[i].format
                    ),
                    null,
                    state.selectedPrincipalCode + '_' + (i+1)
                );
            };

            state.isExportingTemplatedData = false;
            state.confirmExportDialogOpen = false;
            // this.PrincipalsStore.state.currentGeneratedData = [];
            // this.PrincipalsStore.state.currentRawInvoices = [];

            this.initInvoicesGrandTotal();
            // this.initInvoices(
            //     this.selectedPrincipalCode,
            //     AppStore.state.strDateToday
            // );
            this.initCurrentGeneratedData(state.selectedPrincipalCode);
        } catch (error) {
            console.log("setInvoicesComplete():", error);
        }
    },

    /**
     * Initialize the current selected principal's transactions
     */
    async initTransactions(principal_code, date) {
        date.sort();
        try {
            const url = encodeURI(
                AppStore.state.siteUrl
                + 'principals'
                + '/transactions'
                + '?date=' + date
                + '&principal_code=' + principal_code
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
     * Get pendings
     */
    // async initPendings(cols=[]) {
    //     try {
    //         const url = encodeURI(
    //             AppStore.state.siteUrl
    //             + 'principals'
    //             + '/pendings'
    //         );
    //         const payload = {
    //             cols: cols,
    //             principal_code: state.selectedPrincipalCode
    //         };

    //         AppStore.state.showTopLoading = true;
    //         let result = await axios.post(url, payload);

    //         if(result.data.success==true) {
    //             state.currentGeneratedData = result.data.pending_gendata;
    //             state.currentRawInvoices = result.data.pending_rawinvoices;
    //         } else {
    //             console.log('initPendings()', result.data.message);
    //         }
    //         AppStore.state.showTopLoading = false;
    //     } catch (error) {
    //         console.log('PrincipalsStore.initPendings() - ERROR:', error);
    //     }
    // },


    /**
     *
     */
    // async exportTableToExcel(wrapperID) {
    //     console.log("Exporting from PrincipalsStore....");

    //     const tempDate = new Date();
    //     // const dateToday = tempDate.getFullYear() +
    //     //     '-' + tempDate.getMonth() + '-' +
    //     //     tempDate.getDay();
    //     const fileName = `${state.selectedPrincipalCode} - ${AppStore.state.strDateToday}.xlsx`;

    //     AppStore.state.showTopLoading = true;
    //     AppStore.overlay(true);
    //     const tblWrapper = document.querySelector(`#${wrapperID}`)
    //         .children;
    //     // const tblWrapper = wrapper.children;

    //     // let ws = XLSX.utils.json_to_sheet(this.sampleData);
    //     const wBook = XLSX.utils.book_new();

    //     for (let i = 0; i <= tblWrapper.length - 1; i++) {
    //         const sheetName = `Sheet ${i+1}`;
    //         const tbl = tblWrapper[i].querySelector(
    //             ".table-generated-data"
    //         );
    //         const wsFromTbl = XLSX.utils.table_to_sheet(tbl, { raw: true });
    //         const tempJData = XLSX.utils.sheet_to_json(wsFromTbl);

    //         let wsFromJData = XLSX.utils.json_to_sheet(tempJData);

    //         const objKeys = Object.keys(wsFromJData);
    //         for(let i=1; i<objKeys.length;i++) {
    //             if(objKeys[i] == '!ref') continue;

    //             let obj = wsFromJData[objKeys[i]];
    //             if(obj.v.localeCompare(parseInt(obj.v.toString())) == 0) {
    //                 obj.t = 'n';
    //             } else {
    //                 obj.t = 's';
    //             }
    //         }

    //         console.log(sheetName, wsFromJData);
    //         // return;
    //         XLSX.utils.book_append_sheet(wBook, wsFromJData, sheetName);
    //     }

    //     XLSX.writeFile(wBook, fileName, { flag: "w+" });

    //     // this.PrincipalsStore.state.currentGeneratedData = tempData;

    //     AppStore.state.showTopLoading = false;
    //     AppStore.overlay(false);
    //     // this.PrincipalsStore.state.currentGeneratedData = [];
    // },


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
            fileName = `${fileName}_${AppStore.state.strDateToday}.${extension}`;
            let wBook = XLSX.utils.book_new();

            for(let i=0; i<jsonData.length; i++) {
                const sheetName = jsonData[i][0].replace(/\//ig,'-');
                console.log('SHEEEEEEEEEEEET NAME:', sheetName);
                const lines = jsonData[i][1];
                console.info(lines);

                if(sheetName != 'Unmapped') {
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
                }
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
        sheetName, data, tableHeaderPropertyName, includeTotals,
        fileName, extension='xlsx', tableHeadersIndex=0){
        const tempData = [
            [
                sheetName,
                data
            ]
        ];

        const config = this.getHeaderAndFormat(tableHeaderPropertyName);

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
                uploadable = element[1].filter(line => {
                    return line.item_notfound==0 && line.customer_notfound==0
                        && line.salesman_notfound==0;
                });
            }

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
    async initInvoicesGrandTotal() {
        try {
            const url = encodeURI(
                AppStore.state.siteUrl +
                'principals/invoices/grandtotal?principal_code='
                + state.selectedPrincipalCode
            );
            let result = await axios.get(url);
            state.invoicesGrandTotal = !isNaN(result.data) ? result.data : 0;
        } catch (error) {
            console.log('initInvoicesGrandTotal() - ERROR:', error);
        }
    },

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
                this.initCurrentGeneratedData(state.selectedPrincipalCode);
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
    getHeaderAndFormat(property) {
        // return {
        //     header: Vue.prototype[state.selectedPrincipalCode]
        //         .state[property].map(e=>{
        //             return e.text;
        //         }),
        //     format: Vue.prototype[state.selectedPrincipalCode]
        //         .state[property].map(e=>{
        //             return e.value;
        //         }),
        // }
        let tempArray = [];

        Vue.prototype[state.selectedPrincipalCode]
            .state[property].forEach(el=>{
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


};


export default {
    state, ...actions,
}
