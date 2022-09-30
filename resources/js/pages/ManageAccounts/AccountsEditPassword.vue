<template>
    <v-container>
        <!-- <v-alert
            dense
            text
            type="error"
            dismissible
            transition="scale-transition"
            v-model="errMsgsShown"
        >
            <div>
                <p
                    class="ma-0 pa-0"
                    v-for="(errMsg, index) in errMsgs"
                    :key="index"
                >
                    {{ errMsg }}
                </p>
                <br />
            </div>
        </v-alert> -->

        <v-form v-model="frmEditPw" ref="form">
            <v-row>
                <v-col cols="12" md="4" sm="6">
                    <v-text-field
                        outlined
                        dense
                        text
                        label="Old Password *"
                        required
                        type="password"
                        v-model="account.old_password"
                        :rules="account.rules.old_password"
                        :error="(errorMsgs.old_password != undefined) ? true : false"
                        :error-messages="(errorMsgs.old_password != undefined) ? errorMsgs.old_password : []"
                    ></v-text-field>
                </v-col>

                <v-col cols="12" md="4" sm="6">
                    <v-text-field
                        outlined
                        dense
                        text
                        label="New Password *"
                        required
                        type="password"
                        v-model="account.password"
                        :rules="account.rules.password"
                        :error="(errorMsgs.password != undefined) ? true : false"
                        :error-messages="(errorMsgs.password != undefined) ? errorMsgs.password : []"
                    ></v-text-field>
                </v-col>

                <v-col cols="12" md="4" sm="6">
                    <v-text-field
                        outlined
                        dense
                        text
                        label="Confirm Password *"
                        autocomplete="false"
                        required
                        type="password"
                        v-model="account.password_confirmation"
                        :rules="account.rules.password_confirmation"
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-row class="pt-0 pb-0" background-color="red">
                <v-col class="pt-0 pb-0" background-color="red">
                    <v-btn
                        color="primary"
                        @click="updatePassword()"
                        :loading="updatingPassword"
                        class="float-lg-right float-md-right float-sm-right"
                        outlinedx
                        smallx
                        roundedx
                    >
                        Update Password
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            frmEditPw: false,
            account: {
                id: this.ManageAccounts.state.toEdit.id,
                // old_password_hashed: this.ManageAccounts.state.toEdit.old_password_hashed,
                old_password: '',
                password: '',
                password_confirmation: '',

                rules: {
                    old_password: [
                        v => !!v || "Old password is required.",
                    ],
                    password: [
                        v => !!v || "Password is required.",
                        v =>
                            v.length >= 3 ||
                            "Password must be 3 characters or above."
                    ],
                    password_confirmation: [
                        v => !!v || "Please confirm your password.",
                        v =>
                            v === this.account.password ||
                            "Password confirmation is incorrect."
                    ],
                }
            },
            updatingPassword: false,
            errMsgs: [],
            errMsgsShown: false,
            errorMsgs: {},
        };
    },

    watch: {

    },

    methods: {
        async updatePassword() {
            // const vm = this;
            if (this.$refs.form.validate()) {
                let url = `${this.AppStore.state.siteUrl}accounts/update-password`;

                let payload = {
                    _method: "PATCH",
                    id: this.account.id,
                    // old_password_hashed: this.account.old_password_hashed,
                    old_password: this.account.old_password,
                    password: this.account.password,
                    password_confirmation: this.account.password_confirmation,
                }

                try {
                    this.updatingPassword = true;
                    let response = await axios.post(url, payload);
                    if (response.data == true) {

                        if(this.$route.meta.name==='Account') {
                            location.reload();
                        }

                        this.ManageAccounts.initUsers();
                        this.ManageAccounts.state.modalEditIsOpen = false;
                        this.AppStore.toast("Password updated", 1500);
                    } else if (
                        response.data.invalidations != undefined ||
                        response.data.invalidations != null
                    ) {
                        this.errMsgs = [];
                        this.errorMsgs = {};
                        this.errorMsgs = response.data.invalidations;
                        Object.entries(response.data.invalidations).forEach(
                            field => {
                                this.errMsgs.push(field[1][0]);
                            }

                        );
                        // this.AppStore.toast(this.errMsgs, 3000);
                        this.errMsgsShown = true;
                    } else if (
                        response.data.errorInfo != null ||
                        response.data.errorInfo != undefined
                    ) {
                        this.AppStore.toast("An error occured", 2000);
                        console.log(response.data.errorInfo);
                    }
                } catch (error) {
                    console.log(error);
                    this.AppStore.toast(error, 3000);
                }
                this.updatingPassword = false;
            }
        }
    },

    mounted() {
        console.log('AccountsEditPassword component mounted');
    }
};
</script>
