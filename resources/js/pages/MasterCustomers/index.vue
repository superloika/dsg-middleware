<template>
<v-card>
    <v-toolbar elevation="27">
        <v-toolbar-title>
            <v-icon>mdi-account-multiple</v-icon>
            Customers Masterfile
            <v-chip color="primary" small>
                {{ MasterCustomers.state.customers.total }}
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
            @click="MasterCustomers.initCustomers()"
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

        <v-dialog
            v-model="AppStore.state.dlgImportMaster"
            max-width="800"
            persistent
        >
            <MasterUpload id="customers"></MasterUpload>
        </v-dialog>
        <v-btn
            icon
            title="Import Customers"
            @click="AppStore.state.dlgImportMaster=true"
            v-if="AppStore.isSuperAdmin()"
        >
            <v-icon>mdi-file-upload</v-icon>
        </v-btn>

        <template v-slot:extension>
            <div>
                <v-pagination
                    v-model="MasterCustomers.state.customers.current_page"
                    :length="MasterCustomers.state.customers.last_page"
                    @input="onPageChange()"
                    total-visible="5"
                >
                </v-pagination>
            </div>
        </template>

    </v-toolbar>

    <v-row>
        <v-col cols="12">
            <v-data-table
                :items="MasterCustomers.state.customers.data"
                :headers="tblHeader"
                class="tbl-items"
                densex
                hide-default-footer
                disable-pagination
                :loading="MasterCustomers.state.isLoadingCustomers"
            ></v-data-table>
        </v-col>
    </v-row>
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

        onPageChange() {
            this.MasterCustomers.initCustomers(this.searchKey);
        },
    },

    computed: {
        tblHeader() {
            return [
                {text:'Customer Code', value:'customer_code'},
                {text:'Name', value:'name'},
                {text:'Address', value:'address'},
                {text:'Address 2', value:'address_2'},
                {text:'City', value:'city'},
                {text:'Contact', value:'contact'},
                {text:'Phone No.', value:'phone_no'},
            ];

            // let header = [];
            // let cust = this.MasterCustomers.state.customers.data;
            // if (cust.length) {
            //     let objKeys = Object.keys(cust[0]);
            //     objKeys.map(function(val){
            //         if(val!='id') {
            //             header.push({
            //                 text:  val.toString().toUpperCase().replace('_',' ',this),
            //                 value: val
            //             });
            //         }
            //     });
            // }
            // return header;
        },
    },

    watch: {
        searchKey: debounce(function() {
            if(this.MasterCustomers.state.customers.current_page != undefined) {
                this.MasterCustomers.state.customers.current_page = 1;
            }
            this.MasterCustomers.initCustomers(this.searchKey);
        }, 500),
    },

    created() {
        // this.MasterCustomers.state.sampleData = [];
        this.MasterCustomers.initCustomers();
    },

    mounted() {
        console.log('MasterCustomers page mounted.');
    },

    beforeDestroy() {
        this.MasterCustomers.state.customers = {};
        this.MasterItems.state.items = {};
    },
}
</script>


<style>

div.v-data-table__wrapper table tbody{
    font-size: xx-small;
}

</style>
