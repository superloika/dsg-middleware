<template>
    <!-- <div class="pt-4 secondary darken-1"> -->
    <div class="">
        <!-- <v-sheet class="px-3 secondary darken-1"> -->
        <!-- <v-sheet class="px-3">
            <InvoicesImport></InvoicesImport>
        </v-sheet> -->
        <v-card class="elevation-0" color="">
            <v-card-title class="pa-0">
                <v-app-bar elevation="0" colorx="white">
                    <v-toolbar-title>
                        Templated Data
                        <div v-if="lineCount > 0">
                            <v-chip
                                small
                                outlinedx
                                label
                                color="transparent"
                                class="px-1 primary--text"
                            >
                                {{ lineCount }} total line/s
                            </v-chip>
                            <v-chip
                                small
                                outlinedx
                                label
                                color="transparent"
                                v-if="customersNotFoundCount > 0 || productsNotFoundCount > 0"
                                class="px-1 warning--text"
                            >
                                {{ customersNotFoundCount > productsNotFoundCount ?
                                    customersNotFoundCount : productsNotFoundCount }} total warning/s
                            </v-chip>
                            <!-- <v-chip
                                small
                                outlinedx
                                label
                                color="transparent"
                                v-if="customersNotFoundCount > 0"
                                class="px-1 warning--text"
                            >
                                {{ customersNotFoundCount }} lines with unmappable customer code
                            </v-chip>
                            <v-chip
                                small
                                outlinedx
                                label
                                color="transparent"
                                v-if="productsNotFoundCount > 0"
                                class="px-1 warning--text"
                            >
                                {{ productsNotFoundCount }} lines with unmappable product code
                            </v-chip> -->
                        </div>
                    </v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-text-field
                        v-model="PrincipalsStore.state.currentGeneratedDataSearchKey"
                        label="Search"
                        title="Search"
                        hide-details
                        dense
                        class="mr-3"
                        style="max-width: 200px"
                        flat
                        rounded
                        clearable
                        solo-inverted
                        :disabled="PrincipalsStore.state.currentGeneratedData.length<1"
                    ></v-text-field>

                    <!-- =====================  PENDINGS ====================== -->
                    <!-- <v-btn
                        title="Pending Lines"
                        icon dense rounded depressed
                        color="yellow"
                        @click.stop="dlgPendings = true"
                        disabled
                    >
                        <v-icon>mdi-file-document</v-icon>
                    </v-btn>
                    <v-dialog
                        v-model="dlgPendings"
                        max-width="1200"
                        style="height:600px;"
                        scrollable
                        scrollable-x
                    >
                        <Pendings></Pendings>
                    </v-dialog> -->
                    <!-- =====================  /PENDINGS ====================== -->

                    <!-- MISSING CUSTOMER CODES -->
                    <v-btn
                        title="Missing Customer/s in Principal's Masterfile"
                        icon
                        dense
                        rounded
                        depressed
                        color="warning"
                        @click.stop="dlgMissingCustomers = true"
                        :disabled="missingInMaster('customer').length < 1"
                    >
                        <v-icon>mdi-account-multiple</v-icon>
                    </v-btn>
                    <v-dialog
                        v-model="dlgMissingCustomers"
                        max-width="900"
                        scrollable
                    >
                        <MissingInMaster
                            id='customer'
                            type='customer'
                            title="Missing Customer/s in Principal's Masterfile"
                            :missingInMaster="missingInMaster('customer')"
                        ></MissingInMaster>
                    </v-dialog>
                    <!-- /MISSING CUSTOMER CODES -->

                    <!-- MISSING PRODUCT CODES -->
                    <v-btn
                        title="Missing Product/s in Principal's Masterfile"
                        icon
                        dense
                        rounded
                        depressed
                        color="warning"
                        @click.stop="dlgMissingProducts = true"
                        :disabled="missingInMaster('product').length < 1"
                    >
                        <!-- <v-badge
                        :content="distinctProductCodesNA.length"
                        overlapx
                        bordered
                        color="red"
                    > -->
                        <v-icon>mdi-cube</v-icon>
                        <!-- </v-badge> -->
                    </v-btn>
                    <v-dialog
                        v-model="dlgMissingProducts"
                        persistentx
                        max-width="900"
                        scrollable
                    >
                        <MissingInMaster
                            id='product'
                            type='product'
                            title="Missing Product/s in Principal's Masterfile"
                            :missingInMaster="missingInMaster('product')"
                        ></MissingInMaster>
                    </v-dialog>
                    <!-- /MISSING PRODUCT CODES -->

                    <v-btn
                        title="Save Data and Export to Excel"
                        icon
                        dense
                        rounded
                        outlinedx
                        depressed
                        color="success"
                        @click.stop="confirmExportDialogOpen = true"
                        :disabled="
                            lineCount < 1 ||
                            searchKeyLength > 0 ||
                            productsNotFoundCount > 0 ||
                            customersNotFoundCount > 0
                        "
                    >
                    <!-- :disabled="
                        lineCount < 1 ||
                        searchKeyLength > 0 ||
                        (productsNotFoundCount + customersNotFoundCount) >= lineCount
                    " -->

                        <v-icon>mdi-content-save</v-icon>
                        <!-- &nbsp;
                    Save and Export -->
                    </v-btn>
                    <!-- confirm export dialog -->
                    <v-dialog
                        persistent
                        v-model="confirmExportDialogOpen"
                        max-width="500"
                    >
                        <v-card>
                            <v-card-title>Save and Export</v-card-title>
                            <v-card-text class="text-subtitle-1">
                                <div>
                                    Save generated data to the database and
                                    export to Excel?
                                </div>
                                <!-- <span class="text-caption mt-2">
                                    NOTE: Lines with
                                    <v-chip color="warning" x-small outlined>
                                        warning
                                    </v-chip>
                                    or
                                    <v-chip color="error" x-small outlined>
                                        error
                                    </v-chip>
                                    will be skipped
                                </span> -->
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    @click="saveGeneratedData()"
                                    color="primary"
                                    :loading="isExporting"
                                    text
                                >
                                    Proceed
                                </v-btn>
                                <v-btn
                                    @click="confirmExportDialogOpen = false"
                                    :disabled="isExporting"
                                    text
                                >
                                    Cancel
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-app-bar>
            </v-card-title>

            <v-card-text class="mx-0 px-0">
                <div class="">
                    <div
                        v-if="generatedData.length < 1"
                        class="d-flex justify-center mt-3"
                    >
                        <v-chip color="accent" small>
                            No available data to display
                        </v-chip>
                    </div>
                    <GeneratedTableWrapper
                        v-else
                        :generatedData="generatedData"
                    >
                    </GeneratedTableWrapper>
                </div>
            </v-card-text>

            <!-- <v-bottom-sheet v-model="PrincipalsStore.state.sheetImport">
            <v-sheet class="px-12 pt-6 pb-16">
                <div class="text-h5 mb-4 primary--text">
                    Import and Generate
                </div>
                <InvoicesImport
                    v-if="PrincipalsStore.state.isImportInvoicesVisible"
                ></InvoicesImport>
            </v-sheet>
        </v-bottom-sheet> -->
        </v-card>
    </div>
