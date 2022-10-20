<template>
    <v-card>
        <v-card-text>
            <v-row>
                <v-col>
                    <v-text-field
                        v-model="dateRangeText"
                        label="Posting Date"
                        hide-details
                        readonly
                        dense
                        outlined
                        rounded
                        @click.stop="datePickerShown=true"
                        style="max-width:500px;min-width:250px;"
                        :disabled="PrincipalsStore.state.isGeneratingData"
                    ></v-text-field>
                    <!-- DATEPICKER -->
                    <v-dialog
                        ref="datePicker"
                        v-model="datePickerShown"
                        :return-value.sync="PrincipalsStore.state.posting_date_range"
                        width="290px"
                    >
                        <v-date-picker
                            v-model="PrincipalsStore.state.posting_date_range"
                            scrollable range
                        >
                            <v-spacer></v-spacer>
                            <v-btn
                                text
                                color="primary"
                                @click="datePickerShown = false"
                            >
                                Cancel
                            </v-btn>
                            <v-btn
                                text
                                color="primary"
                                @click="
                                    $refs.datePicker.save(PrincipalsStore.state.posting_date_range);
                                "
                            >
                                Ok
                            </v-btn>
                        </v-date-picker>
                    </v-dialog>
                    <!-- /DATEPICKER -->
                </v-col>

                <v-col>
                    <v-select
                        :items="selPrincipalStore.state.generatedDataHistoryFilters[0]"
                        v-model="PrincipalsStore.state.selectedGroupBy"
                        label="Group By"
                        item-text="text"
                        item-value="value"
                        style="max-width:500px;min-width:200px;"
                        outlined
                        rounded
                        hide-details
                        dense
                        :disabled="PrincipalsStore.state.isGeneratingData"
                    >
                    </v-select>
                </v-col>

                <v-col>
                    <v-select
                        :items="InvoicesStore.state.invoiceStatuses"
                        v-model="InvoicesStore.state.invoiceStatus"
                        label="Status"
                        item-text="status"
                        item-value="value"
                        style="max-width:180px;"
                        outlined
                        rounded
                        hide-details
                        dense
                    ></v-select>
                </v-col>

                <v-col>
                    <!-- reload -->
                    <v-btn
                        title="Generate Templated"
                        dense
                        rounded
                        @click="refresh()"
                        :loading="PrincipalsStore.state.isGeneratingData"
                        color="secondary"
                    >
                        <!-- <v-icon>mdi-tray-arrow-down</v-icon> -->
                        Generate
                    </v-btn>
                </v-col>

                <v-col>
                    <!-- ********************* EXPORT ************************ -->
                    <v-btn
                        title="Export to Excel"
                        dense
                        rounded
                        color="primary"
                        block
                        @click.stop="
                            PrincipalsStore.state.confirmExportDialogOpen = true
                        "
                        :disabled="
                            lineCount < 1
                            || searchKeyLength > 0
                            || PrincipalsStore.state.isGeneratingData
                        "
                    >
                        <v-icon left size="25">mdi-file-excel</v-icon>
                        Export
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-text>

        <!-- search -->
        <!-- <v-text-field
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
        ></v-text-field> -->

        <!-- ***************************************************************** -->
        <!-- ********************* DIALOGS *********************************** -->
        <!-- ***************************************************************** -->

        <!-- confirm export dialog -->
        <v-dialog
            persistent
            v-model="PrincipalsStore.state.confirmExportDialogOpen"
            max-width="500"
        >
            <ConfirmExport
                :key="
                    'confirm_export_' +
                        PrincipalsStore.state.selectedPrincipalCode
                "
            >
            </ConfirmExport>
        </v-dialog>
        <!-- ********************* /EXPORT ************************ -->

        <!-- ***************************************************************** -->
        <!-- ********************* /DIALOGS ********************************** -->
        <!-- ***************************************************************** -->
    </v-card>
</template>

<script>
import InvoicesStore from '../../../stores.custom/InvoicesStore';
import PrincipalsStore from '../../../stores.custom/PrincipalsStore';

export default {
    props: ['lineCount','warningsCount'],

    components: {
        MissingInMaster: () => import("./MissingInMaster.vue"),
        ConfirmExport: () => import("./ConfirmExport.vue"),
    },

    data() {
        return {
            dlgMissingCustomers: null,
            dlgMissingItems: null,
            dlgMissingSalesmen: null,
            datePickerShown: false,
        };
    },

    computed: {
        generatedData() {
            return PrincipalsStore.state.currentGeneratedData;
        },

        selectedPrincipalCode() {
            return PrincipalsStore.state.selectedPrincipalCode;
        },

        searchKeyLength() {
            try {
                return PrincipalsStore.state.currentGeneratedDataSearchKey.length;
            } catch (error) {
                return 0;
            }
        },
        selPrincipalStore() {
            return this[PrincipalsStore.state.selectedPrincipalCode];
        },
        dateRangeText() {
            return PrincipalsStore.state.posting_date_range.join(' ~ ');
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
            PrincipalsStore.initCurrentGeneratedData(null,InvoicesStore.state.invoiceStatus);
            PrincipalsStore.state.currentGeneratedDataSearchKey = '';
        },
    },

    created() {
        InvoicesStore.state.invoiceStatus='pending';
    },

    mounted() {
        console.log("GeneratedActions component mounted");
    }
};
</script>
