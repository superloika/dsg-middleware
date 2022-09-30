(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[26],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/Transactions.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/Transactions.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jspdf__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jspdf */ "./node_modules/jspdf/dist/jspdf.es.min.js");
/* harmony import */ var jspdf_autotable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jspdf-autotable */ "./node_modules/jspdf-autotable/dist/jspdf.plugin.autotable.js");
/* harmony import */ var jspdf_autotable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jspdf_autotable__WEBPACK_IMPORTED_MODULE_1__);
var _excluded = ["customer_code", "customer_name", "doc_no", "item_code", "item_description", "uom", "quantity", "amount"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      // return this[this.selectedPrincipalCode].state.transactionsTableHeader[0];
      return this.InvoicesStore.state.transactionsTableHeader[0];
    },
    totalAmount: function totalAmount() {
      var amount = 0.00;

      if (this.PrincipalsStore.state.transactions.length > 0) {
        this.PrincipalsStore.state.transactions.forEach(function (e) {
          amount += parseFloat(e.amount);
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
      console.log(this.PrincipalsStore.state.transactions);
      this.PrincipalsStore.toExcel_simple(this.date.toString(), this.PrincipalsStore.state.transactions, 'transactionsTableHeader', null, //[7,8],
      "".concat(this.selectedPrincipalCode, "_transactions"));
    },
    loadInvoicesOrTransactions: function loadInvoicesOrTransactions() {
      this.PrincipalsStore.initTransactions(this.selectedPrincipalCode, this.date); // this.PrincipalsStore.initInvoices(this.selectedPrincipalCode, this.date);

      this.PrincipalsStore.initInvoicesGrandTotal();
    },

    /**
     * Export to PDF (test)
     */
    exportToPDF: function exportToPDF() {
      var totalAmount = this.AppStore.formatAsCurrency(this.totalAmount);
      var fileName = "".concat(this.selectedPrincipalCode, "_transactions");
      var doc = new jspdf__WEBPACK_IMPORTED_MODULE_0__["default"]({
        orientation: 'landscape'
      });
      var totalPagesExp = '{total_pages_count_string}';
      doc.setFontSize(18);
      doc.text("Transactions", 14, 22);
      doc.setFontSize(11);
      doc.setTextColor(100); // jsPDF 1.4+ uses getWidth, <1.4 uses .width

      var pageSize = doc.internal.pageSize;
      var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
      var text = doc.splitTextToSize(this.dateRangeText, pageWidth - 35, {});
      doc.text(text, 14, 30);
      doc.setFontSize(8);
      var tempObj = {
        head: [['Customer Code', 'Account Name', 'Sales Invoice', 'Item Code', 'Description', 'UOM', 'Quantity', 'Amount']],
        body: this.PrincipalsStore.state.transactions.map(function (e) {
          var customer_code = e.customer_code,
              customer_name = e.customer_name,
              doc_no = e.doc_no,
              item_code = e.item_code,
              item_description = e.item_description,
              uom = e.uom,
              quantity = e.quantity,
              amount = e.amount,
              rest = _objectWithoutProperties(e, _excluded);

          return [customer_code, customer_name, doc_no, item_code, item_description, uom, quantity, {
            content: amount,
            styles: {
              halign: 'right'
            }
          }];
        }),
        footer: [['Total', '']],
        theme: 'grid',
        startY: 40,
        showHead: 'firstPage',
        headStyles: {
          fillColor: '#1ea4f7'
        },
        didDrawPage: function didDrawPage(data) {
          // Header
          // doc.setFontSize(20)
          // doc.setTextColor(40)
          // // if (base64Img) {
          // //     doc.addImage(base64Img, 'JPEG', data.settings.margin.left, 15, 10, 10)
          // // }
          // doc.text('Report', data.settings.margin.left + 15, 22)
          // Footer
          var str = 'Page ' + doc.internal.getNumberOfPages(); // Total page number plugin only available in jspdf v1.0+

          if (typeof doc.putTotalPages === 'function') {
            str = str + ' of ' + totalPagesExp;
          }

          doc.setFontSize(10); // jsPDF 1.4+ uses getWidth, <1.4 uses .width

          var pageSize = doc.internal.pageSize;
          var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
          doc.text(str, data.settings.margin.left, pageHeight - 10);
        }
      };
      var rowTotalAmount = [{
        content: 'Total',
        colSpan: 7,
        styles: {
          fontStyle: 'bold',
          fontSize: 12
        }
      }, {
        content: totalAmount,
        styles: {
          halign: 'right',
          fontStyle: 'bold',
          fontSize: 12
        }
      }];
      tempObj.body.push(rowTotalAmount);
      jspdf_autotable__WEBPACK_IMPORTED_MODULE_1___default()(doc, tempObj); // let finalY = doc.lastAutoTable.finalY; // The y position on the page
      // doc.setFontSize(16);
      // doc.text(20, finalY, "Hello!")
      // Total page number plugin only available in jspdf v1.0+

      if (typeof doc.putTotalPages === 'function') {
        doc.putTotalPages(totalPagesExp);
      }

      doc.save("".concat(fileName, ".pdf"));
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
                  { attrs: { color: "primary", label: "", "x-small": "" } },
                  [
                    _c("h4", [
                      _c("em", [_vm._v("Total Amount: ")]),
                      _vm._v(
                        "\n                        " +
                          _vm._s(
                            _vm.AppStore.formatAsCurrency(_vm.totalAmount)
                          ) +
                          "\n                    "
                      )
                    ])
                  ]
                ),
                _vm._v(" "),
                _c(
                  "v-chip",
                  { attrs: { color: "primary", label: "", "x-small": "" } },
                  [
                    _c("h4", [
                      _c("em", [_vm._v("Grand Total: ")]),
                      _vm._v(
                        "\n                        " +
                          _vm._s(
                            _vm.AppStore.formatAsCurrency(
                              _vm.PrincipalsStore.state.invoicesGrandTotal
                            )
                          ) +
                          "\n                    "
                      )
                    ])
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
              label: "Posting Date (Y-m-d)",
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
                    [_vm._v("\n                    Ok\n                ")]
                  )
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c("v-text-field", {
            staticClass: "mr-2",
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
                  _vm.PrincipalsStore.state.transactions.length < 1,
                color: "red"
              },
              on: {
                click: function($event) {
                  return _vm.exportToPDF()
                }
              }
            },
            [_c("v-icon", [_vm._v("mdi-file-pdf-box")])],
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
              loading: _vm.PrincipalsStore.state.isInitTransactions,
              "disable-sort": ""
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
//# sourceMappingURL=26.js.map