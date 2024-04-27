<template>
<div>
    <div
        v-if="this.AppStore.isSuperAdmin()==false && this.AppStore.isAdmin()==false"
        class="pa-4 error--text"
    >
        {{ AppStore.state.guardMsgs.accessDenied }}
    </div>
    <div v-else>
        <v-app-bar elevation="0" app colorx="white">
            <v-toolbar-title>Manage Accounts</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-text-field
                label="Search"
                clearable
                hide-details
                dense
                class="mr-3"
                style="max-width:200px;"
                flat
                rounded
                solo-inverted
                v-model="ManageAccounts.state.searchKey"
            ></v-text-field>

            <v-btn
                dense
                icon
                @click.stop="ManageAccounts.state.modalAddIsOpen = true"
                title="Add Account"
            >
                <v-icon>mdi-account-plus</v-icon>
            </v-btn>
        </v-app-bar>

        <v-data-table
            :loading="ManageAccounts.state.usersLoading"
            :items="filteredUsers"
            :headers="tblUsersHeader"
            :search="ManageAccounts.state.searchKey"
            checkbox-color="primary"
            class=""
        >
            <template v-slot:[`item.actions`]="{ item }">
                <v-btn
                    dense
                    icon
                    title="Edit"
                    @click.stop="ManageAccounts.editAccount(item)"
                >
                    <v-icon>mdi-account-edit</v-icon>
                </v-btn>

                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind="attrs" v-on="on" dense icon title="Assigned Principals">
                            <v-icon>mdi-store</v-icon>
                        </v-btn>
                    </template>
                    <v-card outline tile>
                        <v-card-text>
                            <div v-if="item.principals.length > 0">
                                <v-chip small v-for="(p, i) in item.principals" :key="p.vendor_code"
                                    :title="p.main_vendor_code" color="primary" class="ma-1"
                                >
                                    ({{ i+1 }}) {{ p.vendor_code }} - {{ p.vendor_name }}
                                </v-chip>
                            </div>
                            <div v-else>
                                <em>Nothing assigned</em>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-menu>

                <v-btn
                    dense
                    icon
                    title="Delete"
                    @click="ManageAccounts.confirmDeleteAccount(item)"
                >
                    <v-icon>mdi-delete-forever</v-icon>
                </v-btn>
            </template>

            <template v-slot:[`item.user_type`]="{ item }">
                <v-chip v-if="item.user_type=='encoder'" small color="default">
                    {{ item.user_type }}
                </v-chip>
                <v-chip v-else-if="item.user_type=='uploader'" small color="secondary">
                    {{ item.user_type }}
                </v-chip>
                <v-chip v-else-if="item.user_type=='admin'" small color="primary">
                    {{ item.user_type }}
                </v-chip>
                <v-chip v-else-if="item.user_type=='super_admin'" small color="info">
                    {{ item.user_type }}
                </v-chip>
            </template>

            <template v-slot:[`item.principals`]="{ item }">
                <div>

                </div>
            </template>
        </v-data-table>

        <!-- Dialogs (Modals)-->
        <v-dialog
            v-model="ManageAccounts.state.modalAddIsOpen"
            max-width="500"
            persistent
        >
            <AccountsAdd
                v-if="ManageAccounts.state.modalAddIsOpen"
            ></AccountsAdd>
        </v-dialog>
        <v-dialog
            v-model="ManageAccounts.state.modalEditIsOpen"
            max-width="500"
            persistent
        >
            <AccountsEdit
                v-if="ManageAccounts.state.modalEditIsOpen"
            ></AccountsEdit>
        </v-dialog>
        <!-- /Dialogs (Modals)-->
    </div>
</div>
</template>

<script>
export default {
    components: {
        AccountsAdd: () => import("./AccountsAdd.vue"),
        AccountsEdit: () => import("./AccountsEdit.vue")
    },

    data() {
        return {

        };
    },

    computed: {
        tblUsersHeader() {
            return [
                { text: "Name", value: "name" },
                { text: "Username", value: "username" },
                { text: "User Type", value: "user_type" },
                {
                    text: "Actions",
                    value: "actions",
                    sortable: false,
                    align: "end"
                }
            ];
        },

        filteredUsers() {

            return this.ManageAccounts.state.users.filter((e)=>{
                if(this.AppStore.isAdmin()) {
                    return e.user_type != 'super_admin'
                    && e.user_type != 'admin'
                    && e.user_type != 'dummy';
                } else {
                    return e;
                }
            });

        },
    },

    methods: {

    },

    created() {
        this.ManageAccounts.initUsers();
    },

    mounted() {
        console.log("ManageAccounts mounted.");
    }
};
</script>
