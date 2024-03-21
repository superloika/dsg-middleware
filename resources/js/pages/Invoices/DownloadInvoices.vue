<template>
    <v-card>
        <v-card-title class="pb-6">
            <div class="mr-2">
                Download Invoices from Navision
            </div>
        </v-card-title>

        <v-card-text>
            Download Invoices from Navision
            <v-btn @click="downloadInvoices">
                Download
            </v-btn>
        </v-card-text>
    </v-card>
</template>

<script>

export default {
    data() {
        return {

        };
    },

    methods: {
        async downloadInvoices() {
            const url = this.AppStore.state.siteUrl + 'invoices/sync';
            const res = await axios.get(url);
            console.log(res.data);
        }
    },

    mounted() {
        console.log("DownloadInvoices component mounted");
    }
};
</script>
