<template>
<div>
    <v-app-bar elevation="0" app>
        <v-toolbar-title>
            <v-icon>mdi-store</v-icon>
            {{ $route.meta.name }}
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
            title="Import"
            @click.stop="AppStore.state.dlgImportMaster=true"
            :disabled="!AppStore.isSuperAdmin()"
            v-if="AppStore.isSuperAdmin()"
        >
            <v-icon>mdi-file-upload</v-icon>
        </v-btn>
    </v-app-bar>

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

    created() {
        this.MasterPrincipals.initPrincipals();
    },

    mounted() {
        console.log('MasterPrincipals page mounted.')
    },

}
</script>
