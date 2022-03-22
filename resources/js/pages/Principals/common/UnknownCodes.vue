<template>
<v-card outlined>
    <v-card-title class="text-h6">
        {{ title }}&nbsp;
        <v-chip :color="variantColor" small style="color:#fff;">
            {{ unknownCodes.length }}
        </v-chip>
        <v-spacer></v-spacer>
        <v-btn icon
            title="Copy All"
            @click="AppStore.copyToClipboard(codesNA)">
            <v-icon>mdi-content-copy</v-icon>
        </v-btn>
        <v-btn icon
            title="Export to Textfile"
            @click="AppStore.exportToTxt(title+'.txt', codesNA)">
            <v-icon>mdi-export</v-icon>
        </v-btn>
        <v-btn icon
            title="Download Pendings"
            @click="downloadPendings()">
            <v-icon>mdi-file-download</v-icon>
        </v-btn>
    </v-card-title>
    <!-- <v-divider></v-divider> -->
    <v-card-text class="pa-1">
        <!-- <textarea :id="temptxt_id" cols="30"
            rows="10" style="display:none;"
            v-model="codesNA"
        >
        </textarea> -->
        <v-chip v-for="(pcode) in unknownCodes"
            :key="pcode" :color="variantColor" small class="ma-1"
            outlined
        >
            {{ pcode }}
        </v-chip>
        <v-divider></v-divider>
        <v-expansion-panels>
            <v-expansion-panel v-for="(pending, i) in pendings" :key="i" focusable>
                <v-expansion-panel-header>
                    {{ pending[0] }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-list-item v-for="(line, j) in pending[1]" :key="j"
                        link dense
                    >
                        <v-list-item-content>
                            <v-list-item-subtitle>
                                {{ line.doc_type }}
                                | {{ line.doc_no }}
                                | {{ line.customer_code }}
                                | {{ line.posting_date }}
                                | {{ line.item_code }}
                                | {{ line.quantity }}
                                | {{ line.u1 }}
                                | {{ line.u2 }}
                                | {{ line.u3 }}
                                | {{ line.u4 }}
                                | {{ line.u5 }}
                                | {{ line.uom }}
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-card-text>
</v-card>
</template>

<script>
export default {
    props: ['unknownCodes', 'type', 'temptxt_id', 'title'],

    data: () => ({

    }),

    computed: {
        codesNA() {
            let temp = '';

            const len = this.unknownCodes.length;
            for(let i=0; i<len; i++) {
                temp += this.unknownCodes[i];
                if(i != (len-1)) {
                    temp += '\r\n';
                }
            }

            return temp;
        },

        variantColor() {
            return this.type=='warning' ? 'warning' :
                this.type=='error' ? 'error' :
                '';
        },

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
            this.pendings.forEach(e => {
                filename = `PENDING ${this.AppStore.state.strDateToday} - ${e[0]}.txt`;
                this.AppStore.exportToTxt(filename, e[1][0].doc_no);
            });
        },
    },

    mounted() {
        console.log('UnknownCodes component mounted');
    },
};
</script>
