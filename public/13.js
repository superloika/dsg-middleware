(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[13],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/PendingsDataTable.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/PendingsDataTable.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'PendingsDataTable',
  props: ['items'],
  data: function data() {
    return {};
  },
  computed: {
    tblHeader: function tblHeader() {
      var header = this[this.PrincipalsStore.state.selectedPrincipalCode].state.uploadedInvoicesTableHeader;
      return header.filter(function (e) {
        return e.value != 'status' || e.value != 'upload_date';
      });
    }
  },
  methods: {},
  mounted: function mounted() {
    console.log('PendingsDataTable component mounted');
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/PendingsDataTable.vue?vue&type=template&id=fd53cb16&":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/PendingsDataTable.vue?vue&type=template&id=fd53cb16& ***!
  \*********************************************************************************************************************************************************************************************************************************/
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
      headers: _vm.tblHeader,
      items: _vm.items,
      dense: "",
      "hide-default-header": ""
    },
    scopedSlots: _vm._u(
      [
        {
          key: "item.customer_code",
          fn: function(ref) {
            var item = ref.item
            return [
              _c(
                "span",
                { class: item.customer_notfound == 1 ? "warning--text" : "" },
                [
                  _vm._v(
                    "\n            " + _vm._s(item.customer_code) + "\n        "
                  )
                ]
              )
            ]
          }
        },
        {
          key: "item.item_code",
          fn: function(ref) {
            var item = ref.item
            return [
              _c(
                "span",
                { class: item.product_notfound == 1 ? "error--text" : "" },
                [
                  _vm._v(
                    "\n            " + _vm._s(item.item_code) + "\n        "
                  )
                ]
              )
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

/***/ "./resources/js/pages/Principals/common/PendingsDataTable.vue":
/*!********************************************************************!*\
  !*** ./resources/js/pages/Principals/common/PendingsDataTable.vue ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PendingsDataTable_vue_vue_type_template_id_fd53cb16___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PendingsDataTable.vue?vue&type=template&id=fd53cb16& */ "./resources/js/pages/Principals/common/PendingsDataTable.vue?vue&type=template&id=fd53cb16&");
/* harmony import */ var _PendingsDataTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PendingsDataTable.vue?vue&type=script&lang=js& */ "./resources/js/pages/Principals/common/PendingsDataTable.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _PendingsDataTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _PendingsDataTable_vue_vue_type_template_id_fd53cb16___WEBPACK_IMPORTED_MODULE_0__["render"],
  _PendingsDataTable_vue_vue_type_template_id_fd53cb16___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Principals/common/PendingsDataTable.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Principals/common/PendingsDataTable.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/PendingsDataTable.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PendingsDataTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./PendingsDataTable.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/PendingsDataTable.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_PendingsDataTable_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Principals/common/PendingsDataTable.vue?vue&type=template&id=fd53cb16&":
/*!***************************************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/PendingsDataTable.vue?vue&type=template&id=fd53cb16& ***!
  \***************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PendingsDataTable_vue_vue_type_template_id_fd53cb16___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./PendingsDataTable.vue?vue&type=template&id=fd53cb16& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/PendingsDataTable.vue?vue&type=template&id=fd53cb16&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PendingsDataTable_vue_vue_type_template_id_fd53cb16___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_PendingsDataTable_vue_vue_type_template_id_fd53cb16___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=13.js.map