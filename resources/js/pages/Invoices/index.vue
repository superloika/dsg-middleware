<template>
<div>
    <v-app-bar elevation="0" app>
        <v-toolbar-title>
            <v-icon>mdi-file-outline</v-icon>
            {{ $route.meta.name }}
            <v-chip color="primary" small>
                {{ InvoicesStore.state.invoices.total }}
            </v-chip>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-pagination
            v-model="InvoicesStore.state.invoices.current_page"
            :length="InvoicesStore.state.invoices.last_page"
            @input="onPageChange()"
            total-visible="5"
        >
        </v-pagination>

        <v-select
            :items="AppStore.state.principals"
            v-model="principalCodeFilter"
            label="Principal"
            item-text="name"
            item-value="code"
            class="mr-3"
            style="max-width:215px;"
            outlined
            rounded
            hide-details
            dense
        >
            <template v-slot:prepend-item>
                <v-list-item
                    link
                    @click="principalCodeFilter=''"
                >
                    <v-list-item-content>
                        <v-list-item-title link>
                                All Principals
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item
                    link
                    @click="principalCodeFilter='unidentified'"
                >
                    <v-list-item-content>
                        <v-list-item-title link>
                                Unidentified
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </template>
        </v-select>

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

        <!-- <v-btn
            icon
            title="Export Items"
        >
            <v-icon>mdi-export</v-icon>
        </v-btn> -->
    </v-app-bar>

    <InvoicesUpload
        :searchKey="searchKey" :principalCodeFilter="principalCodeFilter"
    ></InvoicesUpload>

    <v-data-table
        :items="InvoicesStore.state.invoices.data"
        :headers="InvoicesStore.state.tableHeader"
        :loading="InvoicesStore.state.isLoadingInvoices"
        hide-default-footer
        disable-pagination
        dense
        disable-sort
    >
        <template v-slot:[`item.status`] = '{ item }'>
            <v-chip color="warning" x-small v-if="item.status=='pending'">
                {{ item.status.toUpperCase() }}
            </v-chip>
            <v-chip color="success" x-small v-if="item.status=='completed'">
                {{ item.status.toUpperCase() }}
            </v-chip>
        </template>
        <template v-slot:[`item.created_at`] = '{ item }'>
            <div>
                {{ item.created_at.substring(0,10) }}
            </div>
        </template>
    </v-data-table>
</div>
</template>

<script>
import {debounce} from 'lodash';

export default {
    components: {
        InvoicesUpload: () => import('./InvoicesUpload.vue')
    },
    data() {
        return {
            searchKey: '',
            principalCodeFilter: '',
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
            this.InvoicesStore.initInvoices(this.searchKey, this.principalCodeFilter);
        },
    },

    computed: {

    },

    watch: {
        searchKey: debounce(function() {
            if(this.InvoicesStore.state.invoices.current_page != undefined) {
                this.InvoicesStore.state.invoices.current_page = 1;
            }
            this.InvoicesStore.initInvoices(this.searchKey, this.principalCodeFilter);
        }, 500),
        principalCodeFilter: debounce(function() {
            if(this.InvoicesStore.state.invoices.current_page != undefined) {
                this.InvoicesStore.state.invoices.current_page = 1;
            }
            this.InvoicesStore.initInvoices(this.searchKey, this.principalCodeFilter);
        }, 500),
    },

    created() {
        this.InvoicesStore.initInvoices();
    },

    mounted() {
        console.log('Invoices page mounted.')
    },

    beforeDestroy() {

    },
}
</script>
