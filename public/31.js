(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{RGTY:function(t,e,n){"use strict";n.r(e);var a=n("i680"),r=n("DaQG"),o=n.n(r),i=["customer_code","customer_name","doc_no","item_code","description","uom","quantity","u3"];function s(t,e){if(null==t)return{};var n,a,r=function(t,e){if(null==t)return{};var n,a,r={},o=Object.keys(t);for(a=0;a<o.length;a++)n=o[a],e.indexOf(n)>=0||(r[n]=t[n]);return r}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(a=0;a<o.length;a++)n=o[a],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(r[n]=t[n])}return r}var c={data:function(){return{grandTotal:0,searchKey:"",datePickerShown:!1,date:[new Date(Date.now()-6e4*(new Date).getTimezoneOffset()).toISOString().substr(0,10)]}},computed:{selectedPrincipalCode:function(){return this.PrincipalsStore.state.selectedPrincipalCode},tblHeader:function(){return this[this.selectedPrincipalCode].state.transactionsTableHeader[0]},totalAmount:function(){var t=0;return this.PrincipalsStore.state.transactions.length>0&&this.PrincipalsStore.state.transactions.forEach((function(e){t+=parseFloat(e.u3)})),t},dateRangeText:function(){return this.date.join(" ~ ")}},methods:{exportToExcel:function(){this.PrincipalsStore.toExcel_simple(this.date.toString(),this.PrincipalsStore.state.transactions,"transactionsTableHeader",[7,8],"".concat(this.selectedPrincipalCode,"_Transactions"))},loadInvoicesOrTransactions:function(){this.PrincipalsStore.initTransactions(this.selectedPrincipalCode,this.date),this.PrincipalsStore.initInvoicesGrandTotal()},exportToPDF:function(){var t=this.AppStore.formatAsCurrency(this.totalAmount),e="".concat(this.selectedPrincipalCode,"_Transactions"),n=new a.default({orientation:"landscape"});n.setFontSize(18),n.text("Transactions",14,22),n.setFontSize(11),n.setTextColor(100);var r=n.internal.pageSize,c=r.width?r.width:r.getWidth(),l=n.splitTextToSize(this.dateRangeText,c-35,{});n.text(l,14,30),n.setFontSize(8);var d={head:[["Customer Code","Account Name","Sales Invoice","Item Code","Description","UOM","Quantity","Amount"]],body:this.PrincipalsStore.state.transactions.map((function(t){var e=t.customer_code,n=t.customer_name,a=t.doc_no,r=t.item_code,o=t.description,c=t.uom,l=t.quantity,d=t.u3;s(t,i);return[e,n,a,r,o,c,l,{content:d,styles:{halign:"right"}}]})),footer:[["Total",""]],theme:"grid",startY:40,showHead:"firstPage",headStyles:{fillColor:"#1ea4f7"},didDrawPage:function(t){var e="Page "+n.internal.getNumberOfPages();"function"==typeof n.putTotalPages&&(e+=" of {total_pages_count_string}"),n.setFontSize(10);var a=n.internal.pageSize,r=a.height?a.height:a.getHeight();n.text(e,t.settings.margin.left,r-10)}},u=[{content:"Total",colSpan:7,styles:{fontStyle:"bold",fontSize:12}},{content:t,styles:{halign:"right",fontStyle:"bold",fontSize:12}}];d.body.push(u),o()(n,d),"function"==typeof n.putTotalPages&&n.putTotalPages("{total_pages_count_string}"),n.save("".concat(e,".pdf"))}},created:function(){this.loadInvoicesOrTransactions()},mounted:function(){}},l=n("KHd+"),d=Object(l.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-sheet",[n("v-app-bar",{staticClass:"elevation-0",attrs:{densex:""}},[n("v-toolbar-title",[n("div",[t._v("\n                Transactions\n            ")]),t._v(" "),n("div",[n("v-chip",{attrs:{color:"primary",label:"","x-small":""}},[n("h4",[n("em",[t._v("Total Amount: ")]),t._v("\n                        "+t._s(t.AppStore.formatAsCurrency(t.totalAmount))+"\n                    ")])]),t._v(" "),n("v-chip",{attrs:{color:"primary",label:"","x-small":""}},[n("h4",[n("em",[t._v("Grand Total: ")]),t._v("\n                        "+t._s(t.AppStore.formatAsCurrency(t.PrincipalsStore.state.invoicesGrandTotal))+"\n                    ")])])],1)]),t._v(" "),n("v-spacer"),t._v(" "),n("v-btn",{staticClass:"mr-2",attrs:{title:"Refresh",icon:"",dense:"",rounded:"",depressed:""},on:{click:function(e){return t.loadInvoicesOrTransactions()}}},[n("v-icon",[t._v("mdi-refresh")])],1),t._v(" "),n("v-text-field",{staticClass:"mr-3",staticStyle:{"max-width":"230px"},attrs:{label:"Date Uploaded - YYYY-MM-DD","hide-details":"",readonly:"",dense:"",outlined:"",rounded:""},on:{click:function(e){e.stopPropagation(),t.datePickerShown=!0}},model:{value:t.dateRangeText,callback:function(e){t.dateRangeText=e},expression:"dateRangeText"}}),t._v(" "),n("v-dialog",{ref:"datePicker",attrs:{"return-value":t.date,width:"290px"},on:{"update:returnValue":function(e){t.date=e},"update:return-value":function(e){t.date=e}},model:{value:t.datePickerShown,callback:function(e){t.datePickerShown=e},expression:"datePickerShown"}},[n("v-date-picker",{attrs:{scrollable:"",range:""},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}},[n("v-spacer"),t._v(" "),n("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(e){t.datePickerShown=!1}}},[t._v("\n                    Cancel\n                ")]),t._v(" "),n("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(e){t.$refs.datePicker.save(t.date),t.loadInvoicesOrTransactions()}}},[t._v("\n                    Generate\n                ")])],1)],1),t._v(" "),n("v-text-field",{staticStyle:{"max-width":"230px"},attrs:{label:"Search",clearable:"","hide-details":"",dense:"",flat:"",rounded:"","solo-inverted":""},model:{value:t.searchKey,callback:function(e){t.searchKey=e},expression:"searchKey"}}),t._v(" "),n("v-btn",{attrs:{color:"success",icon:"",title:"Export to Excel",disabled:null!=t.searchKey&&""!=t.searchKey||t.PrincipalsStore.state.transactions.length<1},on:{click:function(e){return t.exportToExcel()}}},[n("v-icon",[t._v("mdi-file-excel")])],1),t._v(" "),n("v-btn",{attrs:{icon:"",title:"Export to PDF",disabled:null!=t.searchKey&&""!=t.searchKey||t.PrincipalsStore.state.transactions.length<1},on:{click:function(e){return t.exportToPDF()}}},[n("v-icon",[t._v("mdi-export")])],1)],1),t._v(" "),n("v-sheet",[n("v-data-table",{attrs:{items:t.PrincipalsStore.state.transactions,headers:t.tblHeader,dense:"",search:t.searchKey,classz:"elevation-1",id:"transactions",loading:t.PrincipalsStore.state.isInitTransactions,"disable-sort":""},scopedSlots:t._u([{key:"item.updated_at",fn:function(e){var a=e.item;return[n("span",[t._v("\n                    "+t._s(a.updated_at.substring(0,10))+"\n                ")])]}},{key:"item.u3",fn:function(e){var a=e.item;return[n("span",{attrs:{"background-color":"primary"}},[t._v("\n                    "+t._s(t.AppStore.formatAsCurrency(parseFloat(a.u3)))+"\n                ")])]}},{key:"item.customer_name",fn:function(e){var a=e.item;return[n("span",{staticClass:"text-caption"},[t._v("\n                    "+t._s(a.customer_name)+"\n                ")])]}},{key:"item.description",fn:function(e){var a=e.item;return[n("span",{staticClass:"text-caption"},[t._v("\n                    "+t._s(a.description)+"\n                ")])]}}],null,!0)})],1)],1)}),[],!1,null,null,null);e.default=d.exports}}]);