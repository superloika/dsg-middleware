(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  // props: ['date','searchKey'],
  data: function data() {
    return {
      grandTotal: 0.00,
      // tblFirstPageTotalAmount: 0.00,
      searchKey: '',
      datePickerShown: false,
      date: [new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10)]
    };
  },
  computed: {
    selectedPrincipalCode: function selectedPrincipalCode() {
      return this.PrincipalsStore.state.selectedPrincipalCode;
    },
    tblHeader: function tblHeader() {
      return this[this.selectedPrincipalCode].state.transactionsTableHeader[0];
    },
    totalAmount: function totalAmount() {
      var amount = 0.00;

      if (this.PrincipalsStore.state.transactions.length > 0) {
        this.PrincipalsStore.state.transactions.forEach(function (e) {
          amount += parseFloat(e.u3);
        });
      }

      return amount;
    },
    dateRangeText: function dateRangeText() {
      return this.date.join(' ~ ');
    }
  },
  methods: {
    // exportToExcel() {
    //     const transactionsData = [
    //         [
    //             this.date.toString(),
    //             this.PrincipalsStore.state.transactions
    //         ]
    //     ];
    //     const config = this.PrincipalsStore
    //         .getHeaderAndFormat('transactionsTableHeader');
    //     this.PrincipalsStore.exportToExcel(
    //         config[0].header,
    //         this.PrincipalsStore.generatedDataSubset(
    //             transactionsData,
    //             config[0].format
    //         ),
    //         [7, 8],
    //         `${this.selectedPrincipalCode}_Transactions`
    //     );
    // },
    exportToExcel: function exportToExcel() {
      this.PrincipalsStore.toExcel_simple(this.date.toString(), this.PrincipalsStore.state.transactions, 'transactionsTableHeader', [7, 8], "".concat(this.selectedPrincipalCode, "_Transactions"));
    },
    loadInvoicesOrTransactions: function loadInvoicesOrTransactions() {
      this.PrincipalsStore.initTransactions(this.selectedPrincipalCode, this.date); // this.PrincipalsStore.initInvoices(this.selectedPrincipalCode, this.date);

      this.PrincipalsStore.initInvoicesGrandTotal();
    }
  },
  created: function created() {
    this.loadInvoicesOrTransactions();
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
        "v-app-bar",
        { staticClass: "elevation-0", attrs: { densex: "" } },
        [
          _c("v-toolbar-title", [
            _c("div", [_vm._v("\n                Transactions\n            ")]),
            _vm._v(" "),
            _c(
              "div",
              [
                _c(
                  "v-chip",
                  {
                    staticClass: "px-1 mr-1 primary--text",
                    attrs: { color: "transparent", label: "", small: "" }
                  },
                  [
                    _c("em", [_vm._v("Total Amount: ")]),
                    _vm._v(
                      "\n                    " +
                        _vm._s(_vm.AppStore.formatAsCurrency(_vm.totalAmount)) +
                        "\n                "
                    )
                  ]
                ),
                _vm._v(" "),
                _c(
                  "v-chip",
                  {
                    staticClass: "px-1 mr-1 primary--text",
                    attrs: { color: "transparent", label: "", small: "" }
                  },
                  [
                    _c("em", [_vm._v("Grand Total: ")]),
                    _vm._v(
                      "\n                    " +
                        _vm._s(
                          _vm.AppStore.formatAsCurrency(
                            _vm.PrincipalsStore.state.invoicesGrandTotal
                          )
                        ) +
                        "\n                "
                    )
                  ]
                )
              ],
              1
            )
          ]),
          _vm._v(" "),
          _c("v-spacer"),
          _vm._v(" "),
          _c(
            "v-btn",
            {
              staticClass: "mr-2",
              attrs: {
                title: "Refresh",
                icon: "",
                dense: "",
                rounded: "",
                depressed: ""
              },
              on: {
                click: function($event) {
                  return _vm.loadInvoicesOrTransactions()
                }
              }
            },
            [_c("v-icon", [_vm._v("mdi-refresh")])],
            1
          ),
          _vm._v(" "),
          _c("v-text-field", {
            staticClass: "mr-3",
            staticStyle: { "max-width": "230px" },
            attrs: {
              label: "Date - YYYY-MM-DD",
              "hide-details": "",
              readonly: "",
              dense: "",
              outlined: "",
              rounded: ""
            },
            on: {
              click: function($event) {
                $event.stopPropagation()
                _vm.datePickerShown = true
              }
            },
            model: {
              value: _vm.dateRangeText,
              callback: function($$v) {
                _vm.dateRangeText = $$v
              },
              expression: "dateRangeText"
            }
          }),
          _vm._v(" "),
          _c(
            "v-dialog",
            {
              ref: "datePicker",
              attrs: { "return-value": _vm.date, width: "290px" },
              on: {
                "update:returnValue": function($event) {
                  _vm.date = $event
                },
                "update:return-value": function($event) {
                  _vm.date = $event
                }
              },
              model: {
                value: _vm.datePickerShown,
                callback: function($$v) {
                  _vm.datePickerShown = $$v
                },
                expression: "datePickerShown"
              }
            },
            [
              _c(
                "v-date-picker",
                {
                  attrs: { scrollable: "", range: "" },
                  model: {
                    value: _vm.date,
                    callback: function($$v) {
                      _vm.date = $$v
                    },
                    expression: "date"
                  }
                },
                [
                  _c("v-spacer"),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: { text: "", color: "primary" },
                      on: {
                        click: function($event) {
                          _vm.datePickerShown = false
                        }
                      }
                    },
                    [_vm._v("\n                    Cancel\n                ")]
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: { text: "", color: "primary" },
                      on: {
                        click: function($event) {
                          _vm.$refs.datePicker.save(_vm.date)
                          _vm.loadInvoicesOrTransactions()
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
          ),
          _vm._v(" "),
          _c("v-text-field", {
            staticStyle: { "max-width": "230px" },
            attrs: {
              label: "Search",
              clearable: "",
              "hide-details": "",
              dense: "",
              flat: "",
              rounded: "",
              "solo-inverted": ""
            },
            model: {
              value: _vm.searchKey,
              callback: function($$v) {
                _vm.searchKey = $$v
              },
              expression: "searchKey"
            }
          }),
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
          ),
          _vm._v(" "),
          _c(
            "v-btn",
            {
              attrs: {
                icon: "",
                title: "Export to PDF",
                disabled:
                  (_vm.searchKey != null && _vm.searchKey != "") ||
                  _vm.PrincipalsStore.state.transactions.length < 1
              },
              on: {
                click: function($event) {
                  return _vm.PrincipalsStore.exportToPdf(
                    _vm.PrincipalsStore.state.transactions
                  )
                }
              }
            },
            [_c("v-icon", [_vm._v("mdi-export")])],
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
            attrs: {
              items: _vm.PrincipalsStore.state.transactions,
              headers: _vm.tblHeader,
              dense: "",
              search: _vm.searchKey,
              classz: "elevation-1",
              id: "transactions",
              loading: _vm.PrincipalsStore.state.isInitTransactions
            },
            scopedSlots: _vm._u(
              [
                {
                  key: "item.updated_at",
                  fn: function(ref) {
                    var item = ref.item
                    return [
                      _c("span", [
                        _vm._v(
                          "\n                    " +
                            _vm._s(item.updated_at.substring(0, 10)) +
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
                      _c("span", { attrs: { "background-color": "primary" } }, [
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
//# sourceMappingURL=2.js.map