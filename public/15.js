(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{"0EzI":function(e,o,t){"use strict";t.r(o);var s={name:"InvoicesUpload",props:["searchKey","principalCodeFilter"],components:{InvoiceUploadSummary:function(){return t.e(14).then(t.bind(null,"m/XK"))}},data:function(){return{file:null,selected_group:"",uploadResponse:{}}},computed:{isNoPreviousSummary:function(){return 0===Object.keys(this.uploadResponse).length},keywordsColor:function(){return"accent"}},methods:{upload:function(){var e=this,o=this;this.AppStore.overlay(!0);for(var t={headers:{"content-type":"multipart/form-data"},onUploadProgress:function(t){var s=t.loaded/o.file.size*100,a="Uploading...";s<100?a="Uploading... "+s.toFixed(0)+"%":100==s?a="File uploaded":s>100&&(a="Saving..."),e.AppStore.state.overlay.msg=a}},s=new FormData,a=0;a<this.file.length;a++)s.append("files["+a+"]",this.file[a]);s.append("terminal",this.selected_group);var n=this.AppStore.state.siteUrl+"invoices/upload";axios.post(n,s,t).then((function(o){o.data.success;var t=o.data.message;e.AppStore.overlay(!1),e.AppStore.toast(t),e.file=null,e.selected_group="",e.InvoicesStore.initInvoices(e.searchKey,e.principalCodeFilter),e.uploadResponse=o.data,o.data.success&&(e.InvoicesStore.state.isUploadSummaryShown=!0)})).catch((function(o){e.AppStore.overlay(!1),e.AppStore.toast(o)}))},showPreviousSummary:function(){this.InvoicesStore.state.isUploadSummaryShown=!0}},mounted:function(){console.log("InvoicesUpload mounted.")}},a=t("KHd+"),n=Object(a.a)(s,(function(){var e=this,o=e.$createElement,t=e._self._c||o;return t("v-card",{staticClass:"elevation-0 transparent pa-0"},[t("v-card-text",{},[t("v-row",{staticClass:"py-0"},[t("v-col",{staticClass:"pb-0",attrs:{cols:"",lg:"9",md:"9",sm:"12"}},[t("v-form",{ref:"frm_upload"},[t("v-file-input",{attrs:{"small-chips":"","show-sizex":"",rounded:"",outlined:"",dense:"",required:"",placeholder:"Select text files to upload (invoices)",accept:".txt",multiple:"",color:"primary","background-color":"white"},model:{value:e.file,callback:function(o){e.file=o},expression:"file"}})],1)],1),e._v(" "),t("v-col",{staticClass:"pb-0",attrs:{cols:"",lg:"2",md:"2",sm:"11"}},[t("v-btn",{attrs:{dense:"",color:"primary",block:"",rounded:"",disabled:null==e.file||e.file.length<1||"XXX"==e.selected_group},on:{click:function(o){return e.upload()}}},[e._v("\n                    Upload\n                ")])],1),e._v(" "),t("v-col",{staticClass:"pb-0",attrs:{cols:"",lg:"1",md:"1",sm:"1"}},[t("v-btn",{attrs:{icon:"",title:"Previous upload summary",disabled:e.isNoPreviousSummary},on:{click:function(o){return o.stopPropagation(),e.showPreviousSummary()}}},[t("v-icon",[e._v("mdi-history")])],1)],1)],1),e._v(" "),t("div",{staticClass:"ma-0 pa-0"}),e._v(" "),t("v-row",{staticClass:"py-0"},[t("v-col",[t("small",[t("strong",[e._v("Important Note:")]),e._v("\n                    Filenames should include a group keyword\n                    in order for the system to identify which group the data came from.\n                    Keyword includes\n                        "),e._l(e.InvoicesStore.state.groups,(function(o,s){return t("v-chip",{key:s,staticClass:"px-2 mr-1",attrs:{"x-small":"",color:e.keywordsColor}},[e._v("\n                            "+e._s(o.group_code)+"\n                        ")])})),e._v(" "),t("br"),e._v('Example: "CWDG_PCS Sept 1-5.txt"\n                ')],2)])],1)],1),e._v(" "),t("v-dialog",{attrs:{"max-width":"550px"},model:{value:e.InvoicesStore.state.isUploadSummaryShown,callback:function(o){e.$set(e.InvoicesStore.state,"isUploadSummaryShown",o)},expression:"InvoicesStore.state.isUploadSummaryShown"}},[t("InvoiceUploadSummary",{attrs:{uploadResponse:e.uploadResponse}})],1)],1)}),[],!1,null,null,null);o.default=n.exports}}]);