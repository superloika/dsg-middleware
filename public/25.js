(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[25],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/MasterFiles.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/MasterFiles.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['customers', 'items', 'salesmen'],
  components: {
    Items: function Items() {
      return __webpack_require__.e(/*! import() */ 24).then(__webpack_require__.bind(null, /*! ./Items.vue */ "./resources/js/pages/Principals/common/Items.vue"));
    },
    Customers: function Customers() {
      return __webpack_require__.e(/*! import() */ 20).then(__webpack_require__.bind(null, /*! ./Customers.vue */ "./resources/js/pages/Principals/common/Customers.vue"));
    },
    Salesmen: function Salesmen() {
      return __webpack_require__.e(/*! import() */ 26).then(__webpack_require__.bind(null, /*! ./Salesmen.vue */ "./resources/js/pages/Principals/common/Salesmen.vue"));
    }
  },
  data: function data() {
    return {
      masterfiles_tab: null
    };
  },
  mounted: function mounted() {
    console.log('MasterFiles component mounted');
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/MasterFiles.vue?vue&type=template&id=e578d5fc&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/MasterFiles.vue?vue&type=template&id=e578d5fc& ***!
  \***************************************************************************************************************************************************************************************************************************/
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
    [
      _c(
        "v-tabs",
        {
          attrs: { height: "35" },
          model: {
            value: _vm.masterfiles_tab,
            callback: function($$v) {
              _vm.masterfiles_tab = $$v
            },
            expression: "masterfiles_tab"
          }
        },
        [
          _c(
            "v-tab",
            { staticClass: "px-6", attrs: { exact: "" } },
            [
              _c("v-icon", { staticClass: "mr-1" }, [_vm._v("mdi-cube")]),
              _vm._v("\n            Items\n        ")
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-tab",
            { staticClass: "px-6", attrs: { exact: "" } },
            [
              _c("v-icon", { staticClass: "mr-1" }, [
                _vm._v("mdi-account-multiple")
              ]),
              _vm._v("\n            Customers\n        ")
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-tab",
            { staticClass: "px-6", attrs: { exact: "" } },
            [
              _c("v-icon", { staticClass: "mr-1" }, [_vm._v("mdi-account")]),
              _vm._v("\n            Salesmen\n        ")
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-tabs-items",
        {
          model: {
            value: _vm.masterfiles_tab,
            callback: function($$v) {
              _vm.masterfiles_tab = $$v
            },
            expression: "masterfiles_tab"
          }
        },
        [
          _c("v-tab-item", [_c("Items")], 1),
          _vm._v(" "),
          _c("v-tab-item", [_c("Customers")], 1),
          _vm._v(" "),
          _c("v-tab-item", [_c("Salesmen")], 1)
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

/***/ "./resources/js/pages/Principals/common/MasterFiles.vue":
/*!**************************************************************!*\
  !*** ./resources/js/pages/Principals/common/MasterFiles.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MasterFiles_vue_vue_type_template_id_e578d5fc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MasterFiles.vue?vue&type=template&id=e578d5fc& */ "./resources/js/pages/Principals/common/MasterFiles.vue?vue&type=template&id=e578d5fc&");
/* harmony import */ var _MasterFiles_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MasterFiles.vue?vue&type=script&lang=js& */ "./resources/js/pages/Principals/common/MasterFiles.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _MasterFiles_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _MasterFiles_vue_vue_type_template_id_e578d5fc___WEBPACK_IMPORTED_MODULE_0__["render"],
  _MasterFiles_vue_vue_type_template_id_e578d5fc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Principals/common/MasterFiles.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Principals/common/MasterFiles.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/MasterFiles.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MasterFiles_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./MasterFiles.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/MasterFiles.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MasterFiles_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Principals/common/MasterFiles.vue?vue&type=template&id=e578d5fc&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/MasterFiles.vue?vue&type=template&id=e578d5fc& ***!
  \*********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MasterFiles_vue_vue_type_template_id_e578d5fc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./MasterFiles.vue?vue&type=template&id=e578d5fc& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/MasterFiles.vue?vue&type=template&id=e578d5fc&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MasterFiles_vue_vue_type_template_id_e578d5fc___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MasterFiles_vue_vue_type_template_id_e578d5fc___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=25.js.map