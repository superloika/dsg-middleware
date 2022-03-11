// State
const state = {
    expenses: {},
    loadingExpenses: false
}

// Actions
const actions = {
    expenses({commit, rootState}, payload) {
        let url = `${rootState.siteUrl}api_expenses/index`;
        commit('setLoadingExpenses', true);
        const { params, vm } = payload;
        axios.get(url, { params })
            .then(function(response){
                commit('setExpenses', response.data);
                commit('setLoadingExpenses', false);

                vm.$root.toast('Expenses data loaded successfully');
            });
    }
}

// Mutations
const mutations = {
    setExpenses(state, data) {
       state.expenses = data;
    },
    setLoadingExpenses(state, data) {
       state.loadingExpenses = data;
    },
}

// Getter functions
const getters = {
    getExpenses( state ) {
       return state.expenses;
    },
    getLoadingExpenses( state ) {
       return state.loadingExpenses;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
