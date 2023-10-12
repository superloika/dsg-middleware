<template>
    <v-dialog v-model="dialog" fullscreen>
        <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" title="Sales Invoice Quick Lookup">
                <v-icon color="primary">mdi-text-box-search</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="text-h5">Sales Invoice Quick Lookup</span>

                <v-spacer></v-spacer>

                <v-btn text @click="dialog = false" icon>
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>

            <v-card-text>
                <v-container fluid>
                    <v-row>
                        <v-col md="4" sm="12">
                            <v-text-field
                                label="Invoice #"
                                v-model="searchKey"
                                outlined rounded dense
                            >
                            </v-text-field>
                        </v-col>
                        <v-col md="2" sm="12">
                            <v-text-field
                                label="Search items"
                                v-model="searchTable"
                                outlined rounded dense
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-data-table
                            :items="items"
                            :headers="tblHeader"
                            item-key="id"
                            class="elevation-1"
                            :loading="isRetrieving"
                            :search="searchTable"
                        >
                        </v-data-table>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>

            </v-card-actions>
        </v-card>
    </v-dialog>
</template>


<script>
export default {
    data() {
        return {
            dialog: false,
            searchKey: '',
            items:[],
            tblHeader: [
                // { text: "Status", value: "status" },
                // { text: "Principal", value: "principals_name" },
                { text: "Uploaded", value: "created_at" },
                { text: "Group", value: "group" },
                { text: "Batch #", value: "batch_number" },
                { text: "Vendor Code", value: "vendor_code" },
                { text: "Customer Code", value: "customer_code" },
                { text: "Customer Name", value: "customer_name" },
                { text: "Invoice #", value: "doc_no" },
                { text: "Posting Date", value: "posting_date" },
                { text: "Shipment Date", value: "shipment_date" },
                { text: "Item Code", value: "item_code" },
                { text: "Item Description", value: "item_description" },
                { text: "UOM", value: "uom" },
                { text: "Quantity", value: "quantity" },
                { text: "Price", value: "price" },
                { text: "Amount", value: "amount" },
                { text: "Discount %", value: "discount_percentage" },
                { text: "Quantity/UOM", value: "qty_per_uom" },
                { text: "UOM Code", value: "uom_code" },
                { text: "Salesman Code", value: "sm_code" },
            ],
            isRetrieving: false,
            searchTable: '',
        }
    },

    methods: {
        async search() {
            try {
                if(this.searchKey==null) this.searchKey = '';

                const url = `${this.AppStore.state.siteUrl}invoices/lookup`;

                this.isRetrieving = false;

                const response = await axios.post(url, {
                    search_key: this.searchKey
                });
                this.items = [];
                this.items = response.data;
            } catch (error) {
                console.log('search() - ERROR:', error);
            } finally {
                this.isRetrieving = false;
            }
        },
    },

    watch: {
        searchKey(nv, cv) {
            if(nv=='' || nv==null) {

            } else {
                this.search();
            }
        }
    }
}
</script>
