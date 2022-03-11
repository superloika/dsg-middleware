import Vue from 'vue';
import AppStore from './AppStore';


let state = Vue.observable({
    selectedPrincipalCode: '',

    // masterfiles
    isUploadMasterCustomersOpen: false,
    isUploadMasterProductsOpen: false,
    products: [],
    customers: [],
    invoices: [],
    transactions: [],

    // generated data
    currentGeneratedData: [],
    currentRawInvoices: [],
    textfileLineCount: 0,
    isGeneratingData: false,

    // invoice import
    isImportInvoicesVisible: true,

    invoicesGrandTotal: 0.00,

    settings: [],
    sheetImport: false,
});


const actions = {
    initialize() {
        console.log(`%cInitializing PrincipalsStore...`,
            'background:#222; color:#bada55; font-size:16px;');
        this.initProducts();
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
    },

    cleanup() {
        console.log(`%cCleaning up PrincipalsStore a little bit...`,
            'background:#222; color:#bada55; font-size:16px;');
        // state.selectedPrincipalCode = '';

        // delete Vue.prototype[state.selectedPrincipalCode];

        // masterfiles
        state.isUploadMasterCustomersOpen = false;
        state.isUploadMasterProductsOpen = false;
        state.products = [];
        state.customers = [];
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
    },

    async initProducts() {
        try {
            const url = AppStore.state.siteUrl + 'principals/' +
                state.selectedPrincipalCode + '/products';
            AppStore.state.showTopLoading = true;
            let result = await axios.get(url);
            state.products = [];
            state.products = result.data;
            AppStore.state.showTopLoading = false;

        } catch (error) {
            console.log('PrincipalsStore.initProducts() - ERROR:', error);
        }
    },

    async initCustomers() {
        try {
            const url = AppStore.state.siteUrl + 'principals/' +
                state.selectedPrincipalCode + '/customers';
            AppStore.state.showTopLoading = true;
            let result = await axios.get(url);

            state.customers = [];
            state.customers = result.data;
            AppStore.state.showTopLoading = false;
        } catch (error) {
            console.log('PrincipalsStore.initCustomers() - ERROR:', error);
        }
    },

    async initInvoices(principal_code, date) {
        date.sort();
        try {
            const url = AppStore.state.siteUrl + 'principals/' +
                principal_code + '/invoices?date=' + date;
            AppStore.state.showTopLoading = true;
            let result = await axios.get(url);

            state.invoices = [];
            state.invoices = result.data;
            AppStore.state.showTopLoading = false;
        } catch (error) {
            console.log('PrincipalsStore.initInvoices() - ERROR:', error);
        }
    },

    async initTransactions(principal_code, date) {
        date.sort();
        try {
            const url = AppStore.state.siteUrl + 'principals/' +
                principal_code + '/transactions?date=' + date;
            AppStore.state.showTopLoading = true;
            let result = await axios.get(url);

            state.transactions = [];
            state.transactions = result.data;
            AppStore.state.showTopLoading = false;
        } catch (error) {
            console.log('PrincipalsStore.initTransactions() - ERROR:', error);
        }
    },

    async exportTableToExcel(wrapperID) {
        console.log("Exporting from PrincipalsStore....");

        const tempDate = new Date();
        // const dateToday = tempDate.getFullYear() +
        //     '-' + tempDate.getMonth() + '-' +
        //     tempDate.getDay();
        const fileName = `${state.selectedPrincipalCode} - ${tempDate.toDateString()}.xlsx`;

        AppStore.state.showTopLoading = true;
        AppStore.overlay(true);
        const tblWrapper = document.querySelector(`#${wrapperID}`)
            .children;
        // const tblWrapper = wrapper.children;

        // let ws = XLSX.utils.json_to_sheet(this.sampleData);
        const wBook = XLSX.utils.book_new();

        for (let i = 0; i <= tblWrapper.length - 1; i++) {
            const sheetName = `Sheet ${i+1}`;
            const tbl = tblWrapper[i].querySelector(
                ".table-generated-data"
            );
            const wsFromTbl = XLSX.utils.table_to_sheet(tbl, { raw: true });
            const tempJData = XLSX.utils.sheet_to_json(wsFromTbl);

            let wsFromJData = XLSX.utils.json_to_sheet(tempJData);

            const objKeys = Object.keys(wsFromJData);
            for(let i=1; i<objKeys.length;i++) {
                if(objKeys[i] == '!ref') continue;

                let obj = wsFromJData[objKeys[i]];
                if(obj.v.localeCompare(parseInt(obj.v.toString())) == 0) {
                    obj.t = 'n';
                } else {
                    obj.t = 's';
                }
            }

            console.log(sheetName, wsFromJData);
            // return;
            XLSX.utils.book_append_sheet(wBook, wsFromJData, sheetName);
        }

        XLSX.writeFile(wBook, fileName, { flag: "w+" });

        // this.PrincipalsStore.state.currentGeneratedData = tempData;

        AppStore.state.showTopLoading = false;
        AppStore.overlay(false);
        // this.PrincipalsStore.state.currentGeneratedData = [];
    },


    /**
     * ===== NOTE =====
     * jsonData Structure:
     * [
     *  0: [
     *       0: "GROUP TITLE"
     *       1: [array of data lines]
     *     ]
     * ]
     */
    async exportToExcel(headers = [], jsonData, includeTotals=[], fileName='') {
        console.log("Exporting from PrincipalsStore....");
        console.log("headers:", headers);
        console.log("jsonData:", jsonData);

        const alpha = Array.from(Array(26)).map((e, i) => i + 65);
        const alphabet = alpha.map((x) => String.fromCharCode(x));

        try {
            const tempDate = new Date();
            fileName = `${fileName}_${AppStore.state.strDateToday}.xlsx`;

            AppStore.state.showTopLoading = true;
            AppStore.overlay(true, 'Exporting...');

            let wBook = XLSX.utils.book_new();

            for(let i=0; i<jsonData.length; i++) {
                const sheetName = jsonData[i][0].replace(/\//ig,'-');
                const lines = jsonData[i][1];
                let wSheet = XLSX.utils.json_to_sheet(lines, { origin: 'A2', skipHeader: true });

                if(includeTotals != null && includeTotals.length > 0) {
                    const LEN_TOTAL = lines.length + 3;
                    const LASTCOL = alphabet[Object.keys(lines[0]).length-1];
                    wSheet['!ref'] = `A1:${LASTCOL}${LEN_TOTAL}`;
                    wSheet[`A${LEN_TOTAL}`] = {t:'s',v:'TOTAL'};

                    includeTotals.forEach(e => {
                        const COL = alphabet[e.columnIndex];
                        wSheet[`${COL}${LEN_TOTAL}`]
                            = {t:'n',f:`=SUM(${COL}2:${COL}${LEN_TOTAL-2})`};
                    });
                }

                XLSX.utils.sheet_add_aoa(wSheet, [headers]);
                XLSX.utils.book_append_sheet(wBook, wSheet, sheetName);
            }

            XLSX.writeFile(wBook, fileName, { flag: "w+" });
        } catch (error) {
            console.log('exportToExcel()', error);
            AppStore.toast(error);
        }
        AppStore.state.showTopLoading = false;
        AppStore.overlay(false);
    },

    async initInvoicesGrandTotal() {
        try {
            const url = AppStore.state.siteUrl +
                'principals/' +
                state.selectedPrincipalCode +
                '/invoices/grandtotal';
            let result = await axios.get(url);
            state.invoicesGrandTotal = result.data;
        } catch (error) {
            console.log('initInvoicesGrandTotal() - ERROR:', error);
        }
    },

    async initSettings() {
        try {
            const url = AppStore.state.siteUrl +
                'principals/' +
                state.selectedPrincipalCode +
                '/settings';

            let result = await axios.get(url);
            // result.data.forEach(setting => {
            //     state.settings
            // });
            if(result.data.error == undefined) {
                state.settings = [];
                state.settings = result.data;
            } else {
                console.log(result.data.error);
            }
            console.log('Settings:', result.data);
        } catch (error) {
            console.log('initSettings():', error);
        }
    },

    async saveSettings() {
        try {
            AppStore.state.showTopLoading = true;
            const url = AppStore.state.siteUrl +
                'principals/' +
                state.selectedPrincipalCode +
                '/settings';
            let result = await axios.post(url, state.settings);
            if(result.data.success == true) {
                AppStore.toast(result.data.message);
            }
        } catch (error) {
            console.log('saveSettings():', error);
        }
        AppStore.state.showTopLoading = false;
    },

};


export default {
    state, ...actions,
}
