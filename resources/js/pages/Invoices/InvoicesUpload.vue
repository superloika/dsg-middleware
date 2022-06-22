<template>

<v-card outlinedx class="elevation-0 transparent pa-0">
    <v-card-text class="">
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
                        placeholder="Select text files to upload (invoices)"
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
                    @click="upload()"
                    block
                    rounded
                    :disabled="file==null || file.length < 1"
                >
                    Submit
                </v-btn>
            </v-col>

        </v-row>
    </v-card-text>
</v-card>

</template>


<script>

export default {
    name: 'InvoicesUpload',
    props: ['searchKey', 'principalCodeFilter'],
    data() {
        return {
            file: null,

        }
    },

    methods: {
        upload() {
            let vm = this;

            this.AppStore.overlay(true);

            const config = {
                headers: {'content-type': 'multipart/form-data'},
                onUploadProgress: progressEvent => {
                    let progressPercentage = progressEvent.loaded / vm.file.size * 100;
                    let statusText = 'Uploading...';
                    if(progressPercentage < 100) {
                        statusText = 'Uploading... ' + progressPercentage.toFixed(0) + '%';
                    } else if(progressPercentage == 100) {
                        statusText = 'File uploaded';
                    } else if(progressPercentage > 100){
                        statusText = 'Saving...';
                    }
                    this.AppStore.state.overlay.msg = statusText;
                }
            }

            let formData = new FormData();

            for(let i=0;i<this.file.length;i++) {
                formData.append('files[' + i + ']', this.file[i]);
            }

            let url = this.AppStore.state.siteUrl + 'invoices/upload';

            axios.post(url, formData, config)
                .then(response => {
                    const success = response.data.success;
                    const message = response.data.message;
                    this.AppStore.overlay(false);
                    this.AppStore.toast(message);
                    this.file = null;
                    this.InvoicesStore.initInvoices(this.searchKey, this.principalCodeFilter);
                })
                .catch(error => {
                    this.AppStore.overlay(false);
                    this.AppStore.toast(error);
                });
        },

    },

    mounted() {
        console.log('InvoicesUpload mounted.');
    }
}
</script>
