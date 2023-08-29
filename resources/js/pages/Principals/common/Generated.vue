<template>
    <div class="">
        <v-card class="elevation-0" color="">
            <v-card-title class="pa-0">
                <v-app-bar elevation="0" colorx="white" appx>
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
                            </v-btn>
                        </template>

                        <GeneratedActions
                            :lineCount="lineCount"
                            :warningsCount="warningsCount"
                        ></GeneratedActions>
                    </v-menu>

                </v-app-bar>
            </v-card-title>

            <v-card-text class="mx-0 px-0">
                <div class="">
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
                            <v-chip color="accent" small>
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
            </v-card-text>
        </v-card>
    </div>
</template>

<script>

export default {
    components: {
        GeneratedTableWrapper: () => import("./GeneratedTableWrapper.vue"),
        GeneratedActions: () => import("./GeneratedActions.vue"),
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

        selectedPrincipalCode() {
            return this.PrincipalsStore.state.selectedPrincipalCode;
        },

        searchKeyLength() {
            try {
                return this.searchKey.length;
            } catch (error) {
                return 0;
            }
        },

        myStore() {
            return this[this.selectedPrincipalCode];
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
        // PrincipalsStore.initCurrentGeneratedData(this.selectedPrincipalCode);
    },

    mounted() {
        console.log("Generated component mounted");
    }
};
</script>

<style scoped></style>
