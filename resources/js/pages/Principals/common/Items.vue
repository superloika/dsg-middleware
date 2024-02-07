<template>
    <v-card>
        <v-toolbar elevation="27">
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
                @click="PrincipalsStore.initItems(searchKey)"
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
            :items="PrincipalsStore.state.items.data"
            :headers="tblHeader"
            dense
            disable-pagination
            hide-default-footer
        >
            <template v-slot:[`item.item_code`]="{item}">
                <v-chip
                    v-if="item.vendor_code==null || item.vendor_code==''"
                    color="error"
                    outlined
                    x-small
                    title="Not found in General Masterfile"
                >
                    {{ item.item_code }}
                </v-chip>

                <span v-else>{{ item.item_code }}</span>
            </template>
        </v-data-table>

        <v-container>
            <v-pagination
                v-model="PrincipalsStore.state.items.current_page"
                :length="PrincipalsStore.state.items.last_page"
                @input="onPageChange()"
                total-visible="10"
            >
            </v-pagination>
        </v-container>

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
            return this.PrincipalsStore.state.configs.itemsTableHeader[0];
        },

        // principal_code() {
        //     const principal = this.AppStore.state.principals.find(e => e.id == this.$route.params.principal_id);
        //     return principal.code.toLowerCase();\
        // },

        updatedAt() {
            try {
                return this.PrincipalsStore.state.items.data[0].upload_date;
            } catch (error) {
                return 'NA';
            }
        },
    },

    methods: {
        exportToExcel() {
            try {
                this.PrincipalsStore.state.items.current_page = 1;
            } catch (error) {

            }
            this.PrincipalsStore.initItems('', 9999999)
                .then(() => {

                    this.PrincipalsStore.toExcel_simple(
                        'Items',
                        this.PrincipalsStore.state.items.data,
                        // {
                        //     storeName: this.selectedPrincipalCode,
                        //     propertyName: 'itemsTableHeader'
                        // },
                        this.PrincipalsStore.state.configs['itemsTableHeader'],
                        null,
                        `${this.selectedPrincipalCode}_Items`
                    );
                    this.PrincipalsStore.initItems(this.searchKey);
                })
        },

        onPageChange() {
            this.PrincipalsStore.initItems(this.searchKey);
        }


    },

    watch: {
        searchKey: debounce(function() {
            if(this.PrincipalsStore.state.items.current_page != undefined) {
                this.PrincipalsStore.state.items.current_page = 1;
            }
            this.PrincipalsStore.initItems(this.searchKey);
        }, 500),
    },

    created() {
        this.PrincipalsStore.initItems();
    }


}
</script>
