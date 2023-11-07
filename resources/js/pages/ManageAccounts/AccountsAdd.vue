<template>
    <v-card outlined>
        <v-card-title>
            <v-icon>mdi-account-plus</v-icon>
            <span class="ml-2">Add Account</span>
            <v-spacer></v-spacer>
            <v-btn icon @click="ManageAccounts.state.modalAddIsOpen = false">
                <v-icon>mdi-close-box-outline</v-icon>
            </v-btn>
        </v-card-title>
        <v-card-text>
            <v-alert
                text
                type="error"
                dismissible
                transition="scale-transition"
                v-model="errMsgsShown"
            >
                <p class="ma-0 pa-0" :key="index"
                    v-for="(errMsg, index) in errMsgs"
                >
                    {{ errMsg }}
                </p>
            </v-alert>
            <br />

            <v-form v-model="frm_add" ref="frm_add">
                <v-row class="pa-0">
                    <v-col cols="12" class="pt-1 pb-1">
                        <v-text-field
                            outlined
                            text
                            label="Name *"
                            required
                            v-model="newAccount.name"
                            :rules="newAccount.rules.name"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" class="pt-1 pb-1">
                        <v-text-field
                            outlined
                            text
                            label="Username *"
                            required
                            v-model="newAccount.username"
                            :rules="newAccount.rules.username"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" class="pt-1 pb-1">
                        <v-select
                            :items="filteredUserTypes"
                            outlined
                            text
                            label="User Type *"
                            required
                            v-model="newAccount.user_type"
                            :rules="newAccount.rules.user_type"
                        >
                        </v-select>
                    </v-col>

                    <v-col cols="12" class="pt-1 pb-1">
                        <v-text-field
                            outlined
                            text
                            label="Password *"
                            autocomplete="false"
                            required
                            type="password"
                            v-model="newAccount.password"
                            :rules="newAccount.rules.password"
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12" class="pt-1 pb-1">
                        <v-text-field
                            outlined
                            text
                            label="Confirm Password *"
                            autocomplete="false"
                            required
                            type="password"
                            v-model="newAccount.passwordConfirm"
                            :rules="newAccount.rules.passwordConfirm"
                        ></v-text-field>
                    </v-col>

                    <!-- <v-col cols="12" class="pt-1 pb-1"
                        v-if="newAccount.user_type != 'xxx'"
                    >
                        <v-select
                            v-model="newAccount.main_vendor_codes"
                            :items="filteredPrincipals"
                            item-text="name"
                            item-value="id"
                            label="Assigned Principals"
                            multiple
                            outlined
                        >
                            <template v-slot:prepend-item>
                                <div class="mx-2 mb-0 pb-0">
                                        placeholder="Search" flat
                                        v-model="principalsSearchKey"
                                    >
                                    </v-text-field>
                                </div>
                            </template>
                        </v-select>
                    </v-col> -->
                </v-row>

                <v-row class="pa-0">
                    <v-col>
                        <div class="float-right">
                            <v-btn rounded @click="saveNewUser()" :loading="savingNewUser" color="primary">
                                Save
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>

            </v-form>
        </v-card-text>

        <!-- <v-card-actions>
            <v-spacer></v-spacer>
        </v-card-actions> -->
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            nameRegex: /^[a-zA-Z\s]+$/,
            usernameRegex: /^[a-zA-Z0-9]+$/,
            frm_add: false,
            newAccount: {
                // name: "test user",
                // username: "admin",
                // password: "admin",
                // passwordConfirm: "admin",
                // user_type: "user",

                name: "",
                username: "",
                password: "",
                passwordConfirm: "",
                user_type: "",
                main_vendor_codes: null,

                rules: {
                    name: [
                        v => !!v || "Name is required",
                        v =>
                            v.length >= 2 ||
                            "Name must be 2 characters or above",
                        v => this.nameRegex.test(v) || "Invalid name. Use alpha characters only"
                    ],
                    username: [
                        v => !!v || "Username is required",
                        v =>
                            v.length >= 3 ||
                            "Username must be 3 characters or above",
                        v => this.usernameRegex.test(v) || "Invalid username"
                    ],
                    password: [
                        v => !!v || "Password is required",
                        v =>
                            v.length >= 3 ||
                            "Password must be 3 characters or above"
                    ],
                    passwordConfirm: [
                        v => !!v || "Please confirm password",
                        v =>
                            this.newAccount.password ===
                                this.newAccount.passwordConfirm ||
                            "Password did not match"
                    ],
                    user_type: [v => !!v || "User type is required"]
                }
            },
            savingNewUser: false,
            errMsgs: [],
            errMsgsShown: false,

            principalsSearchKey: '',
        };
    },

    watch: {
        'newAccount.name': function() {
            this.newAccount.name = this.newAccount.name.replace('  ',' ').trim();
        },

        'newAccount.user_type': function() {
            if (this.newAccount.user_type === 'super_admin') {
                this.newAccount.main_vendor_codes = ["*"];
            } else if (this.newAccount.user_type === 'admin') {
                this.newAccount.main_vendor_codes = ["*"];
            } else {
                this.newAccount.main_vendor_codes = null;
            }
        },

        // 'newAccount.main_vendor_codes': function() {
        //     console.log(this.newAccount.main_vendor_codes);
        // }
    },

    methods: {
        async saveNewUser() {
            const vm = this;
            if (this.$refs.frm_add.validate()) {
                let url = `${this.AppStore.state.siteUrl}accounts`;
                try {
                    this.savingNewUser = true;
                    let response = await axios.post(url, {
                        name: vm.newAccount.name,
                        username: vm.newAccount.username,
                        password: vm.newAccount.password,
                        user_type: vm.newAccount.user_type,
                        main_vendor_codes: vm.newAccount.main_vendor_codes,
                    });
                    // console.log(response.data);
                    if (response.data == true) {
                        this.ManageAccounts.initUsers();
                        this.ManageAccounts.state.modalAddIsOpen = false;
                        this.AppStore.toast("New account added", 2000);
                    } else if (
                        response.data.invalidations != undefined ||
                        response.data.invalidations != null
                    ) {
                        this.errMsgs = [];
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
                this.savingNewUser = false;
            }
        }
    },

    computed: {
        filteredUserTypes() {
            return this.AppStore.state.userTypes.filter((e)=>{
                if(this.AppStore.isAdmin()) {
                    return e != 'super_admin' && e != 'admin'
                } else {
                    return e;
                }
            })
        },


        filteredPrincipals() {
            const searchRegex = new RegExp(this.principalsSearchKey, "i");

            if (JSON.parse(this.AuthUser.principal_ids)[0] === "*") {
                return this.AppStore.state.principals.filter(
                    principal =>
                        searchRegex.test(principal.name) ||
                        !this.principalsSearchKey
                );
            } else {
                return this.AppStore.state.principals.filter(
                    principal =>
                        (searchRegex.test(principal.name) ||
                        !this.principalsSearchKey) &&
                        this.AppStore.isInUserPrincipalIDs(principal.id)
                );
            }
        }


    },

    created() {},

    mounted() {
        console.log("ExpendituresAdd mounted.");
    }
};
</script>
