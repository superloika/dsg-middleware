(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/InvoicesImport.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/InvoicesImport.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'InvoicesImport',
  // props: ['master_type','principal_code'],
  data: function data() {
    return {
      file: null // uploadResponse: {
      //     success: '',
      //     message: '',
      //     output_template: [],
      //     line_count: 0,
      //     raw_invoices: [],
      // },

    };
  },
  methods: {
    formSubmit: function formSubmit() {
      var _this = this;

      var vm = this; // if(!this.$refs.frm_upload.validate()) {
      //     // alert('An unexpected error occured');
      //     console.log('formSubmit()', 'An unexpected error occured');
      //     return;
      // }
      // if(this.file===null || this.file.length===0 || this.file===undefined) {
      //     this.AppStore.toast('Please select file/s to import', 1000);
      //     return;
      // }

      this.AppStore.overlay(true);
      this.PrincipalsStore.state.isGeneratingData = true;
      this.AppStore.state.showTopLoading = true;
      var config = {
        headers: {
          'content-type': 'multipart/form-data'
        },
        onUploadProgress: function onUploadProgress(progressEvent) {
          var progressPercentage = progressEvent.loaded / vm.file.size * 100;
          var statusText = 'Importing...';

          if (progressPercentage < 100) {
            statusText = 'Uploading... ' + progressPercentage.toFixed(0) + '%';
          } else if (progressPercentage == 100) {
            statusText = 'File uploaded';
          } else if (progressPercentage > 100) {
            statusText = 'Generating data...';
          }

          _this.AppStore.state.overlay.msg = statusText;
        }
      };
      var formData = new FormData();

      for (var i = 0; i < this.file.length; i++) {
        formData.append('files[' + i + ']', this.file[i]);
      }

      var url = this.AppStore.state.siteUrl + 'principals/' + this.PrincipalsStore.state.selectedPrincipalCode + '/invoices/import';
      axios.post(url, formData, config).then(function (response) {
        var success = response.data.success;
        var message = response.data.message;
        var output_template = response.data.output_template;
        var line_count = response.data.line_count;
        var raw_invoices = response.data.raw_invoices;

        _this.AppStore.overlay(false);

        _this.PrincipalsStore.state.isGeneratingData = false;
        _this.AppStore.state.showTopLoading = false;

        _this.AppStore.toast(message); // this.file = null;


        _this.PrincipalsStore.state.currentGeneratedData = Object.entries(output_template);
        _this.PrincipalsStore.state.currentRawInvoices = raw_invoices; // this.PrincipalsStore.state.textfileLineCount = line_count;

        _this.PrincipalsStore.state.sheetImport = false;
        console.log('currentGeneratedData:', _this.PrincipalsStore.state.currentGeneratedData);
        console.log('currentRawInvoices:', _this.PrincipalsStore.state.currentRawInvoices);
      })["catch"](function (error) {
        _this.AppStore.overlay(false);

        _this.AppStore.toast(error);

        _this.PrincipalsStore.state.isGeneratingData = false;
        console.log('ImportResponse:', error);
      });
    },
    getPending: function getPending() {
      var _this2 = this;

      var url = this.AppStore.state.siteUrl + 'principals/' + this.PrincipalsStore.state.selectedPrincipalCode + '/invoices/import';
      axios.post(url, {
        files: null
      }).then(function (response) {
        var success = response.data.success;

        if (success) {
          var output_template = response.data.output_template;
          var raw_invoices = response.data.raw_invoices;

          _this2.AppStore.overlay(false);

          _this2.PrincipalsStore.state.isGeneratingData = false;
          _this2.AppStore.state.showTopLoading = false;
          _this2.PrincipalsStore.state.currentGeneratedData = Object.entries(output_template);
          _this2.PrincipalsStore.state.currentRawInvoices = raw_invoices;
          console.log('currentGeneratedData:', _this2.PrincipalsStore.state.currentGeneratedData);
          console.log('currentRawInvoices:', _this2.PrincipalsStore.state.currentRawInvoices);
        }
      })["catch"](function (error) {
        _this2.AppStore.overlay(false);

        _this2.AppStore.toast(error);

        _this2.PrincipalsStore.state.isGeneratingData = false;
        console.log('getPending():', error);
      });
    }
  },
  created: function created() {// this.getPending();
  },
  mounted: function mounted() {
    console.log('InvoicesImport mounted.'); // this.file = null;
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/InvoicesImport.vue?vue&type=template&id=a2e7d924&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/InvoicesImport.vue?vue&type=template&id=a2e7d924& ***!
  \******************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-card",
    { staticClass: "elevation-0 pa-0", attrs: { outlinedx: "" } },
    [
      _c(
        "v-card-text",
        { staticClass: "pa-0" },
        [
          _c(
            "v-row",
            {},
            [
              _c(
                "v-col",
                {
                  staticClass: "pb-0",
                  attrs: { cols: "", lg: "9", md: "7", sm: "8" }
                },
                [
                  _c(
                    "v-form",
                    { ref: "frm_upload" },
                    [
                      _c("v-file-input", {
                        attrs: {
                          "small-chips": "",
                          "show-sizex": "",
                          rounded: "",
                          outlined: "",
                          dense: "",
                          required: "",
                          placeholder: "Select file/s to import",
                          accept: ".txt",
                          multiple: "",
                          color: "primary"
                        },
                        model: {
                          value: _vm.file,
                          callback: function($$v) {
                            _vm.file = $$v
                          },
                          expression: "file"
                        }
                      })
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                {
                  staticClass: "pb-0",
                  attrs: { cols: "", lg: "3", md: "5", sm: "4" }
                },
                [
                  _c(
                    "v-btn",
                    {
                      attrs: {
                        dense: "",
                        color: "primary",
                        block: "",
                        rounded: "",
                        depressed: "",
                        loading: _vm.PrincipalsStore.state.isGeneratingData
                      },
                      on: {
                        click: function($event) {
                          return _vm.formSubmit()
                        }
                      }
                    },
                    [_vm._v("\n                    Generate\n                ")]
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/pages/Principals/common/InvoicesImport.vue":
/*!*****************************************************************!*\
  !*** ./resources/js/pages/Principals/common/InvoicesImport.vue ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _InvoicesImport_vue_vue_type_template_id_a2e7d924___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./InvoicesImport.vue?vue&type=template&id=a2e7d924& */ "./resources/js/pages/Principals/common/InvoicesImport.vue?vue&type=template&id=a2e7d924&");
/* harmony import */ var _InvoicesImport_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./InvoicesImport.vue?vue&type=script&lang=js& */ "./resources/js/pages/Principals/common/InvoicesImport.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _InvoicesImport_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _InvoicesImport_vue_vue_type_template_id_a2e7d924___WEBPACK_IMPORTED_MODULE_0__["render"],
  _InvoicesImport_vue_vue_type_template_id_a2e7d924___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Principals/common/InvoicesImport.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Principals/common/InvoicesImport.vue?vue&type=script&lang=js&":
/*!******************************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/InvoicesImport.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InvoicesImport_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./InvoicesImport.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/InvoicesImport.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InvoicesImport_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Principals/common/InvoicesImport.vue?vue&type=template&id=a2e7d924&":
/*!************************************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/InvoicesImport.vue?vue&type=template&id=a2e7d924& ***!
  \************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_InvoicesImport_vue_vue_type_template_id_a2e7d924___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./InvoicesImport.vue?vue&type=template&id=a2e7d924& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/InvoicesImport.vue?vue&type=template&id=a2e7d924&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_InvoicesImport_vue_vue_type_template_id_a2e7d924___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_InvoicesImport_vue_vue_type_template_id_a2e7d924___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=5.js.map