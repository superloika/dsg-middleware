(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Invoices/InvoiceUploadSummary.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Invoices/InvoiceUploadSummary.vue?vue&type=script&lang=js& ***!
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  props: ['uploadResponse'],
  mounted: function mounted() {
    console.log("InvoiceUploadSummary component mounted");
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Invoices/InvoiceUploadSummary.vue?vue&type=template&id=30ed02b0&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Invoices/InvoiceUploadSummary.vue?vue&type=template&id=30ed02b0& ***!
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
      _c("v-card-title", { staticClass: "pb-6" }, [
        _c("div", { staticClass: "mr-2" }, [
          _vm._v("\n            Upload Summary\n        ")
        ]),
        _vm._v(" "),
        _c(
          "div",
          [
            _c(
              "v-chip",
              { attrs: { color: "default", small: "", title: "Batch Number" } },
              [
                _vm._v(
                  "\n                " +
                    _vm._s(_vm.uploadResponse.batch_number) +
                    "\n            "
                )
              ]
            )
          ],
          1
        )
      ]),
      _vm._v(" "),
      _c(
        "v-card-text",
        [
          _c(
            "v-expansion-panels",
            { attrs: { focusable: "" } },
            _vm._l(_vm.uploadResponse.summary, function(summary, index) {
              return _c(
                "v-expansion-panel",
                { key: index },
                [
                  _c(
                    "v-expansion-panel-header",
                    {
                      attrs: { "disable-icon-rotate": "" },
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "actions",
                            fn: function() {
                              return [
                                summary.line_read == summary.line_uploaded &&
                                summary.line_uploaded > 0
                                  ? _c(
                                      "v-icon",
                                      { attrs: { color: "success" } },
                                      [
                                        _vm._v(
                                          "\n                            mdi-check\n                        "
                                        )
                                      ]
                                    )
                                  : summary.line_uploaded == 0
                                  ? _c(
                                      "v-icon",
                                      { attrs: { color: "error" } },
                                      [
                                        _vm._v(
                                          "\n                            mdi-alert-circle\n                        "
                                        )
                                      ]
                                    )
                                  : _c(
                                      "v-icon",
                                      { attrs: { color: "warning" } },
                                      [
                                        _vm._v(
                                          "\n                            mdi-check\n                        "
                                        )
                                      ]
                                    )
                              ]
                            },
                            proxy: true
                          }
                        ],
                        null,
                        true
                      )
                    },
                    [
                      _vm._v(
                        "\n                    " +
                          _vm._s(summary.file_name) +
                          "\n                    "
                      )
                    ]
                  ),
                  _vm._v(" "),
                  _c(
                    "v-expansion-panel-content",
                    [
                      _c(
                        "div",
                        { staticClass: "py-2" },
                        [
                          _c(
                            "v-chip",
                            {
                              staticClass: "px-2",
                              attrs: {
                                color: "default",
                                small: "",
                                title: "Total number of lines in the file"
                              }
                            },
                            [
                              _vm._v(
                                "\n                            Line Total:\n                            " +
                                  _vm._s(summary.line_total) +
                                  "\n                        "
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "v-chip",
                            {
                              staticClass: "px-2",
                              attrs: {
                                color: "default",
                                small: "",
                                title:
                                  "Total number of lines being read as valid invoice data"
                              }
                            },
                            [
                              _vm._v(
                                "\n                            Line Read:\n                            " +
                                  _vm._s(summary.line_read) +
                                  "\n                        "
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "v-chip",
                            {
                              staticClass: "px-2",
                              attrs: {
                                color: "default",
                                small: "",
                                title:
                                  "Total number of lines already exists in the database"
                              }
                            },
                            [
                              _vm._v(
                                "\n                            Line Existing:\n                            " +
                                  _vm._s(summary.line_existing) +
                                  "\n                        "
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "v-chip",
                            {
                              staticClass: "px-2",
                              attrs: {
                                color: "default",
                                small: "",
                                title:
                                  "Total number of lines being read as valid invoice data"
                              }
                            },
                            [
                              _vm._v(
                                "\n                            Line Skipped:\n                            " +
                                  _vm._s(
                                    summary.line_total - summary.line_read
                                  ) +
                                  "\n                        "
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c(
                            "v-chip",
                            {
                              staticClass: "px-2",
                              attrs: {
                                title: "Total number of lines uploaded",
                                color:
                                  summary.line_uploaded > 0
                                    ? "primary"
                                    : "error",
                                small: ""
                              }
                            },
                            [
                              _vm._v(
                                "\n                            Line Uploaded:\n                            " +
                                  _vm._s(summary.line_uploaded) +
                                  "\n                        "
                              )
                            ]
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      Object.keys(summary.skipped_unknown_line).length
                        ? _c(
                            "v-container",
                            {
                              staticClass: "mb-4",
                              staticStyle: { border: "1px solid #f2f2f2" }
                            },
                            [
                              _c(
                                "h5",
                                [
                                  _vm._v(
                                    "\n                                Skipped: Unknown Lines\n                                "
                                  ),
                                  _c(
                                    "v-chip",
                                    {
                                      staticClass: "px-1",
                                      attrs: { "x-small": "" }
                                    },
                                    [
                                      _vm._v(
                                        "\n                                    " +
                                          _vm._s(
                                            Object.keys(
                                              summary.skipped_unknown_line
                                            ).length
                                          ) +
                                          "\n                                "
                                      )
                                    ]
                                  )
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _vm._l(
                                Object.entries(summary.skipped_unknown_line),
                                function(line, index) {
                                  return _c(
                                    "small",
                                    {
                                      key: index,
                                      attrs: {
                                        title: "Line Number: " + line[0]
                                      }
                                    },
                                    [
                                      _vm._v(
                                        "\n                            " +
                                          _vm._s(line[1]) +
                                          "\n                            "
                                      ),
                                      _c("br")
                                    ]
                                  )
                                }
                              )
                            ],
                            2
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      Object.keys(summary.skipped_other_principals).length
                        ? _c(
                            "v-container",
                            {
                              staticClass: "mb-4",
                              staticStyle: { border: "1px solid #f2f2f2" }
                            },
                            [
                              _c("div", [
                                _c(
                                  "h5",
                                  [
                                    _vm._v(
                                      "\n                                Skipped: Other Principals\n                                "
                                    ),
                                    _c(
                                      "v-chip",
                                      {
                                        staticClass: "px-1",
                                        attrs: { "x-small": "" }
                                      },
                                      [
                                        _vm._v(
                                          "\n                                    " +
                                            _vm._s(
                                              Object.keys(
                                                summary.skipped_other_principals
                                              ).length
                                            ) +
                                            "\n                                "
                                        )
                                      ]
                                    )
                                  ],
                                  1
                                )
                              ]),
                              _vm._v(" "),
                              _vm._l(
                                Object.entries(
                                  summary.skipped_other_principals
                                ),
                                function(line, index) {
                                  return _c(
                                    "small",
                                    {
                                      key: index,
                                      attrs: {
                                        title: "Line Number: " + line[0]
                                      }
                                    },
                                    [
                                      _vm._v(
                                        "\n                            " +
                                          _vm._s(line[1]) +
                                          "\n                            "
                                      ),
                                      _c("br")
                                    ]
                                  )
                                }
                              )
                            ],
                            2
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      Object.keys(summary.skipped_not_in_item_masterfile).length
                        ? _c(
                            "v-container",
                            {
                              staticClass: "mb-4",
                              staticStyle: { border: "1px solid #f2f2f2" }
                            },
                            [
                              _c("div", [
                                _c(
                                  "h5",
                                  [
                                    _vm._v(
                                      "\n                                Skipped: Item not found in masterfile\n                                "
                                    ),
                                    _c(
                                      "v-chip",
                                      {
                                        staticClass: "px-1",
                                        attrs: { "x-small": "" }
                                      },
                                      [
                                        _vm._v(
                                          "\n                                    " +
                                            _vm._s(
                                              Object.keys(
                                                summary.skipped_not_in_item_masterfile
                                              ).length
                                            ) +
                                            "\n                                "
                                        )
                                      ]
                                    )
                                  ],
                                  1
                                )
                              ]),
                              _vm._v(" "),
                              _vm._l(
                                Object.entries(
                                  summary.skipped_not_in_item_masterfile
                                ),
                                function(line, index) {
                                  return _c(
                                    "small",
                                    {
                                      key: index,
                                      attrs: {
                                        title: "Line Number: " + line[0]
                                      }
                                    },
                                    [
                                      _vm._v(
                                        "\n                            " +
                                          _vm._s(line[1]) +
                                          "\n                            "
                                      ),
                                      _c("br")
                                    ]
                                  )
                                }
                              )
                            ],
                            2
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      Object.keys(summary.skipped_zero_qty).length
                        ? _c(
                            "v-container",
                            {
                              staticClass: "mb-4",
                              staticStyle: { border: "1px solid #f2f2f2" }
                            },
                            [
                              _c("div", [
                                _c(
                                  "h5",
                                  [
                                    _vm._v(
                                      "\n                                Skipped: Zero Quantity\n                                "
                                    ),
                                    _c(
                                      "v-chip",
                                      {
                                        staticClass: "px-1",
                                        attrs: { "x-small": "" }
                                      },
                                      [
                                        _vm._v(
                                          "\n                                    " +
                                            _vm._s(
                                              Object.keys(
                                                summary.skipped_zero_qty
                                              ).length
                                            ) +
                                            "\n                                "
                                        )
                                      ]
                                    )
                                  ],
                                  1
                                )
                              ]),
                              _vm._v(" "),
                              _vm._l(
                                Object.entries(summary.skipped_zero_qty),
                                function(line, index) {
                                  return _c(
                                    "small",
                                    {
                                      key: index,
                                      attrs: {
                                        title: "Line Number: " + line[0]
                                      }
                                    },
                                    [
                                      _vm._v(
                                        "\n                            " +
                                          _vm._s(line[1]) +
                                          "\n                            "
                                      ),
                                      _c("br")
                                    ]
                                  )
                                }
                              )
                            ],
                            2
                          )
                        : _vm._e()
                    ],
                    1
                  )
                ],
                1
              )
            }),
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

/***/ "./resources/js/pages/Invoices/InvoiceUploadSummary.vue":
/*!**************************************************************!*\
  !*** ./resources/js/pages/Invoices/InvoiceUploadSummary.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _InvoiceUploadSummary_vue_vue_type_template_id_30ed02b0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./InvoiceUploadSummary.vue?vue&type=template&id=30ed02b0& */ "./resources/js/pages/Invoices/InvoiceUploadSummary.vue?vue&type=template&id=30ed02b0&");
/* harmony import */ var _InvoiceUploadSummary_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./InvoiceUploadSummary.vue?vue&type=script&lang=js& */ "./resources/js/pages/Invoices/InvoiceUploadSummary.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _InvoiceUploadSummary_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _InvoiceUploadSummary_vue_vue_type_template_id_30ed02b0___WEBPACK_IMPORTED_MODULE_0__["render"],
  _InvoiceUploadSummary_vue_vue_type_template_id_30ed02b0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Invoices/InvoiceUploadSummary.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Invoices/InvoiceUploadSummary.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/js/pages/Invoices/InvoiceUploadSummary.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InvoiceUploadSummary_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./InvoiceUploadSummary.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Invoices/InvoiceUploadSummary.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_InvoiceUploadSummary_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Invoices/InvoiceUploadSummary.vue?vue&type=template&id=30ed02b0&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/pages/Invoices/InvoiceUploadSummary.vue?vue&type=template&id=30ed02b0& ***!
  \*********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_InvoiceUploadSummary_vue_vue_type_template_id_30ed02b0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./InvoiceUploadSummary.vue?vue&type=template&id=30ed02b0& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Invoices/InvoiceUploadSummary.vue?vue&type=template&id=30ed02b0&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_InvoiceUploadSummary_vue_vue_type_template_id_30ed02b0___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_InvoiceUploadSummary_vue_vue_type_template_id_30ed02b0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=9.js.map