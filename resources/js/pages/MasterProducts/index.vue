<template>
<div>
    <v-app-bar elevation="0" dense app color="white">
        <v-toolbar-title>{{ $route.meta.name }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-text-field
            v-model="searchKey"
            label="Search"
            clearable
            hide-details
            dense
            class="mr-3"
            flat
            rounded
            solo
            background-color="grey lighten-5"
        ></v-text-field>

        <v-btn
            icon
            title="Import Products"
            @click.stop="MasterCommon.state.isImportDialogOpen=true"
        >
            <v-icon>mdi-import</v-icon>
        </v-btn>

        <!-- <v-btn
            icon
            title="Export Products"
        >
            <v-icon>mdi-export</v-icon>
        </v-btn> -->
    </v-app-bar>

    <v-data-table
        :items="MasterProducts.state.products"
        :headers="tblHeader"
        :loading="MasterProducts.state.isLoadingProducts"
        class="tbl-items elevation-1x"
        :search="searchKey"
        dense
    ></v-data-table>

    <v-dialog
        v-model="MasterCommon.state.isImportDialogOpen"
        max-width="600"
        persistent
    >
        <MasterUpload id="products"></MasterUpload>
    </v-dialog>
</div>
</template>

<script>
export default {
    components: {
        MasterUpload: () => import('../../page_common/master/MasterUpload.vue')
    },
    data() {
        return {
            percentCompleted: '',
            currPage: 1,
            perPage: 10,
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
    },

    computed: {
        tblHeader() {
            let header = [
                { text: "Item Code", value: "item_code" },
                { text: "Description", value: "description" },
                { text: "Item Code", value: "item_code_supplier" },
                { text: "Description (Supplier)", value: "description_supplier" },
                { text: "UOM", value: "uom" },
                { text: "Per UOM", value: "per_uom"},
                { text: "Principal Code", value: "principal_code"},
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

    created() {
        this.MasterProducts.initProducts();
    },

    mounted() {
        console.log('MasterProducts page mounted.')
    }
}
</script>
