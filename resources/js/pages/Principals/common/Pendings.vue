<template>
<v-card outlined>
    <v-card-title class="text-h6">
        Pending Lines

        <v-spacer></v-spacer>

        <v-btn icon
            title="Download"
            @click="downloadPendings()">
            <v-icon>mdi-file-download</v-icon>
        </v-btn>
    </v-card-title>
    <v-card-text class="pa-1">
        <v-tabs v-model="tab">
            <v-tab v-for="(pending, i) in pendings" :key="i" class="px-3">
                {{ pending[0] }}.txt
            </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item v-for="(pending, j) in pendings" :key="j">
                <PendingsDataTable :items="pending[1]"></PendingsDataTable>
                <!-- <table class="tbl-custom">
                    <tbody>
                        <tr v-for="(line, k) in pending[1]" :key="k">
                            <td>{{ line.doc_type }}</td>
                            <td>{{ line.doc_no }}</td>
                            <td :class="(line.customer_notfound==1) ? 'warning--text' : ''">
                                {{ line.customer_code }}
                            </td>
                            <td>{{ line.posting_date }}</td>
                            <td :class="(line.product_notfound==1) ? 'error--text' : ''">
                                {{ line.item_code }}
                            </td>
                            <td>{{ line.quantity }}</td>
                            <td>{{ line.u1 }}</td>
                            <td>{{ line.u2 }}</td>
                            <td>{{ line.u3 }}</td>
                            <td>{{ line.u4 }}</td>
                            <td>{{ line.u5 }}</td>
                            <td>{{ line.uom }}</td>
                        </tr>
                    </tbody>
                </table> -->
            </v-tab-item>
        </v-tabs-items>
    </v-card-text>
</v-card>
</template>

<script>
export default {
    components: {
        PendingsDataTable: () => import('./PendingsDataTable.vue'),
    },

    data: () => ({
        tab: null,
    }),

    computed: {
        // variantColor() {
        //     return this.type=='warning' ? 'warning' :
        //         this.type=='error' ? 'error' :
        //         '';
        // },

        pendings() {
            const rawInvoices = this.PrincipalsStore.state.currentRawInvoices;
            let tempPending = {};
            rawInvoices.forEach(element => {
                if(element.customer_notfound==1 || element.product_notfound==1) {
                    if(tempPending[element.filename] == undefined) {
                        tempPending[element.filename] = [];
                    }
                    tempPending[element.filename].push(element);
                }
            });
            return Object.entries(tempPending);
        },

    },

    methods: {
        downloadPendings() {
            let filename = '';
            let lines = '';
            this.pendings.forEach(e => {
                filename = `PENDING ${this.AppStore.state.strDateToday} - ${e[0]}.txt`;
                e[1].forEach(el => {
                    lines += `${el.doc_type}`
                        + `|${el.doc_no}`
                        + `|${el.customer_code}`
                        + `|${el.posting_date}`
                        + `|${el.item_code}`
                        + `|${el.quantity}`
                        + `|${el.u1}`
                        + `|${el.u2}`
                        + `|${el.u3}`
                        + `|${el.u4}`
                        + `|${el.u5}`
                        + `|${el.uom}`
                        + '\r\n';
                });
                this.AppStore.exportToTxt(filename, lines);
                lines = '';
            });
        },
    },

    mounted() {
        console.log('Pendings component mounted');
    },
};
</script>
