(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{KtVp:function(t,e,a){"use strict";a.r(e);var n={props:["tabs"],data:function(){return{tab:null}},computed:{principalName:function(){var t=this;return this.AppStore.state.principals.find((function(e){return e.code==t.$route.params.principal_code})).name},vendorCode:function(){var t=this;return this.AppStore.state.principals.find((function(e){return e.code==t.$route.params.principal_code})).vendor_code},selectedPrincipalCode:function(){return this.PrincipalsStore.state.selectedPrincipalCode}},mounted:function(){console.log("PrincipalBase component mounted"),console.log(this.selectedPrincipalCode)}},i=a("KHd+"),r=Object(i.a)(n,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-sheet",[a("v-app-bar",{attrs:{elevation:"0",app:"",dense:""}},[a("v-toolbar-title",{staticClass:"primary--text"},[a("h5",{staticStyle:{padding:"0"}},[t._v("\n                "+t._s(t.principalName)+"\n                "),a("v-chip",{attrs:{"x-small":"",title:"Vendor Code"}},[t._v("\n                    "+t._s(t.vendorCode)+"\n                ")]),t._v(" "),a("v-chip",{attrs:{"x-small":"",title:"Middleware Code"}},[t._v("\n                    "+t._s(t.PrincipalsStore.state.selectedPrincipalCode)+"\n                ")])],1)]),t._v(" "),a("v-spacer"),t._v(" "),a("v-sheet",[a("v-tabs",{attrs:{"hide-slider":"",height:"44","show-arrows":"","center-active":"","background-color":"grey lighten-4","active-class":"primary--text"},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},t._l(t.tabs,(function(e,n){return a("v-tab",{key:n,attrs:{title:e.title}},[a("v-icon",[t._v(t._s(e.icon))])],1)})),1)],1)],1),t._v(" "),a("v-tabs-items",{staticClass:"pa-0",model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},t._l(t.tabs,(function(e,n){return a("v-tab-item",{key:n,staticClass:"pa-0"},[a(e.component,{tag:"component",attrs:{id:t.selectedPrincipalCode+"_tab_"+(new Date).getTime()}})],1)})),1)],1)}),[],!1,null,null,null);e.default=r.exports}}]);