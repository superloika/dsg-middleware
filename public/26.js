(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{101:function(e,t,s){"use strict";s.r(t);var o={name:"TestUpload",data:function(){return{file:[],uploadResponse:{success:"",message:"",testData:[]}}},methods:{formSubmit:function(){var e=this,t=this;if(this.$refs.frm_upload.validate())if(null!==this.file&&0!==this.file.length&&void 0!==this.file){this.AppStore.overlay(!0);var s={headers:{"content-type":"multipart/form-data"},onUploadProgress:function(s){var o=s.loaded/t.file.size*100;e.AppStore.state.overlay.msg="Uploading... "+o.toFixed(0)+"%"}},o=new FormData;o.append("file",this.file),axios.post("/test/testFileUpload",o,s).then((function(s){t.uploadResponse.success=s.data.success,t.uploadResponse.message=s.data.message,t.uploadResponse.testData=s.data.test_data,e.AppStore.overlay(!1),e.AppStore.toast(t.uploadResponse.message),e.file=[],console.log(t.uploadResponse.testData)})).catch((function(s){t.uploadResponse.success=!1,t.uploadResponse.message=s,e.AppStore.overlay(!1),e.AppStore.toast(s),console.log(t.uploadResponse)}))}else this.AppStore.toast("Please select file to upload",1500);else alert("error occued")}},watch:{},mounted:function(){console.log("TestUpload mounted.")}},a=s(0),l=Object(a.a)(o,(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("v-card",{attrs:{outlined:""}},[s("v-card-title",[e._v("Test 1")]),e._v(" "),s("v-card-text",[s("v-row",[s("v-col",{attrs:{cols:"",lg:"10",md:"8",sm:"12"}},[s("v-form",{ref:"frm_upload"},[s("v-file-input",{attrs:{"small-chips":"",counter:"","show-size":"","truncate-length":"50",rounded:"",outlined:"",dense:"",required:""},model:{value:e.file,callback:function(t){e.file=t},expression:"file"}})],1)],1),e._v(" "),s("v-col",{attrs:{cols:"",lg:"2",md:"4",sm:"12"}},[s("v-btn",{attrs:{dense:"",color:"primary",block:""},on:{click:function(t){return e.formSubmit()}}},[e._v("\n                    Submit\n                ")])],1)],1)],1)],1)}),[],!1,null,null,null);t.default=l.exports}}]);