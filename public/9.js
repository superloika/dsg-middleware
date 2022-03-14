(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/GeneratedTable.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/GeneratedTable.vue?vue&type=script&lang=js& ***!
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
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'GeneratedTable',
  props: ['items'],
  data: function data() {
    return {};
  },
  computed: {
    tableHeader: function tableHeader() {
      return this[this.PrincipalsStore.state.selectedPrincipalCode].state.generatedDataTableHeader;
    }
  },
  mounted: function mounted() {
    console.log("GeneratedTable component mounted");
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/GeneratedTable.vue?vue&type=template&id=c9cf427c&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/GeneratedTable.vue?vue&type=template&id=c9cf427c& ***!
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
  return _c("v-data-table", {
    attrs: {
      dense: "",
      items: _vm.items,
      headers: _vm.tableHeader,
      "items-per-page": 10
    },
    scopedSlots: _vm._u(
      [
        {
          key: "item.customer_code",
          fn: function(ref) {
            var item = ref.item
            return [
              item.customer_notfound == 1
                ? _c(
                    "v-chip",
                    {
                      attrs: {
                        color: "warning",
                        small: "",
                        link: "",
                        outlined: "",
                        title: "Unknown Customer Code"
                      },
                      on: {
                        click: function($event) {
                          return _vm.AppStore.copyToClip(item.customer_code)
                        }
                      }
                    },
                    [
                      _c("div", { attrs: { id: item.customer_code } }, [
                        _vm._v(
                          "\n                " +
                            _vm._s(item.customer_code) +
                            "\n            "
                        )
                      ])
                    ]
                  )
                : _c("span", [_vm._v(_vm._s(item.customer_code))])
            ]
          }
        },
        {
          key: "item.product_code",
          fn: function(ref) {
            var item = ref.item
            return [
              item.product_notfound == 1
                ? _c(
                    "v-chip",
                    {
                      attrs: {
                        color: "error",
                        small: "",
                        link: "",
                        outlined: "",
                        title: "Unknown Product Code"
                      },
                      on: {
                        click: function($event) {
                          return _vm.AppStore.copyToClip(item.product_code)
                        }
                      }
                    },
                    [
                      _c("div", { attrs: { id: item.product_code } }, [
                        _vm._v(
                          "\n                " +
                            _vm._s(item.product_code) +
                            "\n            "
                        )
                      ])
                    ]
                  )
                : _c("span", [_vm._v(_vm._s(item.product_code))])
            ]
          }
        }
      ],
      null,
      true
    )
  })
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/pages/Principals/common/GeneratedTable.vue":
/*!*****************************************************************!*\
  !*** ./resources/js/pages/Principals/common/GeneratedTable.vue ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GeneratedTable_vue_vue_type_template_id_c9cf427c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GeneratedTable.vue?vue&type=template&id=c9cf427c& */ "./resources/js/pages/Principals/common/GeneratedTable.vue?vue&type=template&id=c9cf427c&");
/* harmony import */ var _GeneratedTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GeneratedTable.vue?vue&type=script&lang=js& */ "./resources/js/pages/Principals/common/GeneratedTable.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _GeneratedTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _GeneratedTable_vue_vue_type_template_id_c9cf427c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _GeneratedTable_vue_vue_type_template_id_c9cf427c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Principals/common/GeneratedTable.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Principals/common/GeneratedTable.vue?vue&type=script&lang=js&":
/*!******************************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/GeneratedTable.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GeneratedTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./GeneratedTable.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/GeneratedTable.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GeneratedTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Principals/common/GeneratedTable.vue?vue&type=template&id=c9cf427c&":
/*!************************************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/GeneratedTable.vue?vue&type=template&id=c9cf427c& ***!
  \************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GeneratedTable_vue_vue_type_template_id_c9cf427c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./GeneratedTable.vue?vue&type=template&id=c9cf427c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/GeneratedTable.vue?vue&type=template&id=c9cf427c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GeneratedTable_vue_vue_type_template_id_c9cf427c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GeneratedTable_vue_vue_type_template_id_c9cf427c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=9.js.map