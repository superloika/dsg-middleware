import Vue from 'vue';
import AppStore from './AppStore';


const state = Vue.observable({
    token: null,
})

const actions = {
    async refresh() {
        try {
            const url = `${AppStore.state.siteUrl}br/refresh`;
            const response = await axios.post(url);
            console.log(response.data);
            console.log(state.token);
        } catch (error) {
            console.log('refresh() - ERROR:', error);
        } finally {
        }
    },
    async invoiceCreate(data = []) {
        try {
            const url = `${AppStore.state.siteUrl}br/invoiceCreate`;
            const response = await axios.post(url,
                {
                    data: data
                }
            );
            console.log(response.data);
            console.log(state.token);
        } catch (error) {
            console.log('invoiceCreate() - ERROR:', error);
        } finally {
        }
    },
    preparePayload(generatedData) {
        // let buff = _.groupBy(items, e => e.invoice_no);
        // return buff;
        console.log('GENERATED DATA:',generatedData);
    }
}


export default {
    state,
    ...actions,
}
