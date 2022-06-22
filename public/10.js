(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/page_common/master/MasterUpload.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/page_common/master/MasterUpload.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'MasterUpload',
  props: ['id'],
  data: function data() {
    return {
      file: null,
      uploadResponse: {
        success: '',
        message: '' // testData: []

      }
    };
  },
  methods: {
    formSubmit: function formSubmit() {
      var _this = this;

      var vm = this;

      if (!this.$refs.frm_upload.validate()) {
        console.log('formSubmit(): An unexpected error occured');
        return;
      } // if(this.file===null || this.file.length===0 || this.file===undefined) {
      //     this.AppStore.toast('Please select a file to upload', 1500);
      //     return;
      // }
      // if(this.$refs.file===null || this.$refs.file.length===0 || this.$refs.file===undefined) {
      //     this.AppStore.toast('Please select a file to upload', 1500);
      //     return;
      // }


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

      var url = this.AppStore.state.siteUrl + 'master/' + this.id + '/upload';
      axios.post(url, formData, config).then(function (response) {
        vm.uploadResponse.success = response.data.success;
        vm.uploadResponse.message = response.data.message;

        _this.AppStore.overlay(false);

        _this.AppStore.toast(vm.uploadResponse.message);

        _this.file = null;

        _this.MasterPrincipals.initPrincipals();

        _this.MasterCustomers.initCustomers();

        _this.MasterItems.initItems();

        _this.AppStore.state.dlgImportMaster = false;
      })["catch"](function (error) {
        vm.uploadResponse.success = false;
        vm.uploadResponse.message = error;

        _this.AppStore.overlay(false);

        _this.AppStore.toast(error);

        console.log(vm.uploadResponse);
      });
    }
  },
  mounted: function mounted() {
    console.log('MasterUpload mounted:', this.id);
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/page_common/master/MasterUpload.vue?vue&type=template&id=6f605d2e&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/page_common/master/MasterUpload.vue?vue&type=template&id=6f605d2e& ***!
  \***********************************************************************************************************************************************************************************************************************/
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
        { staticClass: "mb-4" },
        [
          _c("div", [_vm._v("\n            Upload Masterfile\n        ")]),
          _vm._v(" "),
          _c("v-spacer"),
          _vm._v(" "),
          _c(
            "v-btn",
            {
              attrs: { icon: "", title: "Close" },
              on: {
                click: function($event) {
                  _vm.AppStore.state.dlgImportMaster = false
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
                { attrs: { cols: "", lg: "9", md: "8", sm: "12" } },
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
                          "truncate-length": "30",
                          rounded: "",
                          outlined: "",
                          dense: "",
                          required: "",
                          accept: ".csv, .txt",
                          multiple: "",
                          label: "Select a file to upload"
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
                { attrs: { cols: "", lg: "3", md: "4", sm: "12" } },
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

/***/ "./resources/js/page_common/master/MasterUpload.vue":
/*!**********************************************************!*\
  !*** ./resources/js/page_common/master/MasterUpload.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MasterUpload_vue_vue_type_template_id_6f605d2e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MasterUpload.vue?vue&type=template&id=6f605d2e& */ "./resources/js/page_common/master/MasterUpload.vue?vue&type=template&id=6f605d2e&");
/* harmony import */ var _MasterUpload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MasterUpload.vue?vue&type=script&lang=js& */ "./resources/js/page_common/master/MasterUpload.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _MasterUpload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _MasterUpload_vue_vue_type_template_id_6f605d2e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _MasterUpload_vue_vue_type_template_id_6f605d2e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/page_common/master/MasterUpload.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/page_common/master/MasterUpload.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/js/page_common/master/MasterUpload.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MasterUpload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./MasterUpload.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/page_common/master/MasterUpload.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MasterUpload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/page_common/master/MasterUpload.vue?vue&type=template&id=6f605d2e&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/page_common/master/MasterUpload.vue?vue&type=template&id=6f605d2e& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MasterUpload_vue_vue_type_template_id_6f605d2e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./MasterUpload.vue?vue&type=template&id=6f605d2e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/page_common/master/MasterUpload.vue?vue&type=template&id=6f605d2e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MasterUpload_vue_vue_type_template_id_6f605d2e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MasterUpload_vue_vue_type_template_id_6f605d2e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=10.js.map