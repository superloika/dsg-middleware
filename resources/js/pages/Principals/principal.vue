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
                    title: 'Templated Data (Sales Invoices)',
                    icon: 'mdi-receipt',
                    component: () => import("./common/Generated.vue"),
                },
                {
                    title: 'Return Invoices',
                    icon: 'mdi-cash-refund',
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

            // refresh BeatRoute token
            if(this[this.selectedPrincipalCode].state.bu != undefined) {
                this.BrStore.refresh(this[this.selectedPrincipalCode].state.bu);
            }
        }

        // Initialize settings
        this.PrincipalsStore.initSettings();
    },

    mounted() {
        console.log(this.selectedPrincipalCode + ' component mounted');
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
