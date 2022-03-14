/**
 * Our Beloved Summer is like a close friend
 * that I want to keep revisiting
 * whenever I need warmth and comfort.
 */

import Vue from "vue";

const host = `http://${window.location.host}/`;
// const localStorage = window.localStorage;


const state = Vue.observable({
    AppName: 'DSG - MIDDLEWARE (DEV)',
    siteUrl: host,
    snackBar: {
        show: false,
        text: "",
        timeout: -1,
    },
    overlay: {
        show: false,
        msg: '',
    },
    errorBar: {
        show: true,
        msg: "Error"
    },
    userTypes: ["super_admin", "user"],
    guardMsgs: {
        accessDenied: "Access Denied",
    },
    showTopLoading: false,
    principals: [],
    strDateToday: [new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)],
    // navDrawerState: localStorage.getItem('navDrawerState'),
});


const actions = {
    toast(text, timeout) {
        state.snackBar.show = true;
        state.snackBar.text = text;
        state.snackBar.timeout = timeout == null ? 3000 : timeout;
    },

    overlay(show = true, text = "Loading...") {
        state.overlay.show = show;
        state.overlay.msg = text;
    },

    async initPrincipals() {
        let url = `${state.siteUrl}master/principals/all`;
        state.principals = [];
        try {
            let result = await axios.get(url);
            state.principals = result.data;
        } catch (error) {
            console.log("AppStore_initPrincipals() - ERROR: ", error);
        }
    },

    isInUserPrincipalIDs(principal_id) {
        if (window.AuthUser != undefined || window.AuthUser != null) {
            if (
                JSON.parse(window.AuthUser.principal_ids)
                    .includes(parseInt(principal_id))
            ) {
                return true;
            }
        }
        return false;
    },

    isSuperAdmin() {
        if(window.AuthUser.user_type == 'super_admin') {
            return true;
        }
        return false;
    },

    formatAsCurrency(number) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'PHP',
            // These options are needed to round to whole numbers if that's what you want.
            //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
            //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
        });

        return formatter.format(number);
    },

    copyToClip(container_id, srcType = 'text') {
        try {
            let str = '';
            if(srcType == 'text') {
                str = document.getElementById(container_id).innerText;
            } else if(srcType == 'html') {
                str = document.getElementById(container_id).innerHTML;
            } else if(srcType == 'value') {
                str = document.getElementById(container_id).value;

            }

            // function listener(e) {
            //     e.clipboardData.setData("text/plain;charset=UTF-8", str);
            //     e.preventDefault();
            // }
            // document.addEventListener("copy", listener);
            // document.execCommand("copy");
            // document.removeEventListener("copy", listener);

            navigator.clipboard?.writeText &&
                navigator.clipboard.writeText(str);

            this.toast('Copied to clipboard', 500);
        } catch (error) {
            console.log('copyToClip():', error);
            // document.getElementById('asd').value
        }
    },

};

export default {
    state,
    // localStorage,
    ...actions
};
