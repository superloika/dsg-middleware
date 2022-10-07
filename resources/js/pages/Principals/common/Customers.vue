<template>
    <v-card class="elevation-0">
        <v-card-title class="pa-0 mb-2">
            <v-app-bar elevation="0">
                <v-toolbar-title>
                    <div>
                        Customers
                    </div>
                    <div>
                        <em class="text-caption primary--text">
                            Updated at {{ updatedAt }}
                        </em>
                    </div>
                </v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn
                    title="Refresh"
                    icon
                    dense
                    rounded
                    depressed
                    class="mr-2"
                    @click="PrincipalsStore.initCustomers(searchKey)"
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
                :items="PrincipalsStore.state.customers.data"
                :headers="tblHeader"
                dense
                :searchx="searchKey"
                disable-pagination
                disable-filtering
                hide-default-footer
            >
            </v-data-table>
            <v-container>
                <v-pagination
                    v-model="PrincipalsStore.state.customers.current_page"
                    :length="PrincipalsStore.state.customers.last_page"
                    @input="onPageChange()"
                    total-visible="10"
                >
                </v-pagination>
            </v-container>
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
import {debounce} from 'lodash';

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
                return this.PrincipalsStore.state.customers.data[0].upload_date;
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
            try {
                this.PrincipalsStore.state.customers.current_page = 1;
            } catch (error) {

            }
            this.PrincipalsStore.initCustomers('', 9999999)
                .then(()=>{
                    this.PrincipalsStore.toExcel_simple(
                        'Customers',
                        this.PrincipalsStore.state.customers.data,
                        {
                            storeName: this.selectedPrincipalCode,
                            propertyName: 'customersTableHeader'
                        },
                        null,
                        `${this.selectedPrincipalCode}_Customers`
                    );
                    this.PrincipalsStore.initCustomers(this.searchKey);
                });
        },

        onPageChange() {
            this.PrincipalsStore.initCustomers(this.searchKey);
        },
    },

    watch: {
        searchKey: debounce(function() {
            if(this.PrincipalsStore.state.customers.current_page != undefined) {
                this.PrincipalsStore.state.customers.current_page = 1;
            }
            this.PrincipalsStore.initCustomers(this.searchKey);
        }, 500),
    },

    created() {
        this.PrincipalsStore.initCustomers();
    },
}
</script>
