(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{"+dNR":function(t,e,n){"use strict";n.r(e);var i={props:["items","template_variation_index","tab_caption","allow_export"],computed:{tableHeader:function(){return this[this.PrincipalsStore.state.selectedPrincipalCode].state.generatedDataTableHeader[this.template_variation_index]}},methods:{exportToCsv:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"csv";this.PrincipalsStore.toExcel_simple("".concat(this.tab_caption),this.items,{storeName:this.PrincipalsStore.state.selectedPrincipalCode,propertyName:"generatedDataTableHeader"},null,"".concat(this.tab_caption),t,this.template_variation_index)},itemRowStyle:function(t){try{return"completed"==t.status?"completed-invoice":""}catch(t){return""}}},mounted:function(){console.log("GeneratedTable component mounted",this.PrincipalsStore.state.selectedPrincipalCode),console.log("TEMPLATE VARSSSSSSSSSSSSSSSSSSSSSSSS",this.template_variation_index),console.log("ITEEEEEEMMMMMSSSSSS",this.items)}},o=(n("oWiC"),n("KHd+")),a=Object(o.a)(i,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.allow_export?n("v-sheet",{staticClass:"px-3 pt-1 pb-2",attrs:{color:"grey lighten-5"}},[n("div",{staticClass:"d-flex justify-end"},[n("v-btn",{staticClass:"mr-2",attrs:{title:"Export table to TXT file (Tab Delimited)",color:"default","x-small":"",rounded:""},on:{click:function(e){return t.exportToCsv("txt")}}},[t._v("Export "+t._s(t.tab_caption)+" to TXT")]),t._v(" "),n("v-btn",{attrs:{title:"Export table to CSV file (Comma Delimited)",color:"default","x-small":"",rounded:""},on:{click:function(e){return t.exportToCsv()}}},[t._v("\n                Export "+t._s(t.tab_caption)+" to CSV\n            ")])],1)]):t._e(),t._v(" "),n("v-data-table",{attrs:{densex:"",items:t.items,headers:t.tableHeader,"items-per-page":10,search:t.PrincipalsStore.state.currentGeneratedDataSearchKey,"disable-sort":"","item-class":t.itemRowStyle},scopedSlots:t._u([{key:"item.customer_code",fn:function(e){var i=e.item;return[1==i.customer_notfound?n("v-tooltip",{attrs:{right:""},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on,a=e.attrs;return[n("v-chip",t._g(t._b({attrs:{color:"CUSTOMER_NOT_FOUND"==i.missing_customer_name?"error":"warning",small:"",outlined:"",title:"Unmapped"}},"v-chip",a,!1),o),[n("div",{attrs:{id:i.customer_code}},[t._v("\n                            "+t._s(i.customer_code)+"\n                        ")])])]}}],null,!0)},[t._v(" "),n("span",[t._v(t._s(i.missing_customer_name))])]):n("span",[t._v(t._s(i.customer_code))])]}},{key:"item.item_code",fn:function(e){var i=e.item;return[1==i.item_notfound?n("v-tooltip",{attrs:{left:""},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on,a=e.attrs;return[n("v-chip",t._g(t._b({attrs:{color:"ITEM_NOT_FOUND"==i.missing_item_name?"error":"warning",small:"",outlined:"",title:"Unmapped"}},"v-chip",a,!1),o),[n("div",{attrs:{id:i.item_code}},[t._v("\n                            "+t._s(i.item_code)+"\n                        ")])])]}}],null,!0)},[t._v(" "),n("span",[t._v(t._s(i.missing_item_name))])]):n("span",[t._v(t._s(i.item_code))])]}},{key:"item.sales_agent_id",fn:function(e){var i=e.item;return[1==i.salesman_notfound?n("v-chip",{attrs:{color:"warning",small:"",outlined:"",title:"Unmapped"}},[n("div",{attrs:{id:i.sales_agent_id}},[t._v("\n                    "+t._s(i.sales_agent_id)+"\n                ")])]):n("span",{attrs:{title:i.alturas_sm_code}},[t._v(t._s(i.sales_agent_id))])]}},{key:"item.sm_code",fn:function(e){var i=e.item;return[1==i.salesman_notfound?n("v-chip",{attrs:{color:"warning",small:"",outlined:"",title:"Unmapped"}},[n("div",[t._v("\n                    "+t._s(i.sm_code)+"\n                ")])]):n("span",[t._v(t._s(i.sm_code))])]}}],null,!0)})],1)}),[],!1,null,null,null);e.default=a.exports},"5McA":function(t,e,n){var i=n("WDR8");"string"==typeof i&&(i=[[t.i,i,""]]);var o={hmr:!0,transform:void 0,insertInto:void 0};n("aET+")(i,o);i.locals&&(t.exports=i.locals)},WDR8:function(t,e,n){(t.exports=n("I1BE")(!1)).push([t.i,".completed-invoice{color:#009e15}",""])},oWiC:function(t,e,n){"use strict";n("5McA")}}]);