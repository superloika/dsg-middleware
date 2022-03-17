<template>
<div>
    <v-app-bar elevation="0" densex app colorx="white">
        <v-toolbar-title>{{ $route.meta.name }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-text-field
            v-model="searchKey"
            label="Search"
            clearable
            hide-details
            dense
            class="mr-3"
            style="max-width: 230px;"
            flat
            rounded
            solo-inverted
        ></v-text-field>

        <v-btn
            icon
            title="Import"
            @click.stop="MasterCommon.state.isImportDialogOpen=true"
            :disabled="!AppStore.isSuperAdmin()"
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
        :items="MasterPrincipals.state.principals"
        :headers="tblHeader"
        :loading="MasterPrincipals.state.isLoadingPrincipals"
        class="tbl-items elevation-1"
        :search="searchKey"
        densex
    ></v-data-table>

    <v-dialog
        v-model="MasterCommon.state.isImportDialogOpen"
        max-width="600"
        persistent
    >
        <MasterUpload id="principals"></MasterUpload>
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
        fetchSampleData(per_page = 10, curr_page = 1) {
            this.isLoading = true;
            axios.get(`${this.AppStore.state.siteUrl}test/test2?per_page=${per_page}&curr_page=${curr_page}`)
                .then(response => response.data)
                .then(data => {
                    const [ RowNum, ...rest ] = data;
                    console.log(data);
                    this.sampleData = data;
                    this.isLoading = false;

                    this.$root.toast('Test data loaded successfully');
                })
                .catch(error => {
                    console.log('ERROR:', error);
                    this.isLoading = false;
                })
        },

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
                { text: "Principal Name", value: "name" },
                { text: "Principal Code", value: "code" },
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
        this.MasterPrincipals.initPrincipals();
    },

    mounted() {
        console.log('MasterPrincipals page mounted.')
    }
}
</script>
