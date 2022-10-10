<template>
    <div>
        <v-app-bar elevation="0" app extension-height="65" >
            <v-toolbar-title>
                <v-icon>mdi-file-outline</v-icon>
                {{ $route.meta.name }}
                <v-chip color="default" small title="Number of entries">
                    {{ InvoicesStore.state.invoices.total }}
                </v-chip>
                <v-chip color="default" small title="Total Amount">
                    {{ AppStore.formatAsCurrency(InvoicesStore.state.invoicesTotalAmount) }}
                </v-chip>
            </v-toolbar-title>

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
                solo-inverted
                style="max-width: 300px;"
            ></v-text-field>

            <v-btn
                title="Reset"
                icon
                dense
                rounded
                depressed
                class="mr-2"
                color="error"
                :disabled="InvoicesStore.state.selectedInvoices.length < 1"
                @click="InvoicesStore.resetInvoices()"
                v-if="AppStore.isSuperAdmin()"
            >
                <v-icon>mdi-x</v-icon>
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
                <v-icon>mdi-x</v-icon>
            </v-btn>

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
                v-if="AppStore.isSuperAdmin() || AppStore.isAdmin() || AppStore.isUploader()"
                title="Extract Raw Invoices"
                dense
                rounded
                class="mr-2"
                @click="InvoicesStore.state.isExtractInvoicesShown=true"
            >
                <v-icon>mdi-export</v-icon>
                Extract
            </v-btn>

            <!-- <v-btn
                title="Sync Text Files"
                icon
                dense
                rounded
                depressed
                class="mr-2"
                color="primary"
                @click="syncTextfiles()"
            >
                <v-icon>mdi-file-sync-outline</v-icon>
            </v-btn> -->

            <template v-slot:extension>
                <v-app-bar densex elevation="0">
                    <!-- <v-select
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
                    </v-select> -->

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

                    <v-spacer></v-spacer>

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
                                @click="principalCodeFilter = 'others'"
                            >
                                <v-list-item-content>
                                    <v-list-item-title link>
                                        <div class="warning--text">
                                            Others
                                        </div>
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                        <template v-slot:item = "{ item }">
                            <div
                                :class="item.proj_status==1?'primary--text':'warning--text'"
                                class="text-caption"
                            >
                                <v-chip small>
                                    {{ item.vendor_code }}
                                </v-chip>
                                {{ item.name }}
                            </div>
                        </template>
                    </v-combobox>

                    <v-select
                        rounded
                        outlined
                        dense
                        hide-details
                        :items="groups"
                        item-text="group_name"
                        item-value="group_code"
                        v-model="selectedGroup"
                        title="Source Group"
                        style="max-width:170px;"
                        class="mr-3"
                        label="Source"
                    ></v-select>

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
                </v-app-bar>
            </template>
        </v-app-bar>

        <!-- Invoice upload component -->
        <v-sheet class="ma-2 rounded-lg green lighten-5"
            v-if="AppStore.isSuperAdmin() || AppStore.isAdmin() || AppStore.isUploader()"
            elevation="0"
        >
            <InvoicesUpload
                :searchKey="searchKey"
                :principalCodeFilter="principalCodeFilter"
            ></InvoicesUpload>
        </v-sheet>

        <v-data-table
            :items="InvoicesStore.state.invoices.data"
            :headers="InvoicesStore.state.tableHeader"
            :loadingxxx="InvoicesStore.state.isLoadingInvoices"
            item-key="id"
            v-model="InvoicesStore.state.selectedInvoices"
            hide-default-footer
            disable-pagination
            disable-sort
            show-select
            class="elevation-1"
        >
            <template v-slot:footer>
                <v-container>
                    <v-pagination
                        v-model="InvoicesStore.state.invoices.current_page"
                        :length="InvoicesStore.state.invoices.last_page"
                        @input="onPageChange()"
                        total-visible="5"
                    >
                    </v-pagination>
                </v-container>
            </template>
            <template v-slot:[`item.status`]="{ item }">
                <v-chip
                    color="warning"
                    x-small
                    v-if="item.status == 'pending'"
                    class="px-2"
                    title="Pending"
                >
                </v-chip>
                <v-chip
                    color="accent"
                    x-small
                    v-if="item.status == 'completed'"
                    class="px-2"
                    title="Completed"
                >
                </v-chip>
            </template>
            <template v-slot:[`item.created_at`]="{ item }">
                <div>
                    {{ item.created_at.substring(0, 10) }}
                </div>
            </template>
            <template v-slot:[`item.principals_name`]="{ item }">
                <div v-if="item.principals_name != null">
                    {{ item.principals_name }}
                </div>
                <div v-else>
                    <v-icon>mdi-help-circle-outline</v-icon>
                </div>
            </template>

            <!-- expanded -->
            <!-- <template v-slot:expanded-item="{ item }">
                <td title="Status">
                    {{ item.u1 }}
                </td>
                <td>
                    {{ item.u4 }}
                </td>
                <td title="Salesman Code">
                    {{ item.u5 }}
                </td>
                <td title="Unit of Measure">
                    {{ item.uom }}
                </td>
                <td title="Source Group">
                    {{ item.group }}
                </td>
                <td title="Uploaded By">
                    {{ item.username }}
                </td>
                <td title="Filename">
                    {{ item.filename }}
                </td>
                <td title="Batch Number">
                    {{ item.batch_number }}
                </td>
            </template> -->
        </v-data-table>

        <v-dialog
            v-model="InvoicesStore.state.isExtractInvoicesShown"
            max-width="700px">
            <ExtractInvoices></ExtractInvoices>
        </v-dialog>
    </div>
