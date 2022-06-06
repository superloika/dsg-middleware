<template>
    <v-card
        outlinedx
        class="elevation-0"
    >
        <v-card-title class="pa-0 mb-2">
            <v-app-bar elevation="0" colorx="white">
                <v-toolbar-title>
                    Customers Masterfile
                    <em class="text-caption primary--text">
                        Updated at {{ updatedAt }}
                    </em>
                </v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn
                    title="Refresh"
                    icon
                    dense
                    rounded
                    depressed
                    color="success"
                    class="mr-2"
                    @click="PrincipalsStore.initCustomers(selectedPrincipalCode)"
                >
                    <v-icon>mdi-refresh</v-icon>
                </v-btn>

                <v-text-field
                    v-model="searchKey"
                    label="Search"
                    clearable
                    hide-details
                    dense
                    class="mr-3"
                    style="max-width:300px;"
                    flat
                    rounded
                    solo-inverted
                ></v-text-field>

                <v-btn
                    title="Import"
                    icon
                    dense
                    @click.stop="PrincipalsStore.state.isUploadMasterCustomersOpen=true"
                >
                    <v-icon>mdi-file-upload</v-icon>
                </v-btn>

                <v-btn
                    title="Export to Excel"
                    icon
                    dense
                    @click="exportToExcel()"
                >
                    <v-icon>mdi-file-excel</v-icon>
                </v-btn>
            </v-app-bar>
        </v-card-title>

        <v-card-text class="mx-0 px-0">
            <v-data-table
                :items="PrincipalsStore.state.customers"
                :headers="tblHeader"
                dense
                :search="searchKey"
            >
            </v-data-table>
        </v-card-text>

        <v-dialog
            v-model="PrincipalsStore.state.isUploadMasterCustomersOpen"
            max-width="800"
            persistent
        >
            <MasterfileUpload
                id="customers"
            >
            </MasterfileUpload>
        </v-dialog>
    </v-card>
</template>


<script>
export default {
    components: {
        MasterfileUpload: () => import('./MasterfileUpload.vue'),
    },

    data: () => ({
        searchKey: '',

    }),

    computed: {
        selectedPrincipalCode() {
            return this.PrincipalsStore.state.selectedPrincipalCode;
        },

        tblHeader() {
            return this[this.selectedPrincipalCode].state.customersTableHeader[0];
            // if(this.PrincipalsStore.state.selectedPrincipalCode == 'wyeth') {
            //     return this.WyethStore.state.customersTableHeader;
            // } else {
            //     return [];
            // }
        },

        updatedAt() {
            try {
                return this.PrincipalsStore.state.customers[0].upload_date;
            } catch (error) {
                return '...';
            }
        },

        // principal_code() {
        //     const principal = this.AppStore.state.principals.find(e => e.id == this.$route.params.principal_id);
        //     return principal.code.toLowerCase();\
        // },
    },

    methods: {
        exportToExcel() {
            this.PrincipalsStore.toExcel_simple(
                'Customers',
                this.PrincipalsStore.state.customers,
                'customersTableHeader',
                null,
                `${this.selectedPrincipalCode}_Customers`
            );
        },
    },

    created() {
        this.PrincipalsStore.initCustomers(this.selectedPrincipalCode);
    },
}
</script>