</template>

<script>
// import InvoicesImport from './InvoicesImport.vue';

export default {
    components: {
        GeneratedTableWrapper: () => import("./GeneratedTableWrapper.vue"),
        InvoicesImport: () => import("./InvoicesImport.vue"),
        // InvoicesImport,
        MissingInMaster: () => import("./MissingInMaster.vue"),
        Settings: () => import("./Settings.vue"),
        Pendings: () => import("./Pendings.vue"),
    },

    data: () => ({
        searchKey: "",
        confirmExportDialogOpen: false,
        isExporting: false,
        // wrapperID: "gendata_wrapper",
        dlgMissingCustomers: null,
        dlgMissingProducts: null,
        dlgPendings: null,
    }),

    computed: {
        generatedData() {
            const data = this.PrincipalsStore.state.currentGeneratedData;
            // const searchRegex = new RegExp(this.searchKey, "i");
            // return data.map(e => {
            //     return [
            //         e[0],
            //         e[1].filter(line => {
            //             return (
            //                 this.searchKey == "" ||
            //                 this.searchKey == null ||
            //                 searchRegex.test(line.customer_code) ||
            //                 searchRegex.test(line.route_code) ||
            //                 searchRegex.test(line.order_no) ||
            //                 searchRegex.test(line.product_code)
            //             );
            //         })
            //     ];
            // });

            return data;
        },

        // overall
        lineCount() {
            let count = 0;
            this.generatedData.forEach(e => {
                count += e[1].length;
            });
            return count;
        },

        // overall
        productsNotFoundCount() {
            // return 1;
            let count = 0;
            this.generatedData.forEach(e => {
                const nf = e[1].filter(line => {
                    return line.product_notfound == 1;
                });
                count += nf.length;
            });
            return count;
        },

        // overall
        customersNotFoundCount() {
            let count = 0;
            this.generatedData.forEach(e => {
                const nf = e[1].filter(line => {
                    return line.customer_notfound == 1;
                });
                count += nf.length;
            });
            return count;
        },

        selectedPrincipalCode() {
            return this.PrincipalsStore.state.selectedPrincipalCode;
        },

        missingCustomers() {
            try {
                let result = [];
                this.PrincipalsStore.state.currentGeneratedData.forEach(e => {
                    let tempArray = [];
                    e[1].forEach(line => {
                        if (line.customer_notfound == 1) {
                            tempArray.push({
                                customer_code: line.customer_code,
                                missing_customer_name: line.missing_customer_name
                            });
                        }
                    });
                    if (tempArray.length > 0) {
                        result.push(...tempArray);
                    }
                });

                let unique = [];
                let distinct = [];
                for( let i = 0; i < result.length; i++ ){
                    if( !unique[result[i].customer_code]){
                        distinct.push(result[i]);
                        unique[result[i].customer_code] = 1;
                    }
                }
                return distinct;

            } catch (error) {
                console.log("missingCustomers() - ERR:", error);
                return [];
            }
        },

        distinctProductCodesNA() {
            try {
                let distinctPCodes = [];
                this.PrincipalsStore.state.currentGeneratedData.forEach(e => {
                    let tempArray = [];
                    e[1].forEach(line => {
                        if (line.product_notfound == 1) {
                            tempArray.push(line.product_code);
                        }
                    });
                    if (tempArray.length > 0) {
                        distinctPCodes.push(...tempArray);
                    }
                });
                distinctPCodes = [...new Set(distinctPCodes)];
                return distinctPCodes;
            } catch (error) {
                console.log("initDistinctProductCodesNA() - ERR:", error);
                return [];
            }
        },

        searchKeyLength() {
            try {
                return this.searchKey.length;
            } catch (error) {
                return 0;
            }
        },

        myStore() {
            return this[this.selectedPrincipalCode];
        },

        // strictExport() {
        //     const strict_export =
        //         this.PrincipalsStore.state.settings
        //             .find(e=>e.name=='strict_export').value;
        //     return strict_export=='1' ? true : false;
        // }
    },

    methods: {
        async saveGeneratedData() {
            // // test
            // const config = this.PrincipalsStore.getHeaderAndFormat(
            //     "generatedDataTableHeader"
            // );
            // this.PrincipalsStore.exportToExcel(
            //     config.header,
            //     this.PrincipalsStore.generatedDataSubset(
            //         this.AppStore.flattenGendata(this.generatedData),
            //         config.format
            //     ),
            //     null,
            //     this.PrincipalsStore.state.selectedPrincipalCode
            // );
            // this.confirmExportDialogOpen = false;
            // // /test

            try {
                this.isExporting = true;
                const url =
                    this.AppStore.state.siteUrl +
                    "principals" +
                    `/${this.selectedPrincipalCode}/invoices/save`;

                const payload = {
                    // raw_invoices: this.PrincipalsStore.state.currentRawInvoices,
                    generated_data: this.generatedData
                };

                let response = await axios.post(url, payload);

                const config = this.PrincipalsStore.getHeaderAndFormat(
                    "generatedDataTableHeader"
                );
                this.PrincipalsStore.exportToExcel(
                    config.header,
                    this.PrincipalsStore.generatedDataSubset(
                        this.AppStore.flattenGendata(this.generatedData),
                        config.format
                    ),
                    null,
                    this.PrincipalsStore.state.selectedPrincipalCode
                );

                this.isExporting = false;
                this.confirmExportDialogOpen = false;
                // this.PrincipalsStore.state.currentGeneratedData = [];
                // this.PrincipalsStore.state.currentRawInvoices = [];

                this.PrincipalsStore.initInvoicesGrandTotal();
                this.PrincipalsStore.initInvoices(
                    this.selectedPrincipalCode,
                    this.AppStore.state.strDateToday
                );
                this.PrincipalsStore.initCurrentGeneratedData(this.selectedPrincipalCode);
            } catch (error) {
                console.log("saveGeneratedData():", error);
            }
        },

        missingInMaster(type) {
            try {
                let result = [];
                this.PrincipalsStore.state.currentGeneratedData.forEach(e => {
                    let tempArray = [];
                    e[1].forEach(line => {
                        if (line.customer_notfound == 1) {
                            if(type=='customer') {
                                tempArray.push({
                                    customer_code: line.customer_code,
                                    missing_customer_name: line.missing_customer_name
                                });
                            }
                        } else if (line.product_notfound == 1) {
                            if (type=='product') {
                                tempArray.push({
                                    product_code: line.product_code,
                                    missing_product_name: line.missing_product_name
                                });
                            }
                        }
                    });
                    if (tempArray.length > 0) {
                        result.push(...tempArray);
                    }
                });

                let unique = [];
                let distinct = [];
                for( let i = 0; i < result.length; i++ ){
                    if( !unique[result[i][type + '_code']]){
                        distinct.push(result[i]);
                        unique[result[i][type + '_code']] = 1;
                    }
                }
                return distinct;

            } catch (error) {
                console.log("missingInMaster() - ERR:", error);
                return [];
            }
        },
    },

    created() {
        this.PrincipalsStore.initCurrentGeneratedData(this.selectedPrincipalCode);
    },

    mounted() {
        console.log("Generated component mounted");
        console.log(this.missingCustomers);
        console.log(this.PrincipalsStore.initCurrentGeneratedData(this.selectedPrincipalCode));
    }
};
</script>

<style scoped></style>
