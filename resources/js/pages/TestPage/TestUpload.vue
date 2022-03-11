<template>
<v-card outlined>
    <v-card-title>Test 1</v-card-title>
    <v-card-text>
        <v-row>
            <v-col cols lg="10" md="8" sm="12">
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
                    ></v-file-input>
                </v-form>
            </v-col>
            <v-col cols lg="2" md="4" sm="12">
                <v-btn
                    dense color="primary"
                    @click="formSubmit()"
                    block
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
    name: 'TestUpload',

    data() {
        return {
            file: [],
            uploadResponse: {
                success: '',
                message: '',
                testData: []
            },
        }
    },

    methods: {
        formSubmit() {
            let vm = this;

            if(!this.$refs.frm_upload.validate()) {
                alert('error occued');
                return;
            }
            if(this.file===null || this.file.length===0 || this.file===undefined) {
                this.AppStore.toast('Please select file to upload', 1500);
                return;
            }

            this.AppStore.overlay(true);

            const config = {
                headers: {'content-type': 'multipart/form-data'},
                onUploadProgress: progressEvent => {
                    let progressPercentage = progressEvent.loaded / vm.file.size * 100;
                    this.AppStore.state.overlay.msg =
                        'Uploading... ' + progressPercentage.toFixed(0) + '%';
                }
            }

            let formData = new FormData();
            formData.append('file', this.file);

            axios.post('/test/testFileUpload', formData, config)
                .then(response => {
                    vm.uploadResponse.success = response.data.success;
                    vm.uploadResponse.message = response.data.message;
                    vm.uploadResponse.testData = response.data.test_data;

                    this.AppStore.overlay(false);
                    this.AppStore.toast(vm.uploadResponse.message)
                    this.file = [];
                    console.log(vm.uploadResponse.testData);
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

    watch: {
        // file() {
        //     console.log('File:', this.file);
        // }
    },

    mounted() {
        console.log('TestUpload mounted.')
    }
}
</script>
