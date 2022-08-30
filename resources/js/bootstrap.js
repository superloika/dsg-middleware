// window._ = require('lodash');

const { default: axios } = require('axios');

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

// try {
//     window.Popper = require('popper.js').default;
//     window.$ = window.jQuery = require('jquery');

//     require('bootstrap');
// } catch (e) {}

/**
 * SheetJS
 */
window.XLSX = require('xlsx');

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require("axios");

// console.log('Authorization:',window.CsrfToken);
// window.axios.defaults.headers.common["Authorization"] = `${window.CsrfToken}`;

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     // forceTLS: true
//     forceTLS: false,
//     wsHost: window.location.hostname,
//     wsPort: 6001,
//     disableStats: true,
// });


// check if user session has expired or user is unauthorized
window.axios.interceptors.response.use(
    function(response) {
        // if(window.AuthUser===null) {
        //     let url = new URL(window.location.href);
        //     if(url.pathname !== '/login') {
        //         window.location.href = `/logout`;
        //     }
        // }
        return response;
    },

    function(error) {
        console.log('===================== INTERCEPTOR =====================');
        if (
            error.response.status === 401
            || error.response.status === 419
            || error.response.status === 440
        ) {
            console.log('INTERCEPTOR:', error);
            let cookies = document.cookie.split(";");
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i];
                let eqPos = cookie.indexOf("=");
                let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            }
            // window.location.href = `/flush-session`;
            // window.location.href = `/login`;
            window.location.assign(window.location.href);

        }

        console.log('INTERCEPTOR - AUTH USER:', window.AuthUser);
        console.log('INTERCEPTOR:', error);
        console.log('===================== INTERCEPTOR =====================');
        return Promise.reject(error);
    }
);


window.abortController = new AbortController();
