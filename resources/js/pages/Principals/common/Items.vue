<template>
    <v-card
        outlinedx
        class="elevation-0"
    >
        <v-card-title class="pa-0 mb-2">
            <v-app-bar elevation="0" colorx="white">
                <v-toolbar-title>
                    <div>
                        Items
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
                    @click="PrincipalsStore.initItems(selectedPrincipalCode)"
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
                    @click.stop="PrincipalsStore.state.isUploadMasterItemsOpen=true"
                >
                    <v-icon>mdi-file-upload</v-icon>
                </v-btn>
                <!-- <v-btn
                    title="Export to Excel"
                    icon
                    dense
                    @click="exportToExcel()"
                >
                    <v-icon>mdi-file-excel</v-icon>
                </v-btn> -->
            </v-app-bar>
        </v-card-title>

        <v-card-text class="mx-0 px-0">
            <v-data-table
                :items="PrincipalsStore.state.items"
                :headers="tblHeader"
                dense
                :search="searchKey"
            >
            </v-data-table>
        </v-card-text>

        <v-dialog
            v-model="PrincipalsStore.state.isUploadMasterItemsOpen"
            max-width="800"
            persistent
        >
            <MasterfileUpload
                id="items"
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
            return this[this.selectedPrincipalCode].state.itemsTableHeader[0];
        },

        // principal_code() {
        //     const principal = this.AppStore.state.principals.find(e => e.id == this.$route.params.principal_id);
        //     return principal.code.toLowerCase();\
        // },

        updatedAt() {
            try {
                return this.PrincipalsStore.state.items[0].upload_date;
            } catch (error) {
                return 'NA';
            }
        },
    },

    methods: {
        // exportToExcel() {
        //     const data = [
        //         [
        //             'Items',
        //             this.PrincipalsStore.state.items
        //         ]
        //     ];
        //     const config = this.PrincipalsStore.getHeaderAndFormat('itemsTableHeader');

        //     this.PrincipalsStore.exportToExcel(
        //         config[0].header,
        //         this.PrincipalsStore.generatedDataSubset(
        //             data,
        //             config[0].format
        //         ),
        //         null,
        //         `${this.selectedPrincipalCode}_Items`
        //     );
        // },

        exportToExcel() {
            this.PrincipalsStore.toExcel_simple(
                'Items',
                this.PrincipalsStore.state.items,
                'itemsTableHeader',
                null,
                `${this.selectedPrincipalCode}_Items`
            );
        },


    },

    created() {
        this.PrincipalsStore.initItems(this.selectedPrincipalCode);
    }


}
</script>
