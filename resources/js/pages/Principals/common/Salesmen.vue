<template>
    <v-card>
        <v-toolbar elevation="27">
            <v-toolbar-title>
                <div>
                    Salesmen
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
                @click="PrincipalsStore.initSalesmen(selectedPrincipalCode)"
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
                @click.stop="PrincipalsStore.state.isUploadMasterSalesmenOpen=true"
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
        </v-toolbar>

        <v-data-table
            :items="PrincipalsStore.state.salesmen"
            :headers="tblHeader"
            dense
            :search="searchKey"
        >
        </v-data-table>

        <v-dialog
            v-model="PrincipalsStore.state.isUploadMasterSalesmenOpen"
            max-width="800"
            persistent
        >
            <MasterfileUpload
                id="salesmen"
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
            return this.PrincipalsStore.state.configs.salesmenTableHeader[0];
            // if(this.PrincipalsStore.state.selectedPrincipalCode == 'wyeth') {
            //     return this.WyethStore.state.customersTableHeader;
            // } else {
            //     return [];
            // }
        },

        updatedAt() {
            try {
                return this.PrincipalsStore.state.salesmen[0].upload_date;
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
                'Salesmen',
                this.PrincipalsStore.state.salesmen,
                this.PrincipalsStore.state.configs['salesmenTableHeader'],
                null,
                `${this.selectedPrincipalCode}_Salesmen`
            );
        },
    },

    created() {
        this.PrincipalsStore.initSalesmen(this.selectedPrincipalCode);
    },
}
</script>
