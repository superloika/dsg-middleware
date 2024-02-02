<template>
<v-card>
    <v-toolbar elevation="27">
        <v-toolbar-title>
            <v-icon>mdi-store</v-icon>
            Principals Masterfile
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn
            icon
            dense
            rounded
            depressed
            title="Refresh"
            class="mr-2"
            @click="MasterPrincipals.initPrincipals()"
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
            style="max-width: 230px;"
            flat
            rounded
            solo-inverted
        ></v-text-field>

        <v-btn
            icon
            title="Export Vendor Codes (NAV Filter)"
            @click.stop="exportNavFilters"
        >
            <v-icon>mdi-file-export</v-icon>
        </v-btn>

        <v-btn
            icon
            title="Import"
            @click.stop="AppStore.state.dlgImportMaster=true"
            :disabled="!AppStore.isSuperAdmin()"
            v-if="AppStore.isSuperAdmin()"
        >
            <v-icon>mdi-file-upload</v-icon>
        </v-btn>
    </v-toolbar>

    <v-data-table
        :items="MasterPrincipals.state.principals"
        :headers="MasterPrincipals.state.tableHeader"
        :loading="MasterPrincipals.state.isLoadingPrincipals"
        class="tbl-items elevation-1"
        :search="searchKey"
        densex
    ></v-data-table>

    <v-dialog
        v-model="AppStore.state.dlgImportMaster"
        max-width="800"
        persistent
    >
        <MasterUpload id="principals"></MasterUpload>
    </v-dialog>
</v-card>
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

        exportNavFilters() {
            let data = "";
            const principals = this.AppStore.state.principals;
            for(let i = 0; i < principals.length; i++) {
                if(principals[i][1][0].active) {
                    data += principals[i][1][0].vendor_code;
                    if(i != principals.length - 1) {
                        data += "|";
                    }
                }
            }
            this.AppStore.exportToTxt('VendorCodesNavFilter.txt', data);
        }
    },

    created() {
        this.MasterPrincipals.initPrincipals();
    },

    mounted() {
        console.log('MasterPrincipals page mounted.')
    },

}
</script>
