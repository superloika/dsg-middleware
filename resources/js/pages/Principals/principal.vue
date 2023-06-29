<template>
    <div>
        <Base
            :tabs="tabs"
            :key="`${selectedPrincipalCode}_tabs_${new Date().getTime()}`"
        ></Base>
        <!-- <v-btn @click="test()">Test</v-btn> -->
    </div>
</template>


<script>
export default {
    components: {
        Base: () => import("./common/Base.vue"),
    },

    data: () => ({

    }),

    computed: {
        tabs() {
            return [
                {
                    title: 'Templated Data',
                    icon: 'mdi-table',
                    component: () => import("./common/Generated.vue"),
                },
                // {
                //     title: 'Templated Data History',
                //     icon: 'mdi-timetable',
                //     component: () => import("./common/GeneratedHistory.vue"),
                // },
                {
                    title: 'Transactions',
                    icon: 'mdi-file-check',
                    // component: () => import("../common/TransAndInvoices.vue"),
                    component: () => import("./common/Transactions.vue"),
                },
                // {
                //     title: 'Stats',
                //     icon: 'mdi-chart-line',
                //     // component: () => import("../common/TransAndInvoices.vue"),
                //     component: () => import("./common/Stats.vue"),
                // },
                {
                    title: 'Masterfiles',
                    icon: 'mdi-folder-multiple',
                    component: () => import("./common/MasterFiles.vue"),
                },
                {
                    title: 'Settings',
                    icon: 'mdi-tune',
                    component: () => import("./common/Settings.vue"),
                },
                // {
                //     title: 'DevChat (TEST)',
                //     icon: 'mdi-message',
                //     component: () => import("./common/DevChat.vue"),
                // },
            ]
        },

        selectedPrincipalCode() {
            return this.PrincipalsStore.state.selectedPrincipalCode;
        }
    },


    methods: {

    },

    created() {
        if(
            this[this.selectedPrincipalCode] == null ||
            this[this.selectedPrincipalCode] == undefined
        ) {
            Vue.prototype[this.selectedPrincipalCode] =
                require(`../../stores.custom/principals/${this.selectedPrincipalCode}`)
                .default;
        }

        // Initialize settings
        this.PrincipalsStore.initSettings();
    },

    mounted() {
        console.log(this.selectedPrincipalCode + ' component mounted');

        // br test ****************************************************
        // this.BrStore.refresh();
        const data = [
            {
                "retailer_br_id": "5499574",
                "erp_invoice_number": "INV-103",
                "invoice_date": "2023-06-02",
                // "total_value": "-1",
                "details": [
                    // {
                    //     "sku_external_id": "000000000000159626",
                    //     "quantity": "2",
                    //     "sku_uom": "",
                    //     "price_per_item": "1",
                    //     "discount_value": "",
                    //     "gross_value": "",
                    // },
                    // {
                    //     "sku_external_id": "000000501120020002",
                    //     // "sku_external_id": "000000000000159626",
                    //     "quantity": "3",
                    //     "sku_uom": "",
                    //     "price_per_item": "1",
                    //     "discount_value": "",
                    //     "gross_value": "",
                    // },
                    // {
                    //     "sku_external_id": "000005011200361519",
                    //     "quantity": "2",
                    //     "sku_uom": "",
                    //     "price_per_item": "1",
                    //     "discount_value": "",
                    //     "gross_value": "",
                    // },
                    {
                        "sku_external_id": "000005011151165925",
                        "quantity": "-1",
                        "sku_uom": "SCK",
                        "price_per_item": "1",
                        "discount_value": "",
                        "gross_value": "",
                    },

                ],
                "customFields": [
                    // {
                    //     "id": "629",
                    //     "value": "Jessa Alas"
                    // },
                    // {
                    //     "id": "638",
                    //     "value": "Trade Return Bad"
                    // },
                ]
            },
        ];

        var raw = JSON.stringify([
            {
                "retailer_br_id": "5321913",
                "retailer_external_id": "",
                "erp_invoice_number": "CDC-S4819309",
                "invoice_date": "2023-05-29",
                "status": 1,
                "order_id": "",
                "external_order_id": "",
                "ship_to_external_id": "",
                "order_status": "",
                "total_tax": "",
                "total_value": "",
                "remarks": "",
                "payment_due_date": "",
                "invoice_level_discount": "",
                "details": [
                    {
                        "sku_external_id": "000005013180259503",
                        "quantity": "2",
                        "sku_uom": "CS",
                        "price_per_item": "988.8000",
                        "discount_value": "",
                        "gross_value": "",
                        "tax_code": "",
                        "tax": ""
                    },
                ],
                "customFields": [
                    {
                        "id": "629",
                        "value": "Jessa Alas"
                    }
                ]
            }
        ]);
        // this.BrStore.invoiceCreate(data);
    },

    beforeDestroy() {
        if(this.PrincipalsStore != null) {
            this.PrincipalsStore.cleanup();
        }

        this[this.selectedPrincipalCode] = null;
        Vue.prototype[this.selectedPrincipalCode] = null;
    },


};
</script>
