<template>
<v-sheet>
    <v-toolbar class="elevation-0" dense>
        <v-chip color="primary" labelx class="mr-1" small>
            <em>Total Amount:&nbsp;</em>
            {{ AppStore.formatAsCurrency(totalAmount) }}
        </v-chip>
        <v-chip color="primary" labelx class="mr-1" small>
            <em>Grand Total:&nbsp;</em>
            {{ AppStore.formatAsCurrency(PrincipalsStore.state.invoicesGrandTotal) }}
        </v-chip>

        <v-spacer></v-spacer>

        <v-btn color="success"
            icon
            title="Export to Excel"
            @click="exportToExcel()"
            :disabled="(searchKey!=null && searchKey!='') ||
                    PrincipalsStore.state.transactions.length < 1
                "
        >
            <v-icon>mdi-file-excel</v-icon>
        </v-btn>
    </v-toolbar>
    <v-sheet>
        <v-data-table
            :items="PrincipalsStore.state.transactions"
            :headers="tblHeader"
            dense
            :search="searchKey"
            class="elevation-1"
            id="transactions"
        >
            <template v-slot:[`item.upload_date`] = "{ item }">
                <span>
                    {{ item.upload_date.substring(0,10) }}
                </span>
            </template>
            <template v-slot:[`item.u3`] = "{ item }">
                <span>
                    {{ AppStore.formatAsCurrency(parseFloat(item.u3)) }}
                </span>
            </template>
            <template v-slot:[`item.customer_name`] = "{ item }">
                <span class="text-caption">
                    {{ item.customer_name }}
                </span>
            </template>
            <template v-slot:[`item.description`] = "{ item }">
                <span class="text-caption">
                    {{ item.description }}
                </span>
            </template>
        </v-data-table>
    </v-sheet>
</v-sheet>
</template>


<script>
export default {
    props: ['date','searchKey'],

    data: () => ({
        grandTotal: 0.00,
        // tblFirstPageTotalAmount: 0.00,
    }),

    computed: {
        selectedPrincipalCode() {
            return this.PrincipalsStore.state.selectedPrincipalCode;
        },

        tblHeader() {
            return this[this.selectedPrincipalCode].state.transactionsTableHeader;
        },

        totalAmount() {
            let amount = 0.00;

            if(this.PrincipalsStore.state.transactions.length > 0) {
                this.PrincipalsStore.state.transactions.forEach(e => {
                    amount += parseFloat(e.u3);
                });
            }
            return amount;
        },
    },

    methods: {
        exportToExcel() {
            const transactionsData = [
                [
                    this.date.toString(),
                    this.PrincipalsStore.state.transactions
                ]
            ];

            const config = this.PrincipalsStore
                .getHeaderAndFormat('transactionsTableHeader');

            this.PrincipalsStore.exportToExcel(
                config.header,
                this.PrincipalsStore.generatedDataSubset(
                    transactionsData,
                    config.format
                ),
                [7, 8],
                `${this.selectedPrincipalCode}_Transactions`
            );
        },

        // getFilteredItems(e) {
        //     if(e.length > 0) {
        //         this.tblFirstPageTotalAmount = 0.00;
        //         e.forEach(el => {
        //             this.tblFirstPageTotalAmount += parseFloat(el.u3);
        //         });
        //     } else {
        //         this.tblFirstPageTotalAmount = 0.00;
        //     }
        // }
    },

    created() {
        this.PrincipalsStore.initTransactions(this.selectedPrincipalCode, this.date);
        this.PrincipalsStore.initInvoicesGrandTotal();
    },

    mounted() {
    }


}
</script>
