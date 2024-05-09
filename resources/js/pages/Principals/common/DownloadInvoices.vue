<template>
    <v-card>
        <v-toolbar elevation="27">
            <v-toolbar-title>
                Download Invoice Data
                <v-chip color="default">
                    From Navision to Middleware DB
                </v-chip>
            </v-toolbar-title>
            <v-spacer></v-spacer>
        </v-toolbar>

        <v-container>
            <v-row>
                <v-col cols="6">
                    <v-select
                        multiple rounded dense outlined chips clearable
                        v-model="terminal"
                        :items="terminals"
                        item-text="group_name"
                        label="Terminals"
                    >
                        <template v-slot:prepend-item>
                            <v-list-item ripple @mousedown.prevent @click="selAll">
                                <!-- <v-list-item-action>
                                    <v-icon :color="selectedFruits.length > 0 ? 'indigo darken-4' : ''">
                                        {{ icon }}
                                    </v-icon>
                                </v-list-item-action> -->
                                <v-list-item-content>
                                    <v-list-item-title>Select All</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-divider class="mt-2"></v-divider>
                        </template>

                        <template v-slot:selection="{item, index}">
                            <v-chip small v-if="index < 2">{{ item.group_name }}</v-chip>
                            <span v-if="index == 2">
                                (+{{ terminal.length - 2 }} others)
                            </span>
                        </template>
                    </v-select>
                </v-col>

                <!-- posting date -->
                <v-col cols="3">
                    <!-- DATEPICKER -->
                    <v-dialog
                        ref="datePicker"
                        :return-value.sync="posting_date_range"
                        width="290px"
                    >
                        <template v-slot:activator="{on, attrs}">
                            <v-text-field hide-details readonly dense outlined rounded
                                v-model="dateRangeText"
                                label="Posting Date Range (yyyy-mm-dd)"
                                style="max-width:500px;min-width:250px;"
                                v-on="on" v-bind="attrs"
                            ></v-text-field>
                        </template>
                        <v-date-picker scrollable range v-model="posting_date_range">
                            <v-spacer></v-spacer>
                            <v-btn dense depressed rounded
                                color="primary"
                                @click="$refs.datePicker.save(posting_date_range);"
                            >
                                Ok
                            </v-btn>
                        </v-date-picker>
                    </v-dialog>
                    <!-- /DATEPICKER -->
                </v-col>

                <v-col cols="3">
                    <v-btn dense rounded
                        color="primary"
                        title="Download Invoices"
                        @click="downloadInvoices"
                        :disabled="terminal.length < 1"
                    >
                        Download
                    </v-btn>
                </v-col>
            </v-row>

            <br>
            <v-divider></v-divider>

            <div class="caption font-weight-bold ml-1">Download History</div>
            <v-data-table :headers="tblheader" :items="tblItems" dense>
                <template v-slot:[`item.created_at`]="{ item }">
                    <span :class="isToday(item.created_at) ? 'primary--text' : ''">
                        {{ item.created_at }}
                    </span>
                </template>
                <template v-slot:[`item.posting_date`]="{ item }">
                    <span>
                        {{ item.posting_date_from }} to {{ item.posting_date_to }}
                    </span>
                </template>
                <template v-slot:[`item.action`]="{ item }">
                    <v-dialog max-width="800">
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
                                        <v-card class="pa-2">
                                            <div class="caption font-weight-bold">
                                                Sales Invoices
                                                <v-chip small title="Existing">
                                                    {{ dlSummary.sales_invoices ?
                                                        Object.values(dlSummary.sales_invoices).reduce((total, {existing}) => total + existing, 0)
                                                        : 0
                                                    }}
                                                </v-chip>
                                                <v-chip small title="New" color="primary">
                                                    {{ dlSummary.sales_invoices ?
                                                        Object.values(dlSummary.sales_invoices).reduce((total, {['new']:newProp}) => total + newProp, 0)
                                                        : 0
                                                    }}
                                                </v-chip>
                                            </div>
                                            <v-list dense>
                                                <v-list-item v-for="(siVal, siKey) in dlSummary.sales_invoices" :key="siKey" dense>
                                                    <v-list-item-content class="d-flex">
                                                        <v-card class="pa-2 elevation-0" outlined>
                                                            <div class="d-flex">
                                                                {{ siKey }}
                                                                <v-chip x-small title="Existing">
                                                                    {{ siVal.existing }}
                                                                </v-chip>
                                                                <v-chip x-small title="New" color="primary">
                                                                    {{ siVal.new }}
                                                                </v-chip>
                                                            </div>
                                                            <div>
                                                                <small>
                                                                    <strong>IP:</strong> {{ parseDsnPart(siVal.dsn, /Server=([^;]+)/) }}
                                                                </small>
                                                            </div>
                                                            <div>
                                                                <small>
                                                                    <strong>DB:</strong> {{ parseDsnPart(siVal.dsn, /Database=([^;]+)/) }}
                                                                </small>
                                                            </div>
                                                        </v-card>
                                                    </v-list-item-content>
                                                </v-list-item>
                                            </v-list>
                                        </v-card>
                                    </v-col>

                                    <v-col>
                                        <v-card class="pa-2">
                                            <div class="caption font-weight-bold">
                                                Sales Returns
                                                <v-chip small title="Existing">
                                                    {{ dlSummary.sales_returns ?
                                                        Object.values(dlSummary.sales_returns).reduce((total, {existing}) => total + existing, 0)
                                                        : 0
                                                    }}
                                                </v-chip>
                                                <v-chip small title="New" color="primary">
                                                    {{ dlSummary.sales_returns ?
                                                        Object.values(dlSummary.sales_returns).reduce((total, {['new']:newProp}) => total + newProp, 0)
                                                        : 0
                                                    }}
                                                </v-chip>
                                            </div>
                                            <v-list>
                                                <v-list-item v-for="(cmVal, cmKey) in dlSummary.sales_returns" :key="cmKey" dense>
                                                    <v-list-item-content>
                                                        <v-card class="pa-2 elevation-0" outlined>
                                                            <div class="d-flex">
                                                                {{ cmKey }}
                                                                <v-chip x-small title="Existing">
                                                                    {{ cmVal.existing }}
                                                                </v-chip>
                                                                <v-chip x-small title="New" color="primary">
                                                                    {{ cmVal.new }}
                                                                </v-chip>
                                                            </div>
                                                            <div>
                                                                <small>
                                                                    <strong>IP:</strong> {{ parseDsnPart(cmVal.dsn, /Server=([^;]+)/) }}
                                                                </small>
                                                            </div>
                                                            <div>
                                                                <small>
                                                                    <strong>DB:</strong> {{ parseDsnPart(cmVal.dsn, /Database=([^;]+)/) }}
                                                                </small>
                                                            </div>
                                                        </v-card>
                                                    </v-list-item-content>
                                                </v-list-item>
                                            </v-list>
                                        </v-card>
                                    </v-col>

                                    <v-col>
                                        <v-card class="pa-2">
                                            <div class="caption font-weight-bold">
                                                Unreachable Servers
                                            </div>
                                            <v-list>
                                                <em class="caption" v-if="dlSummary.unreachable">
                                                    None
                                                </em>
                                                <v-list-item v-for="(item, index) in dlSummary.unreachable" :key="index">
                                                    <v-list-item-content>
                                                        {{ item }}
                                                    </v-list-item-content>
                                                </v-list-item>
                                            </v-list>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-dialog>

                </template>
                <template v-slot:[`item.dl_by`]="{ item }">
                    <span>
                        {{ item.user_fn }} ({{ item.user_un }})
                    </span>
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
                {text: 'Posting Date',value: 'posting_date'},
                {text: 'New SI',value: 'new_si'},
                {text: 'New CM',value: 'new_cm'},
                {text: 'Unreachable',value: 'unreachable'},
                {text: 'Date',value: 'created_at'},
                {text: 'Downloaded By',value: 'dl_by'},
                {text: 'Action',value: 'action'},
            ],
            tblItems: [],
            dlSummary: {
                sales_invoices: {},
                sales_retunrs: {},
                unreachable: 0,
            },
            posting_date_range: [new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                .toISOString()
                .substr(0, 10)],
            terminals: [],
            terminal: [],
        };
    },

    computed: {
        dateRangeText() {
            return this.posting_date_range.join(` ~ `);
        }
    },

    methods: {
        async downloadInvoices() {
            console.log(this.terminal);
            if(!confirm('Download invoice data from Navision?')) return;
            try {
                const vendor_codes = this.PrincipalsStore.state.selectedPrincipal[1]
                    .map(e => e.vendor_code);
                const url = this.AppStore.state.siteUrl + 'nav/downloadInvoices';
                this.AppStore.overlay(true);
                const res = await axios.post(url, {
                    main_vendor_code: this.PrincipalsStore.state.selectedPrincipal[0],
                    vendor_codes: vendor_codes,
                    posting_date_range: this.posting_date_range,
                    terminals: this.terminal,
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
        },

        parseDsnPart(dsn, regEx) {
            const match = dsn.match(regEx);
            if(match) {
                return match[1];
            }
            return '';
        },

        async dbDetailsNavision() {
            try {
                const url = this.AppStore.state.siteUrl + 'misc-utils/dbDetailsNavision';
                const res = await axios.get(url);
                this.terminals = res.data;
                this.terminal = this.terminals.map(e => e.group_name);
                console.log(this.terminals);
            } catch (error) {
                console.error(error);
            } finally {
            }
        },

        selAll () {
            this.$nextTick(() => {
                this.terminal = this.terminals.map(e => e.group_name);
            });
        },
    },

    created() {
        this.dlLogs();
        this.dbDetailsNavision();
    },

    mounted() {
        console.log("DownloadInvoices component mounted");
    },
};
</script>
