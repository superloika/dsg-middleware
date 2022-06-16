<template>
<v-sheet>
    <v-tabs
        v-model="masterfiles_tab"
        slider-color = "primary"
        heightx="40"
        grow
        background-colorx="grey lighten-5"
    >
        <v-tab exact>
            <v-icon class="mr-1">mdi-account-multiple</v-icon> Customers&nbsp;
            <!-- <v-chip color="primary" x-small>
                {{ PrincipalsStore.state.customers.length }}
            </v-chip> -->
        </v-tab>
        <v-tab exact>
            <v-icon class="mr-1">mdi-cube</v-icon> Items&nbsp;
        </v-tab>
        <v-tab exact>
            <v-icon class="mr-1">mdi-account</v-icon> Salesmen&nbsp;
        </v-tab>
    </v-tabs>
    <v-tabs-items v-model="masterfiles_tab">
        <v-tab-item>
            <Customers></Customers>
        </v-tab-item>
        <v-tab-item>
            <Items></Items>
        </v-tab-item>
        <v-tab-item>
            <Salesmen></Salesmen>
        </v-tab-item>
    </v-tabs-items>
</v-sheet>
</template>

<script>
export default {
    components: {
        Items: () => import("./Items.vue"),
        Customers: () => import("./Customers.vue"),
        Salesmen: () => import("./Salesmen.vue"),
    },

    data: () => ({
        masterfiles_tab: null,
    }),

    created() {
        // this.PrincipalsStore.initCustomers(this.PrincipalsStore.state.selectedPrincipalCode);
    },

    mounted() {
        console.log('MasterFiles component mounted');
    },
};
</script>
