// State object
const state = {
    showImport: false,
    tblCustomersLoading: false,
}

// Actions
const actions = {
    showImport({commit},data) {
        commit('setShowImport',data)
    },

    customersMaster(per_page = 10, curr_page = 1) {
        this.isTblCustomersLoading = true;
        axios.get(`${this.$store.getters.getSiteUrl}test/test2?per_page=${per_page}&curr_page=${curr_page}`)
            .then(response => response.data)
            .then(data => {
                const [ RowNum, ...rest ] = data;
                console.log(data);
                this.sampleData = data;
                this.isTblCustomersLoading = false;

                this.$root.toast('Test data loaded successfully');
            })
            .catch(error => {
                console.log('ERROR:', error);
                this.isTblCustomersLoading = false;
            })
    },
    tblCustomersLoading({commit},data) {
        commit('setTblCustomersLoading',data)
    },
}

// Mutations
const mutations = {
    setShowImport(state, data) {
        state.showImport = data;
    },
    setTblCustomersLoading(state, data) {
        state.tblCustomersLoading = data;
    },
}

// Getters
const getters = {
    getShowImport( state ) {
       return state.showImport;
    },
    getTblCustomersLoading( state ) {
       return state.tblCustomersLoading;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
