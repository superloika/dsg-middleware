(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{39:function(t,e,n){"use strict";n.r(e);var i={data:function(){return{}},created:function(){this.PrincipalsStore.initSettings()},mounted:function(){console.log("Settings component mounted")}},s=n(0),a=Object(s.a)(i,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-card",{staticClass:"pa-0"},[n("v-card-title",{staticClass:"pa-0 mb-6"},[n("v-toolbar",{staticClass:"elevation-0"},[n("v-toolbar-title",[t._v("Settings")]),t._v(" "),n("v-spacer"),t._v(" "),n("v-btn",{attrs:{title:"Save Settings",icon:"",dense:"",loading:t.AppStore.state.showTopLoading,disabled:t.PrincipalsStore.state.settings.length<1},on:{click:function(e){return t.PrincipalsStore.saveSettings()}}},[n("v-icon",[t._v("mdi-content-save")])],1)],1)],1),t._v(" "),n("v-card-text",[t.PrincipalsStore.state.settings.length>0?n("v-row",t._l(t.PrincipalsStore.state.settings,(function(e,i){return n("v-col",{key:i,attrs:{cols:"12"}},["number"==e.type||"text"==e.type?n("v-text-field",{attrs:{label:e.description,outlined:"",hint:e.hint,type:e.type},model:{value:e.value,callback:function(n){t.$set(e,"value",n)},expression:"setting.value"}}):t._e(),t._v(" "),"toggle"==e.type?n("v-switch",{attrs:{inset:"",label:e.description,hint:e.hint},model:{value:t.PrincipalsStore.state.settings.find((function(t){return t.name==e.name})).value,callback:function(n){t.$set(t.PrincipalsStore.state.settings.find((function(t){return t.name==e.name})),"value",n)},expression:"PrincipalsStore.state.settings.find(e => e.name==setting.name).value"}}):t._e()],1)})),1):t._e()],1)],1)}),[],!1,null,null,null);e.default=a.exports}}]);