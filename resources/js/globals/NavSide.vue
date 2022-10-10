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

            <v-list-item link to="/invoices">
                <v-list-item-icon class="mr-2">
                    <v-icon>mdi-file-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>Invoices</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <NavSideListGroupPrincipals></NavSideListGroupPrincipals>

            <!-- <v-divider class="mt-2 mb-2"></v-divider> -->

            <!-- masterfiles -->
            <v-list-group no-action color="primary">
                <template v-slot:activator>
                    <v-list-item-icon class="mr-2">
                        <v-icon>mdi-folder-multiple</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>General Masterfiles</v-list-item-title>
                    </v-list-item-content>
                </template>

                <v-list-item link to="/master/customers">
                    <v-list-item-icon class="mr-2">
                        <v-icon>mdi-account-multiple</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Customers</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <!-- <v-list-item link to="/master/products">
                    <v-list-item-icon class="mr-2">
                        <v-icon>mdi-cube</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Products</v-list-item-title>
                    </v-list-item-content>
                </v-list-item> -->

                <v-list-item link to="/master/items">
                    <v-list-item-icon class="mr-2">
                        <v-icon>mdi-cube</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>Items</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item link to="/master/principals">
                    <v-list-item-icon class="mr-2">
                        <v-icon>mdi-store</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>
                            Principals
                        </v-list-item-title>
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
        </v-list-item-group>
    </v-list>
</template>


<script>
import AppStore from '../stores.custom/AppStore';


export default {
    mounted() {
        console.log('NavSide mounted');
    },

    computed: {
        // selectedPrincipalCode() {
        //     return this.PrincipalsStore.state.selectedPrincipalCode;
        // }
    },

    watch: {
        // selectedPrincipalCode(val) {
        //     console.log(
        //         'changing selectedPrincipalCode: ',
        //         this.PrincipalsStore.state.selectedPrincipalCode
        //     );
        //     const p = AppStore.state.principals.find(e=>{
        //         return e.code==val;
        //     });
        //     if(p!=undefined) {
        //         if(p.proj_status==0) {
        //             this.PrincipalsStore.state.selectedPrincipalCode = 'temprincipals';
        //         }
        //     }
        // }

    },

}
</script>


