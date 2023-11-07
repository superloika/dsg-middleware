(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Invoices/ExtractInvoices.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Invoices/ExtractInvoices.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  data: function data() {
    return {
      principal: {},
      principal_code: "",
      datePickerShown: false,
      date: [new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10)]
    };
  },
  computed: {
    dateRangeText: function dateRangeText() {
      return this.date.join(' ~ ');
    },
    principals: function principals() {
      return this.AppStore.state.principals.map(function (e) {
        return {
          main_vendor_code: e[0],
          caption: e[1].map(function (el) {
            return "".concat(el.vendor_code, "-").concat(el.name);
          }),
          caption2: e[1].map(function (el) {
            return "".concat(el.vendor_code);
          })
        };
      });
    }
  },
  watch: {
    'principal.main_vendor_code': {
      handler: function handler(newV, oldV) {
        this.principal_code = newV;
      }
    },
    principal_code: function principal_code() {
      console.log(this.principal_code);
    }
  },
  methods: {
    // async extract() {
    //     const { headers, data } = await axios.post(
    //         this.AppStore.state.siteUrl + 'invoices/extract',
    //         {
    //             principal_code: this.principal_code,
    //             posting_date: this.date,
    //         },
    //         {
    //             responseType: 'blob'
    //         }
    //     );
    //     const { 'content-disposition': contentDisposition } = headers;
    //     const [attachment, file] = contentDisposition.split(' ');
    //     const [key, fileName] = file.split('=');
    //     const url = window.URL.createObjectURL(new Blob([data]));
    //     const link = document.createElement('a');
    //     link.href = url;
    //     link.setAttribute('download', fileName);
    //     document.body.appendChild(link);
    //     link.click();
    // },
    extractRawInvoicesToExcel: function extractRawInvoicesToExcel() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.InvoicesStore.extractRawInvoicesToExcel(_this.principal_code, _this.date);

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    } // async asd() {
    //     const { headers, data } = await axios.post(
    // 			'dtr/start-matching',
    // 			{ fileId },
    // 			{
    // 				responseType: 'blob',
    // 				onDownloadProgress: progressEvent => {
    // 					// let percentCompleted = Math.floor(
    // 					//   (progressEvent.loaded / progressEvent.total) * 100
    // 					// )
    // 					// console.log(`${percentCompleted}% Downloaded`)
    // 				}
    // 			}
    // 		)
    // 		const { 'content-disposition': contentDisposition } = headers
    // 		const [attachment, file] = contentDisposition.split(' ')
    // 		const [key, fileName] = file.split('=')
    // 		const url = window.URL.createObjectURL(new Blob([data]))
    // 		const link = document.createElement('a')
    // 		link.href = url
    // 		link.setAttribute('download', fileName)
    // 		document.body.appendChild(link)
    // 		link.click()
    // }

  },
  mounted: function mounted() {
    console.log("ExtractInvoices component mounted");
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Invoices/ExtractInvoices.vue?vue&type=template&id=1c5096c7&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Invoices/ExtractInvoices.vue?vue&type=template&id=1c5096c7& ***!
  \**********************************************************************************************************************************************************************************************************************/
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
      _c("v-card-title", { staticClass: "pb-6" }, [
        _c("div", { staticClass: "mr-2" }, [
          _vm._v("\n            Extract Raw Invoices\n        ")
        ]),
        _vm._v(" "),
        _c("div")
      ]),
      _vm._v(" "),
      _c(
        "v-card-text",
        [
          _c(
            "v-row",
            [
              _c(
                "v-col",
                { attrs: { md: "8" } },
                [
                  _c("v-combobox", {
                    attrs: {
                      items: _vm.principals,
                      label: "Principal",
                      "item-text": "caption",
                      outlined: "",
                      rounded: "",
                      "hide-details": "",
                      dense: "",
                      clearable: ""
                    },
                    scopedSlots: _vm._u([
                      {
                        key: "item",
                        fn: function(ref) {
                          var item = ref.item
                          return [
                            _c(
                              "div",
                              [
                                _c("v-icon", [
                                  _vm._v(
                                    "\n                                mdi-store\n                            "
                                  )
                                ]),
                                _vm._v(" "),
                                _vm._l(item.caption, function(c, index) {
                                  return _c(
                                    "small",
                                    {
                                      key: index,
                                      staticClass: "text-caption ma-1"
                                    },
                                    [
                                      _vm._v(
                                        "\n                                " +
                                          _vm._s(c) +
                                          ",\n                            "
                                      )
                                    ]
                                  )
                                })
                              ],
                              2
                            )
                          ]
                        }
                      },
                      {
                        key: "selection",
                        fn: function(ref) {
                          var item = ref.item
                          return _vm._l(item.caption2, function(c, index) {
                            return _c(
                              "v-chip",
                              {
                                key: index,
                                attrs: { color: "primary", "x-small": "" }
                              },
                              [_vm._v(_vm._s(c))]
                            )
                          })
                        }
                      }
                    ]),
                    model: {
                      value: _vm.principal,
                      callback: function($$v) {
                        _vm.principal = $$v
                      },
                      expression: "principal"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { md: "4" } },
                [
                  _c("v-text-field", {
                    attrs: {
                      label: "Posting Date - YYYY-MM-DD",
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
                      attrs: {
                        "return-value": _vm.date,
                        disabled:
                          _vm.principal_code == "" ||
                          _vm.principal_code == null,
                        "max-width": "300px"
                      },
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
                                "\n                            Cancel\n                        "
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
                                  return _vm.$refs.datePicker.save(_vm.date)
                                }
                              }
                            },
                            [
                              _vm._v(
                                "\n                            Ok\n                        "
                              )
                            ]
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
          ),
          _vm._v(" "),
          _c(
            "v-row",
            [
              _c(
                "v-col",
                [
                  _c(
                    "v-btn",
                    {
                      staticClass: "float-right",
                      attrs: {
                        color: "primary",
                        disabled:
                          _vm.principal_code == "" || _vm.principal_code == null
                      },
                      on: {
                        click: function($event) {
                          return _vm.extractRawInvoicesToExcel()
                        }
                      }
                    },
                    [_vm._v("\n                    Extract\n                ")]
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

/***/ "./resources/js/pages/Invoices/ExtractInvoices.vue":
/*!*********************************************************!*\
  !*** ./resources/js/pages/Invoices/ExtractInvoices.vue ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ExtractInvoices_vue_vue_type_template_id_1c5096c7___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ExtractInvoices.vue?vue&type=template&id=1c5096c7& */ "./resources/js/pages/Invoices/ExtractInvoices.vue?vue&type=template&id=1c5096c7&");
/* harmony import */ var _ExtractInvoices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ExtractInvoices.vue?vue&type=script&lang=js& */ "./resources/js/pages/Invoices/ExtractInvoices.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ExtractInvoices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ExtractInvoices_vue_vue_type_template_id_1c5096c7___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ExtractInvoices_vue_vue_type_template_id_1c5096c7___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Invoices/ExtractInvoices.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Invoices/ExtractInvoices.vue?vue&type=script&lang=js&":
/*!**********************************************************************************!*\
  !*** ./resources/js/pages/Invoices/ExtractInvoices.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ExtractInvoices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ExtractInvoices.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Invoices/ExtractInvoices.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ExtractInvoices_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Invoices/ExtractInvoices.vue?vue&type=template&id=1c5096c7&":
/*!****************************************************************************************!*\
  !*** ./resources/js/pages/Invoices/ExtractInvoices.vue?vue&type=template&id=1c5096c7& ***!
  \****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ExtractInvoices_vue_vue_type_template_id_1c5096c7___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ExtractInvoices.vue?vue&type=template&id=1c5096c7& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Invoices/ExtractInvoices.vue?vue&type=template&id=1c5096c7&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ExtractInvoices_vue_vue_type_template_id_1c5096c7___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ExtractInvoices_vue_vue_type_template_id_1c5096c7___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=9.js.map