<template>
<div>
    <v-app-bar elevation="0" app>
        <v-toolbar-title>
            {{ $route.meta.name }}
            <v-chip color="primary" small>
                {{ MasterProducts.state.products.total }}
            </v-chip>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-pagination
            v-model="MasterProducts.state.products.current_page"
            :length="MasterProducts.state.products.last_page"
            @input="onPageChange()"
            total-visible="3"
        >
        </v-pagination>

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
            title="Import Products"
            @click.stop="AppStore.state.dlgImportMaster=true"
        >
            <v-icon>mdi-file-upload</v-icon>
        </v-btn>

        <!-- <v-btn
            icon
            title="Export Products"
        >
            <v-icon>mdi-export</v-icon>
        </v-btn> -->
    </v-app-bar>

    <v-data-table
        :items="MasterProducts.state.products.data"
        :headers="tblHeader"
        :loading="MasterProducts.state.isLoadingProducts"
        class="tbl-items elevation-1x"
        :search="searchKey"
        densex
        hide-default-footer
        disable-pagination
    ></v-data-table>

    <v-dialog
        v-model="AppStore.state.dlgImportMaster"
        max-width="800"
        persistent
    >
        <MasterUpload id="products"></MasterUpload>
    </v-dialog>
</div>
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
            this.MasterProducts.initProducts(this.searchKey);
        },
    },

    computed: {
        tblHeader() {
            let header = [
                { text: "Item Code", value: "item_code" },
                { text: "Item Description", value: "description" },
            ];

            // let header = [];
            // if (this.sampleData.length) {
            //     let objKeys = Object.keys(this.sampleData[0]);
            //     // let vm = this;
            //     objKeys.map(function(val){
            //         header.push({
            //             text:  val.toString().toUpperCase(),
            //             value: val
            //         });
            //     });
            // }

            return header;
        }
    },

    watch: {
        searchKey: debounce(function() {
            if(this.MasterProducts.state.products.current_page != undefined) {
                this.MasterProducts.state.products.current_page = 1;
            }
            this.MasterProducts.initProducts(this.searchKey);
        }, 500),
    },

    created() {
        this.MasterProducts.initProducts();
    },

    mounted() {
        console.log('MasterProducts page mounted.')
    },

    beforeDestroy() {
        this.MasterCustomers.state.customers = {};
        this.MasterProducts.state.products = {};
    },
}
</script>
