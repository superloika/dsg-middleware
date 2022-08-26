<template>
<div>
    <v-sheet class="px-3 pt-1 pb-2" color="grey lighten-5" v-if="allow_export">
        <div class="d-flex justify-end">
            <v-btn
                title="Export table to TXT file (Tab Delimited)"
                color="success"
                class="mr-2"
                x-small
                rounded
                @click="exportToCsv('txt')"
            >Export {{ tab_caption }} to TXT</v-btn>
            <v-btn
                title="Export table to CSV file (Comma Delimited)"
                color="success"
                class=""
                x-small
                rounded
                @click="exportToCsv()"
            >
                Export {{ tab_caption }} to CSV
            </v-btn>
        </div>
    </v-sheet>
    <v-data-table
        dense
        :items="items"
        :headers="tableHeader"
        :items-per-page="10"
        :search="PrincipalsStore.state.currentGeneratedDataSearchKey"
        disable-sort
    >
        <template v-slot:[`item.customer_code`]="{ item }">
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
                                'CUSTOMER_NOT_FOUND'?'error':'warning'
                        "
                        small
                        outlined
                        title="Unmapped"
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

        <template v-slot:[`item.route_code`]="{ item }">
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
        </template>

        <template v-slot:[`item.item_code`]="{ item }">
            <v-tooltip
                v-if="item.item_notfound==1"
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
    </v-data-table>
</div>
</template>

<script>
export default {
    props: ['items','template_variation_index','tab_caption','allow_export'],

    computed: {
        tableHeader() {
            // alert(this.template_variation_index);
            return this[this.PrincipalsStore.state.selectedPrincipalCode]
                .state.generatedDataTableHeader[this.template_variation_index];
        }
    },

    methods: {
        exportToCsv(extention='csv') {
            this.PrincipalsStore.toExcel_simple(
                `${this.tab_caption}`,
                this.items,
                'generatedDataTableHeader',
                null,
                `${this.tab_caption}`,
                extention,
                this.template_variation_index
            );
        },
    },

    mounted() {
        console.log(
            "GeneratedTable component mounted", this.PrincipalsStore.state.selectedPrincipalCode
        );
        console.log('TEMPLATE VARSSSSSSSSSSSSSSSSSSSSSSSS', this.template_variation_index);
        console.log('ITEEEEEEMMMMMSSSSSS', this.items);
        // alert(this.template_variation_index);
    }
};
</script>

