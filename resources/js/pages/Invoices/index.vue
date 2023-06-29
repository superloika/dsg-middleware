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

                    <!-- DATEPICKER -->
                    <v-text-field
                        v-model="dateRangeText"
                        label="Upload Date"
                        hide-details
                        readonly
                        dense
                        outlined
                        rounded
                        @click.stop="datePickerShown=true"
                        stylex="max-width:500px;min-width:250px;"
                        class="mr-3"
                    ></v-text-field>

                    <v-dialog
                        ref="datePicker"
                        v-model="datePickerShown"
                        :return-value.sync="uploadDateRange"
                        width="290px"
                    >
                        <v-date-picker
                            v-model="uploadDateRange"
                            scrollable range
                        >
                            <v-spacer></v-spacer>
                            <v-btn
                                text
                                color="primary"
                                @click="datePickerShown = false"
                            >
                                Cancel
                            </v-btn>
                            <v-btn
                                text
                                color="primary"
                                @click="
                                    $refs.datePicker.save(uploadDateRange);
                                    onPageChange();
                                "
                            >
                                Ok
                            </v-btn>
                        </v-date-picker>
                    </v-dialog>
                    <!-- /DATEPICKER -->

                    <v-combobox
                        :items="AppStore.state.principals"
                        v-model="principal"
                        label="Principal"
                        item-text="name"
                        class="mr-3"
                        stylex="max-width:250px;"
                        outlined
                        rounded
                        hide-details
                        dense
                        clearable
                        overflow
                    >
                        <template v-slot:prepend-item>
                            <v-list-item
                                link
                                @click="principal={}"
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
                                ({{ item.vendor_code }}) {{ item.name }}
                            </div>
                        </template>
                        <template v-slot:selection = "{ item }">
                            <div
                                :class="item.proj_status==1?'primary--text':'warning--text'"
                                class="text-caption"
                            >
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
                        :items="InvoicesStore.state.invoiceStatuses"
                        v-model="InvoicesStore.state.invoiceStatus"
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
        <v-sheet class="ma-2 rounded-lg white"
            v-if="AppStore.isSuperAdmin() || AppStore.isAdmin() || AppStore.isUploader()"
            elevation="1"
        >
            <InvoicesUpload
                :searchKey="searchKey"
                :principalCodeFilter="principalCodeFilter"
            ></InvoicesUpload>
        </v-sheet>

        <v-data-table
            :items="InvoicesStore.state.invoices.data"
            :headers="InvoicesStore.state.tableHeader"
            item-key="id"
            v-model="InvoicesStore.state.selectedInvoices"
            hide-default-footer
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
                        total-visible="10"

                    >
                    </v-pagination>
                    <!-- <v-pagination
                        v-model="InvoicesStore.state.invoices.current_page"
                        @input="onPageChange()"
                        :length="10"
                    >
                    </v-pagination> -->
                    <!-- <v-btn @click="">next</v-btn> -->
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
            <!-- <template v-slot:[`item.principals_name`]="{ item }">
                <div v-if="item.principals_name != null">
                    {{ item.principals_name }}
                </div>
                <div v-else>
                    <v-icon>mdi-help-circle-outline</v-icon>
                </div>
            </template> -->

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
            principal: {},
            principalCodeFilter: "",

            tblPageRowCounts: [10, 20, 30, 50, 100, 500, 1000],
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

            uploadDateRange: [new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                .toISOString()
                .substr(0, 10)],
            datePickerShown: false,

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
                this.tblPageRowCount,
                this.selectedGroup,
                this.uploadDateRange
            );
            this.InvoicesStore.initInvoicesTotalAmount(
                this.searchKey,
                this.principalCodeFilter,
                this.tblPageRowCount,
                this.selectedGroup,
                this.uploadDateRange
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
        },

        // principalCodeFilter() {
        //     return this.principal.vendor_code;
        // },

        dateRangeText() {
            return this.uploadDateRange.join(' ~ ');
        },
    },

    watch: {
        searchKey: debounce(function() {
            if (this.InvoicesStore.state.invoices.current_page != undefined) {
                this.InvoicesStore.state.invoices.current_page = 1;
            }
            this.onPageChange();
        }, 500),

        'principal.vendor_code': {
            handler(newV, oldV) {
                this.principalCodeFilter = newV;
            }
        },

        principalCodeFilter: debounce(function() {
            if (this.principalCodeFilter == null) this.principalCodeFilter = "";
            if (this.InvoicesStore.state.invoices.current_page != undefined) {
                this.InvoicesStore.state.invoices.current_page = 1;
            }
            this.onPageChange();
        }, 200),

        'InvoicesStore.state.invoiceStatus': debounce(function() {
            if (this.InvoicesStore.state.invoiceStatus == null) {
                this.InvoicesStore.state.invoiceStatus = "";
            }
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
        this.InvoicesStore.state.invoiceStatus = '';
        this.InvoicesStore.initInvoices();
        this.InvoicesStore.initInvoicesTotalAmount();
        this.InvoicesStore.initGroups();
    },

    mounted() {
        console.log("Invoices page mounted.");
        this.AppStore.state.showTopLoading=true;
    },

    beforeDestroy() {}
};
</script>
