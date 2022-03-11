<template>
<v-sheet>
    <v-app-bar elevation="0" app dense color="white">
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

        <!-- <v-btn icon title="Import Customers" to="/master/customers/import">
            <v-icon>mdi-import</v-icon>
        </v-btn> -->



        <!-- <v-dialog
            v-model="MasterCustomers.state.importing"
            max-width="728"
            persistent
            transition="dialog-bottom-transition"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn dense icon v-bind="attrs" v-on="on"
                    :disabled="MasterCustomers.state.importing"
                >
                    <v-icon>mdi-import</v-icon>
                </v-btn>
            </template>
            <MasterCustomersImport></MasterCustomersImport>
        </v-dialog> -->


        <v-dialog
            v-model="MasterCommon.state.isImportDialogOpen"
            max-width="600"
            persistent
        >
            <MasterUpload id="customers"></MasterUpload>
        </v-dialog>


        <!-- <v-btn icon title="Import Customers" @click="MasterCustomers.state.importing=true"
            :disabled="MasterCustomers.state.importing">
            <v-icon>mdi-import</v-icon>
        </v-btn> -->
        <v-btn
            icon
            title="Import Customers"
            @click="MasterCommon.state.isImportDialogOpen=true"
        >
            <v-icon>mdi-import</v-icon>
        </v-btn>

    </v-app-bar>

    <!-- <v-expand-transition>
    <v-row v-if="MasterCustomers.state.importing">
        <v-col>
            <MasterCustomersImport></MasterCustomersImport>
        </v-col>
    </v-row>
    </v-expand-transition> -->

    <v-row>
        <v-col>
            <v-data-table
                :items="MasterCustomers.state.customers"
                :headers="tblHeader"
                checkbox-color="primary"
                :loading="MasterCustomers.state.isLoadingCustomers"
                class="tbl-items"
                :search="searchKey"
                dense
            ></v-data-table>
        </v-col>
    </v-row>
</v-sheet>
</template>

<script>

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
            let tblWrapper = document.querySelector('.tbl-items');
            let tbl = tblWrapper.querySelector('table');
            let wb = XLSX.utils.book_new();
            // var ws = XLSX.utils.table_to_sheet(tbl);
            var ws = XLSX.utils.json_to_sheet(this.sampleData);
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
            XLSX.writeFile(wb,'tbl.csv');
        },
    },

    computed: {
        tblHeader() {
            // let header = [
            //     { text: "distributor_code", value: "distributor_code" },
            //     { text: "customer_code", value: "customer_code" },
            //     { text: "customer_name", value: "customer_name" },
            //     { text: "outlet_type", value: "outlet_type" },
            //     { text: "salesman_name", value: "salesman_name" },
            //     { text: "operation_type", value: "operation_type"},
            //     { text: "status", value: "status"},
            //     { text: "address_1", value: "address_1"},
            //     { text: "principal_code", value: "principal_code"},
            // ];

            let header = [];
            let customers = this.MasterCustomers.state.customers;
            if (customers.length) {
                let objKeys = Object.keys(customers[0]);
                objKeys.map(function(val){
                    header.push({
                        text:  val.toString().toUpperCase(),
                        value: val
                    });
                });
            }

            return header;
        },
    },

    watch: {

    },

    created() {
        // this.MasterCustomers.state.sampleData = [];
        this.MasterCustomers.initCustomers();
    },

    mounted() {
        console.log('MasterCustomers page mounted.');
    },
}
</script>


<style>

div.v-data-table__wrapper table tbody{
    font-size: xx-small;
}

</style>
