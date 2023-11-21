<template>
    <v-card>
        <v-toolbar elevation="0">
            <v-toolbar-title>
                <v-icon color="primary">mdi-cloud-upload</v-icon>
                BeatRoute Upload
                {{
                    this.InvoicesStore.state.invoiceStatus=='uploaded' ?
                    '(Cancellation)' : ''
                }}
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn
                rounded dense depressed
                :color="
                    (
                        this.InvoicesStore.state.invoiceStatus=='completed' ||
                        this.InvoicesStore.state.invoiceStatus=='pending'
                    )
                    ? 'primary' : 'error'
                "
                @click="upload"
                :disabled="disableUploadBtn"
            >
                {{ enableReupload ? 'Reupload failed batch(es)' : 'Upload' }}
            </v-btn>

            <div class="ml-3"><InvoiceLookup></InvoiceLookup></div>

            <v-btn
                icon
                @click.stop="cancel"
                :disabled="stillUploading"
            >
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-toolbar>

        <v-card-text v-if="batches.length < 1" class="d-flex justify-center">
            <div>No available data to display</div>
        </v-card-text>

        <v-toolbar elevation="0" dense>
            <v-tabs v-model="tab" verticalx growx>
                <v-tab
                    v-for="(b,i) in batches"
                    :key="i"
                >
                    <div class="px-2 font-weight-bold text-left text-caption">
                        Batch {{ i+1 }}/{{ batches.length }}
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
        </v-toolbar>

        <v-card-text class="pt-2">
            <v-row>
                <v-col cols="12" md="12">
                    <v-tabs-items v-model="tab">
                        <v-tab-item
                            v-for="(b, batchIndex) in batches"
                            :key="b[0].erp_invoice_number + b[0].invoice_date"
                        >
                            <v-container fluid>
                                <v-btn
                                    @click="selectAll(batchIndex, true)"
                                    small rounded depressed
                                    color="primary"
                                    :disabled="disableUploadBtn"
                                >
                                    Select All
                                </v-btn>
                                <v-btn
                                    @click="selectAll(batchIndex, false)"
                                    small rounded depressed
                                    color="primary"
                                    :disabled="disableUploadBtn"
                                >
                                    Deselect All
                                </v-btn>
                                <!-- <v-btn @click="checkdata(batchIndex)">chkdt</v-btn> -->
                            </v-container>

                            <v-container fluid>
                                <v-expansion-panels focusable multiple>
                                    <v-expansion-panel
                                        v-for="(invoice, invoiceIndex) in b"
                                        :key="'xpnsn-' + invoice.erp_invoice_number"
                                    >
                                        <v-expansion-panel-header>
                                            <div
                                                class="text-caption font-weight-boldx d-flex"
                                                :class="
                                                    (invoice.upload_status!=undefined && invoice.upload_status.success==true) ?
                                                    'primary--text'
                                                    : (invoice.upload_status!=undefined && invoice.upload_status.success==false) || invoice.with_errors.length ?
                                                    'error--text'
                                                    : ''
                                                "
                                            >
                                                <v-checkbox dense hide-details
                                                    class="pa-0 ma-0"
                                                    color="secondary"
                                                    v-model="invoice.included"
                                                    title="Check to include, uncheck to exclude"
                                                    :disabled="disableUploadBtn || invoice.with_errors.length > 0"
                                                    :key = "'chkbx-' + invoice.erp_invoice_number"
                                                ></v-checkbox>

                                                {{ invoiceIndex + 1 }}. {{ invoice.isReturn ? 'CM #:': 'Invoice #:' }} {{ invoice.erp_invoice_number }}
                                                (<em>{{ invoice.details.length }} item/s</em>)

                                                <span v-if="(invoice.upload_status!=undefined && invoice.upload_status.success==false)"
                                                    class="font-weight-bold"
                                                >
                                                    | Error:
                                                    {{ invoice.upload_status.message }}
                                                    ({{ invoice.upload_status.value }})
                                                </span>

                                                <span v-if="(invoice.upload_status!=undefined && invoice.upload_status.success==true)"
                                                    class="font-weight-bold"
                                                >
                                                    | {{ invoice.upload_status.message }}
                                                </span>
                                            </div>
                                        </v-expansion-panel-header>

                                        <v-expansion-panel-content class="pt-4">
                                            <div v-if="invoice.with_errors.length" class="p-2 mb-4">
                                                <div v-for="(err, i) in invoice.with_errors" :key="i"
                                                    class="mb-1"
                                                >
                                                    <div class="error--text">
                                                        <v-chip color="error" x-small>
                                                            Error
                                                        </v-chip>
                                                        {{ err }}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="pb-4">
                                                <table class="invoice-detail">
                                                    <tr>
                                                        <th>{{ invoice.isReturn ? 'CM': 'Invoice' }} #</th>
                                                        <th>Invoice Date</th>
                                                        <th>Customer</th>
                                                        <th>Amount</th>
                                                        <th>DSP</th>
                                                        <th v-if="invoice.isReturn">Return Indicator</th>
                                                        <th v-if="invoice.isReturn">Return Invoice Reference</th>
                                                        <th v-if="invoice.isReturn">Remarks</th>
                                                    </tr>
                                                    <tr>
                                                        <td>{{ invoice.erp_invoice_number }}</td>
                                                        <td>{{ invoice.invoice_date }}</td>
                                                        <td>{{ invoice.customer_name }}</td>
                                                        <td>{{ invoice.invoice_total_amount.toFixed(5) }}</td>
                                                        <td>{{ invoice.customFields[0].value }}</td>
                                                        <td v-if="invoice.isReturn">
                                                            {{ invoice.customFields[1].value }}
                                                            <v-menu offset-y>
                                                                <template v-slot:activator="{ on, attrs }">
                                                                    <v-btn
                                                                        small rounded color="warning"
                                                                        v-bind="attrs"
                                                                        v-on="on"
                                                                        v-if="
                                                                            (invoice.customFields[1].value == ''
                                                                            || invoice.customFields[1].value == null
                                                                            || invoice.customFields[1].value == 'not_specified')
                                                                            && !disableUploadBtn
                                                                        "
                                                                    >
                                                                        Override
                                                                    </v-btn>
                                                                </template>
                                                                <v-list>
                                                                    <v-list-item
                                                                        v-for="(reason, index) in BrStore.state.return_indicators"
                                                                        :key="index"
                                                                        @click="overrideInvoiceProperty(
                                                                            batchIndex,
                                                                            invoiceIndex,
                                                                            'return_indicator_empty',
                                                                            reason
                                                                        )"
                                                                    >
                                                                    <v-list-item-title>{{ reason }}</v-list-item-title>
                                                                    </v-list-item>
                                                                </v-list>
                                                            </v-menu>
                                                        </td>
                                                        <td v-if="invoice.isReturn">{{ invoice.customFields[2].value }}</td>
                                                        <td v-if="invoice.isReturn">
                                                            {{ invoice.remarks }}
                                                            <v-menu offset-y>
                                                                <template v-slot:activator="{ on, attrs }">
                                                                    <v-btn
                                                                        small rounded color="warning"
                                                                        v-bind="attrs"
                                                                        v-on="on"
                                                                        v-if="
                                                                            (invoice.remarks == ''
                                                                            || invoice.remarks == null
                                                                            || invoice.remarks == 'not_specified')
                                                                            && !disableUploadBtn
                                                                        "
                                                                    >
                                                                        Override
                                                                    </v-btn>
                                                                </template>
                                                                <v-list>
                                                                    <v-list-item
                                                                        v-for="(reason, index) in BrStore.state.return_reasons"
                                                                        :key="index"
                                                                        @click="overrideInvoiceProperty(
                                                                            batchIndex,
                                                                            invoiceIndex,
                                                                            'return_reason_empty',
                                                                            reason
                                                                        )"
                                                                    >
                                                                    <v-list-item-title>{{ reason }}</v-list-item-title>
                                                                    </v-list-item>
                                                                </v-list>
                                                            </v-menu>
                                                        </td>
                                                    </tr>
                                                </table>
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
                                                            {{ Math.abs(item.discount_value) }}
                                                        </div>
                                                    </template>
                                                    <template v-slot:[`item.gross_value`] = "{item}">
                                                        <div class="text-right">
                                                            {{ item.gross_value }}
                                                        </div>
                                                    </template>
                                                    <!-- <template v-slot:[`item.amount_wo_discount`] = "{item}">
                                                        <div class="text-right">
                                                            {{ (item.gross_value + item.discount_value).toFixed(5) }}
                                                        </div>
                                                    </template> -->
                                                    <template v-slot:[`item.discounted_amount`] = "{item}">
                                                        <div class="text-right">
                                                            {{ (item.discounted_amount) }}
                                                        </div>
                                                    </template>
                                                    <template v-slot:[`item.amount_vat_inc`] = "{item}">
                                                        <div class="text-right">
                                                            {{ (item.discounted_amount) }}
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
                    text: 'Price per Item (VAT-Ex)',
                    value: 'price_per_item'
                },
                {
                    text: 'Quantity',
                    value: 'quantity'
                },
                // {
                //     text: 'Amount',
                //     value: 'amount_wo_discount'
                // },
                {
                    text: 'Discount %',
                    value: 'discount_percentage'
                },
                {
                    text: 'Discount Amount',
                    value: 'discount_value'
                },
                {
                    text: 'Amount (Discounted)',
                    value: 'discounted_amount'
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
            return this.PrincipalsStore.state.configs.bu;
        },
        disableUploadBtn() {
            return !this.batches.length
                || this.stillUploading
                || !this.enableReupload && this.uploadAttempts > 0;
        },
    },

    methods: {
        // set status to '0' for cancel/archive
        upload() {
            if(this.batches) {
                const confMsg = this.enableReupload ?
                    'This action will reupload the failed batch(es) to the BeatRoute backend' :
                    'This action will upload the invoices to the BeatRoute backend';

                if(confirm(confMsg)) {
                    this.uploadAttempts++;
                    for(let i=0; i < this.batches.length; i++) {
                        // refilter prepared payload, unchecked(included==false) are not uploaded
                        const batch = this.batches[i].filter(e => e.included);
                        console.log('BATCH ' + i, batch);
                        const batchLen = batch.length;

                        if((this.batchUploadStates[i] == undefined || this.batchUploadStates[i] == 'failed') && batchLen) {
                            Vue.set(this.batchUploadStates,i,'uploading');

                            this.BrStore.invoiceCreate(this.bussinessUnit, batch)
                                .then(res => {
                                    if(res.success) {
                                        if (
                                            this.InvoicesStore.state.invoiceStatus=='completed' ||
                                            this.InvoicesStore.state.invoiceStatus=='pending'
                                        ) {
                                            // set status as 'uploaded'
                                            this.InvoicesStore.setInvoicesUploaded(res.data)
                                                .then(response => {
                                                    if(response.success) {
                                                        Vue.set(this.batchUploadStates,i,'success');
                                                        for(let j=0; j < batchLen; j++) {
                                                            batch[j].upload_status = response.batch[j];
                                                        }
                                                    } else {
                                                        Vue.set(this.batchUploadStates,i,'failed');
                                                    }
                                                });
                                        } else if (this.InvoicesStore.state.invoiceStatus=='uploaded') {
                                            // set status from 'uploaded' back to 'completed''
                                            this.InvoicesStore.setInvoicesCancelled(res.data)
                                                .then(response => {
                                                    if(response.success) {
                                                        Vue.set(this.batchUploadStates,i,'success');
                                                        for(let j=0; j < batchLen; j++) {
                                                            batch[j].upload_status = response.batch[j];
                                                        }
                                                    } else {
                                                        Vue.set(this.batchUploadStates,i,'failed');
                                                    }
                                                });
                                        }
                                    } else {
                                        Vue.set(this.batchUploadStates,i,'failed');
                                        try {
                                            for(let j=0; j < batchLen; j++) {
                                                batch[j].upload_status = res.data[j];
                                            }
                                        } catch (error) {
                                            console.log('ERRRRR1111111111111111111',error);
                                        }
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
                if(this.batchUploadStates[0] || this.uploadAttempts > 0) {
                    this.batchUploadStates = [];
                    this.PrincipalsStore.initCurrentGeneratedData(
                        null,
                        this.InvoicesStore.state.invoiceStatus,
                        this.PrincipalsStore.state.configs.posting_date_format ?? 'm/d/Y'
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
                this.batches = [];
                this.batches = batches;
                vm.AppStore.overlay(false);
                console.log('BATCHES:', this.batches);
            });
        },

        selectAll(batchIndex, included=true) {
            if(this.batches) {
                this.batches[batchIndex].forEach(e => {
                    // mo gana ra if walay error ang invoice
                    if(e.with_errors.length == 0) {
                        e.included = included;
                    }
                });
            }
        },

        // display invoices in currently selected batch
        checkdata(batchIndex) {
            if(this.batches) {
                console.log('BATCH:', this.batches[batchIndex]);
            }
        },

        overrideInvoiceProperty(
            batchIndex,
            invoiceIndex,
            errorCode,
            overrideValue
        ) {
            if(confirm(`Override with "${overrideValue}"?`)) {
                if(errorCode == 'return_indicator_empty') {
                    this.batches[batchIndex][invoiceIndex].customFields[1].value = overrideValue;
                } else if (errorCode == 'return_reason_empty') {
                    this.batches[batchIndex][invoiceIndex].remarks = overrideValue;
                }

                this.batches[batchIndex][invoiceIndex].with_errors =
                    this.batches[batchIndex][invoiceIndex].with_errors
                    .filter(e => e.search(errorCode) == -1 );

                if(this.batches[batchIndex][invoiceIndex].with_errors.length < 1) {
                    this.batches[batchIndex][invoiceIndex].included = true;
                }
            }

            console.log('BATCHES:', this.batches);
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


<style scoped>
table.invoice-detail {
    font-size: smaller;
    border-collapse: collapse;
    width: 100%;
}

table.invoice-detail td, table.invoice-detail th {
    border: 1px solid #f3f3f3;
    text-align: left;
    padding: 4px;
}

table.invoice-detail tr th {
    background-color: #f3f3f3;
}
</style>
