<template>
<v-sheet>
    <v-tabs
        v-model="masterfiles_tab"
        grow
    >
        <v-tab exact>
            <v-icon class="mr-1">mdi-account-multiple</v-icon> Customers&nbsp;
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
    props: ['customers','items','salesmen'],
    components: {
        Items: () => import("./Items.vue"),
        Customers: () => import("./Customers.vue"),
        Salesmen: () => import("./Salesmen.vue"),
    },

    data: () => ({
        masterfiles_tab: null,
    }),

    mounted() {
        console.log('MasterFiles component mounted');
    },
};
</script>
