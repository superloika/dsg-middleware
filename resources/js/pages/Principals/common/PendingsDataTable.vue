<template>
    <v-data-table
        :headers="tblHeader"
        :items="items"
        dense
        :items-per-page="5"
        hide-default-header
    >

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
            return [
                {text:'doc_type', value:'doc_type'},
                {text:'doc_no', value:'doc_no'},
                {text:'customer_code', value:'customer_code'},
                {text:'posting_date', value:'posting_date'},
                {text:'item_code', value:'item_code'},
                {text:'quantity', value:'quantity'},
                {text:'u1', value:'u1'},
                {text:'u2', value:'u2'},
                {text:'u3', value:'u3'},
                {text:'u4', value:'u4'},
                {text:'u5', value:'u5'},
                {text:'uom', value:'uom'},
            ];
        }
    },

    methods: {

    },

    mounted() {
        console.log('PendingsDataTable component mounted');
    },
};
</script>
