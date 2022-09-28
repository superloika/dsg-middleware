<template>

<v-card
    class="elevation-0 transparent pa-0"
>
    <v-card-text class="">
        <v-row>
            <v-col>
                <small>
                    <strong>Important Note:</strong>
                    Filenames should include a group keyword
                    in order for the system to identify which group the data came from.
                    Keyword includes
                        <v-chip x-small color="default">
                            CWDG
                        </v-chip>
                        <v-chip x-small color="default">
                            UWDG
                        </v-chip>
                        <v-chip x-small color="default">
                            3PS
                        </v-chip>
                        <v-chip x-small color="default">
                            CVS
                        </v-chip>
                        <v-chip x-small color="default">
                            DEL
                        </v-chip>
                        <v-chip x-small color="default">
                            HOR
                        </v-chip>
                        <v-chip x-small color="default">
                            MAS
                        </v-chip>
                        <v-chip x-small color="default">
                            SEC
                        </v-chip>
                    Example: "CWDG_PCS Sept 1-5.txt"
                </small>
            </v-col>
        </v-row>
        <v-row class="">
            <v-col class="pb-0" cols lg="9" md="9" sm="12">

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
                        background-color="white"
                    ></v-file-input>
                </v-form>
            </v-col>

            <!-- <v-col class="pb-0" cols lg="3" md="4" sm="4">
                <v-select
                    rounded
                    outlined
                    dense
                    :items="AppStore.state.terminals"
                    item-text="name"
                    item-value="value"
                    placeholder="Select Source"
                    v-model="selected_group"
                    title="Source Terminal"
                ></v-select>
            </v-col> -->

            <v-col class="pb-0" cols lg="2" md="2" sm="11">
                <v-btn
                    dense color="primary"
                    @click="upload()"
                    block
                    rounded
                    :disabled="file==null || file.length < 1 || selected_group=='XXX'"
                >
                    Submit
                </v-btn>
            </v-col>
            <v-col class="pb-0" cols lg="1" md="1" sm="1">
                <v-btn icon title="Previous upload summary"
                    @click.stop="showPreviousSummary()"
                    :disabled="isNoPreviousSummary"
                >
                    <v-icon>mdi-history</v-icon>
                </v-btn>
            </v-col>

        </v-row>
    </v-card-text>

    <v-dialog
        v-model="InvoicesStore.state.isUploadSummaryShown"
        max-width="900px"

    >
        <InvoiceUploadSummary :uploadResponse="uploadResponse"></InvoiceUploadSummary>
    </v-dialog>

</v-card>

</template>


<script>

export default {
    name: 'InvoicesUpload',
    props: ['searchKey', 'principalCodeFilter'],
    components: {
        InvoiceUploadSummary: () => import('./InvoiceUploadSummary.vue')
    },
    data() {
        return {
            file: null,
            selected_group: '',
            uploadResponse: {},
        }
    },

    computed: {
        isNoPreviousSummary() {
            return Object.keys(this.uploadResponse).length === 0;
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

            formData.append('terminal', this.selected_group);

            let url = this.AppStore.state.siteUrl + 'invoices/upload';

            axios.post(url, formData, config)
                .then(response => {
                    const success = response.data.success;
                    const message = response.data.message;
                    this.AppStore.overlay(false);
                    this.AppStore.toast(message);
                    this.file = null;
                    this.selected_group = '';
                    this.InvoicesStore.initInvoices(this.searchKey, this.principalCodeFilter);
                    this.uploadResponse = response.data;
                    if(response.data.success) {
                        this.InvoicesStore.state.isUploadSummaryShown = true;
                    }
                })
                .catch(error => {
                    this.AppStore.overlay(false);
                    this.AppStore.toast(error);
                });
        },

        showPreviousSummary() {
            this.InvoicesStore.state.isUploadSummaryShown = true;
        }

    },

    mounted() {
        console.log('InvoicesUpload mounted.');
    }
}
</script>
