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
                                v-if="customersNotFoundCount > 0 || itemsNotFoundCount > 0"
                                class="px-1 warning--text"
                            >
                                {{ customersNotFoundCount > itemsNotFoundCount ?
                                    customersNotFoundCount : itemsNotFoundCount }} total warning/s
                            </v-chip>
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

                    <!-- MISSING ITEM CODES -->
                    <v-btn
                        title="Missing Item/s in Principal's Masterfile"
                        icon
                        dense
                        rounded
                        depressed
                        color="warning"
                        @click.stop="dlgMissingItems = true"
                        :disabled="missingInMaster('item').length < 1"
                    >
                        <v-icon>mdi-cube</v-icon>
                    </v-btn>
                    <v-dialog
                        v-model="dlgMissingItems"
                        persistentx
                        max-width="900"
                        scrollable
                    >
                        <MissingInMaster
                            id='item'
                            type='item'
                            title="Missing Item/s in Principal's Masterfile"
                            :missingInMaster="missingInMaster('item')"
                        ></MissingInMaster>
                    </v-dialog>
                    <!-- /MISSING ITEM CODES -->

                    <v-btn
                        title="Save Data and Export to Excel"
                        icon
                        dense
                        rounded
                        outlinedx
                        depressed
                        color="success"
                        @click.stop="PrincipalsStore.state.confirmExportDialogOpen = true"
                        :disabled="
                            lineCount < 1 ||
                            searchKeyLength > 0 ||
                            (itemsNotFoundCount + customersNotFoundCount) >= lineCount
                        "
                    >
                    <!-- kaloy 2022-04-18 -->
                    <!-- :disabled="
                            lineCount < 1 ||
                            searchKeyLength > 0 ||
                            itemsNotFoundCount > 0 ||
                            customersNotFoundCount > 0
                        " -->

                    <!-- :disabled="
                        lineCount < 1 ||
                        searchKeyLength > 0 ||
                        (itemsNotFoundCount + customersNotFoundCount) >= lineCount
                    " -->

                        <v-icon>mdi-content-save</v-icon>
                    </v-btn>
                    <!-- confirm export dialog -->
                    <v-dialog
                        persistent
                        v-model="PrincipalsStore.state.confirmExportDialogOpen"
                        max-width="500"
                    >
                        <ConfirmExport
                            :id="'confirm_export_' + PrincipalsStore.state.selectedPrincipalCode"
                        >
                        </ConfirmExport>
                    </v-dialog>
                </v-app-bar>
            </v-card-title>

            <v-card-text class="mx-0 px-0">
                <div class="">
                    <div
                        v-if="generatedData.length < 1"
                        class="d-flex justify-center mt-3"
                    >
                        <v-sheet v-if="PrincipalsStore.state.isGeneratingData">
                            <v-progress-circular
                                :size="70"
                                :width="7"
                                color="accent"
                                indeterminate
                            ></v-progress-circular>
                        </v-sheet>
                        <v-chip v-else color="accent" small>
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
        </v-card>
    </div>
</template>

<script>
// import InvoicesImport from './InvoicesImport.vue';

export default {
    components: {
        GeneratedTableWrapper: () => import("./GeneratedTableWrapper.vue"),
        InvoicesImport: () => import("./InvoicesImport.vue"),
        MissingInMaster: () => import("./MissingInMaster.vue"),
        Settings: () => import("./Settings.vue"),
        Pendings: () => import("./Pendings.vue"),
        ConfirmExport: () => import("./ConfirmExport.vue"),
    },

    data() {
        return {
            searchKey: "",
            dlgMissingCustomers: null,
            dlgMissingItems: null,
            dlgPendings: null,
        }
    },


    computed: {
        generatedData() {
            return this.PrincipalsStore.state.currentGeneratedData;
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
        itemsNotFoundCount() {
            // return 1;
            let count = 0;
            this.generatedData.forEach(e => {
                const nf = e[1].filter(line => {
                    return line.item_notfound == 1;
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

        distinctItemCodesNA() {
            try {
                let distinctPCodes = [];
                this.PrincipalsStore.state.currentGeneratedData.forEach(e => {
                    let tempArray = [];
                    e[1].forEach(line => {
                        if (line.item_notfound == 1) {
                            tempArray.push(line.item_code);
                        }
                    });
                    if (tempArray.length > 0) {
                        distinctPCodes.push(...tempArray);
                    }
                });
                distinctPCodes = [...new Set(distinctPCodes)];
                return distinctPCodes;
            } catch (error) {
                console.log("initDistinctItemCodesNA() - ERR:", error);
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
        missingInMaster(type) {
            try {
                let result = [];
                this.PrincipalsStore.state.currentGeneratedData.forEach(e => {
                    let tempArray = [];
                    e[1].forEach(line => {
                        if(type=='customer') {
                            if(line.customer_notfound == 1) {
                                tempArray.push({
                                    customer_code: line.customer_code,
                                    missing_customer_name: line.missing_customer_name
                                });
                            }
                        } else if (type=='item') {
                            if(line.item_notfound == 1) {
                                tempArray.push({
                                    item_code: line.item_code,
                                    missing_item_name: line.missing_item_name
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
    }
};
</script>

<style scoped></style>
