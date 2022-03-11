<template>
<v-card outlined>
    <v-card-title
        class="mb-6"
    >
        <div>
            Upload/Update Masterfile ({{ id }})
        </div>

        <v-spacer></v-spacer>
        <v-btn icon
            @click="PrincipalsStore.state.isUploadMasterCustomersOpen = false;
                PrincipalsStore.state.isUploadMasterProductsOpen = false;"
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
                        v-model="file"
                        accept="text/csv"
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
    name: 'MasterfileUpload',
    props: ['id','master_type'],
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

    computed: {
        selectedPrincipalCode() {
            return this.PrincipalsStore.state.selectedPrincipalCode;
        }
    },

    methods: {
        formSubmit() {
            let vm = this;

            if(!this.$refs.frm_upload.validate()) {
                alert('An unexpected error occured!');
                return;
            }
            if(this.file===null || this.file.length===0 || this.file===undefined) {
                this.AppStore.toast('Please select file to upload', 1000);
                return;
            }

            this.AppStore.overlay(true);

            const config = {
                headers: {'content-type': 'multipart/form-data'},
                onUploadProgress: progressEvent => {
                    let progressPercentage = progressEvent.loaded / vm.file.size * 100;
                    let statusText = '';
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
            formData.append('file', this.file);

            let url = this.AppStore.state.siteUrl + 'principals/' +
                this.selectedPrincipalCode + '/' + this.id + '/upload';

            axios.post(url, formData, config)
                .then(response => {
                    vm.uploadResponse.success = response.data.success;
                    vm.uploadResponse.message = response.data.message;

                    this.AppStore.overlay(false);
                    this.AppStore.toast(vm.uploadResponse.message);
                    this.file = null;

                    if(this.id == 'products') {
                        this.PrincipalsStore.initProducts();
                    } else if(this.id == 'customers') {
                        this.PrincipalsStore.initCustomers();
                    }

                    this.PrincipalsStore.state.isUploadMasterCustomersOpen = false;
                    this.PrincipalsStore.state.isUploadMasterProductsOpen = false;
                })
                .catch(error => {
                    vm.uploadResponse.success = false;
                    vm.uploadResponse.message = error;
                    this.AppStore.overlay(false);
                    this.AppStore.toast(error);
                });
        },
    },

    mounted() {
        console.log('MasterfileUpload mounted.');
        this.file = null;
    }
}
</script>
