(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{105:function(t,e,n){"use strict";n.r(e);var a=n(1),r=n.n(a);function i(t,e,n,a,r,i,o){try{var c=t[i](o),s=c.value}catch(t){return void n(t)}c.done?e(s):Promise.resolve(s).then(a,r)}var o={data:function(){return{frm_edit_principal:!1,account:{id:this.ManageAccounts.state.toEdit.id,user_type:this.ManageAccounts.state.toEdit.user_type,selected_principals:this.ManageAccounts.state.toEdit.principal_ids},updatingPrincipal:!1,errMsgs:[],errMsgsShown:!1,errorMsgs:{}}},methods:{updatePrincipal:function(){var t,e=this;return(t=r.a.mark((function t(){var n,a,i,o;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=e,!e.$refs.frm_edit_principal.validate()){t.next=17;break}return a="".concat(e.AppStore.state.siteUrl,"accounts/update-principal-assignment"),i={_method:"PATCH",id:n.account.id,selected_principals:n.account.selected_principals},t.prev=4,e.updatingPrincipal=!0,t.next=8,axios.post(a,i);case 8:1==(o=t.sent).data?("Account"===e.$route.meta.name&&location.reload(),e.ManageAccounts.initUsers(),e.AppStore.toast("Account updated",2e3)):null!=o.data.invalidations||null!=o.data.invalidations?(e.errMsgs=[],e.errorMsgs={},e.errorMsgs=o.data.invalidations,Object.entries(o.data.invalidations).forEach((function(t){e.errMsgs.push(t[1][0])})),e.errMsgsShown=!0):null==o.data.errorInfo&&null==o.data.errorInfo||(e.AppStore.toast("An error occured",2e3),console.log(o.data.errorInfo)),t.next=16;break;case 12:t.prev=12,t.t0=t.catch(4),console.log(t.t0),e.AppStore.toast(t.t0,3e3);case 16:e.updatingPrincipal=!1;case 17:case"end":return t.stop()}}),t,null,[[4,12]])})),function(){var e=this,n=arguments;return new Promise((function(a,r){var o=t.apply(e,n);function c(t){i(o,a,r,c,s,"next",t)}function s(t){i(o,a,r,c,s,"throw",t)}c(void 0)}))})()}},mounted:function(){console.log("AccountsEditPrincipalAssignment component mounted",this.account)}},c=n(0),s=Object(c.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",[n("v-form",{ref:"frm_edit_principal",model:{value:t.frm_edit_principal,callback:function(e){t.frm_edit_principal=e},expression:"frm_edit_principal"}},[n("v-row",[n("v-col",{attrs:{cols:"12"}},[n("v-select",{attrs:{items:t.AppStore.state.principals,"item-text":"name","item-value":"id",label:"Designated Principals",multiple:"",dense:"",outlined:""},model:{value:t.account.selected_principals,callback:function(e){t.$set(t.account,"selected_principals",e)},expression:"account.selected_principals"}})],1)],1),t._v(" "),n("v-row",{staticClass:"pt-0 pb-0",attrs:{"background-color":"red"}},[n("v-col",{staticClass:"pt-0 pb-0",attrs:{"background-color":"red"}},[n("v-btn",{staticClass:"float-lg-right float-md-right float-sm-right",attrs:{color:"primary",loading:t.updatingPrincipal,outlinedx:"",smallx:"",roundedx:""},on:{click:function(e){return t.updatePrincipal()}}},[t._v("\n                    Update\n                ")])],1)],1)],1)],1)}),[],!1,null,null,null);e.default=s.exports}}]);