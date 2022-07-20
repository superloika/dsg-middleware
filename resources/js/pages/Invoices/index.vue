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

        <v-btn
            title="Refresh"
            icon
            dense
            rounded
            depressed
            class="mr-2"
            @click="onPageChange()"
        >
            <v-icon>mdi-refresh</v-icon>
        </v-btn>

        <v-btn
            title="Delete"
            icon
            dense
            rounded
            depressed
            class="mr-2"
            color="error"
            :disabled="InvoicesStore.state.selectedInvoices.length < 1"
            @click="InvoicesStore.deleteInvoices()"
            v-if="AppStore.isSuperAdmin()"
        >
            <v-icon>mdi-delete</v-icon>
        </v-btn>

        <v-combobox
            :items="AppStore.state.principals"
            v-model="principalCodeFilter"
            label="Principal"
            item-text="name"
            item-value="code"
            :return-object="false"
            class="mr-3"
            style="max-width:250px;"
            outlined
            rounded
            hide-details
            dense
            clearable
        >
            <template v-slot:prepend-item>
                <v-list-item
                    link
                    @click="principalCodeFilter='others'"

                >
                    <v-list-item-content >
                        <v-list-item-title link>
                                <div class="warning--text">
                                    Others
                                </div>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </template>
        </v-combobox>

        <v-select
            :items="invoiceStatuses"
            v-model="invoiceStatus"
            label="Status"
            item-text="status"
            item-value="value"
            class="mr-3"
            style="max-width:180px;"
            outlined
            rounded
            hide-details
            dense
        ></v-select>

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

        <template v-slot:extension>
            <v-app-bar
                dense
                elevation="0"
            >
                <v-select
                    :items="groupByColumns"
                    v-model="groupBy"
                    class="mr-3"
                    style="max-width:125px;"
                    label="Group By"
                    outlined
                    rounded
                    hide-details
                    dense
                >
                </v-select>
                <v-select
                    :items="tblPageRowCounts"
                    v-model="tblPageRowCount"
                    class="mr-3"
                    style="max-width:125px;"
                    label="Rows"
                    outlined
                    rounded
                    hide-details
                    dense
                >
                </v-select>
                <v-pagination
                    v-model="InvoicesStore.state.invoices.current_page"
                    :length="InvoicesStore.state.invoices.last_page"
                    @input="onPageChange()"
                    total-visible="5"
                >
                </v-pagination>
            </v-app-bar>
        </template>
    </v-app-bar>

    <InvoicesUpload
        :searchKey="searchKey" :principalCodeFilter="principalCodeFilter"
    ></InvoicesUpload>

    <v-data-table
        :items="InvoicesStore.state.invoices.data"
        :headers="InvoicesStore.state.tableHeader"
        :loading="InvoicesStore.state.isLoadingInvoices"
        item-key="id"
        v-model="InvoicesStore.state.selectedInvoices"
        hide-default-footer
        disable-pagination
        disable-sort
        show-select
        :group-by="groupBy"
        show-group-by
    >
        <template v-slot:[`item.status`] = '{ item }'>
            <v-chip color="warning" x-small
                v-if="item.status=='pending'"
                class="px-2"
                title="Pending"
            >
            </v-chip>
            <v-chip color="success" x-small
                v-if="item.status=='completed'"
                class="px-2"
                title="Completed"
            >
            </v-chip>
        </template>
        <template v-slot:[`item.created_at`] = '{ item }'>
            <div>
                {{ item.created_at.substring(0,10) }}
            </div>
        </template>
        <template v-slot:[`item.principals_name`] = '{ item }'>
            <div v-if="item.principals_name != null">
                {{ item.principals_name }}
            </div>
            <div v-else>
                <v-icon>mdi-help-circle-outline</v-icon>
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
            invoiceStatuses: [
                {
                    status: "All",
                    value: "",
                },
                {
                    status: "Completed",
                    value: "completed",
                },
                {
                    status: "Pending",
                    value: "pending",
                },
            ],
            invoiceStatus: '',
            tblPageRowCounts: [10, 20, 30, 50, 100, 500],
            tblPageRowCount: 10,

            groupByColumns: [
                'filename','status','principals_name','doc_no','terminal'
            ],
            groupBy: 'filename',
        }
    },

    methods: {
        // exportToExcelTest() {
        //     this.isLoading = true;
        //     let tblWrapper = document.querySelector('.tbl-items');
        //     let tbl = tblWrapper.querySelector('table');
        //     let wb = XLSX.utils.book_new();
        //     // var ws = XLSX.utils.table_to_sheet(tbl);
        //     var ws = XLSX.utils.json_to_sheet(this.sampleData);
        //     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        //     XLSX.writeFile(wb,'tbl.csv');
        //     this.isLoading = false;
        // },

        onPageChange() {
            this.InvoicesStore.initInvoices(
                this.searchKey, this.principalCodeFilter, this.invoiceStatus, this.tblPageRowCount
            );
        },
    },

    computed: {

    },

    watch: {
        searchKey: debounce(function() {
            if(this.InvoicesStore.state.invoices.current_page != undefined) {
                this.InvoicesStore.state.invoices.current_page = 1;
            }
            this.onPageChange()
        }, 500),

        principalCodeFilter: debounce(function() {
            if(this.principalCodeFilter==null) this.principalCodeFilter='';

            if(this.InvoicesStore.state.invoices.current_page != undefined) {
                this.InvoicesStore.state.invoices.current_page = 1;
            }
            this.onPageChange()
        }, 200),

        invoiceStatus: debounce(function() {
            if(this.InvoicesStore.state.invoices.current_page != undefined) {
                this.InvoicesStore.state.invoices.current_page = 1;
            }
            this.onPageChange()
        }, 200),

        tblPageRowCount: debounce(function() {
            if(this.InvoicesStore.state.invoices.current_page != undefined) {
                this.InvoicesStore.state.invoices.current_page = 1;
            }
            this.onPageChange()
        }, 200),
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
