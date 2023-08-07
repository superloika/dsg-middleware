import Vue from 'vue';
import AppStore from './AppStore';

const state = Vue.observable({
    unreadMsgCount: 0,
    groupChannel: 'dev_group_chat',
    messages: [],
    onlineUsers: [],
})

const actions = {
    // async fetchOnlineUsers() {
    //     try {
    //         const url = `${AppStore.state.siteUrl}devchat/fetchOnlineUsers`;
    //         const response = await axios.get(url);
    //         state.onlineUsers = response.data;
    //     } catch (error) {
    //     } finally {
    //     }
    // },
    // async userOnline(user) {
    //     const payload = {
    //         user_id: user.id,
    //         channel: state.groupChannel,
    //     };
    //     axios.post(`${AppStore.state.siteUrl}devchat/userOnline`, payload);
    // },
    // async userOffline(user) {
    //     const payload = {
    //         user_id: user.id,
    //         channel: state.groupChannel,
    //     };
    //     axios.post(`${AppStore.state.siteUrl}devchat/userOffline`, payload);
    // },
}

export default {
    state,
    ...actions,
}
