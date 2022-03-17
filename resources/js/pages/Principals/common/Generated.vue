<template>
<div class="pt-4">
    <v-sheet class="px-3">
        <InvoicesImport></InvoicesImport>
    </v-sheet>
    <v-card class="elevation-0" color="">
        <v-card-title class="pa-0">
            <v-app-bar elevation="0" colorx="white">
                <v-toolbar-title>
                    Generated Data
                    <div v-if="lineCount > 0">
                        <v-chip x-small outlinedx label color="primary">
                            {{ lineCount }} total line/s
                        </v-chip>
                        <v-chip
                            x-small
                            outlinedx
                            label
                            color="warning"
                            v-if="customersNotFoundCount > 0"
                        >
                            {{ customersNotFoundCount }} warning/s
                        </v-chip>
                        <v-chip
                            x-small
                            outlinedx
                            label
                            color="error"
                            v-if="productsNotFoundCount > 0"
                        >
                            {{ productsNotFoundCount }} error/s
                        </v-chip>
                    </div>
                </v-toolbar-title>

                <v-spacer></v-spacer>

                <v-text-field
                    v-model="searchKey"
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
                    :disabled="PrincipalsStore.state.currentGeneratedData.length < 1"
                ></v-text-field>

                <!-- <v-btn
                    title="Import and Generate"
                    icon
                    dense
                    rounded
                    outlinedx
                    depressed
                    color="default"
                    @click.stop="PrincipalsStore.state.sheetImport =
                        !PrincipalsStore.state.sheetImport"
                >
                    <v-icon>mdi-file-upload</v-icon>
                </v-btn> -->

                <!-- UNKNOWN CUSTOMER CODES -->

                    <v-btn
                        title="Unknown Customer Codes"
                        icon
                        dense
                        rounded
                        outlinedx
                        depressed
                        color="warning"
                        @click.stop="dlgDistinctCustomerCodesNA=true"
                        :disabled="distinctCustomerCodesNA.length < 1"
                    >
                        <!-- <v-badge
                            :content="distinctCustomerCodesNA.length"
                            overlapx
                            bordered
                            color="orange"
                        > -->
                            <v-icon>mdi-account-multiple</v-icon>
                        <!-- </v-badge> -->
                    </v-btn>
                <v-dialog v-model="dlgDistinctCustomerCodesNA"
                    persistentx max-width="520" scrollable
                >
                    <UnknownCodes
                        title="Unknown Customer Codes"
                        :unknownCodes="distinctCustomerCodesNA"
                        type="warning"
                        temptxt_id="temptxt_customers"
                    ></UnknownCodes>
                </v-dialog>
                <!-- /UNKNOWN CUSTOMER CODES -->

                <!-- UNKNOWN PRODUCT CODES -->

                <v-btn
                    title="Unknown Product Codes"
                    icon
                    dense
                    rounded
                    outlinedx
                    depressed
                    color="error"
                    @click.stop="dlgDistinctProductCodesNA=true"
                    :disabled="distinctProductCodesNA.length < 1"
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
                <v-dialog v-model="dlgDistinctProductCodesNA"
                    persistentx max-width="500"
                    scrollable
                >
                    <UnknownCodes
                        title="Unknown Product Codes"
                        :unknownCodes="distinctProductCodesNA"
                        type="error"
                        temptxt_id="temptxt_products"
                    ></UnknownCodes>
                </v-dialog>
                <!-- /UNKNOWN PRODUCT CODES -->

                <v-btn
                    title="Save Data and Export to Excel"
                    icon
                    dense
                    rounded
                    outlinedx
                    depressed
                    color="success"
                    @click.stop="confirmExportDialogOpen=true"
                    :disabled="lineCount < 1
                        || searchKeyLength > 0
                        || (productsNotFoundCount+customersNotFoundCount)>=lineCount"
                >
                    <v-icon>mdi-content-save-all</v-icon>
                    <!-- &nbsp;
                    Save and Export -->
                </v-btn>
                <!-- confirm export dialog -->
                <v-dialog persistent v-model="confirmExportDialogOpen" max-width="500">
                    <v-card>
                        <v-card-title>Save and Export</v-card-title>
                        <v-card-text class="text-subtitle-1">
                            <div>
                                Save generated data to the database and export to Excel?
                            </div>
                            <span class="text-caption mt-2">
                                NOTE: Lines with
                                <v-chip color="warning" x-small outlined>
                                    warning
                                </v-chip>
                                 or
                                 <v-chip color="error" x-small outlined>
                                    error
                                </v-chip>
                                will be skipped
                            </span>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                @click="saveInvoices()"
                                color="primary"
                                :loading="isExporting" text
                            >
                                Proceed
                            </v-btn>
                            <v-btn @click="confirmExportDialogOpen = false"
                                :disabled="isExporting" text>
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
                    <v-chip color="secondary" small>
                        No available data to display
                    </v-chip>
                </div>
                <GeneratedTableWrapper
                    v-else
                    :id="wrapperID"
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
        UnknownCodes: () => import("./UnknownCodes.vue"),
        Settings: () => import("./Settings.vue"),
    },

    data: () => ({
        searchKey: "",
        confirmExportDialogOpen: false,
        isExporting: false,
        wrapperID: 'gendata_wrapper',
        dlgDistinctCustomerCodesNA: null,
        dlgDistinctProductCodesNA: null,
    }),

    computed: {
        generatedData() {
            const data = this.PrincipalsStore.state.currentGeneratedData;
            const searchRegex = new RegExp(this.searchKey, "i");
            return data.map(e => {
                return [
                    e[0],
                    e[1].filter(line => {
                        return (
                            this.searchKey == "" ||
                            this.searchKey == null ||
                            searchRegex.test(line.customer_code) ||
                            searchRegex.test(line.route_code) ||
                            searchRegex.test(line.order_no) ||
                            searchRegex.test(line.product_code)
                        );

                    })
                ];
            });
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

        // distinctCustomerCodesNA_old() {
        //     try {
        //         let distinctCCodes = [];
        //         this.generatedData.forEach(e => {
        //             if(e[0] == 'Customer_NA') {
        //                 let tempArray = e[1].map(line => line.customer_code);
        //                 distinctCCodes = [...new Set(tempArray)];
        //                 return;
        //             }
        //         });
        //         return distinctCCodes;
        //     } catch (error) {
        //         console.log('initDistinctProductCodesNA() - ERR:', error);
        //         return [];
        //     }
        // },

        distinctCustomerCodesNA() {
            try {
                let distinctCCodes = [];
                this.PrincipalsStore.state.currentGeneratedData.forEach(e => {
                    let tempArray = [];
                    e[1].forEach(line => {
                        if(line.customer_notfound==1) {
                            tempArray.push(line.customer_code);
                        }
                    });
                    if(tempArray.length > 0) {
                        distinctCCodes.push(...tempArray);
                    }
                });
                distinctCCodes = [...new Set(distinctCCodes)];
                return distinctCCodes;
            } catch (error) {
                console.log('distinctCustomerCodesNA() - ERR:', error);
                return [];
            }
        },

        distinctProductCodesNA() {
            try {
                let distinctPCodes = [];
                this.PrincipalsStore.state.currentGeneratedData.forEach(e => {
                    let tempArray = [];
                    e[1].forEach(line => {
                        if(line.product_notfound==1) {
                            tempArray.push(line.product_code);
                        }
                    });
                    if(tempArray.length > 0) {
                        distinctPCodes.push(...tempArray);
                    }
                });
                distinctPCodes = [...new Set(distinctPCodes)];
                return distinctPCodes;
            } catch (error) {
                console.log('initDistinctProductCodesNA() - ERR:', error);
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

        // sus for removal
        // settingNames() {
        //     return Object.keys(this.myStore.state.settings);
        // },

        myStore() {
            return this[this.selectedPrincipalCode];
        }
    },

    methods: {
        async saveInvoices() {
            try {
                this.isExporting = true;
                const url = this.AppStore.state.siteUrl + 'principals/' +
                    this.selectedPrincipalCode + '/invoices/save';

                const payload = {
                    raw_invoices: this.PrincipalsStore.state.currentRawInvoices,
                    generated_data: this.generatedData,
                }

                let response = await axios.post(url, payload);

                const config = this.PrincipalsStore
                    .getHeaderAndFormat('generatedDataTableHeader');

                this.PrincipalsStore.exportToExcel(
                    config.header,
                    this.PrincipalsStore.generatedDataSubset(
                        this.generatedData,
                        config.format
                    ),
                    null,
                    this.PrincipalsStore.state.selectedPrincipalCode
                );

                this.isExporting = false;
                this.confirmExportDialogOpen = false;
                this.PrincipalsStore.state.currentGeneratedData = [];
                this.PrincipalsStore.state.currentRawInvoices = [];
                this.myStore.state.currentGeneratedData = [];
                this.myStore.state.currentRawInvoices = [];

                this.PrincipalsStore.initInvoicesGrandTotal();
                this.PrincipalsStore.initInvoices(
                    this.selectedPrincipalCode,
                    this.AppStore.state.strDateToday
                );
            } catch (error) {
                console.log('saveInvoices():', error);
            }

        },

    },

    created() {
    },

    mounted() {
        console.log("Generated component mounted");

    }
};
</script>

<style scoped></style>
