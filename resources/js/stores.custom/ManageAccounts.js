import Vue from "vue";
import AppStore from "./AppStore";


const state = Vue.observable({
    users: [],
    // usersLoading: false,
    modalAddIsOpen: false,
    modalEditIsOpen: false,
    searchKey: "",
    editMode: false,

    toEdit: {
        id: null,
        name: null,
        old_username: null,
        username: null,
        // old_password_hashed: null,
        user_type: null,
        email: null,
        principal_ids: null,
    }
});


const actions = {
    async initUsers() {
        let url = `${AppStore.state.siteUrl}accounts`;
        state.users = [];
        try {
            // state.usersLoading = true;
            AppStore.state.showTopLoading = true;
            let response = await axios.get(url);
            state.users = response.data;
            // state.usersLoading = false;
            AppStore.state.showTopLoading = false;
        } catch (error) {
            console.log('ManageAccounts_initUsers() - ERROR: ', error);
            // state.usersLoading = false;
            AppStore.state.showTopLoading = false;
            AppStore.toast(error, 2500);
        }
    },


    editAccount(account) {
        state.modalEditIsOpen = true;
        state.toEdit.id = account.id;
        state.toEdit.name = account.name;
        state.toEdit.username = account.username;
        // state.toEdit.old_password_hashed = account.password;
        state.toEdit.user_type = account.user_type;
        state.toEdit.email = account.email;
        state.toEdit.principal_ids = JSON.parse(account.principal_ids);
    },


    async deleteAccount(account) {
        let url = `${AppStore.state.siteUrl}accounts/delete`;
        try {
            let response = await axios.post(url, {
                _method: "DELETE",
                id: account.id
            });
            if (response.data == true) {
                // users();
                this.initUsers();
                AppStore.toast("Account deleted", 2000);
            } else if (
                response.data.errorInfo != null ||
                response.data.errorInfo != undefined
            ) {
                AppStore.toast("An error occured", 2000);
                console.log(response.data.errorInfo);
            }
        } catch (error) {
            console.log('ManageAccounts_deleteAccount() - ERROR: ', error);
            AppStore.toast(error, 3000);
        }
    },

    confirmDeleteAccount(account) {
        if (confirm(`Delete ${account.name} (${account.username})?`)) {
            this.deleteAccount(account);
        }
    }
};


export default {
    state,
    ...actions
};
