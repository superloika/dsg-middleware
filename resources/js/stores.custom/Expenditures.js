import Vue from 'vue';
import AppStore from './AppStore';


const state = Vue.observable({
    expenses: {},
    tags: [],
    totalExpenses: 0.00,
    // loadingExpenses: false,
    add_expense: false,
})


// Actions
const actions = {
    async expenses(payload) {
        let url = `${AppStore.state.siteUrl}api_expenses/index`;
        state.expenses = {};
        state.totalExpenses = 0.00;
        try {
            // state.loadingExpenses = true;
            AppStore.state.showTopLoading = true;
            let response = await axios.get(url, payload);
            state.expenses = response.data;
            // state.loadingExpenses = false;
            AppStore.state.showTopLoading = false;
            response.data.data.forEach((e)=>{
                state.totalExpenses += e.amount * e.quantity;
            });
            console.log(response.data);
        } catch (error) {
            // state.loadingExpenses = false;
            AppStore.state.showTopLoading = false;
            AppStore.toast(error, 2500);
        }
    },

    async tags() {
        let url = `${AppStore.state.siteUrl}api_expenses/tags`;
        state.tags = [];
        try {
            // state.loadingExpenses = true;
            let response = await axios.get(url);
            state.tags = response.data;
        } catch (error) {
            AppStore.toast(error, 2500);
        }
    }
}


export default {
    state, ...actions
}