</template>


<script>
import { debounce } from "lodash";

export default {
    components: {
        InvoicesUpload: () => import("./InvoicesUpload.vue"),
        ExtractInvoices: () => import("./ExtractInvoices.vue"),
    },
    data() {
        return {
            searchKey: "",
            principalCodeFilter: "",
            invoiceStatuses: [
                {
                    status: "All",
                    value: ""
                },
                {
                    status: "Completed",
                    value: "completed"
                },
                {
                    status: "Pending",
                    value: "pending"
                }
            ],
            invoiceStatus: "",
            tblPageRowCounts: [10, 20, 30, 50, 100, 500, 1000, 5000],
            tblPageRowCount: 10,

            groupByColumns: [
                "filename",
                "status",
                "principals_name",
                "doc_no",
                "terminal"
            ],
            groupBy: "filename",

            selectedGroup: '',

            expanded: [],
        };
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
                this.searchKey,
                this.principalCodeFilter,
                this.invoiceStatus,
                this.tblPageRowCount,
                this.selectedGroup
            );

            // console.log(this.AppStore.state.principals);
        },

        syncTextfiles() {
            this.InvoicesStore.syncTextfiles();
            this.onPageChange();
        }
    },

    computed: {
        groups() {
            return [{group_name:'All',group_code:''}, ...this.InvoicesStore.state.groups];
        }
    },

    watch: {
        searchKey: debounce(function() {
            if (this.InvoicesStore.state.invoices.current_page != undefined) {
                this.InvoicesStore.state.invoices.current_page = 1;
            }
            this.onPageChange();
        }, 500),

        principalCodeFilter: debounce(function() {
            if (this.principalCodeFilter == null) this.principalCodeFilter = "";
            if (this.InvoicesStore.state.invoices.current_page != undefined) {
                this.InvoicesStore.state.invoices.current_page = 1;
            }
            this.onPageChange();
        }, 200),

        invoiceStatus: debounce(function() {
            if (this.invoiceStatus == null) this.invoiceStatus = "";
            if (this.InvoicesStore.state.invoices.current_page != undefined) {
                this.InvoicesStore.state.invoices.current_page = 1;
            }
            this.onPageChange();
        }, 200),

        tblPageRowCount: debounce(function() {
            if (this.InvoicesStore.state.invoices.current_page != undefined) {
                this.InvoicesStore.state.invoices.current_page = 1;
            }
            this.onPageChange();
        }, 200),

        selectedGroup: debounce(function() {
            if (this.selectedGroup == null) this.selectedGroup = "";
            if (this.InvoicesStore.state.invoices.current_page != undefined) {
                this.InvoicesStore.state.invoices.current_page = 1;
            }
            this.onPageChange();
        }, 200),
    },

    created() {
        this.InvoicesStore.initInvoices();
        this.InvoicesStore.initGroups();
    },

    mounted() {
        console.log("Invoices page mounted.");
        this.AppStore.state.showTopLoading=true;
    },

    beforeDestroy() {}
};
</script>
