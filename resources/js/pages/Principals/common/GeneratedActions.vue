<template>
    <v-card max-width="300">
        <v-card-text>
            <v-row>

                <!-- posting date -->
                <v-col cols="12">
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
                                text dense depressed rounded
                                @click="datePickerShown = false"
                            >
                                Cancel
                            </v-btn>
                            <v-btn
                                dense depressed rounded
                                color="primary"
                                @click="
                                    $refs.datePicker.save(PrincipalsStore.state.posting_date_range);
                                    refresh();
                                "
                            >
                                Ok
                            </v-btn>
                        </v-date-picker>
                    </v-dialog>
                    <!-- /DATEPICKER -->
                </v-col>

                <!-- status -->
                <v-col cols="12">
                    <v-select
                        :items="PrincipalsStore.state.configs.generatedDataHistoryFilters[0]"
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

                <!-- group by -->
                <v-col cols="12">
                    <v-select
                        :items="InvoicesStore.state.invoiceStatuses"
                        v-model="InvoicesStore.state.invoiceStatus"
                        label="Status"
                        item-text="status"
                        item-value="value"
                        style="max-width:500px;min-width:200px;"
                        outlined
                        rounded
                        hide-details
                        dense
                    ></v-select>
                </v-col>

                <!-- <v-col cols="12">
                    <v-btn
                        title="Generate Templated"
                        class=""
                        dense
                        rounded
                        block
                        @click="refresh()"
                        :loading="PrincipalsStore.state.isGeneratingData"
                        color="primary"
                    >
                        Generate
                    </v-btn>
                </v-col> -->

                <v-col cols="12">
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
                        :disabled="disableExportBtn"
                    >
                        <!-- <v-icon left size="25">mdi-file-excel</v-icon> -->
                        Export to Excel
                    </v-btn>
                </v-col>

                <v-col cols="12">
                    <v-btn
                        v-if="beatrouteUploading"
                        title=""
                        dense
                        rounded
                        color="primary"
                        block
                        @click.stop="showBRUploadDialog"
                        :disabled="disableBRUploadButton"
                    >
                        BeatRoute Upload
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
                    'confirm_export_' + selectedPrincipalCode
                "
            >
            </ConfirmExport>
        </v-dialog>
        <!-- ********************* /EXPORT ************************ -->

        <!-- BR upload dialog -->
        <v-dialog
            persistent
            v-model="BrStore.state.brUploadDialogOpen"
            max-width="100%"
            scrollable
            fullscreen
        >
            <BRUpload
                :key="
                    'br_upload_' + selectedPrincipalCode +
                    '_' + currentTimestamp
                "

            >
            </BRUpload>
        </v-dialog>
        <!-- ********************* /BR upload ************************ -->

        <!-- ***************************************************************** -->
        <!-- ********************* /DIALOGS ********************************** -->
        <!-- ***************************************************************** -->
    </v-card>
</template>


<script>
export default {
    props: ['lineCount', 'warningsCount'],

    components: {
        // MissingInMaster: () => import("./MissingInMaster.vue"),
        ConfirmExport: () => import("./ConfirmExport.vue"),
        BRUpload: () => import("./BRUpload.vue"),
    },

    data() {
        return {
            dlgMissingCustomers: null,
            dlgMissingItems: null,
            dlgMissingSalesmen: null,
            datePickerShown: false,
            currentTimestamp: '',
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
        dateRangeText() {
            return this.PrincipalsStore.state.posting_date_range.join(' ~ ');
        },
        invoiceStatus() {
            return this.InvoicesStore.state.invoiceStatus;
        },
        selectedGroupBy() {
            return this.PrincipalsStore.state.selectedGroupBy;
        },
        disableExportBtn() {
            if(
                this.PrincipalsStore.state.configs.strict_export != undefined
                && this.PrincipalsStore.state.configs.strict_export == true
            ) {
                return this.lineCount < 1
                    || this.searchKeyLength > 0
                    || this.PrincipalsStore.state.isGeneratingData
                    || (this.warningsCount > 0 && this.invoiceStatus == 'pending')
                    || this.invoiceStatus == ''
                    ;
            } else {
                return this.lineCount < 1
                    || this.searchKeyLength > 0
                    || this.PrincipalsStore.state.isGeneratingData
                    || this.invoiceStatus == ''
                    ;
            }
        },
        beatrouteUploading() {
            return this.PrincipalsStore.state.configs.beatroute_uploading != undefined
                && this.PrincipalsStore.state.configs.beatroute_uploading == true;
        },
        disableBRUploadButton() {
            return this.lineCount < 1
                || this.searchKeyLength > 0
                || this.PrincipalsStore.state.isGeneratingData
                // || this.warningsCount > 0
                || this.InvoicesStore.state.invoiceStatus != 'completed' && this.InvoicesStore.state.invoiceStatus != 'uploaded'
                ;
        }
    },

    watch: {
        invoiceStatus() {
            this.refresh();
        },
        selectedGroupBy() {
            this.refresh();
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
            if(this.invoiceStatus != '') {
                this.PrincipalsStore.initCurrentGeneratedData(
                    null,
                    this.InvoicesStore.state.invoiceStatus,
                    this.PrincipalsStore.state.configs.posting_date_format ?? 'm/d/Y'
                );
                this.PrincipalsStore.state.currentGeneratedDataSearchKey = '';
            }

        },

        showBRUploadDialog() {
            this.currentTimestamp = Date.now();
            this.BrStore.state.brUploadDialogOpen = true;
        }
    },

    created() {
        // this.InvoicesStore.state.invoiceStatus='pending';
    },

    mounted() {
        console.log("GeneratedActions component mounted");
    }
};
</script>
