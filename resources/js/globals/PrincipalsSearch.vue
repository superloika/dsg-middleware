<template>
    <!-- <div> -->
        <v-menu
            v-model="menu" offset-y allow-overflow
            :close-on-click="true" :close-on-content-click="false"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn rounded color="primary" v-bind="attrs" v-on="on">
                    <v-icon>mdi-magnify</v-icon>
                    Principals
                </v-btn>
            </template>
            <v-card>
                <NavSideListGroupPrincipals></NavSideListGroupPrincipals>
            </v-card>
        </v-menu>
    <!-- </div> -->
</template>

<script>
export default {
    data: () => ({
        menu: false,
    }),

    mounted() {
        console.log("PrincipalsSearch mounted");
    }
};
</script>
