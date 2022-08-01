<template>
<div>
    <v-app-bar elevation="0">

        <!-- search -->
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
            :disabled="
                PrincipalsStore.state.currentGeneratedData.length < 1
            "
        ></v-text-field>

        <!-- refresh -->
        <v-btn
            title="Refresh"
            icon
            dense
            rounded
            depressed
            class="mr-2"
            @click="refresh()"
        >
            <v-icon>mdi-refresh</v-icon>
        </v-btn>

        <!-- ********************* UNMAPPED SHITS ************************* -->
        <!-- UNMAPPED CUSTOMERS -->
        <!-- <v-btn
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
        <v-dialog v-model="dlgMissingCustomers" max-width="700" scrollable>
            <MissingInMaster
                id="customer"
                type="customer"
                title="Unmapped Customer/s"
                :missingInMaster="missingInMaster('customer')"
            ></MissingInMaster>
        </v-dialog> -->
        <!-- /UNMAPPED CUSTOMERS -->

        <!-- UNMAPPED ITEMS -->
        <!-- <v-btn
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
                id="item"
                type="item"
                title="Unmapped Item/s"
                :missingInMaster="missingInMaster('item')"
            ></MissingInMaster>
        </v-dialog> -->
        <!-- /UNMAPPED ITEMS -->

        <!-- UNMAPPED SALESMEN -->
        <!-- <v-btn
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
                id="salesman"
                type="salesman"
                title="Unmapped Salesmen"
                :missingInMaster="missingInMaster('salesman')"
            ></MissingInMaster>
        </v-dialog> -->
        <!-- /UNMAPPED SALESMEN -->
        <!-- ********************* /UNMAPPED SHITS ************************* -->

        <!-- ********************* EXPORT ************************ -->
        <v-btn
            title="Export to Excel"
            iconx
            dense
            rounded
            outlinedx
            depressed
            color="primary"
            @click.stop="
                PrincipalsStore.state.confirmExportDialogOpen = true
            "
            :disabled="
                lineCount < 1 ||
                    searchKeyLength > 0 ||
                    warningsCount >= lineCount
            "
        >
            <v-icon left size="25">mdi-file-excel</v-icon>
            Export({{ lineCount - warningsCount }})
        </v-btn>
        <!-- confirm export dialog -->
        <v-dialog
            persistent
            v-model="PrincipalsStore.state.confirmExportDialogOpen"
            max-width="500"
        >
            <ConfirmExport
                :id="
                    'confirm_export_' +
                        PrincipalsStore.state.selectedPrincipalCode
                "
            >
            </ConfirmExport>
        </v-dialog>
        <!-- ********************* /EXPORT ************************ -->

    </v-app-bar>
</div>
</template>

<script>
export default {
    props: ['lineCount','warningsCount'],

    components: {
        MissingInMaster: () => import("./MissingInMaster.vue"),
        ConfirmExport: () => import("./ConfirmExport.vue")
    },

    data() {
        return {
            dlgMissingCustomers: null,
            dlgMissingItems: null,
            dlgMissingSalesmen: null,
            // dlgPendings: null
        };
    },

    computed: {
        generatedData() {
            return this.PrincipalsStore.state.currentGeneratedData;
        },

        selectedPrincipalCode() {
            return this.PrincipalsStore.state.selectedPrincipalCode;
        },

        searchKeyLength() {
            try {
                return this.PrincipalsStore.state.currentGeneratedDataSearchKey.length;
            } catch (error) {
                return 0;
            }
        },
    },

    methods: {
        missingInMaster(type) {
            try {
                let result = [];
                if (this.generatedData.length > 0) {
                    this.generatedData[0].output_template.forEach(e => {
                        let tempArray = [];
                        e[1].forEach(line => {
                            if (type == "customer") {
                                if (line.customer_notfound == 1) {
                                    tempArray.push({
                                        customer_code: line.customer_code,
                                        missing_customer_name:
                                            line.missing_customer_name
                                    });
                                }
                            } else if (type == "item") {
                                if (line.item_notfound == 1) {
                                    tempArray.push({
                                        item_code: line.item_code,
                                        missing_item_name:
                                            line.missing_item_name
                                    });
                                }
                            } else if (type == "salesman") {
                                if (line.salesman_notfound == 1) {
                                    tempArray.push({
                                        // bit of hacking here haha..
                                        real_salesman_code:
                                            line.alturas_sm_code,
                                        salesman_code:
                                            line.missing_salesman_name,
                                        missing_salesman_name:
                                            line.missing_salesman_name
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
                for (let i = 0; i < result.length; i++) {
                    if (!unique[result[i][type + "_code"]]) {
                        distinct.push(result[i]);
                        unique[result[i][type + "_code"]] = 1;
                    }
                }
                return distinct;
            } catch (error) {
                console.log("missingInMaster() - ERR:", error);
                return [];
            }
        },

        refresh() {
            this.PrincipalsStore.initCurrentGeneratedData(this.selectedPrincipalCode);
            this.PrincipalsStore.state.currentGeneratedDataSearchKey = '';
        },
    },

    mounted() {
        console.log("GeneratedActions component mounted");
    }
};
</script>
