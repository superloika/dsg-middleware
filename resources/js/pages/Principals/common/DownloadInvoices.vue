<template>
    <v-card>
        <v-card-title class="pb-6">
            <div class="mr-2">
                Download Invoices from Navision
            </div>
        </v-card-title>

        <v-card-text>
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
            try {
                const vendor_codes = this.PrincipalsStore.state.selectedPrincipal[1]
                    .map(e => e.vendor_code);
                const url = this.AppStore.state.siteUrl + 'nav/downloadInvoices';
                this.AppStore.overlay(true);
                const res = await axios.post(url, {
                    vendor_codes: vendor_codes
                });
            } catch (error) {
                console.error(error);
            } finally {
                this.AppStore.overlay(false);
            }
        }
    },

    mounted() {
        console.log("DownloadInvoices component mounted");
    }
};
</script>
