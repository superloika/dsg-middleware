<template>
    <v-card class="mx-auto elevation-0" tile>
        <v-list-item color="rgba(0, 0, 0, .4)">
            <v-list-item-icon>
                <v-avatar color="primary" size="100">
                    <span class="white--text text-h2">{{ userInitial }}</span>
                </v-avatar>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title class="title"
                    >{{ AuthUser.name }} (<em>{{ AuthUser.username }}</em>)
                </v-list-item-title>

                <v-list-item-subtitle>
                    {{ AuthUser.user_type }}
                </v-list-item-subtitle>

                <v-list-item-subtitle class="pt-4">
                    <v-btn color="primary" dense small outlined
                        @click="ManageAccounts.editAccount(AuthUser)"
                    >
                        Edit Account
                    </v-btn>
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>

        <!-- Dialogs (Modals)-->
        <v-dialog
            v-model="ManageAccounts.state.modalEditIsOpen"
            max-width="728"
            persistent
        >
            <AccountsEdit v-if="ManageAccounts.state.modalEditIsOpen"></AccountsEdit>
        </v-dialog>
        <!-- /Dialogs (Modals)-->
    </v-card>
</template>

<script>
export default {
    components: {
        AccountsEdit: () => import("../ManageAccounts/AccountsEdit.vue")
    },

    computed: {
        userInitial() {
            let name = this.AuthUser.name;
            return name[0].toString().toUpperCase();
        }
    },
    mounted() {
        console.log("Account page mounted.");
    },

    // beforeRouteEnter (to, from, next) {
    //     if(window.AuthUser.user_type === 'super_admin') {
    //         next();
    //     } else {
    //         alert('Access denied!');
    //         next(from);
    //     }
    // }
};
</script>
