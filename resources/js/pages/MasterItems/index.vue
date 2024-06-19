<template>
<v-card>
    <v-toolbar elevation="27">
        <v-toolbar-title>
            <v-icon>mdi-cube</v-icon>
            Items Masterfile
            <v-chip color="primary" small>
                {{ MasterItems.state.items.total }}
            </v-chip>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn
            title="Refresh"
            icon
            dense
            rounded
            depressed
            class="mr-2"
            @click="MasterItems.initItems()"
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
            flat
            rounded
            solo-inverted
            style="max-width: 200px;"
        ></v-text-field>

        <v-btn
            icon
            title="Import Items Masterfile"
            @click.stop="AppStore.state.dlgImportMasterID='items';AppStore.state.dlgImportMaster=true;"
            v-if="AppStore.isSuperAdmin()"
        >
            <v-icon>mdi-file-upload</v-icon>
        </v-btn>

        <!-- <template v-slot:extension>

        </template> -->
    </v-toolbar>

    <v-data-table
        :items="MasterItems.state.items.data"
        :headers="MasterItems.state.tableHeader"
        :loading="MasterItems.state.isLoadingItems"
        hide-default-footer
        disable-pagination
    >
        <template v-slot:[`item.actions`]="{ item }">
            <v-dialog max-width="400">
                <template v-slot:activator="{on, attrs}">
                    <v-btn small rounded icon color="primary" title="View UOMs"
                        v-on="on" v-bind="attrs"
                        @click.stop="item_code_ofUOM = item.item_code;"
                    >
                        <v-icon>mdi-eye</v-icon>
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title>Unit of Measures (Navision)</v-card-title>
                    <v-card-text>
                        <v-text-field outlined dense persistent-hint
                            label="Item Code" v-model="item_code_ofUOM"
                            hint="You can change the value to lookup for other item UOMs"
                        >
                        </v-text-field>
                    </v-card-text>
                    <v-data-table
                        :items="uoms"
                        :headers="uomsTblHeader"
                        :loading="isLoadingUOMs"
                        hide-default-footer
                        disable-pagination
                    ></v-data-table>
                </v-card>
            </v-dialog>
        </template>
    </v-data-table>

    <div class="pb-6">
        <v-pagination
            v-model="MasterItems.state.items.current_page"
            :length="MasterItems.state.items.last_page"
            @input="onPageChange()"
            total-visible="5"
        >
        </v-pagination>
    </div>

    <v-dialog
        v-model="AppStore.state.dlgImportMaster"
        max-width="800"
        persistent
    >
        <MasterUpload key="genmaster-items"></MasterUpload>
    </v-dialog>
</v-card>
</template>

<script>
import {debounce} from 'lodash';

export default {
    components: {
        MasterUpload: () => import('../../page_common/master/MasterUpload.vue')
    },
    data() {
        return {
            searchKey: '',
            uoms: [],
            uomsTblHeader: [
                { text: "UOM Code", value: "uom_code" },
                { text: "Qty per UOM", value: "qty_per_uom" },
            ],
            isLoadingUOMs: false,
            item_code_ofUOM: '',
        }
    },

    methods: {
        exportToExcelTest() {
            this.isLoading = true;
            let tblWrapper = document.querySelector('.tbl-items');
            let tbl = tblWrapper.querySelector('table');
            let wb = XLSX.utils.book_new();
            // var ws = XLSX.utils.table_to_sheet(tbl);
            var ws = XLSX.utils.json_to_sheet(this.sampleData);
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
            XLSX.writeFile(wb,'tbl.csv');
            this.isLoading = false;
        },

        onPageChange() {
            this.MasterItems.initItems(this.searchKey);
        },

        async viewUOMs(item_code) {
            try {
                this.isLoadingUOMs = true;
                this.uoms = [];
                const url = this.AppStore.state.siteUrl + 'nav/uomsLookup?item_code=' + item_code;
                const res = await axios.get(url);
                this.uoms = res.data;
            } catch (error) {
                console.error(error);
            } finally {
                this.isLoadingUOMs = false;
            }
        },
    },

    computed: {

    },

    watch: {
        searchKey: debounce(function() {
            if(this.MasterItems.state.items.current_page != undefined) {
                this.MasterItems.state.items.current_page = 1;
            }
            this.MasterItems.initItems(this.searchKey);
        }, 500),

        item_code_ofUOM: debounce(function() {
            if(this.item_code_ofUOM != '') {
                this.viewUOMs(this.item_code_ofUOM);
            }
        }, 500),
    },

    created() {
        this.MasterItems.initItems();
    },

    mounted() {
        console.log('MasterItems page mounted.')
    },

    beforeDestroy() {
        this.MasterCustomers.state.customers = {};
        this.MasterItems.state.items = {};
    },
}
</script>
