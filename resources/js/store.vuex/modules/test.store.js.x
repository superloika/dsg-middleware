// State object
const state = {
    variable1: 'I am from a central store (test.store)!',
}

// Getter functions
const getters = {
    getVariable1( state ) {
       return state.variable1;
    },
}

// Actions
const actions = {
    setVariable1({commit},data) {
        commit('SET_VARIABLE_1',data)
    }
}

// Mutations
const mutations = {
    SET_VARIABLE_1(state, data) {
       state.variable1 = data;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
