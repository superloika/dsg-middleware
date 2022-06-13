(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[31],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Invoices/InvoicesUpload.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Invoices/InvoicesUpload.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
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
  name: 'InvoicesUpload',
  props: ['searchKey', 'principalCodeFilter'],
  data: function data() {
    return {
      file: null
    };
  },
  methods: {
    upload: function upload() {
      var _this = this;

      var vm = this;
      this.AppStore.overlay(true);
      var config = {
        headers: {
          'content-type': 'multipart/form-data'
        },
        onUploadProgress: function onUploadProgress(progressEvent) {
          var progressPercentage = progressEvent.loaded / vm.file.size * 100;
          var statusText = 'Uploading...';

          if (progressPercentage < 100) {
            statusText = 'Uploading... ' + progressPercentage.toFixed(0) + '%';
          } else if (progressPercentage == 100) {
            statusText = 'File uploaded';
          } else if (progressPercentage > 100) {
            statusText = 'Saving...';
          }

          _this.AppStore.state.overlay.msg = statusText;
        }
      };
      var formData = new FormData();

      for (var i = 0; i < this.file.length; i++) {
        formData.append('files[' + i + ']', this.file[i]);
      }

      var url = this.AppStore.state.siteUrl + 'invoices/upload';
      axios.post(url, formData, config).then(function (response) {
        var success = response.data.success;
        var message = response.data.message;

        _this.AppStore.overlay(false);

        _this.AppStore.toast(message);

        _this.file = null;

        _this.InvoicesStore.initInvoices(_this.searchKey, _this.principalCodeFilter);
      })["catch"](function (error) {
        _this.AppStore.overlay(false);

        _this.AppStore.toast(error);
      });
    }
  },
  mounted: function mounted() {
    console.log('InvoicesUpload mounted.');
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Invoices/InvoicesUpload.vue?vue&type=template&id=79987d77&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Invoices/InvoicesUpload.vue?vue&type=template&id=79987d77& ***!
  \*********************************************************************************************************************************************************************************************************************/
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
    { staticClass: "elevation-0 transparent pa-0", attrs: { outlinedx: "" } },
    [
      _c(
        "v-card-text",
        {},
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
                          placeholder: "Select text files to upload (invoices)",
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
                        disabled: _vm.file == null || _vm.file.length < 1
                      },
                      on: {
                        click: function($event) {
                          return _vm.upload()
                        }
                      }
                    },
                    [_vm._v("\n                    Submit\n                ")]
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

/***/ "./resources/js/pages/Invoices/InvoicesUpload.vue":
/*!********************************************************!*\
  !*** ./resources/js/pages/Invoices/InvoicesUpload.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _InvoicesUpload_vue_vue_type_template_id_79987d77___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./InvoicesUpload.vue?vue&type=template&id=79987d77& */ "./resources/js/pages/Invoices/InvoicesUpload.vue?vue&type=template&id=79987d77&");
/* harmony import */ var _InvoicesUpload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./InvoicesUpload.vue?vue&type=script&lang=js& */ "./resources/js/pages/Invoices/InvoicesUpload.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _InvoicesUpload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _InvoicesUpload_vue_vue_type_template_id_79987d77___WEBPACK_IMPORTED_MODULE_0__["render"],
  _InvoicesUpload_vue_vue_type_template_id_79987d77___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Invoices/InvoicesUpload.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Invoices/InvoicesUpload.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/pages/Invoices/InvoicesUpload.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InvoicesUpload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./InvoicesUpload.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Invoices/InvoicesUpload.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InvoicesUpload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Invoices/InvoicesUpload.vue?vue&type=template&id=79987d77&":
/*!***************************************************************************************!*\
  !*** ./resources/js/pages/Invoices/InvoicesUpload.vue?vue&type=template&id=79987d77& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_InvoicesUpload_vue_vue_type_template_id_79987d77___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./InvoicesUpload.vue?vue&type=template&id=79987d77& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Invoices/InvoicesUpload.vue?vue&type=template&id=79987d77&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_InvoicesUpload_vue_vue_type_template_id_79987d77___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_InvoicesUpload_vue_vue_type_template_id_79987d77___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=31.js.map