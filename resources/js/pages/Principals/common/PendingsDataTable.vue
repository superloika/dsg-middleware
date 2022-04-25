<template>
    <v-data-table
        :headers="tblHeader"
        :items="items"
        dense
        hide-default-header
    >
        <template v-slot:[`item.customer_code`] = "{ item }">
            <span :class="item.customer_notfound==1 ? 'warning--text' : ''">
                {{ item.customer_code }}
            </span>
        </template>
        <template v-slot:[`item.item_code`] = "{ item }">
            <span :class="item.item_notfound==1 ? 'error--text' : ''">
                {{ item.item_code }}
            </span>
        </template>
    </v-data-table>
</template>

<script>
export default {
    name: 'PendingsDataTable',

    props: ['items'],

    data: () => ({
    }),

    computed: {
        tblHeader() {
            const header = this[this.PrincipalsStore.state.selectedPrincipalCode]
                .state.uploadedInvoicesTableHeader;
            return header.filter(e=>{
                return (e.value != 'status' || e.value != 'upload_date');
            });
        }
    },

    methods: {

    },

    mounted() {
        console.log('PendingsDataTable component mounted');
    },
};
</script>
