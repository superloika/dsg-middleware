<template>
    <v-card>
        <v-toolbar elevation="27">
            <v-toolbar-title>
                <div class="text-subtitle-2 font-weight-bold">
                    Templated Data
                </div>
                <div v-if="lineCount > 0">
                    <v-chip
                        x-small
                        label
                        color="primary"
                    >
                        <h4>
                            {{ lineCount }} total line/s
                        </h4>
                    </v-chip>
                    <v-chip
                        x-small
                        label
                        v-if="warningsCount > 0"
                        color="warning"
                    >
                        <h4>
                            {{ warningsCount }}
                            total warning(s) found. Keep masterfiles updated.
                        </h4>
                    </v-chip>
                </div>
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-dialog width="500">
                <template v-slot:activator="{on, attrs}">
                    <v-btn
                        title="Download Invoices from Navision"
                        dense icon rounded
                        class="mr-2"
                        v-bind="attrs"
                        v-on="on"
                        color="primary"
                    >
                        <v-icon>mdi-download</v-icon>
                    </v-btn>
                </template>

                <DownloadInvoices></DownloadInvoices>
            </v-dialog>

            <v-menu
                v-model="menu"
                :close-on-content-click="false"
                offset-y
                bottom
                z-indexx="999"
                transition="scroll-y-reverse-transition"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on"
                        rounded
                        color="primary"
                        title="More Options"
                    >
                        <!-- <v-icon>
                            mdi-dots-horizontal-circle
                        </v-icon> -->
                        Options
                        <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                </template>

                <GeneratedActions
                    :lineCount="lineCount"
                    :warningsCount="warningsCount"
                ></GeneratedActions>
            </v-menu>

        </v-toolbar>

        <div>
            <div v-if="PrincipalsStore.state.isGeneratingData"
                class="d-flex justify-center pt-6"
            >
                <!-- <v-progress-circular
                    :size="60"
                    :width="5"
                    color="accent"
                    indeterminate
                ></v-progress-circular> -->
            </div>
            <div v-else>
                <div
                    v-if="
                        generatedData.length < 1
                        || lineCount < 1
                    "
                    class="d-flex justify-center pt-6"
                >
                    <v-chip color="transparent">
                        No available data to display
                    </v-chip>
                </div>

                <GeneratedTableWrapper
                    v-else
                    :generatedData="generatedData"
                    :allow_export="true"
                >
                </GeneratedTableWrapper>
            </div>
        </div>
    </v-card>
</template>

<script>

export default {
    components: {
        GeneratedTableWrapper: () => import("./GeneratedTableWrapper.vue"),
        GeneratedActions: () => import("./GeneratedActions.vue"),
        DownloadInvoices: () => import("./DownloadInvoices.vue"),
    },

    data() {
        return {
            menu: false,
        }
    },


    computed: {
        // principalsStore() {
        //     return this.PrincipalsStore;
        // },

        generatedData() {
            // return this.PrincipalsStore.state.currentGeneratedData;
            return this.PrincipalsStore.state.currentGeneratedData;
        },

        // overall
        lineCount() {
            let count = 0;
            this.generatedData.forEach(e => {
                e.output_template.forEach(ot => {
                    count += ot[1].length;
                });
            });
            return count;
        },

        // overall
        warningsCount() {
            let count = 0;
            this.generatedData.forEach(e => {
                e.output_template.forEach(ot => {
                    const nf = ot[1].filter(line => {
                        return line.customer_notfound == 1
                            || line.item_notfound == 1
                            || line.salesman_notfound == 1;
                    });
                    count += nf.length;
                });
            });
            return count;
        },

        searchKeyLength() {
            try {
                return this.searchKey.length;
            } catch (error) {
                return 0;
            }
        },
    },

    methods: {
        missingInMaster(type) {
            try {
                let result = [];
                if(this.generatedData.length > 0) {
                    this.generatedData[0].output_template.forEach(e => {
                        let tempArray = [];
                        e[1].forEach(line => {
                            if(type=='customer') {
                                if(line.customer_notfound == 1) {
                                    tempArray.push({
                                        customer_code: line.customer_code,
                                        missing_customer_name: line.missing_customer_name
                                    });
                                }
                            } else if (type=='item') {
                                if(line.item_notfound == 1) {
                                    tempArray.push({
                                        item_code: line.item_code,
                                        missing_item_name: line.missing_item_name
                                    });
                                }
                            } else if (type=='salesman') {
                                if(line.salesman_notfound == 1) {
                                    tempArray.push({
                                        // bit of hacking here haha..
                                        real_salesman_code: line.alturas_sm_code,
                                        salesman_code: line.missing_salesman_name,
                                        missing_salesman_name: line.missing_salesman_name,
                                    });
                                }
                            }
                        });
                        if (tempArray.length > 0) {
                            result.push(...tempArray);
                        }
                    });
                }

                let unique = [];
                let distinct = [];
                for( let i = 0; i < result.length; i++ ){
                    if( !unique[result[i][type + '_code']]){
                        distinct.push(result[i]);
                        unique[result[i][type + '_code']] = 1;
                    }
                }
                return distinct;
            } catch (error) {
                console.log("missingInMaster() - ERR:", error);
                return [];
            }
        },
    },

    created() {
    },

    mounted() {
        console.log("Generated component mounted");
    }
};
</script>

<style>

</style>
