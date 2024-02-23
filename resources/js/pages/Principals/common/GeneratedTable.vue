<template>
<v-card>
    <v-toolbar elevation="27" v-if="allow_export">
        <!-- <div class="d-flex justify-end"> -->
            <v-spacer></v-spacer>

            <v-btn
                title="Export table to TXT file (Tab Delimited)"
                color="default"
                class="mr-2"
                x-small
                rounded
                @click="exportToCsv('txt')"
            >
                Export {{ tab_caption }} to TXT
            </v-btn>
            <v-btn
                title="Export table to CSV file (Comma Delimited)"
                color="default"
                class="mr-2"
                x-small
                rounded
                @click="exportToCsv()"
            >
                Export {{ tab_caption }} to CSV
            </v-btn>

            <v-text-field
                v-model="PrincipalsStore.state.currentGeneratedDataSearchKey"
                dense solo solo-inverted rounded hide-details flat
                style="max-width: 200px;"
                placeholder="Search here"
            >

            </v-text-field>
        <!-- </div> -->
    </v-toolbar>

    <v-data-table
        dense
        :items="items"
        :headers="tableHeader"
        :items-per-page="10"
        :search="PrincipalsStore.state.currentGeneratedDataSearchKey"
        disable-sort
        :item-class="itemRowStyle"
    >
        <template v-slot:[`item.customer_code`]="{ item }">
            <v-icon v-if="item.customer_code==''" color="error" title="Non-uploadable - Empty BR ID">
                mdi-alert
            </v-icon>
            <v-tooltip
                v-if="item.customer_notfound==1 && item.customer_code != ''"
                right
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-chip
                        v-bind="attrs"
                        v-on="on"
                        :color="
                            item.missing_customer_name==
                                'CUSTOMER_NOT_FOUND' ? 'error' : 'warning'
                        "
                        small
                        outlined
                        title = "Unmapped"
                    >
                        <!-- @click="AppStore.copyToClipboard(item.customer_code)" -->
                        <div :id="item.customer_code">
                            {{ item.customer_code }}
                        </div>
                    </v-chip>
                </template>
                <span>{{ item.missing_customer_name }}</span>
            </v-tooltip>
            <span v-else>{{ item.customer_code }}</span>
        </template>

        <template v-slot:[`item.alturas_customer_code`]="{ item }">
            <v-tooltip
                v-if="item.customer_notfound==1"
                right
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-chip
                        v-bind="attrs"
                        v-on="on"
                        :color="
                            item.missing_customer_name==
                                'CUSTOMER_NOT_FOUND' ? 'error' : 'warning'
                        "
                        small
                        outlined
                        title = "Unmapped"
                    >
                        <div :id="item.alturas_customer_code">
                            {{ item.alturas_customer_code }}
                        </div>
                    </v-chip>
                </template>
                <span>{{ item.missing_customer_name }}</span>
            </v-tooltip>
            <span v-else>{{ item.alturas_customer_code }}</span>
        </template>

        <!-- <template v-slot:[`item.route_code`]="{ item }">
            <v-chip
                v-if="item.route_code=='N/A'"
                color="warning"
                small
                outlined
                title=""
            >
                <div :id="item.route_code">
                    {{ item.route_code }}
                </div>
            </v-chip>
            <span v-else>{{ item.route_code }}</span>
        </template> -->

        <template v-slot:[`item.item_code`]="{ item }">
            <v-icon v-if="item.item_code==''" color="error"
                title="Non-uploadable - Empty material code"
            >
                mdi-alert
            </v-icon>
            <v-tooltip
                v-if="item.item_notfound==1 && item.item_code != ''"
                left
            >
                <template
                    v-slot:activator="{ on, attrs }"
                >
                    <v-chip
                        v-bind="attrs"
                        v-on="on"
                        :color="
                            item.missing_item_name==
                                'ITEM_NOT_FOUND'?'error':'warning'
                        "
                        small
                        outlined
                        title="Unmapped"
                    >
                        <div :id="item.item_code">
                            {{ item.item_code }}
                        </div>
                    </v-chip>
                </template>
                <span>{{ item.missing_item_name }}</span>
            </v-tooltip>
            <span v-else>{{ item.item_code }}</span>
        </template>

        <template v-slot:[`item.sales_agent_id`]="{ item }">
            <v-chip
                v-if="item.salesman_notfound==1"
                color="warning"
                small
                outlined
                title="Unmapped"
            >
                <div :id="item.sales_agent_id">
                    {{ item.sales_agent_id }}
                </div>
            </v-chip>
            <span v-else
                :title="item.alturas_sm_code"
            >{{ item.sales_agent_id }}</span>
        </template>

        <template v-slot:[`item.sm_code`]="{ item }">
            <v-chip
                v-if="item.salesman_notfound==1 && item.sm_code != ''"
                color="warning"
                small
                outlined
                title="Unmapped"
            >
                <div>
                    {{ item.sm_code }}
                </div>
            </v-chip>
            <span v-else>{{ item.sm_code }}</span>
        </template>

        <template v-slot:[`item.price`]="{ item }">
            <div class="text-right" title="NAV Price">
                {{ item.price }}
            </div>
        </template>

        <template v-slot:[`item.amount`]="{ item }">
            <div class="text-right" title="NAV Amount">
                {{ item.amount }}
            </div>
        </template>

        <template v-slot:[`item.price_supplier`]="{ item }">
            <div class="text-right teal--text" title="Supplier Price">
                {{ item.price_supplier }}
            </div>
        </template>

        <template v-slot:[`item.amount_supplier`]="{ item }">
            <div class="text-right teal--text" title="Supplier Amount">
                {{ item.amount_supplier }}
            </div>
        </template>

        <template v-slot:[`item.discount_amount`]="{ item }">
            <div class="text-right">
                {{ item.discount_amount }}
            </div>
        </template>

        <!-- <template v-slot:[`item.uom_supplier`]="{ item }">
            <div>
                <v-text-field style="width:80px"
                    v-model="item.uom_supplier" outlined hide-details dense
                ></v-text-field>
            </div>
        </template> -->

        <!-- empty external doc no (invoice_number) -->
        <template v-slot:[`item.invoice_number`]="{ item }">
            <!-- <v-chip
                v-if="item.invoice_number==''"
                color="error"
                small
                outlined
                title="No external document #"
            >
                <div>
                    {{ item.invoice_number }}
                </div>
            </v-chip> -->
            <v-icon
                v-if="item.invoice_number==''"
                color="error"
                title="No external document #"
            >
                mdi-alert
            </v-icon>
            <span v-else>{{ item.invoice_number }}</span>
        </template>
    </v-data-table>
