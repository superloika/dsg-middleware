<template>
    <v-card>
        <v-toolbar elevation="0">
            <v-toolbar-title>
                <v-icon color="primary">mdi-cloud-upload</v-icon>
                BeatRoute Upload
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
                color="primary"
                rounded dense depressed
                @click="upload"
                class="ml-2"
                :disabled="
                    !batches.length
                    || stillUploading
                    || !enableReupload && uploadAttempts > 0
                "
            >
                {{ enableReupload ? 'Reupload failed batch(es)' : 'Upload' }}
            </v-btn>
            <v-btn
                @click.stop="cancel"
                rounded dense depressed
                class="ml-2"
                :disabled="stillUploading"
            >
                Close
            </v-btn>
        </v-toolbar>

        <v-card-text class="pt-2">
            <!-- <v-row>

            </v-row> -->
            <v-row>
                <v-col cols="12" md="2">
                    <v-tabs v-model="tab" vertical grow>
                        <v-tab
                            v-for="(b,i) in batches"
                            :key="i"
                        >
                            <div class="px-2 font-weight-bold text-left">
                                Batch {{ i+1 }} of {{ batches.length }}
                                <v-progress-circular
                                    v-if="batchUploadStates[i]=='uploading'"
                                    indeterminate dark
                                    :size="20"
                                ></v-progress-circular>
                                <v-icon color="success" v-else-if="batchUploadStates[i]=='success'">
                                    mdi-check-circle
                                </v-icon>
                                <v-icon color="error" v-else-if="batchUploadStates[i]=='failed'">
                                    mdi-alert
                                </v-icon>
                            </div>
                        </v-tab>
                    </v-tabs>
                </v-col>

                <v-col cols="12" md="10">
                    <v-tabs-items v-model="tab">
                        <v-tab-item
                            v-for="(b,batchIndex) in batches"
                            :key="batchIndex"
                        >
                            <v-container fluid>
                                <v-expansion-panels focusable multiple>
                                    <v-expansion-panel
                                        v-for="(invoice,i) in b"
                                        :key="i"
                                    >
                                        <v-expansion-panel-header>
                                            <div
                                                class="text-caption font-weight-boldx"
                                                :class="invoice.upload_status.success == true ?
                                                    'primary--text'
                                                    : invoice.upload_status.success == false ?
                                                    'error--text'
                                                    : ''
                                                "
                                            >
                                                {{ i+1 }}. {{ invoice.isReturn ? 'Return Invoice': 'Invoice' }} {{ invoice.erp_invoice_number }}
                                                (<em>{{ invoice.details.length }} item/s</em>)

                                                <span v-if="invoice.upload_status.success==false"
                                                    class="font-weight-bold"
                                                >
                                                    | Error:
                                                    {{ invoice.upload_status.message }}
                                                    ({{ invoice.upload_status.value }})
                                                </span>

                                                <span v-if="invoice.upload_status.success==true"
                                                    class="font-weight-bold"
                                                >
                                                    | {{ invoice.upload_status.message }}
                                                </span>
                                            </div>
                                        </v-expansion-panel-header>
                                        <v-expansion-panel-content class="pt-4">
                                            <div class="d-flex pb-4">
                                                <div class="pr-6 ">
                                                    {{ invoice.isReturn ? 'Return Invoice': 'Invoice' }} #: <br><b>{{ invoice.erp_invoice_number }}</b>
                                                </div>
                                                <div class="pr-6 ">Customer: <br><b>{{ invoice.customer_name }}</b></div>
                                                <div class="pr-6 ">Amount: <br><b>{{ invoice.total_value.toFixed(4) }}</b></div>
                                                <div v-if="invoice.isReturn" class="pr-6 ">
                                                    Return Indicator: <br><b>{{ invoice.customFields[1].value }}</b>
                                                </div>
                                                <div v-if="invoice.isReturn" class="pr-6 ">
                                                    Return Invoice Reference: <br><b>{{ invoice.customFields[2].value }}</b>
                                                </div>
                                                <div v-if="invoice.isReturn" class="pr-6 ">
                                                    Remarks: <br><b>{{ invoice.remarks }}</b>
                                                </div>
                                            </div>
                                            <div>
                                                <v-data-table
                                                    dense
                                                    :headers="tblHeader"
                                                    :items="invoice.details"
                                                >
                                                    <template v-slot:[`item.price_per_item`] = "{item}">
                                                        <div class="text-right">
                                                            {{ item.price_per_item }}
                                                        </div>
                                                    </template>
                                                    <template v-slot:[`item.discount_value`] = "{item}">
                                                        <div class="text-right">
                                                            {{ item.discount_value.toFixed(4) }}
                                                        </div>
                                                    </template>
                                                    <template v-slot:[`item.gross_value`] = "{item}">
                                                        <div class="text-right">
                                                            {{ item.gross_value.toFixed(4) }}
                                                        </div>
                                                    </template>
                                                </v-data-table>
                                            </div>
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                </v-expansion-panels>
                            </v-container>
                        </v-tab-item>
                    </v-tabs-items>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>


