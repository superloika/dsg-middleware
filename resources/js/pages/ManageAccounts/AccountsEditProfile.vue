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

        <v-form v-model="frm_edit_profile" ref="frm_edit_profile">
            <v-row>
                <v-col cols="12" md="4" sm="6">
                    <v-text-field
                        outlined
                        dense
                        text
                        label="Name *"
                        required
                        v-model="account.name"
                        :rules="account.rules.name"
                        :error="(errorMsgs.name != undefined) ? true : false"
                        :error-messages="(errorMsgs.name != undefined) ? errorMsgs.name : []"
                    ></v-text-field>
                </v-col>

                <v-col cols="12" md="4" sm="6">
                    <v-text-field
                        outlined
                        dense
                        text
                        label="Username *"
                        required
                        v-model="account.username"
                        :rules="account.rules.username"
                        :error="(errorMsgs.username != undefined) ? true : false"
                        :error-messages="(errorMsgs.username != undefined) ? errorMsgs.username : []"
                    ></v-text-field>
                </v-col>



                <v-col cols="12" md="4" sm="6">
                    <v-select
                        :items="filteredUserTypes"
                        outlined
                        dense
                        text
                        label="User Type"
                        required
                        v-model="account.user_type"
                        :rules="account.rules.user_type"
                        :error="(errorMsgs.user_type != undefined) ? true : false"
                        :error-messages="(errorMsgs.user_type != undefined) ? errorMsgs.user_type : []"
                        :disabled="account.id == AuthUser.id"
                    >
                    </v-select>
                </v-col>
            </v-row>

            <v-row class="pt-0 pb-0" background-color="red">
                <v-col class="pt-0 pb-0" background-color="red">
                    <v-btn
                        color="primary"
                        @click="updateProfile()"
                        :loading="updatingProfile"
                        class="float-lg-right float-md-right float-sm-right"
                        outlinedx
                        smallx
                        roundedx
                    >
                        Update Profile
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
            nameRegex: /^[a-zA-Z\s]+$/,
            usernameRegex: /^[a-zA-Z0-9]+$/,
            frm_edit_profile: false,
            account: {
                id: this.ManageAccounts.state.toEdit.id,
                name: this.ManageAccounts.state.toEdit.name,
                old_username: this.ManageAccounts.state.toEdit.old_username,
                username: this.ManageAccounts.state.toEdit.username,
                user_type: this.ManageAccounts.state.toEdit.user_type,

                rules: {
                    name: [
                        v => !!v || "Name is required",
                        v =>
                            v.length >= 2 ||
                            "Name must be 2 characters or above",
                        v =>
                            this.nameRegex.test(v) ||
                            "Invalid name. Use alpha characters only"
                    ],
                    username: [
                        v => !!v || "Username is required",
                        v =>
                            v.length >= 3 ||
                            "Username must be 3 characters or above",
                        v => this.usernameRegex.test(v) || "Invalid username"
                    ],

                    user_type: [v => !!v || "User type is required"]
                }
            },
            updatingProfile: false,
            errMsgs: [],
            errMsgsShown: false,
            errorMsgs: {},
        };
    },

    computed: {
        filteredUserTypes() {
            return this.AppStore.state.userTypes.filter((e) => {
                if(this.AppStore.isAdmin()) {
                    return e != 'super_admin' && e != 'admin'
                } else {
                    return e;
                }
            });
        }
    },

    watch: {
        "account.name": function() {
            this.account.name = this.account.name.replace("  ", " ").trim();
        }
    },

    methods: {
        async updateProfile() {
            const vm = this;
            if (this.$refs.frm_edit_profile.validate()) {
                let url = `${this.AppStore.state.siteUrl}accounts/update-profile`;

                let payload = {
                    _method: "PATCH",
                    id: vm.account.id,
                    name: vm.account.name,
                    old_username: vm.account.old_username,
                    username: vm.account.username,
                    user_type: vm.account.user_type
                }

                try {
                    this.updatingProfile = true;
                    let response = await axios.post(url, payload);
                    if (response.data == true) {
                        if(this.$route.meta.name==='Account') {
                            location.reload();
                        }

                        // temp
                        // this.ManageAccounts.state.toEdit.name = vm.account.name;
                        // this.ManageAccounts.state.toEdit.old_username =
                        //     vm.account.username;
                        // this.ManageAccounts.state.toEdit.username =
                        //     vm.account.username;
                        // this.ManageAccounts.state.toEdit.user_type =
                        //     vm.account.user_type;

                        this.ManageAccounts.initUsers();
                        // this.ManageAccounts.state.modalEditIsOpen = false;
                        this.AppStore.toast("Account updated", 2000);
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
                this.updatingProfile = false;
            }
        }
    },

    mounted() {
        console.log('AccountsEditProfile component mounted');
    },

};
</script>
