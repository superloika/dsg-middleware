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

        <v-form v-model="frm_edit_principal" ref="frm_edit_principal">
            <v-row>
                <v-col
                    cols="12"
                >
                    <v-select
                        v-model="account.selected_principals"
                        :items="principals"
                        item-text="name"
                        item-value="id"
                        label="Designated Principals"
                        multiple
                        dense
                        outlined
                        clearable
                    ></v-select>
                </v-col>
            </v-row>

            <v-row class="pt-0 pb-0" background-color="red">
                <v-col class="pt-0 pb-0" background-color="red">
                    <v-btn
                        color="primary"
                        @click="updatePrincipal()"
                        :loading="updatingPrincipal"
                        class="float-lg-right float-md-right float-sm-right"
                        outlinedx
                        smallx
                        roundedx
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
                selected_principals: this.ManageAccounts.state.toEdit.principal_ids,
            },
            updatingPrincipal: false,
            errMsgs: [],
            errMsgsShown: false,
            errorMsgs: {},
        };
    },

    computed: {
        principals() {
            return this.AppStore.state.principals;
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
                    selected_principals: vm.account.selected_principals,
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