<script>
export default {
    data() {
        return {
            tab: null,
            uploadAttempts: 0,
            batchUploadStates: [],
            batches: [],
        }
    },

    computed: {
        tblHeader() {
            return [
                {
                    text: 'Item Name',
                    value: 'item_name'
                },
                {
                    text: 'SKU External ID',
                    value: 'sku_external_id'
                },
                {
                    text: 'SKU UOM',
                    value: 'sku_uom'
                },
                {
                    text: 'Price per Item',
                    value: 'price_per_item'
                },
                {
                    text: 'Quantity',
                    value: 'quantity'
                },
                {
                    text: 'Discount',
                    value: 'discount_value'
                },
                {
                    text: 'Amount',
                    value: 'gross_value'
                },
            ];
        },
        // batches() {
        //     return this.BrStore.state.currentGeneratedBatches;
        // },
        stillUploading() {
            return this.batchUploadStates.find(e => e == 'uploading') != undefined;
        },
        enableReupload() {
            return this.batchUploadStates.find(e => e == 'failed') != undefined;
        },
        bussinessUnit() {
            return this[this.PrincipalsStore.state.selectedPrincipalCode].state.bu;
        }
    },

    methods: {
        upload() {
            if(this.batches) {
                const confMsg = this.enableReupload ?
                    'This action will reupload the failed batch(es) to the BeatRoute backend' :
                    'This action will upload the invoices to the BeatRoute backend';
                if(confirm(confMsg)) {
                    this.uploadAttempts++;
                    for(let i=0; i < this.batches.length; i++) {
                        if(this.batchUploadStates[i] == undefined || this.batchUploadStates[i] == 'failed') {
                            Vue.set(this.batchUploadStates,i,'uploading');
                            const batch = this.batches[i];
                            this.BrStore.invoiceCreate(this.bussinessUnit, batch)
                                .then(res => {
                                    if(res.success) {
                                        // set status as 'uploaded'
                                        this.InvoicesStore.setInvoicesUploaded(res.data)
                                            .then(response => {
                                                if(response.success) {
                                                    Vue.set(this.batchUploadStates,i,'success');
                                                    const batchLen = batch.length;
                                                    for(let j=0; j < batchLen; j++) {
                                                        batch[j].upload_status = response.batch[j];
                                                    }
                                                } else {
                                                    Vue.set(this.batchUploadStates,i,'failed');
                                                }
                                            });
                                    } else {
                                        Vue.set(this.batchUploadStates,i,'failed');
                                    }
                                });
                        }
                    }
                }
            }
        },

        cancel() {
            if(confirm('Are you sure you want to close this window?')) {
                // regenerate templated data if upload states has been modified
                if(this.batchUploadStates[0]) {
                    this.batchUploadStates = [];
                    this.PrincipalsStore.initCurrentGeneratedData(
                        null,this.InvoicesStore.state.invoiceStatus
                    );
                }

                this.tab = null;
                this.uploadAttempts = 0;
                this.BrStore.state.brUploadDialogOpen = false;
            }
        },

        prepareBatches() {
            const vm = this;
            vm.AppStore.overlay(true, 'Preparing batches...');
            vm.BrStore.preparePayload(
                vm.PrincipalsStore.state.currentGeneratedData
            )
            .then(batches => {
                // vm.BrStore.state.currentGeneratedBatches = [];
                // vm.BrStore.state.currentGeneratedBatches = batches;
                this.batches = [];
                this.batches = batches;
                vm.AppStore.overlay(false);
                console.log('BATCHES:', this.batches);
            });
        }
    },

    created() {
        this.prepareBatches();
    },

    mounted() {
        console.log("BRUpload component mounted");
    },
};
</script>
