<template>
<v-sheet>
    <!-- <v-toolbar class="elevation-0" dense>
        <v-chip color="default"
            small class="mr-1"
        >
            <em>Total Amount:&nbsp;</em>
            {{ AppStore.formatAsCurrency(totalAmount) }}
        </v-chip>
        <v-chip color="default"
            small outlined class="mr-1"
        >
            <em>Grand Total:&nbsp;</em>
            {{ AppStore.formatAsCurrency(PrincipalsStore.state.invoicesGrandTotal) }}
        </v-chip>
        <v-spacer></v-spacer>
    </v-toolbar> -->
    <v-sheet>
        <v-data-table
            :items="PrincipalsStore.state.invoices"
            :headers="tblHeader"
            dense
            :search="searchKey"
            class="elevation-1"
        >
            <template v-slot:[`item.status`]="{item}">
                <span class="primary--text"
                    v-if="item.status=='completed'"
                >
                    {{ item.status }}
                </span>
                <span class="warning--text"
                    v-if="item.status=='pending'"
                >
                    {{ item.status }}
                </span>
            </template>
            <template v-slot:[`item.upload_date`]="{item}">
                <span>{{ item.upload_date.substr(0,10) }}</span>
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
    }),

    computed: {
        selectedPrincipalCode() {
            return this.PrincipalsStore.state.selectedPrincipalCode;
        },

        tblHeader() {
            return this[this.selectedPrincipalCode].state.uploadedInvoicesTableHeader;
        },

        totalAmount() {
            let amount = 0.00;

            if(this.PrincipalsStore.state.invoices.length > 0) {
                this.PrincipalsStore.state.invoices.forEach(e => {
                    amount += parseFloat(e.u3);
                });
            }
            return amount;
        },
    },

    methods: {
        loadInvoices() {
            this.PrincipalsStore.initInvoices(this.selectedPrincipalCode, this.date);
        },
    },

    created() {
        // this.PrincipalsStore.initInvoicesGrandTotal();
        // this.loadInvoices();

        this.PrincipalsStore.initInvoices(this.selectedPrincipalCode, this.date);
    },

    mounted() {
    },


}
</script>
