<template>
    <div class="">
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
                                v-if="warningsCount > 0"
                                class="px-1 warning--text"
                            >
                                {{ warningsCount }} total warning(s)
                            </v-chip>
                        </div>
                    </v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-btn
                        title="Refresh"
                        icon
                        dense
                        rounded
                        depressed
                        class="mr-2"
                        @click="PrincipalsStore.initCurrentGeneratedData(selectedPrincipalCode)"
                    >
                        <v-icon>mdi-refresh</v-icon>
                    </v-btn>

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

                    <!-- UNMAPPED CUSTOMERS -->
                    <v-btn
                        title="Unmapped Customer/s"
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
                        max-width="700"
                        scrollable
                    >
                        <MissingInMaster
                            id='customer'
                            type='customer'
                            title="Unmapped Customer/s"
                            :missingInMaster="missingInMaster('customer')"
                        ></MissingInMaster>
                    </v-dialog>
                    <!-- /UNMAPPED CUSTOMERS -->

                    <!-- UNMAPPED ITEMS -->
                    <v-btn
                        title="Unmapped Item/s"
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
                            title="Unmapped Item/s"
                            :missingInMaster="missingInMaster('item')"
                        ></MissingInMaster>
                    </v-dialog>
                    <!-- /UNMAPPED ITEMS -->

                    <!-- UNMAPPED SALESMEN -->
                    <v-btn
                        title="Unmapped Salesmen"
                        icon
                        dense
                        rounded
                        depressed
                        color="warning"
                        @click.stop="dlgMissingSalesmen = true"
                        :disabled="missingInMaster('salesman').length < 1"
                    >
                        <v-icon>mdi-account</v-icon>
                    </v-btn>
                    <v-dialog
                        v-model="dlgMissingSalesmen"
                        persistentx
                        max-width="600"
                        scrollable
                    >
                        <MissingInMaster
                            id='salesman'
                            type='salesman'
                            title="Unmapped Salesmen"
                            :missingInMaster="missingInMaster('salesman')"
                        ></MissingInMaster>
                    </v-dialog>
                    <!-- /UNMAPPED SALESMEN -->

                    <v-btn
                        title="Export to Excel"
                        iconx
                        dense
                        rounded
                        outlinedx
                        depressedx
                        color="white"
                        @click.stop="PrincipalsStore.state.confirmExportDialogOpen = true"
                        :disabled="
                            lineCount < 1
                            || searchKeyLength > 0
                            || warningsCount >= lineCount
                        "
                    >
                        Export
                        <v-icon right color="success" size="25">mdi-file-excel</v-icon>
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
                    <div v-if="PrincipalsStore.state.isGeneratingData"
                        class="d-flex justify-center mt-6"
                    >
                        <v-progress-circular
                            :size="50"
                            :width="4"
                            color="accent"
                            indeterminate
                        ></v-progress-circular>
                    </div>
                    <div v-else>
                        <div
                            v-if="
                                generatedData.length < 1
                                || generatedData[0].output_template.length < 1
                            "
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
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>

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
            dlgMissingSalesmen: null,
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
            // this.generatedData.forEach(e => {
            //     count += e.output_template[1].length;
            // });
            if(this.generatedData.length > 0) {
                this.generatedData[0].output_template.forEach(e => {
                    count += e[1].length;
                });
            }
            return count;
        },

        // overall
        warningsCount() {
            let count = 0;
            if(this.generatedData.length > 0) {
                this.generatedData[0].output_template.forEach(e => {
                    const nf = e[1].filter(line => {
                        return line.customer_notfound == 1 || line.item_notfound == 1
                            || line.salesman_notfound == 1;
                    });
                    count += nf.length;
                });
            }
            return count;
        },

        selectedPrincipalCode() {
            return this.PrincipalsStore.state.selectedPrincipalCode;
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

    },

    methods: {
        missingInMaster(type) {
            try {
                let result = [];
                if(this.generatedData.length > 0) {
                    this.generatedData[0].output_template.forEach(e => {
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
                            } else if (type=='salesman') {
                                if(line.salesman_notfound == 1) {
                                    tempArray.push({
                                        // bit of hacking here haha..
                                        real_salesman_code: line.alturas_sm_code,
                                        salesman_code: line.missing_salesman_name,
                                        missing_salesman_name: line.missing_salesman_name,
                                    });
                                }
                            }
                        });
                        if (tempArray.length > 0) {
                            result.push(...tempArray);
                        }
                    });
                }

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
