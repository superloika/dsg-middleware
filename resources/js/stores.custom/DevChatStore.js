import Vue from 'vue';


const state = Vue.observable({
    unreadMsgCount: 0,
    groupChannel: 'dev_group_chat',
    messages: [],
})

const actions = {

}

export default {
    state,
    ...actions,
}
