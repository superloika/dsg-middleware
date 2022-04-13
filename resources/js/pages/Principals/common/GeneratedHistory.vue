<template>
    <v-card outlinedx class="elevation-0 pt-0">
        <v-card-title class="pa-0">
            <v-app-bar elevation="0" colorx="white">
                <v-toolbar-title>
                    Generated Data History
                    <div v-if="lineCount > 0">
                        <v-chip x-small outlinedx label color="primary">
                            {{ lineCount }} total line/s
                        </v-chip>
                    </div>
                </v-toolbar-title>

                <v-spacer></v-spacer>

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
                    :items="myStore.state.generatedDataHistoryFilters"
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
            <div
                v-if="generatedData.length < 1"
                class="d-flex justify-center mt-5"
            >
                <v-chip color="accent" small>
                    No available data to display
                </v-chip>
            </div>
            <GeneratedTable
                v-else
                :id="wrapperID"
                :generatedData="generatedData"
            >
            </GeneratedTable>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    components: {
        GeneratedTable: () => import("./GeneratedTableWrapper.vue"),
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
            this.generatedData.forEach(e => {
                count += e[1].length;
            });
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
            // const url =
            //     this.AppStore.state.siteUrl + "principals/"
            //      + `generated?date=${date}&table_generated=`
            //      + `generated_${this.PrincipalsStore.state.selectedPrincipalCode}`;
            // const url =
            //     this.AppStore.state.siteUrl + "principals"
            //      + `/generated`
            //      + `?date=${date}`
            //      + `&principal_code=${this.PrincipalsStore.state.selectedPrincipalCode}`;
            const url = this.AppStore.state.siteUrl
                + "principals"
                + `/generated`;
            const payload = {
                date: date,
                principal_code: this.PrincipalsStore.state.selectedPrincipalCode,
                cols: this.myStore.state.generatedDataDBTableColumns
            };

            try {
                this.AppStore.state.showTopLoading = true;
                this.isGenerating = true;
                this.generatedData = [];
                let res = await axios.post(url, payload);

                const grouped = res.data.generated_data.reduce(function(r, a) {
                    r[a[dataProp]] = r[a[dataProp]] || [];
                    r[a[dataProp]].push(a);
                    return r;
                }, Object.create(null));

                this.generatedData = Object.entries(grouped);
                this.isGenerating = false;
                this.AppStore.state.showTopLoading = false;

                this.dlgSelectDatesShown = false;
            } catch (error) {
                console.log("generate(): ", error);
                this.AppStore.toast(error);
            }
        },

        exportToExcel() {
            const config = this.PrincipalsStore
                .getHeaderAndFormat('generatedDataTableHeader');

            this.PrincipalsStore.exportToExcel(
                config.header,
                this.PrincipalsStore.generatedDataSubset(
                    this.generatedData,
                    config.format
                ),
                null,
                this.PrincipalsStore.state.selectedPrincipalCode
            );
        },
    },

    watch: {
        selectedFilter(val) {
            this.generate(this.date, val);
        }
    },

    created() {
        this.selectedFilter = this.myStore.state.generatedDataHistoryFilters[0].value;
        // this.generate(this.date, this.selectedFilter);
    },

    mounted() {
        console.log("GeneratedHistory component mounted");
    }
};
</script>
