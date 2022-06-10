<template>
    <v-card outlinedx class="elevation-0 pt-0">
        <v-card-title class="pa-0">
            <v-app-bar elevation="0" colorx="white">
                <v-toolbar-title>
                    Templated Data History
                    <div v-if="lineCount > 0">
                        <v-chip x-small outlinedx label color="primary">
                            {{ lineCount }} total line/s
                        </v-chip>
                    </div>
                </v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn
                    title="Refresh"
                    icon
                    dense
                    rounded
                    depressed
                    class="mr-2"
                    @click="generate(date, selectedFilter)"
                >
                    <v-icon>mdi-refresh</v-icon>
                </v-btn>

                <v-text-field
                    v-model="dateRangeText"
                    label="Date (YYYY-MM-DD)"
                    hide-details
                    readonly
                    dense
                    outlined
                    rounded
                    @click.stop="datePickerShown=true"
                    :disabled="isGenerating"
                    class="mr-3"
                    style="max-width:230px;"
                ></v-text-field>
                <!-- DATEPICKER -->
                <v-dialog
                    ref="datePicker"
                    v-model="datePickerShown"
                    :return-value.sync="date"
                    width="290px"
                >
                    <v-date-picker v-model="date" scrollable range>
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="primary"
                            @click="datePickerShown = false"
                        >
                            Cancel
                        </v-btn>
                        <v-btn
                            text
                            color="primary"
                            @click="$refs.datePicker.save(date);
                                generate(date, selectedFilter);"
                        >
                            Generate
                        </v-btn>
                    </v-date-picker>
                </v-dialog>
                <!-- /DATEPICKER -->

                <v-select
                    :items="myStore.state.generatedDataHistoryFilters[0]"
                    v-model="selectedFilter"
                    label="Group By"
                    item-text="text"
                    item-value="value"
                    class="mr-3"
                    style="max-width:215px;"
                    :disabled="isGenerating"
                    outlined
                    rounded
                    hide-details
                    dense
                >
                </v-select>

                <v-btn
                    title="Export to Excel"
                    icon
                    dense
                    rounded
                    outlinedx
                    color="success"
                    @click="exportToExcel()"
                    :disabled="generatedData.length < 1"
                >
                    <v-icon>mdi-file-excel</v-icon>
                </v-btn>
            </v-app-bar>
        </v-card-title>
        <v-card-text class="pa-0 pb-4">
            <div v-if="isGenerating"
                class="d-flex justify-center"
            >
                <v-progress-circular
                    :size="70"
                    :width="7"
                    color="accent"
                    indeterminate
                ></v-progress-circular>
            </div>
            <div v-else>
                <div
                    v-if="generatedData.length < 1"
                    class="d-flex justify-center mt-5"
                >
                    <v-chip color="accent" small>
                        No available data to display
                    </v-chip>
                </div>
                <GeneratedTableWrapper
                    v-else
                    :id="wrapperID"
                    :generatedData="generatedData"
                    :allow_export="true"
                >
                </GeneratedTableWrapper>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    components: {
        GeneratedTableWrapper: () => import("./GeneratedTableWrapper.vue"),
    },

    data: () => ({
        datePickerShown: false,
        date: [new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
            .toISOString()
            .substr(0, 10)],
        generatedData: [],
        isGenerating: false,
        wrapperID: 'gendata_history_wrapper',
        selectedFilter: null,
    }),

    computed: {
        // overall
        lineCount() {
            let count = 0;
            if(this.generatedData.length > 0) {
                this.generatedData[0].output_template.forEach(e => {
                    count += e[1].length;
                });
            }
            return count;
        },

        dateRangeText() {
            return this.date.join(' ~ ');
        },

        myStore() {
            return this[this.PrincipalsStore.state.selectedPrincipalCode];
        }
    },

    methods: {

        /**
         * This will regenerate the templated data
         * and will be filtered based on the passed 'date'.
         * The reult will also be grouped based on 'dataProp'
         */
        async generate(date, dataProp='') {
            date.sort();
            const url = this.AppStore.state.siteUrl
                + "principals"
                + `/generated`;
            const payload = {
                date: date,
                principal_code: this.PrincipalsStore.state.selectedPrincipalCode,
                cols: this.myStore.state.generatedDataDBTableColumns
            };

            try {
                this.isGenerating = true;
                this.generatedData = [];
                let res = await axios.post(url, payload);

                this.generatedData  =
                // [
                    res.data.output_template_variations.map(e => {
                        const grouped = e.output_template.reduce(function(r, a) {
                            r[a[dataProp]] = r[a[dataProp]] || [];
                            r[a[dataProp]].push(a);
                            return r;
                        }, Object.create(null));

                        return {
                            name: e.name,
                            output_template: Object.entries(grouped),
                        }
                    });
                // ];



                // this.generatedData = Object.entries(grouped);
                this.isGenerating = false;
                this.dlgSelectDatesShown = false;
            } catch (error) {
                console.log("generate(): ", error);
                this.AppStore.toast(error);
            }
        },

        // async generate(date, dataProp='') {
        //     date.sort();
        //     // const url =
        //     //     this.AppStore.state.siteUrl + "principals/"
        //     //      + `generated?date=${date}&table_generated=`
        //     //      + `generated_${this.PrincipalsStore.state.selectedPrincipalCode}`;
        //     // const url =
        //     //     this.AppStore.state.siteUrl + "principals"
        //     //      + `/generated`
        //     //      + `?date=${date}`
        //     //      + `&principal_code=${this.PrincipalsStore.state.selectedPrincipalCode}`;
        //     const url = this.AppStore.state.siteUrl
        //         + "principals"
        //         + `/generated`;
        //     const payload = {
        //         date: date,
        //         principal_code: this.PrincipalsStore.state.selectedPrincipalCode,
        //         cols: this.myStore.state.generatedDataDBTableColumns
        //     };

        //     try {
        //         this.AppStore.state.showTopLoading = true;
        //         this.isGenerating = true;
        //         this.generatedData = [];
        //         let res = await axios.post(url, payload);

        //         state.currentGeneratedData =
        //         // [
        //             result.data.output_template_variations.map(e => {
        //                 return {
        //                     name: e.name,
        //                     output_template: Object.entries(e.output_template),
        //                 }
        //             });
        //         // ];

        //         const grouped = res.data.generated_data.reduce(function(r, a) {
        //             r[a[dataProp]] = r[a[dataProp]] || [];
        //             r[a[dataProp]].push(a);
        //             return r;
        //         }, Object.create(null));

        //         this.generatedData = Object.entries(grouped);
        //         this.isGenerating = false;
        //         this.AppStore.state.showTopLoading = false;

        //         this.dlgSelectDatesShown = false;
        //     } catch (error) {
        //         console.log("generate(): ", error);
        //         this.AppStore.toast(error);
        //     }
        // },

        exportToExcel() {
            const config = this.PrincipalsStore
                .getHeaderAndFormat('generatedDataTableHeader');

            for(let i=0;i<config.length;i++) {
                // export templated data to Excel
                this.PrincipalsStore.exportToExcel(
                    config[i].header,
                    this.PrincipalsStore.generatedDataSubset(
                        // this.AppStore.flattenGendata(this.generatedData),
                        this.generatedData[i].output_template,
                        config[i].format
                    ),
                    null,
                    this.PrincipalsStore.state.selectedPrincipalCode + '_' + (i+1)
                );
            };

            // this.PrincipalsStore.exportToExcel(
            //     config.header,
            //     this.PrincipalsStore.generatedDataSubset(
            //         this.generatedData,
            //         config.format
            //     ),
            //     null,
            //     this.PrincipalsStore.state.selectedPrincipalCode
            // );
        },
    },

    watch: {
        selectedFilter(val) {
            this.generate(this.date, val);
        }
    },

    created() {
        this.selectedFilter = this.myStore.state.generatedDataHistoryFilters[0][0].value;
        // this.generate(this.date, this.selectedFilter);
    },

    mounted() {
        console.log("GeneratedHistory component mounted");
        console.log(this.generatedData);
    }
};
</script>
