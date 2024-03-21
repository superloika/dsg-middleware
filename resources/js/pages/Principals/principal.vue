<template>
    <div>
        <Base
            :tabs="tabs"
            :key="`${selectedPrincipalCode}_tabs_${new Date().getTime()}`"
        ></Base>
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
                // {
                //     title: 'Download Invoices',
                //     icon: 'mdi-download',
                //     component: () => import("./common/DownloadInvoices.vue"),
                // },
                {
                    title: 'Invoices',
                    icon: 'mdi-receipt',
                    component: () => import("./common/Generated.vue"),
                },
                {
                    title: 'Transactions',
                    icon: 'mdi-file-check',
                    component: () => import("./common/Transactions.vue"),
                },
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
        // Initialize settings
        this.PrincipalsStore.initSettings();
        this.PrincipalsStore.initConfigs();

        // this.BrStore.refresh('ppfb');

    },

    mounted() {
        console.log(this.selectedPrincipalCode + ' component mounted');
    },

    beforeDestroy() {
        if(this.PrincipalsStore != null) {
            this.PrincipalsStore.cleanup();
        }
    },


};
</script>
