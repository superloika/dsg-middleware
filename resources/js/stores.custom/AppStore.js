/**
 * Our Beloved Summer is like a close friend
 * that I want to keep revisiting
 * whenever I need warmth and comfort.
 */

// import axios from "axios";
import axios from "axios";
import Vue from "vue";

const host = `http://${window.location.host}/`;
// const localStorage = window.localStorage;

const state = Vue.observable({
    AppName: 'DSG PRINCIPAL MIDDLEWARE',
    AppAbbr: 'DSGPM',
    // AppName: 'DSG PRINCIPAL MIDDLEWARE',
    siteUrl: host,
    snackBar: {
        show: false,
        text: "",
        timeout: -1,
        color: 'secondary'
    },
    overlay: {
        show: false,
        msg: '',
    },
    errorBar: {
        show: true,
        msg: "Error"
    },
    userTypes: ["super_admin", "admin", "uploader", "encoder"],
    guardMsgs: {
        accessDenied: "Access Denied",
    },
    showTopLoading: false,
    principals: [],
    strDateToday: [new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)],
    // navDrawerState: localStorage.getItem('navDrawerState'),
    dlgImportMaster: false,
    notices: []
});


const actions = {
    toast(text, timeout, color='secondary') {
        state.snackBar.show = true;
        state.snackBar.text = text;
        state.snackBar.timeout = timeout == null ? 3000 : timeout;
        state.snackBar.color = color;
    },

    overlay(show = true, text = "Loading...") {
        state.overlay.show = show;
        state.overlay.msg = text;
    },

    async initPrincipals() {
        let url = state.siteUrl + 'master/principals/all?main_vendor_codes='
            + window.AuthUser.main_vendor_codes;
        state.principals = [];
        try {
            let result = await axios.get(url);
            // state.principals = result.data;
            state.principals = Object.entries(_.groupBy(result.data, 'main_vendor_code'));
            console.log('LIST OF PRINCIPALS:', state.principals);
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

    isInUserPrincipalCodes(principal_code) {
        if (window.AuthUser != undefined || window.AuthUser != null) {
            if (
                JSON.parse(window.AuthUser.principal_codes)
                    .includes(parseInt(principal_code))
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

    isAdmin() {
        if(window.AuthUser.user_type == 'admin') {
            return true;
        }
        return false;
    },

    isEncoder() {
        if(window.AuthUser.user_type == 'encoder') {
            return true;
        }
        return false;
    },

    isUploader() {
        if(window.AuthUser.user_type == 'uploader') {
            return true;
        }
        return false;
    },

    isDummy() {
        if(window.AuthUser.user_type == 'dummy') {
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

        return formatter.format(number).replace('php','').replace('₱','');
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

            function listener(e) {
                e.clipboardData.setData("text/plain;charset=UTF-8", str);
                e.preventDefault();
            }
            document.addEventListener("copy", listener);
            document.execCommand("copy");
            document.removeEventListener("copy", listener);

            // navigator.clipboard?.writeText && navigator.clipboard.writeText(str);
            // alert(typeof(navigator.clipboard.writeText));

            this.toast('Copied to clipboard', 500);
        } catch (error) {
            console.log('copyToClip():', error);
            // document.getElementById('asd').value
        }
    },

    copyToClipboard(text) {
        try {
            window.navigator.clipboard.writeText(text);
            this.toast('Copied to clipboard', 500);
        } catch (error) {
            this.toast(error, 500);
        }
    },

    async exportToTxt(filename, data) {
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },

    flattenGendata(generatedData, headName=state.strDateToday[0]) {
        let temp =[];
        generatedData.forEach(e => {
            temp.push(...e[1]);
        });
        return [
            [
                headName,
                temp
            ]
        ];
    },

    async initNotices() {
        console.log('Invoking initNotices()');
        await axios.get(
            `${state.siteUrl}notices`
        ).then(e=>{
            state.notices = e.data;
        });
    },

    dmyDateFormat(dateString) {
        const parts = dateString.split("/");
        const date = new Date(parts[2], parts[0] - 1, parts[1]);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        const formattedDate = day + "/" + month + "/" + year;
        return formattedDate;
    }

};

actions.initNotices();
export default {
    state,
    // localStorage,
    ...actions
};
