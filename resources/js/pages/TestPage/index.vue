<template>
<div>
    <!-- <v-app-bar elevation="0" dense app color="grey lighten-5"> -->
    <v-app-bar elevation="0" app>
        <v-toolbar-title>{{ $route.meta.name }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-text-field
            v-model="searchKey"
            label="Search"
            clearable
            hide-details
            dense
            class="mr-3"
            flat
            rounded
            solo
            background-color="grey lighten-5"
        ></v-text-field>

        <v-btn dense icon @click="exportToExcelTest()" :loading="AppStore.state.showTopLoading"
            title="Export Test Data to Excel" :disabled="!sampleData.length">
            <v-icon>mdi-export</v-icon>
        </v-btn>
    </v-app-bar>

    <TestUpload class="mb-4"></TestUpload>

    <v-card class="mb-4" outlined>
        <v-card-title>
            Test 2
            {{ recordCount }}
        </v-card-title>
        <v-card-text>
            <v-row>
                <v-col>
                    <v-text-field v-model="perPage" label="Per Page" outlined dense flat></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field v-model="currPage" label="Current Page" outlined dense flat></v-text-field>
                </v-col>
                <v-col>
                    <v-btn @click.stop="fetchSampleData(perPage, currPage)" :loading="AppStore.state.showTopLoading"
                        color="primary">Fetch Test Data</v-btn>
                </v-col>
            </v-row>
            <!-- <v-row>
                <v-col>
                    <v-pagination
                        :length="paginPagesCount"
                        v-model="paginCurrPage"
                        :total-visible="7"
                    >
                    </v-pagination>
                </v-col>
            </v-row> -->
            <v-row>
                <v-col>
                    <v-btn @click.stop="getAuthUser()">Log AuthUser</v-btn>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>

    <!-- :loading="AppStore.state.showTopLoading" -->
    <v-data-table
        :items="sampleData"
        :headers="tblHeader"
        checkbox-color="primary"
        class="tbl-items elevation-1"
        :search="searchKey"
        dense
    >
    </v-data-table>

</div>
</template>

<script>
    export default {
        components: {
            'TestUpload': () => import('./TestUpload.vue'),
        },
        data() {
            return {
                sampleData: [],

                percentCompleted: '',
                currPage: 1,
                perPage: 10,
                searchKey: '',
                recordCount: null,
                paginCurrPage: 1,
            }
        },

        methods: {
            // fetchSampleData(per_page = 10, curr_page = 1) {
            //     this.AppStore.state.showTopLoading = true;
            //     axios.get(`${this.AppStore.state.siteUrl}test/test2?per_page=${per_page}&curr_page=${curr_page}`)
            //         .then(response => response.data)
            //         .then(data => {
            //             const [ RowNum, ...rest ] = data;
            //             console.log(data);
            //             this.sampleData = data;
            //             this.AppStore.state.showTopLoading = false;

            //             this.AppStore.toast('Test data loaded successfully');
            //         })
            //         .catch(error => {
            //             console.log('ERROR:', error);
            //             this.AppStore.state.showTopLoading = false;
            //         });
            // },
            async fetchSampleData(per_page = 10, curr_page = 1) {
                try {
                    let url = `${this.AppStore.state.siteUrl}test/test2?per_page=${per_page}&curr_page=${curr_page}`;
                    this.AppStore.state.showTopLoading = true;
                    let result = await axios.get(url);
                    let data = result.data;
                    const [ RowNum, ...rest ] = data;
                    console.log(data);
                    this.sampleData = data;
                    this.AppStore.toast('Test data loaded successfully');
                    this.AppStore.state.showTopLoading = false;
                } catch (error) {
                    console.log('ERROR:', error);
                    this.AppStore.state.showTopLoading = false;
                }
            },

            getRecordCount() {
                axios.get(`${this.AppStore.state.siteUrl}test/record-count`)
                    .then(response => response.data)
                    .then(data => {
                        console.log(data[0].recordCount);
                        this.recordCount = data[0].recordCount;
                    })
                    .catch(error => {
                        console.log('ERROR:', error);
                    });
            },


            exportToExcelTest() {
                this.AppStore.state.showTopLoading = true;
                let tblWrapper = document.querySelector('.tbl-items');
                let tbl = tblWrapper.querySelector('table');
                let wb = XLSX.utils.book_new();
                // var ws = XLSX.utils.table_to_sheet(tbl);
                var ws = XLSX.utils.json_to_sheet(this.sampleData);
                XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
                XLSX.writeFile(wb,'tbl.csv');
                this.AppStore.state.showTopLoading = false;
            },

            getAuthUser() {
               console.log(this.AuthUser);
            }
        },

        watch: {
            // paginCurrPage() {
            //     this.fetchSampleData(this.perPage, this.paginCurrPage);
            // }
        },

        computed: {
            tblHeader() {
                // let header = [
                //     { text: "No", value: "No_" },
                //     { text: "Description", value: "Description" },
                //     { text: "Unit Cost", value: "Unit Cost" },
                //     { text: "Unit Price", value: "Unit Price" },
                //     { text: "Base Unit of Measure", value: "Base Unit of Measure" },
                //     { text: "Inventory Posting Group", value: "Inventory Posting Group"},
                // ];

                let header = [];
                if (this.sampleData.length) {
                    let objKeys = Object.keys(this.sampleData[0]);
                    // let vm = this;
                    objKeys.map(function(val){
                        header.push({
                            text:  val.toString().toUpperCase(),
                            value: val
                        });
                    });
                }

                return header;
            },

            paginPagesCount() {
                let pageCount = parseFloat(this.recordCount) / parseFloat(this.perPage);
                return parseInt(pageCount.toFixed(0));
            },
        },

        mounted() {
            console.log('Test page mounted.');
        }
    }
</script>
