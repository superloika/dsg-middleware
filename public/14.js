(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{"m/XK":function(e,n,a){"use strict";a.r(n);var t={props:["uploadResponse"],mounted:function(){console.log("InvoiceUploadSummary component mounted")}},s=a("KHd+"),l=Object(s.a)(t,(function(){var e=this,n=e.$createElement,a=e._self._c||n;return a("v-card",[a("v-card-title",{staticClass:"pb-6"},[a("div",{staticClass:"mr-2"},[e._v("\n            Upload Summary\n        ")]),e._v(" "),a("div",[a("v-chip",{attrs:{color:"default",small:"",title:"Batch Number"}},[e._v("\n                "+e._s(e.uploadResponse.batch_number)+"\n            ")])],1)]),e._v(" "),a("v-card-text",[a("v-expansion-panels",{attrs:{focusable:""}},e._l(e.uploadResponse.summary,(function(n,t){return a("v-expansion-panel",{key:t},[a("v-expansion-panel-header",{attrs:{"disable-icon-rotate":""},scopedSlots:e._u([{key:"actions",fn:function(){return[0==n.lines_count||0==n.headers_count?a("v-icon",{attrs:{color:"error"}},[e._v("\n                            mdi-alert-circle\n                        ")]):n.lines_count>0&&0==n.lines_count_uploaded?a("v-icon",{attrs:{color:"warning"}},[e._v("\n                            mdi-alert-circle\n                        ")]):n.lines_count_uploaded>0&&n.lines_count_existing>0?a("v-icon",{attrs:{color:"warning"}},[e._v("\n                            mdi-check\n                        ")]):n.lines_count==n.lines_count_uploaded?a("v-icon",{attrs:{color:"success"}},[e._v("\n                            mdi-check\n                        ")]):e._e()]},proxy:!0}],null,!0)},[e._v("\n                    "+e._s(n.file_name)+"\n                    ")]),e._v(" "),a("v-expansion-panel-content",[a("div",{staticClass:"pt-3"},[a("v-chip",{staticClass:"px-2 ma-1",attrs:{small:"",title:"Total number of lines being read as valid invoice data",color:n.lines_count<1?"error":"default"}},[e._v("\n                            Lines Read:\n                            "+e._s(n.lines_count)+"\n                        ")]),e._v(" "),a("v-chip",{staticClass:"px-2 ma-1",attrs:{small:"",title:"Total number of lines already exist in the database"}},[e._v("\n                            Lines Existing:\n                            "+e._s(n.lines_count_existing)+"\n                        ")]),e._v(" "),a("v-chip",{staticClass:"px-2 ma-1",attrs:{color:"default",small:"",title:"Total number of lines uploaded"}},[e._v("\n                            Lines Uploaded:\n                            "+e._s(n.lines_count_uploaded)+"\n                        ")]),e._v(" "),a("br"),e._v(" "),a("v-chip",{staticClass:"px-2 ma-1",attrs:{small:"",title:"Total number of headers being read as valid invoice data header",color:n.headers_count<1?"error":"default"}},[e._v("\n                            Headers Read:\n                            "+e._s(n.headers_count)+"\n                        ")]),e._v(" "),a("v-chip",{staticClass:"px-2 ma-1",attrs:{color:"default",small:"",title:"Total number of headers already exist in the database"}},[e._v("\n                            Headers Existing:\n                            "+e._s(n.headers_count_existing)+"\n                        ")]),e._v(" "),a("v-chip",{staticClass:"px-2 ma-1",attrs:{color:"default",small:"",title:"Total number of headers uploaded"}},[e._v("\n                            Headers Uploaded:\n                            "+e._s(n.headers_count_uploaded)+"\n                        ")])],1)])],1)})),1)],1)],1)}),[],!1,null,null,null);n.default=l.exports}}]);