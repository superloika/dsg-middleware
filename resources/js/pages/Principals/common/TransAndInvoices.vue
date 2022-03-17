<template>
    <v-card
        outlinedx
        class="elevation-0 pt-0"
    >
        <v-card-title class="pa-0">
            <v-app-bar elevation="0" colorx="white">
                <v-toolbar-title
                    title="Transactions &amp; Uploaded Invoices"
                >
                    Transactions &amp; Uploaded Invoices
                </v-toolbar-title>

                <v-spacer></v-spacer>

                <v-text-field
                    v-model="dateRangeText"
                    label="Date - YYYY-MM-DD"
                    hide-details
                    readonly
                    dense
                    outlined
                    rounded
                    @click.stop="datePickerShown=true"
                    class="mr-3"
                    style="max-width:230px;"
                ></v-text-field>
                <!-- DATEPICKER -->
                <v-dialog
                    ref="datePicker"
                    v-model="datePickerShown"
                    :return-value.sync="date"
                    width="290px"
                >
                    <v-date-picker v-model="date" scrollable range>
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
                            @click="$refs.datePicker.save(date);loadInvoicesOrTransactions();"
                        >
                            Generate
                        </v-btn>
                    </v-date-picker>
                </v-dialog>
                <!-- /DATEPICKER -->

                <v-text-field
                    v-model="searchKey"
                    label="Search"
                    clearable
                    hide-details
                    dense
                    style="max-width:230px;"
                    flat
                    rounded
                    solo-inverted
                ></v-text-field>
            </v-app-bar>
        </v-card-title>

        <v-card-text class="mx-0 pa-0">
            <v-tabs
                heightx="40"
                v-model="tab"
                grow
                background-colorx="grey lighten-5"
            >
                <v-tab class="px-2">
                    <v-icon class="mr-1">mdi-file-check</v-icon>
                    Transactions
                </v-tab>
                <v-tab class="px-2">
                    <v-icon class="mr-1">mdi-file-check</v-icon>
                    Uploaded Invoices
                </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
                <v-tab-item>
                    <v-sheet class="">
                        <Transactions
                            :searchKey="searchKey"
                            :date="date"
                        >
                        </Transactions>
                    </v-sheet>
                </v-tab-item>
                <v-tab-item>
                    <v-sheet class="">
                        <UploadedInvoices
                            :searchKey="searchKey"
                            :date="date"
                        >
                        </UploadedInvoices>
                    </v-sheet>
                </v-tab-item>
            </v-tabs-items>

        </v-card-text>
    </v-card>
</template>


<script>
export default {

    components: {
        UploadedInvoices: () => import('./UploadedInvoices.vue'),
        Transactions: () => import('./Transactions.vue'),
    },

    data: () => ({
        searchKey: '',
        datePickerShown: false,
        date: [new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .substr(0, 10)],
        grandTotal: 0.00,
        tab: null,
    }),

    computed: {
        selectedPrincipalCode() {
            return this.PrincipalsStore.state.selectedPrincipalCode;
        },
        dateRangeText() {
            return this.date.join(' ~ ');
        },
    },

    methods: {
        loadInvoicesOrTransactions() {
            this.PrincipalsStore.initTransactions(this.selectedPrincipalCode, this.date);
            this.PrincipalsStore.initInvoices(this.selectedPrincipalCode, this.date);
            this.PrincipalsStore.initInvoicesGrandTotal();
        },
    },

}
</script>
