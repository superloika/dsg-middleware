<template>
    <v-list shaped dense>
        <v-list-item-group color="primary">
            <!-- <v-list-item link to="/">
                <v-list-item-icon class="mr-2">
                    <v-icon>mdi-view-dashboard</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>Dashboard</v-list-item-title>
                </v-list-item-content>
            </v-list-item> -->

            <!-- <v-list-item link to="/expenditures">
                <v-list-item-icon class="mr-2">
                    <v-icon>mdi-view-dashboard</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>Exp Test</v-list-item-title>
                </v-list-item-content>
            </v-list-item> -->

            <NavSideListGroupPrincipals></NavSideListGroupPrincipals>

            <!-- <v-divider class="mt-2 mb-2"></v-divider> -->

            <!-- masterfiles -->
            <v-list-group no-action color="primary"
                v-if="AppStore.isSuperAdmin()"
            >
                <template v-slot:activator>
                    <v-list-item-icon class="mr-2">
                        <v-icon>mdi-folder-multiple</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>General Masterfiles</v-list-item-title>
                    </v-list-item-content>
                </template>

                <v-list-item link to="/master/customers" disabled>
                    <v-list-item-icon class="mr-2">
                        <v-icon>mdi-account-multiple</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Customers</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link to="/master/products" disabled>
                    <v-list-item-icon class="mr-2">
                        <v-icon>mdi-cube</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Products</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item link to="/master/principals">
                    <v-list-item-icon class="mr-2">
                        <v-icon>mdi-store</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Principals</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-group>

            <v-divider class="mt-2 mb-2"></v-divider>

            <v-list-item link to="/about">
                <v-list-item-icon class="mr-2">
                    <v-icon>mdi-information</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>About</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <!-- test page -->
            <v-list-item link to="/test">
                <v-list-item-icon class="mr-2">
                    <v-icon>mdi-test-tube</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>Test Page</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list-item-group>
    </v-list>
</template>


<script>
export default {
    mounted() {
        console.log('NavSide mounted');
    }
}
</script>


