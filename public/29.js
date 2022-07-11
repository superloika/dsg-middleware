(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[29],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/UploadedInvoices.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/UploadedInvoices.vue?vue&type=script&lang=js& ***!
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['date', 'searchKey'],
  data: function data() {
    return {
      grandTotal: 0.00
    };
  },
  computed: {
    selectedPrincipalCode: function selectedPrincipalCode() {
      return this.PrincipalsStore.state.selectedPrincipalCode;
    },
    tblHeader: function tblHeader() {
      return this[this.selectedPrincipalCode].state.uploadedInvoicesTableHeader;
    },
    totalAmount: function totalAmount() {
      var amount = 0.00;

      if (this.PrincipalsStore.state.invoices.length > 0) {
        this.PrincipalsStore.state.invoices.forEach(function (e) {
          amount += parseFloat(e.u3);
        });
      }

      return amount;
    }
  },
  methods: {
    loadInvoices: function loadInvoices() {
      this.PrincipalsStore.initInvoices(this.selectedPrincipalCode, this.date);
    }
  },
  created: function created() {
    // this.PrincipalsStore.initInvoicesGrandTotal();
    // this.loadInvoices();
    this.PrincipalsStore.initInvoices(this.selectedPrincipalCode, this.date);
  },
  mounted: function mounted() {}
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/UploadedInvoices.vue?vue&type=template&id=4ab5b32e&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/UploadedInvoices.vue?vue&type=template&id=4ab5b32e& ***!
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
    "v-sheet",
    [
      _c(
        "v-sheet",
        [
          _c("v-data-table", {
            staticClass: "elevation-1",
            attrs: {
              items: _vm.PrincipalsStore.state.invoices,
              headers: _vm.tblHeader,
              dense: "",
              search: _vm.searchKey
            },
            scopedSlots: _vm._u(
              [
                {
                  key: "item.status",
                  fn: function(ref) {
                    var item = ref.item
                    return [
                      item.status == "completed"
                        ? _c("span", { staticClass: "primary--text" }, [
                            _vm._v(
                              "\r\n                    " +
                                _vm._s(item.status) +
                                "\r\n                "
                            )
                          ])
                        : _vm._e(),
                      _vm._v(" "),
                      item.status == "pending"
                        ? _c("span", { staticClass: "warning--text" }, [
                            _vm._v(
                              "\r\n                    " +
                                _vm._s(item.status) +
                                "\r\n                "
                            )
                          ])
                        : _vm._e()
                    ]
                  }
                },
                {
                  key: "item.upload_date",
                  fn: function(ref) {
                    var item = ref.item
                    return [
                      _c("span", [
                        _vm._v(_vm._s(item.upload_date.substr(0, 10)))
                      ])
                    ]
                  }
                }
              ],
              null,
              true
            )
          })
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

/***/ "./resources/js/pages/Principals/common/UploadedInvoices.vue":
/*!*******************************************************************!*\
  !*** ./resources/js/pages/Principals/common/UploadedInvoices.vue ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UploadedInvoices_vue_vue_type_template_id_4ab5b32e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UploadedInvoices.vue?vue&type=template&id=4ab5b32e& */ "./resources/js/pages/Principals/common/UploadedInvoices.vue?vue&type=template&id=4ab5b32e&");
/* harmony import */ var _UploadedInvoices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UploadedInvoices.vue?vue&type=script&lang=js& */ "./resources/js/pages/Principals/common/UploadedInvoices.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _UploadedInvoices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UploadedInvoices_vue_vue_type_template_id_4ab5b32e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UploadedInvoices_vue_vue_type_template_id_4ab5b32e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Principals/common/UploadedInvoices.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Principals/common/UploadedInvoices.vue?vue&type=script&lang=js&":
/*!********************************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/UploadedInvoices.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UploadedInvoices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./UploadedInvoices.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/UploadedInvoices.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UploadedInvoices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Principals/common/UploadedInvoices.vue?vue&type=template&id=4ab5b32e&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/UploadedInvoices.vue?vue&type=template&id=4ab5b32e& ***!
  \**************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UploadedInvoices_vue_vue_type_template_id_4ab5b32e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./UploadedInvoices.vue?vue&type=template&id=4ab5b32e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/UploadedInvoices.vue?vue&type=template&id=4ab5b32e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UploadedInvoices_vue_vue_type_template_id_4ab5b32e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UploadedInvoices_vue_vue_type_template_id_4ab5b32e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=29.js.map