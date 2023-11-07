<template>
    <v-container>
        <!-- <v-alert
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

        <v-form v-model="frm_edit_principal" ref="frm_edit_principal">
            <v-row>
                <v-col
                    cols="12"
                >
                    <v-select
                        multiple outlined clearable
                        v-model="account.main_vendor_codes"
                        :items="filteredPrincipals"
                        item-text="caption"
                        item-value="main_vendor_code"
                        label="Assigned Principals"
                    >
                        <template v-slot:prepend-item>
                            <div class="mx-2 mb-0 pb-0">
                                <v-text-field
                                    clearable solo-inverted rounded flat
                                    placeholder="Search"
                                    v-model="principalsSearchKey"
                                    @blur="principalsSearchKey = ''"
                                ></v-text-field>
                            </div>
                        </template>
                        <template v-slot:item = "{ item }">
                            <div class="py-2">
                                <div v-for="(c, index) in item.caption" :key="index">
                                    <small class="text-caption ma-1">{{ c }}</small>
                                    <br>
                                </div>
                            </div>
                        </template>
                        <template v-slot:selection = "{ item }">
                            <div v-for="(c, index) in item.caption" :key="index">
                                <v-chip color="primary" x-small>{{ c }}</v-chip>
                            </div>
                        </template>
                    </v-select>
                </v-col>
            </v-row>

            <v-row class="pt-0 pb-0" background-color="red">
                <v-col class="pt-0 pb-2" background-color="red">
                    <v-btn
                        color="primary"
                        @click="updatePrincipal()"
                        :loading="updatingPrincipal"
                        class="float-lg-right float-md-right float-sm-right"
                        rounded
                    >
                        Update
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
            frm_edit_principal: false,
            account: {
                id: this.ManageAccounts.state.toEdit.id,
                user_type: this.ManageAccounts.state.toEdit.user_type,
                main_vendor_codes: this.ManageAccounts.state.toEdit.main_vendor_codes,
            },
            updatingPrincipal: false,
            errMsgs: [],
            errMsgsShown: false,
            errorMsgs: {},
            principalsSearchKey: '',
        };
    },

    computed: {
        // principals() {
        //     return this.AppStore.state.principals;
        // },

        principals() {
            return this.AppStore.state.principals.map(e => {
                return {
                    main_vendor_code: e[0],
                    caption: e[1].map(el => `${el.vendor_code} - ${el.name}`),
                }
            });
        },

        // filteredPrincipals() {
        //     const searchRegex = new RegExp(this.principalsSearchKey, "i");

        //     if (JSON.parse(this.AuthUser.principal_ids)[0] === "*") {
        //         return this.principals.filter(
        //             principal => {
        //                 return searchRegex.test(principal.name)
        //                     || !this.principalsSearchKey
        //                     || searchRegex.test(principal.vendor_code);
        //             }

        //         );
        //     } else {
        //         return this.principals.filter(
        //             principal => {
        //                 return (searchRegex.test(principal.name)
        //                     || !this.principalsSearchKey
        //                     || searchRegex.test(principal.vendor_code))
        //                     && this.AppStore.isInUserPrincipalIDs(principal.id);
        //             }
        //         );
        //     }
        // },
        filteredPrincipals: function() {
            try {
                const searchRegex = new RegExp(this.principalsSearchKey, "i");
                return this.principals.filter(p => searchRegex.test(p.caption));
            } catch (error) {
                console.error(error);
                return [];
            }
        },


    },

    watch: {
        principalsSearchKey() {
            if(this.principalsSearchKey==null) this.principalsSearchKey = '';
        }
    },

    methods: {
        async updatePrincipal() {
            const vm = this;
            if (this.$refs.frm_edit_principal.validate()) {
                let url = `${this.AppStore.state.siteUrl}accounts/update-principal-assignment`;

                let payload = {
                    _method: "PATCH",
                    id: vm.account.id,
                    main_vendor_codes: vm.account.main_vendor_codes,
                }

                try {
                    this.updatingPrincipal = true;
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
                this.updatingPrincipal = false;
            }
        }
    },

    mounted() {
        console.log('AccountsEditPrincipalAssignment component mounted', this.account);
    },

};
</script>
