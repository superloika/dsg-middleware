(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/MasterfileUpload.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/MasterfileUpload.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************/
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
  name: 'MasterfileUpload',
  props: ['id', 'master_type'],
  data: function data() {
    return {
      file: null,
      uploadResponse: {
        success: '',
        message: '' // testData: []

      }
    };
  },
  computed: {
    selectedPrincipalCode: function selectedPrincipalCode() {
      return this.PrincipalsStore.state.selectedPrincipalCode;
    }
  },
  methods: {
    formSubmit: function formSubmit() {
      var _this = this;

      var vm = this;

      if (!this.$refs.frm_upload.validate()) {
        alert('An unexpected error occured!');
        return;
      }

      if (this.file === null || this.file.length === 0 || this.file === undefined) {
        this.AppStore.toast('Please select file to upload', 1000);
        return;
      }

      this.AppStore.overlay(true);
      var config = {
        headers: {
          'content-type': 'multipart/form-data'
        },
        onUploadProgress: function onUploadProgress(progressEvent) {
          var progressPercentage = progressEvent.loaded / vm.file.size * 100;
          var statusText = '';

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
      formData.append('file', this.file);
      var url = this.AppStore.state.siteUrl + 'principals/' + this.selectedPrincipalCode + '/' + this.id + '/upload';
      axios.post(url, formData, config).then(function (response) {
        vm.uploadResponse.success = response.data.success;
        vm.uploadResponse.message = response.data.message;

        _this.AppStore.overlay(false);

        _this.AppStore.toast(vm.uploadResponse.message);

        _this.file = null;

        if (_this.id == 'items') {
          _this.PrincipalsStore.initItems();
        } else if (_this.id == 'customers') {
          _this.PrincipalsStore.initCustomers();
        }

        _this.PrincipalsStore.state.isUploadMasterCustomersOpen = false;
        _this.PrincipalsStore.state.isUploadMasterItemsOpen = false;
      })["catch"](function (error) {
        vm.uploadResponse.success = false;
        vm.uploadResponse.message = error;

        _this.AppStore.overlay(false);

        _this.AppStore.toast(error);
      });
    }
  },
  mounted: function mounted() {
    console.log('MasterfileUpload mounted.');
    this.file = null;
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/MasterfileUpload.vue?vue&type=template&id=11712702&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/MasterfileUpload.vue?vue&type=template&id=11712702& ***!
  \********************************************************************************************************************************************************************************************************************************/
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
      _c(
        "v-card-title",
        { staticClass: "mb-6" },
        [
          _c("div", [
            _vm._v(
              "\n            Upload/Update Masterfile (" +
                _vm._s(_vm.id) +
                ")\n        "
            )
          ]),
          _vm._v(" "),
          _c("v-spacer"),
          _vm._v(" "),
          _c(
            "v-btn",
            {
              attrs: { icon: "", title: "Close" },
              on: {
                click: function($event) {
                  _vm.PrincipalsStore.state.isUploadMasterCustomersOpen = false
                  _vm.PrincipalsStore.state.isUploadMasterItemsOpen = false
                }
              }
            },
            [_c("v-icon", [_vm._v("mdi-close-box-outline")])],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-card-text",
        [
          _c(
            "v-row",
            [
              _c(
                "v-col",
                { attrs: { cols: "", lg: "8", md: "7", sm: "12" } },
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
                          required: "",
                          accept: "text/csv"
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
                { attrs: { cols: "", lg: "4", md: "5", sm: "12" } },
                [
                  _c(
                    "v-btn",
                    {
                      attrs: {
                        dense: "",
                        color: "primary",
                        block: "",
                        rounded: ""
                      },
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

/***/ "./resources/js/pages/Principals/common/MasterfileUpload.vue":
/*!*******************************************************************!*\
  !*** ./resources/js/pages/Principals/common/MasterfileUpload.vue ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MasterfileUpload_vue_vue_type_template_id_11712702___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MasterfileUpload.vue?vue&type=template&id=11712702& */ "./resources/js/pages/Principals/common/MasterfileUpload.vue?vue&type=template&id=11712702&");
/* harmony import */ var _MasterfileUpload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MasterfileUpload.vue?vue&type=script&lang=js& */ "./resources/js/pages/Principals/common/MasterfileUpload.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _MasterfileUpload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _MasterfileUpload_vue_vue_type_template_id_11712702___WEBPACK_IMPORTED_MODULE_0__["render"],
  _MasterfileUpload_vue_vue_type_template_id_11712702___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Principals/common/MasterfileUpload.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Principals/common/MasterfileUpload.vue?vue&type=script&lang=js&":
/*!********************************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/MasterfileUpload.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MasterfileUpload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./MasterfileUpload.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/MasterfileUpload.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MasterfileUpload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Principals/common/MasterfileUpload.vue?vue&type=template&id=11712702&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/MasterfileUpload.vue?vue&type=template&id=11712702& ***!
  \**************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MasterfileUpload_vue_vue_type_template_id_11712702___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./MasterfileUpload.vue?vue&type=template&id=11712702& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/MasterfileUpload.vue?vue&type=template&id=11712702&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MasterfileUpload_vue_vue_type_template_id_11712702___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MasterfileUpload_vue_vue_type_template_id_11712702___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=9.js.map