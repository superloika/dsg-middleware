<template>
<div>
    <v-app-bar elevation="0" app color="white">
        <v-toolbar-title>Exp Test
            <v-chip title="Overall Expenses Total">
                P {{ Expenditures.state.totalExpenses.toFixed(2)}}
            </v-chip>
            <v-chip title="Current Page Expenses Total">
                P {{ currPageExpensesTotal.toFixed(2)}}
            </v-chip>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-text-field
            v-model="expenseSearchKey"
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
            dense icon
            @click="test()"
        >
            <v-icon>mdi-file-excel</v-icon>
        </v-btn>

        <v-btn
            dense icon
            :disabled="selectedItems.length < 1"
            @click="deleteExpense()"
        >
            <v-badge :content="selectedItems.length" v-if="selectedItems.length" overlap bordered>
                <v-icon>mdi-delete</v-icon>
            </v-badge>
            <v-icon v-if="!selectedItems.length">mdi-delete</v-icon>
        </v-btn>

        <v-dialog
            v-model="Expenditures.state.add_expense"
            max-width="600px"
            persistent
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn dense icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-file-plus</v-icon>
                </v-btn>
            </template>
            <ExpendituresAdd v-if="Expenditures.state.add_expense"></ExpendituresAdd>
        </v-dialog>
    </v-app-bar>

    <v-data-table
        ref="tbl_expenses"
        :headers="headers"
        :items="Expenditures.state.expenses.data"
        class="elevation-0 tbl-expenses"
        item-key="expense_id"
        show-select
        :loading="Expenditures.state.loadingExpenses"
        v-model="selectedItems"
        :search="expenseSearchKey"
        checkbox-color="primary"
        @current-items="getCurrentItems"
    >
        <template v-slot:[`item.amount`]="{ item }">
            {{ item.amount.toFixed(2) }}
        </template>

        <template v-slot:[`item.total`]="{ item }">
            {{ item.total = (parseFloat(item.amount) * parseFloat(item.quantity)).toFixed(2) }}
        </template>

        <!-- <template v-slot:[`item.tags`]="{ item }">
            <tags-component :tags="item.tags.map(function(tag) {return tag})"></tags-component>
        </template> -->

        <template v-slot:[`item.tag_ids`]="{ item }">
            <TagsComponent :tag_ids="JSON.parse(item.tag_ids)"></TagsComponent>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
            <v-menu offset-x>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn  dense icon v-bind="attrs" v-on="on">
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item link>
                        <v-list-item-title>Edit</v-list-item-title>
                    </v-list-item>
                    <v-list-item link @click="deleteExpense(item.expense_id)">
                        <v-list-item-title>Delete</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </template>
    </v-data-table>

</div>
</template>


<script>
export default {
    components: {
        'ExpendituresAdd': () => import('./ExpendituresAdd.vue'),
        'TagsComponent': () => import('./TagsComponent.vue'),
    },

    data() {
        return {
            headers: [
                {
                    text: "Particular",
                    align: "start",
                    sortable: true,
                    value: "particular"
                },
                {
                    text: "Price",
                    align: "end",
                    sortable: true,
                    value: "amount"
                },
                {
                    text: "Quantity",
                    align: "start",
                    sortable: true,
                    value: "quantity"
                },
                {
                    text: "Total",
                    align: "end",
                    sortable: true,
                    value: "total"
                },
                {
                    text: "Date",
                    align: "start",
                    sortable: true,
                    value: "expense_date"
                },
                // {
                //     text: "Tags",
                //     align: "start",
                //     sortable: true,
                //     value: "tags"
                // },
                {
                    text: "Tags",
                    align: "start",
                    sortable: true,
                    value: "tag_ids"
                },
                {
                    text: "Actions",
                    align: "end",
                    sortable: false,
                    value: "actions"
                },
            ],
            selectedItems: [],
            expenseSearchKey: '',
            currentItems: [],
            currPageExpensesTotal: 0,
        };
    },

    methods: {

        deleteExpense(expense_id = null) {
            if(expense_id === null) {
                const selItemCount = this.selectedItems.length;

                if(confirm(`Delete ${selItemCount} selected item/s?`)) {
                    this.selectedItems.forEach((item) => {
                        axios.post(`${this.AppStore.state.siteUrl}api_expenses/delete/${item.expense_id}`)
                            .then(response=>{
                                if(response.data == true) {
                                    this.AppStore.toast(`Item deleted: ${item.particular}`);
                                }
                            })
                            .catch(err=>{
                                this.AppStore.toast(err);
                            });
                    });
                    this.Expenditures.expenses({
                        limit: 99999,
                        dateExpenseFrom: "",
                        dateExpenseTo: "",
                        searchKeyParticulars: "",
                    });
                    this.selectedItems = [];
                    this.AppStore.toast(`${selItemCount} item/s deleted`)
                }
            } else {
                if(confirm(`Delete selected item?`)) {
                    console.log(`Deleting expense: id=${expense_id}`);
                    this.Expenditures.expenses({
                        limit: 99999,
                        dateExpenseFrom: "",
                        dateExpenseTo: "",
                        searchKeyParticulars: "",
                    });
                    this.selectedItems = [];
                    this.AppStore.toast('Item deleted')
                }
            }
        },

        test() {
            let tblWrapper = document.querySelector('.tbl-expenses');
            let tbl = tblWrapper.querySelector('table');
            let wb = XLSX.utils.book_new();
            // var ws = XLSX.utils.table_to_sheet(tbl);
            var ws = XLSX.utils.json_to_sheet(this.Expenditures.state.expenses.data);
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
            XLSX.writeFile(wb,'tbl.csv');
        },

        getCurrentItems(e) {
            const vm = this;
            vm.currPageExpensesTotal = 0;
            try {
                e.forEach(function(el){
                    vm.currPageExpensesTotal += parseFloat(el.amount) * parseFloat(el.quantity);
                });
            } catch (error) {
                console.log(error)
            }
        }
    },

    computed: {

    },

    created() {
        // init expenditures
        this.Expenditures.expenses({
            limit: 99999,
            dateExpenseFrom: "",
            dateExpenseTo: "",
            searchKeyParticulars: "",
        });

        this.Expenditures.tags();
    },

    mounted() {
        console.log("ExpendituresPage mounted.");
        console.log('TAGS:', this.Expenditures.state.tags);
    },
};
</script>
