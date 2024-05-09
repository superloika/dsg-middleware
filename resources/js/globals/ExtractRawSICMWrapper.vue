<template>
    <v-dialog v-model="dialog" max-width="900" scrollable>
        <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" title="Extract Raw SI & CM">
                <v-icon>mdi-import</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-toolbar elevation="0">
                <v-toolbar-title>Extract Raw SI & CM <v-chip>Navision</v-chip></v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn text @click="dialog = false" icon>
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>

            <v-card-text>
                <v-row>
                    <v-col>
                        <em>
                            NOTE: This will directly extract invoice data from Navision.
                            The downloaded data will not be saved in the middleware's local database
                        </em>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="8">
                        <v-select
                            multiple rounded dense outlined chips clearable hide-details
                            v-model="selectedTerminals"
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
                                    (+{{ selectedTerminals.length - 2 }} others)
                                </span>
                            </template>
                        </v-select>
                    </v-col>

                    <v-col cols="4">
                        <!-- DATEPICKER -->
                        <v-dialog
                            ref="datePicker"
                            :return-value.sync="posting_date_range"
                            width="290px"
                        >
                            <template v-slot:activator="{on, attrs}">
                                <v-text-field hide-details readonly dense outlined rounded
                                    v-model="dateRangeText"
                                    label="Posting Date Range(yyyy-mm-dd)"
                                    style="max-width:100%;"
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

                    <v-col cols="12">
                        <v-textarea outlined rows="2" auto-grow hide-details=""
                            v-model="vendor_codes"
                            label="Vendor Codes Filter (Sample Format: S0346|S0355|S0403)"
                            placeholder="Vendor Codes Filter (Sample Format: S0346|S0355|S0403)">
                        </v-textarea>
                    </v-col>

                    <v-col cols="12">
                        <v-btn rounded color="primary"
                            :disabled="
                                this.vendor_codes.split('|') < 1 || this.selectedTerminals < 1
                            "
                            @click.stop="extractInvoices"
                        >
                            Extract
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-text>

        </v-card>
    </v-dialog>
</template>


<script>
export default {
    data() {
        return {
            dialog: false,
            posting_date_range: [new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                .toISOString()
                .substr(0, 10)],
            vendor_codes: '',
            terminals: [],
            selectedTerminals: [],
        }
    },

    computed: {
        dateRangeText() {
            return this.posting_date_range.join(` ~ `);
        },
    },

    methods: {
        async extractInvoices() {
            console.log(this.terminal);
            if(!confirm('Extract invoice data from Navision?')) return;
            try {
                const url = this.AppStore.state.siteUrl + 'nav/extractInvoices';
                this.AppStore.overlay(true);
                const res = await axios.post(url, {
                    vendor_codes: this.vendor_codes,
                    posting_date_range: this.posting_date_range,
                    terminals: this.selectedTerminals,
                });
            } catch (error) {
                console.error(error);
            } finally {
                this.AppStore.overlay(false);
            }
        },

        async dbDetailsNavision() {
            try {
                const url = this.AppStore.state.siteUrl + 'misc-utils/dbDetailsNavision';
                const res = await axios.get(url);
                this.terminals = res.data;
                this.selectedTerminals = this.terminals.map(e => e.group_name);
            } catch (error) {
                console.error(error);
            } finally {
            }
        },

        selAll () {
            this.$nextTick(() => {
                this.selectedTerminals = this.terminals.map(e => e.group_name);
            });
        },
    },

    created() {
        this.dbDetailsNavision();
    }
}
</script>