</v-card>
</template>

<script>
export default {
    props: ['items','template_variation_index','tab_caption','allow_export'],

    data() {
        return {
            // withDmyFormats: ['del_monte_ph','fonterra_brands','gymboree_marketing'],
        }
    },

    computed: {
        tableHeader() {
            // alert(this.template_variation_index);
            // return this[this.PrincipalsStore.state.selectedPrincipalCode]
            //     .state.generatedDataTableHeader[this.template_variation_index];
            return this.PrincipalsStore.state.configs.generatedDataTableHeader[this.template_variation_index];
        }
    },

    methods: {
        exportToCsv(extention='csv') {
            this.PrincipalsStore.toExcel_simple(
                `${this.tab_caption}`,
                this.items,
                // {
                //     storeName: this.PrincipalsStore.state.selectedPrincipalCode,
                //     propertyName: 'generatedDataTableHeader'
                // },
                this.PrincipalsStore.state.configs['generatedDataTableHeader'],
                null,
                `${this.tab_caption}`,
                extention,
                this.template_variation_index
            );
        },

        itemRowStyle: function(item) {
            try {
                return item.status=='completed' ? 'completed-invoice'
                    : item.status=='uploaded' ? 'uploaded-invoice'
                    : '';
            } catch (error) {
                return '';
            }
        },
    },

    mounted() {
        console.log(
            "GeneratedTable component mounted", this.PrincipalsStore.state.selectedPrincipalCode
        );
        console.log('TEMPLATE VARIATION INDEX:', this.template_variation_index);
        console.log('TABLE ITEMS:', this.items);
        // alert(this.template_variation_index);
    }
};
</script>

<style>
    .completed-invoice {
        color: #009e15;
    }
    .uploaded-invoice {
        color: #006bd6;
    }
</style>

