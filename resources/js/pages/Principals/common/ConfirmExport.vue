<template>
    <v-card>
        <v-card-title>Confirm Export</v-card-title>
        <v-card-text class="text-subtitle-1">
            <div>
                Export templated data to Excel?
            </div>
        </v-card-text>
        <v-card-actions>
            <v-checkbox
                label="Include Completed Invoices"
                :disabled="PrincipalsStore.state.isExportingTemplatedData"
                v-model="InvoicesStore.state.exportWithCompleted"
                value="value">
            </v-checkbox>

            <v-spacer></v-spacer>

            <v-btn
                @click="InvoicesStore.setInvoicesComplete()"
                color="primary"
                :loading="PrincipalsStore.state.isExportingTemplatedData"
                text
            >
                Proceed
            </v-btn>
            <v-btn
                @click="PrincipalsStore.state.confirmExportDialogOpen = false"
                :disabled="PrincipalsStore.state.isExportingTemplatedData"
                text
            >
                Cancel
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {

    data() {
        return {}
    },

    mounted() {
        console.log("ConfirmExport component mounted");
    }
};
</script>
