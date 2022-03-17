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
            <v-chip color="accent" x-small>
                {{ PrincipalsStore.state.customers.length }}
            </v-chip>
        </v-tab>
        <v-tab exact>
            <v-icon class="mr-1">mdi-cube</v-icon> Products&nbsp;
            <v-chip color="accent" x-small>
                {{ PrincipalsStore.state.products.length }}
            </v-chip>
        </v-tab>
    </v-tabs>
    <v-tabs-items v-model="masterfiles_tab">
        <v-tab-item>
            <Customers></Customers>
        </v-tab-item>
        <v-tab-item>
            <Products></Products>
        </v-tab-item>
    </v-tabs-items>
</v-sheet>
</template>

<script>
export default {
    components: {
        Products: () => import("./Products.vue"),
        Customers: () => import("./Customers.vue"),
    },

    data: () => ({
        masterfiles_tab: null,
    }),

    mounted() {
        console.log('MasterFiles component mounted');
    },
};
</script>
