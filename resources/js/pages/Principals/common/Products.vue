<template>
    <v-card
        outlinedx
        class="elevation-0"
    >
        <v-card-title class="pa-0 mb-2">
            <v-app-bar elevation="0" colorx="white">
                <v-toolbar-title>
                    Products Masterfile
                    <em class="text-caption primary--text">
                        Updated at {{ updatedAt }}
                    </em>
                </v-toolbar-title>

                <v-spacer></v-spacer>

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
                    @click.stop="PrincipalsStore.state.isUploadMasterProductsOpen=true"
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
                :items="PrincipalsStore.state.products"
                :headers="tblHeader"
                dense
                :search="searchKey"
            >
            </v-data-table>
        </v-card-text>

        <v-dialog
            v-model="PrincipalsStore.state.isUploadMasterProductsOpen"
            max-width="600"
            persistent
        >
            <!-- <ProductsUpload :principal_code="principal_code"></ProductsUpload> -->
            <MasterfileUpload
                id="products"
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
            return this[this.selectedPrincipalCode].state.productsTableHeader;
        },

        // principal_code() {
        //     const principal = this.AppStore.state.principals.find(e => e.id == this.$route.params.principal_id);
        //     return principal.code.toLowerCase();\
        // },

        updatedAt() {
            try {
                return this.PrincipalsStore.state.products[0].upload_date;
            } catch (error) {
                return 'NA';
            }
        },
    },

    methods: {
        exportToExcel() {
            const data = [
                [
                    'Products',
                    this.PrincipalsStore.state.products
                ]
            ];
            const config = this.PrincipalsStore.getHeaderAndFormat('productsTableHeader');

            this.PrincipalsStore.exportToExcel(
                config.header,
                this.PrincipalsStore.generatedDataSubset(
                    data,
                    config.format
                ),
                null,
                `${this.selectedPrincipalCode}_Products`
            );
        }
    },

    created() {
        this.PrincipalsStore.initProducts(this.selectedPrincipalCode);
    }


}
</script>
