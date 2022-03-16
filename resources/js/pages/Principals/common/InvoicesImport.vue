<template>
<v-card outlinedx class="elevation-0 transparent pa-0">
    <v-card-text class="pa-0">
        <v-row class="">
            <v-col class="pb-0" cols lg="9" md="7" sm="8">
                <v-form ref="frm_upload">
                    <v-file-input
                        small-chips
                        show-sizex
                        rounded
                        outlined
                        dense
                        required
                        placeholder="Select file/s to import"
                        v-model="file"
                        accept=".txt"
                        multiple
                        color="primary"
                    ></v-file-input>
                </v-form>
            </v-col>
            <v-col class="pb-0" cols lg="3" md="5" sm="4">
                    <v-btn
                        dense color="primary"
                        @click="formSubmit()"
                        block
                        rounded
                        depressed
                        :loading="PrincipalsStore.state.isGeneratingData"
                    >
                        Generate
                    </v-btn>
                <!-- :disabled="file==null || file.length < 1" -->
            </v-col>

        </v-row>
    </v-card-text>
</v-card>
</template>


<script>

export default {
    name: 'InvoicesImport',
    // props: ['master_type','principal_code'],
    data() {
        return {
            file: null,
            // uploadResponse: {
            //     success: '',
            //     message: '',
            //     output_template: [],
            //     line_count: 0,
            //     raw_invoices: [],
            // },
        }
    },

    methods: {
        formSubmit() {
            let vm = this;

            if(!this.$refs.frm_upload.validate()) {
                alert('An unexpected error occured');
                return;
            }
            if(this.file===null || this.file.length===0 || this.file===undefined) {
                this.AppStore.toast('Please select file/s to import', 1000);
                return;
            }

            this.AppStore.overlay(true);
            this.PrincipalsStore.state.isGeneratingData = true;
            this.AppStore.state.showTopLoading = true;

            const config = {
                headers: {'content-type': 'multipart/form-data'},
                onUploadProgress: progressEvent => {
                    let progressPercentage = progressEvent.loaded / vm.file.size * 100;
                    let statusText = 'Importing...';
                    if(progressPercentage < 100) {
                        statusText = 'Uploading... ' + progressPercentage.toFixed(0) + '%';
                    } else if(progressPercentage == 100) {
                        statusText = 'File uploaded';
                    } else if(progressPercentage > 100){
                        statusText = 'Generating data...';
                    }
                    this.AppStore.state.overlay.msg = statusText;
                }
            }

            let formData = new FormData();

            for(let i=0;i<this.file.length;i++) {
                formData.append('files[' + i + ']', this.file[i]);
            }

            let url = this.AppStore.state.siteUrl + 'principals/' +
                this.PrincipalsStore.state.selectedPrincipalCode + '/invoices/import';

            axios.post(url, formData, config)
                .then(response => {
                    const success = response.data.success;
                    const message = response.data.message;
                    const output_template = response.data.output_template;
                    const line_count = response.data.line_count;
                    const raw_invoices = response.data.raw_invoices;

                    this.AppStore.overlay(false);
                    this.PrincipalsStore.state.isGeneratingData = false;
                    this.AppStore.state.showTopLoading = false;
                    this.AppStore.toast(message);
                    // this.file = null;

                    this.PrincipalsStore.state.currentGeneratedData =
                        Object.entries(output_template);

                    this.PrincipalsStore.state.currentRawInvoices = raw_invoices;

                    // this.PrincipalsStore.state.textfileLineCount = line_count;
                    this.PrincipalsStore.state.sheetImport = false;
                })
                .catch(error => {
                    this.AppStore.overlay(false);
                    this.AppStore.toast(error);
                    this.PrincipalsStore.state.isGeneratingData = false;
                    console.log('ImportResponse:', error);
                });
        },
    },

    mounted() {
        console.log('InvoicesImport mounted.');
        // this.file = null;
    }
}
</script>
