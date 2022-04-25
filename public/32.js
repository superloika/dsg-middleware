(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[32],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/TestPage/TestUpload.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/TestPage/TestUpload.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'TestUpload',
  data: function data() {
    return {
      file: [],
      uploadResponse: {
        success: '',
        message: '',
        testData: []
      }
    };
  },
  methods: {
    formSubmit: function formSubmit() {
      var _this = this;

      var vm = this;

      if (!this.$refs.frm_upload.validate()) {
        alert('error occued');
        return;
      }

      if (this.file === null || this.file.length === 0 || this.file === undefined) {
        this.AppStore.toast('Please select file to upload', 1500);
        return;
      }

      this.AppStore.overlay(true);
      var config = {
        headers: {
          'content-type': 'multipart/form-data'
        },
        onUploadProgress: function onUploadProgress(progressEvent) {
          var progressPercentage = progressEvent.loaded / vm.file.size * 100;
          _this.AppStore.state.overlay.msg = 'Uploading... ' + progressPercentage.toFixed(0) + '%';
        }
      };
      var formData = new FormData();
      formData.append('file', this.file);
      axios.post('/test/testFileUpload', formData, config).then(function (response) {
        vm.uploadResponse.success = response.data.success;
        vm.uploadResponse.message = response.data.message;
        vm.uploadResponse.testData = response.data.test_data;

        _this.AppStore.overlay(false);

        _this.AppStore.toast(vm.uploadResponse.message);

        _this.file = [];
        console.log(vm.uploadResponse.testData);
      })["catch"](function (error) {
        vm.uploadResponse.success = false;
        vm.uploadResponse.message = error;

        _this.AppStore.overlay(false);

        _this.AppStore.toast(error);

        console.log(vm.uploadResponse);
      });
    }
  },
  watch: {// file() {
    //     console.log('File:', this.file);
    // }
  },
  mounted: function mounted() {
    console.log('TestUpload mounted.');
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/TestPage/TestUpload.vue?vue&type=template&id=15627930&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/TestPage/TestUpload.vue?vue&type=template&id=15627930& ***!
  \*****************************************************************************************************************************************************************************************************************/
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
    { attrs: { outlined: "" } },
    [
      _c("v-card-title", [_vm._v("Test 1")]),
      _vm._v(" "),
      _c(
        "v-card-text",
        [
          _c(
            "v-row",
            [
              _c(
                "v-col",
                { attrs: { cols: "", lg: "10", md: "8", sm: "12" } },
                [
                  _c(
                    "v-form",
                    { ref: "frm_upload" },
                    [
                      _c("v-file-input", {
                        attrs: {
                          "small-chips": "",
                          counter: "",
                          "show-size": "",
                          "truncate-length": "50",
                          rounded: "",
                          outlined: "",
                          dense: "",
                          required: ""
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
                { attrs: { cols: "", lg: "2", md: "4", sm: "12" } },
                [
                  _c(
                    "v-btn",
                    {
                      attrs: { dense: "", color: "primary", block: "" },
                      on: {
                        click: function($event) {
                          return _vm.formSubmit()
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

/***/ "./resources/js/pages/TestPage/TestUpload.vue":
/*!****************************************************!*\
  !*** ./resources/js/pages/TestPage/TestUpload.vue ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TestUpload_vue_vue_type_template_id_15627930___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TestUpload.vue?vue&type=template&id=15627930& */ "./resources/js/pages/TestPage/TestUpload.vue?vue&type=template&id=15627930&");
/* harmony import */ var _TestUpload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TestUpload.vue?vue&type=script&lang=js& */ "./resources/js/pages/TestPage/TestUpload.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _TestUpload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TestUpload_vue_vue_type_template_id_15627930___WEBPACK_IMPORTED_MODULE_0__["render"],
  _TestUpload_vue_vue_type_template_id_15627930___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/TestPage/TestUpload.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/TestPage/TestUpload.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** ./resources/js/pages/TestPage/TestUpload.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TestUpload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./TestUpload.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/TestPage/TestUpload.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_TestUpload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/TestPage/TestUpload.vue?vue&type=template&id=15627930&":
/*!***********************************************************************************!*\
  !*** ./resources/js/pages/TestPage/TestUpload.vue?vue&type=template&id=15627930& ***!
  \***********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TestUpload_vue_vue_type_template_id_15627930___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./TestUpload.vue?vue&type=template&id=15627930& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/TestPage/TestUpload.vue?vue&type=template&id=15627930&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TestUpload_vue_vue_type_template_id_15627930___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TestUpload_vue_vue_type_template_id_15627930___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=32.js.map