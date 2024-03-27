<template>
    <v-card>
        <v-toolbar elevation="27">
            <v-toolbar-title>Download invoice data from Navision</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon dense
                color="primary"
                title="Download Invoices"
                @click="downloadInvoices"
            >
                <v-icon>mdi-download</v-icon>
            </v-btn>
        </v-toolbar>

        <v-container>
            <div class="caption font-weight-bold ml-1">Download History</div>
            <v-data-table :headers="tblheader" :items="tblItems" dense>
                <template v-slot:[`item.created_at`]="{ item }">
                    <span :class="isToday(item.created_at) ? 'primary--text' : ''">
                        {{ item.created_at }}
                    </span>
                </template>
                <template v-slot:[`item.action`]="{ item }">
                    <v-dialog max-width="600">
                        <template v-slot:activator="{on, attrs}">
                            <v-btn small rounded icon color="primary" title="View Details"
                                v-on="on" v-bind="attrs"
                                @click="viewDetails(item.summary)"
                            >
                                <v-icon>mdi-eye</v-icon>
                            </v-btn>
                        </template>

                        <v-card scrollable>
                            <v-toolbar elevation="27">
                                <v-toolbar-title>Download Details</v-toolbar-title>
                            </v-toolbar>
                            <br>
                            <v-card-text>
                                <v-row>
                                    <v-col>
                                        <v-card>
                                            <v-card-text>
                                                <div>
                                                    Sales Invoices
                                                </div>
                                                <v-list dense>
                                                    <v-list-item v-for="(siVal, siKey) in dlSummary.sales_invoices" :key="siKey">
                                                        <v-list-item-content class="d-flex">
                                                            {{ siKey }}
                                                            <div class="d-flex">
                                                                <v-chip x-small title="Existing">
                                                                    {{ siVal.existing }}
                                                                </v-chip>
                                                                <v-chip x-small title="New" color="primary">
                                                                    {{ siVal.new }}
                                                                </v-chip>
                                                            </div>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </v-list>
                                            </v-card-text>
                                        </v-card>
                                    </v-col>

                                    <v-col>
                                        <v-card>
                                            <v-card-text>
                                                <div>
                                                    Sales Returns
                                                </div>
                                                <v-list>
                                                    <v-list-item v-for="(cmVal, cmKey) in dlSummary.sales_returns" :key="cmKey">
                                                        <v-list-item-content>
                                                            {{ cmKey }}
                                                            <div class="d-flex">
                                                                <v-chip x-small title="Existing">
                                                                    {{ cmVal.existing }}
                                                                </v-chip>
                                                                <v-chip x-small title="New" color="primary">
                                                                    {{ cmVal.new }}
                                                                </v-chip>
                                                            </div>
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </v-list>
                                            </v-card-text>
                                        </v-card>
                                    </v-col>

                                    <v-col>
                                        <v-card>
                                            <v-card-text>
                                                <div>
                                                    Unreachable Servers
                                                </div>
                                                <v-list>
                                                    <v-list-item v-for="(item, index) in dlSummary.unreachable" :key="index">
                                                        <v-list-item-content>
                                                            {{ item }}
                                                        </v-list-item-content>
                                                    </v-list-item>
                                                </v-list>
                                            </v-card-text>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-dialog>

                </template>
            </v-data-table>
        </v-container>
    </v-card>
</template>

<script>

export default {
    data() {
        return {
            tblheader: [
                {text: 'Batch #',value: 'batch_number'},
                {text: 'New SI',value: 'new_si'},
                {text: 'New CM',value: 'new_cm'},
                {text: 'Unreachable',value: 'unreachable'},
                {text: 'Date',value: 'created_at'},
                {text: 'Action',value: 'action'},
            ],
            tblItems: [],
            dlSummary: [],
        };
    },

    methods: {
        async downloadInvoices() {
            if(!confirm('Download invoice data from Navision?')) return;
            try {
                const vendor_codes = this.PrincipalsStore.state.selectedPrincipal[1]
                    .map(e => e.vendor_code);
                const url = this.AppStore.state.siteUrl + 'nav/downloadInvoices';
                this.AppStore.overlay(true);
                const res = await axios.post(url, {
                    main_vendor_code: this.PrincipalsStore.state.selectedPrincipal[0],
                    vendor_codes: vendor_codes
                });
                this.dlLogs();
            } catch (error) {
                console.error(error);
            } finally {
                this.AppStore.overlay(false);
            }
        },

        async dlLogs() {
            try {
                const url = this.AppStore.state.siteUrl + 'nav/dlLogs';
                const res = await axios.post(url, {
                    main_vendor_code: this.PrincipalsStore.state.selectedPrincipal[0],
                });
                this.tblItems = res.data;
            } catch (error) {
                console.error(error);
            } finally {
            }
        },

        viewDetails(summary) {
            const dlSummary = JSON.parse(summary);
            this.dlSummary = dlSummary;
        },

        isToday(date) {
            const today = new Date().toISOString().slice(0, 10);
            return new Date(date).toISOString().slice(0, 10) === today;
        }
    },

    created() {
        this.dlLogs();
    },

    mounted() {
        console.log("DownloadInvoices component mounted");
    },
};
</script>
