(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{104:function(o,r,s){"use strict";s.r(r);var t=s(1),a=s.n(t);function e(o,r,s,t,a,e,n){try{var d=o[e](n),c=d.value}catch(o){return void s(o)}d.done?r(c):Promise.resolve(c).then(t,a)}var n={data:function(){var o=this;return{frmEditPw:!1,account:{id:this.ManageAccounts.state.toEdit.id,old_password:"",password:"",password_confirmation:"",rules:{old_password:[function(o){return!!o||"Old password is required."}],password:[function(o){return!!o||"Password is required."},function(o){return o.length>=5||"Password must be 5 characters or above."}],password_confirmation:[function(o){return!!o||"Please confirm your password."},function(r){return r===o.account.password||"Password confirmation is incorrect."}]}},updatingPassword:!1,errMsgs:[],errMsgsShown:!1,errorMsgs:{}}},watch:{},methods:{updatePassword:function(){var o,r=this;return(o=a.a.mark((function o(){var s,t,e;return a.a.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:if(!r.$refs.form.validate()){o.next=16;break}return s="".concat(r.AppStore.state.siteUrl,"accounts/update-password"),t={_method:"PATCH",id:r.account.id,old_password:r.account.old_password,password:r.account.password,password_confirmation:r.account.password_confirmation},o.prev=3,r.updatingPassword=!0,o.next=7,axios.post(s,t);case 7:1==(e=o.sent).data?("Account"===r.$route.meta.name&&location.reload(),r.ManageAccounts.initUsers(),r.ManageAccounts.state.modalEditIsOpen=!1,r.AppStore.toast("Password updated",1500)):null!=e.data.invalidations||null!=e.data.invalidations?(r.errMsgs=[],r.errorMsgs={},r.errorMsgs=e.data.invalidations,Object.entries(e.data.invalidations).forEach((function(o){r.errMsgs.push(o[1][0])})),r.errMsgsShown=!0):null==e.data.errorInfo&&null==e.data.errorInfo||(r.AppStore.toast("An error occured",2e3),console.log(e.data.errorInfo)),o.next=15;break;case 11:o.prev=11,o.t0=o.catch(3),console.log(o.t0),r.AppStore.toast(o.t0,3e3);case 15:r.updatingPassword=!1;case 16:case"end":return o.stop()}}),o,null,[[3,11]])})),function(){var r=this,s=arguments;return new Promise((function(t,a){var n=o.apply(r,s);function d(o){e(n,t,a,d,c,"next",o)}function c(o){e(n,t,a,d,c,"throw",o)}d(void 0)}))})()}},mounted:function(){console.log("AccountsEditPassword component mounted")}},d=s(0),c=Object(d.a)(n,(function(){var o=this,r=o.$createElement,s=o._self._c||r;return s("v-container",[s("v-form",{ref:"form",model:{value:o.frmEditPw,callback:function(r){o.frmEditPw=r},expression:"frmEditPw"}},[s("v-row",[s("v-col",{attrs:{cols:"12",md:"4",sm:"6"}},[s("v-text-field",{attrs:{outlined:"",dense:"",text:"",label:"Old Password *",autocomplete:"false",required:"",type:"password",rules:o.account.rules.old_password,error:null!=o.errorMsgs.old_password,"error-messages":null!=o.errorMsgs.old_password?o.errorMsgs.old_password:[]},model:{value:o.account.old_password,callback:function(r){o.$set(o.account,"old_password",r)},expression:"account.old_password"}})],1),o._v(" "),s("v-col",{attrs:{cols:"12",md:"4",sm:"6"}},[s("v-text-field",{attrs:{outlined:"",dense:"",text:"",label:"New Password *",autocomplete:"false",required:"",type:"password",rules:o.account.rules.password,error:null!=o.errorMsgs.password,"error-messages":null!=o.errorMsgs.password?o.errorMsgs.password:[]},model:{value:o.account.password,callback:function(r){o.$set(o.account,"password",r)},expression:"account.password"}})],1),o._v(" "),s("v-col",{attrs:{cols:"12",md:"4",sm:"6"}},[s("v-text-field",{attrs:{outlined:"",dense:"",text:"",label:"Confirm Password *",autocomplete:"false",required:"",type:"password",rules:o.account.rules.password_confirmation},model:{value:o.account.password_confirmation,callback:function(r){o.$set(o.account,"password_confirmation",r)},expression:"account.password_confirmation"}})],1)],1),o._v(" "),s("v-row",{staticClass:"pt-0 pb-0",attrs:{"background-color":"red"}},[s("v-col",{staticClass:"pt-0 pb-0",attrs:{"background-color":"red"}},[s("v-btn",{staticClass:"float-lg-right float-md-right float-sm-right",attrs:{color:"primary",loading:o.updatingPassword,outlinedx:"",smallx:"",roundedx:""},on:{click:function(r){return o.updatePassword()}}},[o._v("\n                    Update Password\n                ")])],1)],1)],1)],1)}),[],!1,null,null,null);r.default=c.exports}}]);