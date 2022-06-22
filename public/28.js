(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[28],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/zzzTransAndInvoices.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/zzzTransAndInvoices.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    // UploadedInvoices: () => import('./UploadedInvoices.vue'),
    Transactions: function Transactions() {
      return Promise.all(/*! import() */[__webpack_require__.e(3), __webpack_require__.e(2)]).then(__webpack_require__.bind(null, /*! ./Transactions.vue */ "./resources/js/pages/Principals/common/Transactions.vue"));
    }
  },
  data: function data() {
    return {
      searchKey: '',
      datePickerShown: false,
      date: [new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10)],
      grandTotal: 0.00,
      tab: null
    };
  },
  computed: {
    selectedPrincipalCode: function selectedPrincipalCode() {
      return this.PrincipalsStore.state.selectedPrincipalCode;
    },
    dateRangeText: function dateRangeText() {
      return this.date.join(' ~ ');
    }
  },
  methods: {
    loadInvoicesOrTransactions: function loadInvoicesOrTransactions() {
      this.PrincipalsStore.initTransactions(this.selectedPrincipalCode, this.date); // this.PrincipalsStore.initInvoices(this.selectedPrincipalCode, this.date);

      this.PrincipalsStore.initInvoicesGrandTotal();
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/zzzTransAndInvoices.vue?vue&type=template&id=fd5f4548&":
/*!***********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/zzzTransAndInvoices.vue?vue&type=template&id=fd5f4548& ***!
  \***********************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "elevation-0 pt-0", attrs: { outlinedx: "" } },
    [
      _c(
        "v-card-title",
        { staticClass: "pa-0" },
        [
          _c(
            "v-app-bar",
            { attrs: { elevation: "0", colorx: "white" } },
            [
              _c("v-toolbar-title", { attrs: { title: "Transactions" } }, [
                _vm._v("\n                Transactions\n            ")
              ]),
              _vm._v(" "),
              _c("v-spacer"),
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
                        [
                          _vm._v(
                            "\n                        Cancel\n                    "
                          )
                        ]
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
                        [
                          _vm._v(
                            "\n                        Generate\n                    "
                          )
                        ]
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
              })
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-card-text",
        { staticClass: "mx-0 pa-0" },
        [
          _c(
            "v-tabs",
            {
              attrs: { heightx: "40", grow: "" },
              model: {
                value: _vm.tab,
                callback: function($$v) {
                  _vm.tab = $$v
                },
                expression: "tab"
              }
            },
            [
              _c(
                "v-tab",
                { staticClass: "px-2" },
                [
                  _c("v-icon", { staticClass: "mr-1" }, [
                    _vm._v("mdi-file-check")
                  ]),
                  _vm._v("\n                Transactions\n            ")
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
                value: _vm.tab,
                callback: function($$v) {
                  _vm.tab = $$v
                },
                expression: "tab"
              }
            },
            [
              _c(
                "v-tab-item",
                [
                  _c(
                    "v-sheet",
                    {},
                    [
                      _c("Transactions", {
                        attrs: { searchKey: _vm.searchKey, date: _vm.date }
                      })
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
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/pages/Principals/common/zzzTransAndInvoices.vue":
/*!**********************************************************************!*\
  !*** ./resources/js/pages/Principals/common/zzzTransAndInvoices.vue ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _zzzTransAndInvoices_vue_vue_type_template_id_fd5f4548___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./zzzTransAndInvoices.vue?vue&type=template&id=fd5f4548& */ "./resources/js/pages/Principals/common/zzzTransAndInvoices.vue?vue&type=template&id=fd5f4548&");
/* harmony import */ var _zzzTransAndInvoices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./zzzTransAndInvoices.vue?vue&type=script&lang=js& */ "./resources/js/pages/Principals/common/zzzTransAndInvoices.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _zzzTransAndInvoices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _zzzTransAndInvoices_vue_vue_type_template_id_fd5f4548___WEBPACK_IMPORTED_MODULE_0__["render"],
  _zzzTransAndInvoices_vue_vue_type_template_id_fd5f4548___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Principals/common/zzzTransAndInvoices.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Principals/common/zzzTransAndInvoices.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/zzzTransAndInvoices.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_zzzTransAndInvoices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./zzzTransAndInvoices.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/zzzTransAndInvoices.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_zzzTransAndInvoices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Principals/common/zzzTransAndInvoices.vue?vue&type=template&id=fd5f4548&":
/*!*****************************************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/zzzTransAndInvoices.vue?vue&type=template&id=fd5f4548& ***!
  \*****************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_zzzTransAndInvoices_vue_vue_type_template_id_fd5f4548___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./zzzTransAndInvoices.vue?vue&type=template&id=fd5f4548& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/zzzTransAndInvoices.vue?vue&type=template&id=fd5f4548&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_zzzTransAndInvoices_vue_vue_type_template_id_fd5f4548___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_zzzTransAndInvoices_vue_vue_type_template_id_fd5f4548___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=28.js.map