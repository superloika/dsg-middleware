<template>
    <v-card>
        <v-card-title class="pb-6">
            <div class="mr-2">
                Extract Raw Invoices
            </div>
            <div></div>
        </v-card-title>

        <v-card-text>
            <v-row>
                <v-col>
                    <v-combobox
                        :items="AppStore.state.principals"
                        v-model="principal_code"
                        label="Principal"
                        item-text="name"
                        item-value="code"
                        :return-object="false"
                        outlined
                        rounded
                        hide-details
                        dense
                        clearable
                    >
                    </v-combobox>
                </v-col>

                <v-col>
                    <v-text-field
                        v-model="dateRangeText"
                        label="Posting Date - YYYY-MM-DD"
                        hide-details
                        readonly
                        dense
                        outlined
                        rounded
                        @click.stop="datePickerShown = true"

                    ></v-text-field>
                    <!-- DATEPICKER -->
                    <v-dialog
                        ref="datePicker"
                        v-model="datePickerShown"
                        :return-value.sync="date"
                        :disabled="principal_code=='' || principal_code==null"
                        max-width="300px"
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
                                @click="
                                    $refs.datePicker.save(date);
                                "
                            >
                                Ok
                            </v-btn>
                        </v-date-picker>
                    </v-dialog>
                    <!-- /DATEPICKER -->
                </v-col>

                <!-- <v-col md="2">
                    <v-btn block
                        @click="extract()"
                        color="primary"
                    >
                        Extract
                    </v-btn>
                </v-col> -->
            </v-row>

            <v-row>
                <v-col>
                    <v-btn
                        @click="extractRawInvoicesToExcel()"
                        color="primary"
                        class="float-right"
                    >
                        Extract
                    </v-btn>
                </v-col>
            </v-row>

        </v-card-text>
    </v-card>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            principal_code: "",
            datePickerShown: false,
            date: [new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
                .toISOString()
                .substr(0, 10)],
        };
    },

    computed: {
        dateRangeText() {
            return this.date.join(' ~ ');
        },
    },

    methods: {
        async extract() {
            const { headers, data } = await axios.post(
                this.AppStore.state.siteUrl + 'invoices/extract',
                {
                    principal_code: this.principal_code,
                    posting_date: this.date,
                },
                {
                    responseType: 'blob'
                }
            );

            const { 'content-disposition': contentDisposition } = headers;
            const [attachment, file] = contentDisposition.split(' ');
            const [key, fileName] = file.split('=');
            const url = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
        },


        async extractRawInvoicesToExcel() {
            this.InvoicesStore.extractRawInvoicesToExcel(
                this.principal_code, this.date
            );
        },

        async asd() {
            const { headers, data } = await axios.post(
					'dtr/start-matching',
					{ fileId },
					{
						responseType: 'blob',
						onDownloadProgress: progressEvent => {
							// let percentCompleted = Math.floor(
							//   (progressEvent.loaded / progressEvent.total) * 100
							// )
							// console.log(`${percentCompleted}% Downloaded`)
						}
					}
				)

				const { 'content-disposition': contentDisposition } = headers

				const [attachment, file] = contentDisposition.split(' ')

				const [key, fileName] = file.split('=')

				const url = window.URL.createObjectURL(new Blob([data]))
				const link = document.createElement('a')
				link.href = url
				link.setAttribute('download', fileName)
				document.body.appendChild(link)
				link.click()
        }
    },

    mounted() {
        console.log("ExtractInvoices component mounted");
    }
};
</script>
