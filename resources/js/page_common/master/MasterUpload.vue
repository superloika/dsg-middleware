<template>
<v-card outlined>
    <v-card-title class="mb-4">
        <div>
            Upload Masterfile
        </div>

        <v-spacer></v-spacer>
        <v-btn icon
            @click="MasterCommon.state.isImportDialogOpen = false"
            title="Close"
        >
            <v-icon>mdi-close-box-outline</v-icon>
        </v-btn>
    </v-card-title>
    <v-card-text>
        <v-row>
            <v-col cols lg="8" md="7" sm="12">
                <v-form ref="frm_upload">
                    <v-file-input
                        small-chips
                        counter
                        show-size
                        truncate-length="50"
                        rounded
                        outlined
                        dense
                        required
                        accept="text/csv"
                        multiple
                        v-model="file"
                        label="Select a file to upload"
                    ></v-file-input>
                </v-form>
            </v-col>
            <v-col cols lg="4" md="5" sm="12">
                <v-btn
                    dense color="primary"
                    @click="formSubmit()"
                    block
                    rounded
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
    name: 'MasterUpload',
    props: ['id'],
    data() {
        return {
            file: null,
            uploadResponse: {
                success: '',
                message: '',
                // testData: []
            },
        }
    },

    methods: {
        formSubmit() {
            let vm = this;

            if(!this.$refs.frm_upload.validate()) {
                console.log('formSubmit(): An unexpected error occured');
                return;
            }
            // if(this.file===null || this.file.length===0 || this.file===undefined) {
            //     this.AppStore.toast('Please select a file to upload', 1500);
            //     return;
            // }

            // if(this.$refs.file===null || this.$refs.file.length===0 || this.$refs.file===undefined) {
            //     this.AppStore.toast('Please select a file to upload', 1500);
            //     return;
            // }

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

            for(let i=0; i<this.file.length; i++) {
                formData.append('files[' + i + ']', this.file[i]);
            }

            const url = this.AppStore.state.siteUrl +
                'master/' + this.id + '/upload';

            // if(this.id=='products') {
            //     url = `/master/products/upload`;
            // } else if(this.id=='customers') {
            //     url = `/master/customers/upload`;
            // } else if(this.id=='principals') {
            //     url = `/master/principals/upload`;
            // }

            axios.post(url, formData, config)
                .then(response => {
                    vm.uploadResponse.success = response.data.success;
                    vm.uploadResponse.message = response.data.message;

                    this.AppStore.overlay(false);
                    this.AppStore.toast(vm.uploadResponse.message);
                    this.file = null;

                    this.MasterPrincipals.initPrincipals();
                    this.MasterCustomers.initCustomers();
                    this.MasterProducts.initProducts();
                    this.MasterCommon.state.isImportDialogOpen = false;

                    // if(this.id=='products') {
                    // } else if(this.id=='customers') {
                    // } else if(this.id=='principals') {
                    // }

                })
                .catch(error => {
                    vm.uploadResponse.success = false;
                    vm.uploadResponse.message = error;
                    this.AppStore.overlay(false);
                    this.AppStore.toast(error);
                    console.log(vm.uploadResponse);
                });
        },

    },

    mounted() {
        console.log('MasterUpload mounted:', this.id);
    }
}
</script>
