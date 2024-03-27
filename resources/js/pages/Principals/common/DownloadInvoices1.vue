<template>
<v-card>
    <v-toolbar elevation="27">
        <v-toolbar-title>Download Invoices from Navision</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
            title="Download Invoices"
            icon
            dense
        >
            <v-icon>mdi-download</v-icon>
        </v-btn>
    </v-toolbar>


</v-card>
</template>

<script>
export default {
    data() {
        return {

        }
    },

    created() {
    },

    mounted() {
        console.log('DownloadInvoices component mounted');
    },
};
</script>
