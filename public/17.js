(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[17],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/Transactions.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/Transactions.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************/
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
//
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
      grandTotal: 0.00 // tblFirstPageTotalAmount: 0.00,

    };
  },
  computed: {
    selectedPrincipalCode: function selectedPrincipalCode() {
      return this.PrincipalsStore.state.selectedPrincipalCode;
    },
    tblHeader: function tblHeader() {
      return this[this.selectedPrincipalCode].state.transactionsTableHeader;
    },
    totalAmount: function totalAmount() {
      var amount = 0.00;

      if (this.PrincipalsStore.state.transactions.length > 0) {
        this.PrincipalsStore.state.transactions.forEach(function (e) {
          amount += parseFloat(e.u3);
        });
      }

      return amount;
    }
  },
  methods: {
    exportToExcel: function exportToExcel() {
      var transactionsData = [[this.date.toString(), this.PrincipalsStore.state.transactions]];
      var config = this.PrincipalsStore.getHeaderAndFormat('transactionsTableHeader');
      this.PrincipalsStore.exportToExcel(config.header, this.PrincipalsStore.generatedDataSubset(transactionsData, config.format), [7, 8], "".concat(this.selectedPrincipalCode, "_Transactions"));
    } // getFilteredItems(e) {
    //     if(e.length > 0) {
    //         this.tblFirstPageTotalAmount = 0.00;
    //         e.forEach(el => {
    //             this.tblFirstPageTotalAmount += parseFloat(el.u3);
    //         });
    //     } else {
    //         this.tblFirstPageTotalAmount = 0.00;
    //     }
    // }

  },
  created: function created() {
    this.PrincipalsStore.initTransactions(this.selectedPrincipalCode, this.date);
    this.PrincipalsStore.initInvoicesGrandTotal();
  },
  mounted: function mounted() {}
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/Transactions.vue?vue&type=template&id=2d5bc858&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/Transactions.vue?vue&type=template&id=2d5bc858& ***!
  \****************************************************************************************************************************************************************************************************************************/
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
        "v-toolbar",
        { staticClass: "elevation-0", attrs: { dense: "" } },
        [
          _c(
            "v-chip",
            {
              staticClass: "mr-1",
              attrs: { color: "primary", labelx: "", small: "" }
            },
            [
              _c("em", [_vm._v("Total Amount: ")]),
              _vm._v(
                "\n            " +
                  _vm._s(_vm.AppStore.formatAsCurrency(_vm.totalAmount)) +
                  "\n        "
              )
            ]
          ),
          _vm._v(" "),
          _c(
            "v-chip",
            {
              staticClass: "mr-1",
              attrs: { color: "primary", labelx: "", small: "" }
            },
            [
              _c("em", [_vm._v("Grand Total: ")]),
              _vm._v(
                "\n            " +
                  _vm._s(
                    _vm.AppStore.formatAsCurrency(
                      _vm.PrincipalsStore.state.invoicesGrandTotal
                    )
                  ) +
                  "\n        "
              )
            ]
          ),
          _vm._v(" "),
          _c("v-spacer"),
          _vm._v(" "),
          _c(
            "v-btn",
            {
              attrs: {
                color: "success",
                icon: "",
                title: "Export to Excel",
                disabled:
                  (_vm.searchKey != null && _vm.searchKey != "") ||
                  _vm.PrincipalsStore.state.transactions.length < 1
              },
              on: {
                click: function($event) {
                  return _vm.exportToExcel()
                }
              }
            },
            [_c("v-icon", [_vm._v("mdi-file-excel")])],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-sheet",
        [
          _c("v-data-table", {
            staticClass: "elevation-1",
            attrs: {
              items: _vm.PrincipalsStore.state.transactions,
              headers: _vm.tblHeader,
              dense: "",
              search: _vm.searchKey,
              id: "transactions",
              loading: _vm.PrincipalsStore.state.isInitTransactions
            },
            scopedSlots: _vm._u(
              [
                {
                  key: "item.upload_date",
                  fn: function(ref) {
                    var item = ref.item
                    return [
                      _c("span", [
                        _vm._v(
                          "\n                    " +
                            _vm._s(item.upload_date.substring(0, 10)) +
                            "\n                "
                        )
                      ])
                    ]
                  }
                },
                {
                  key: "item.u3",
                  fn: function(ref) {
                    var item = ref.item
                    return [
                      _c("span", [
                        _vm._v(
                          "\n                    " +
                            _vm._s(
                              _vm.AppStore.formatAsCurrency(parseFloat(item.u3))
                            ) +
                            "\n                "
                        )
                      ])
                    ]
                  }
                },
                {
                  key: "item.customer_name",
                  fn: function(ref) {
                    var item = ref.item
                    return [
                      _c("span", { staticClass: "text-caption" }, [
                        _vm._v(
                          "\n                    " +
                            _vm._s(item.customer_name) +
                            "\n                "
                        )
                      ])
                    ]
                  }
                },
                {
                  key: "item.description",
                  fn: function(ref) {
                    var item = ref.item
                    return [
                      _c("span", { staticClass: "text-caption" }, [
                        _vm._v(
                          "\n                    " +
                            _vm._s(item.description) +
                            "\n                "
                        )
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

/***/ "./resources/js/pages/Principals/common/Transactions.vue":
/*!***************************************************************!*\
  !*** ./resources/js/pages/Principals/common/Transactions.vue ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Transactions_vue_vue_type_template_id_2d5bc858___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Transactions.vue?vue&type=template&id=2d5bc858& */ "./resources/js/pages/Principals/common/Transactions.vue?vue&type=template&id=2d5bc858&");
/* harmony import */ var _Transactions_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Transactions.vue?vue&type=script&lang=js& */ "./resources/js/pages/Principals/common/Transactions.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Transactions_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Transactions_vue_vue_type_template_id_2d5bc858___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Transactions_vue_vue_type_template_id_2d5bc858___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Principals/common/Transactions.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Principals/common/Transactions.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/Transactions.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Transactions_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Transactions.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/Transactions.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Transactions_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Principals/common/Transactions.vue?vue&type=template&id=2d5bc858&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/Transactions.vue?vue&type=template&id=2d5bc858& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Transactions_vue_vue_type_template_id_2d5bc858___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Transactions.vue?vue&type=template&id=2d5bc858& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/Transactions.vue?vue&type=template&id=2d5bc858&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Transactions_vue_vue_type_template_id_2d5bc858___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Transactions_vue_vue_type_template_id_2d5bc858___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=17.js.map