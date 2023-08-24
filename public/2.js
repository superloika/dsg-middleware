(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    { attrs: { elevation: "0", outlined: "", tile: "" } },
    [
      _c("v-card-title", { staticClass: "pb-6" }, [
        _c("div", { staticClass: "mr-2" }, [
          _c("div", { staticClass: "text-overline" }, [
            _vm._v("Upload Summary\n                "),
            _c("span", { staticClass: "text-caption font-weight-bold" }, [
              _vm._v(
                "\n                    " +
                  _vm._s(_vm.uploadResponse.batch_number)
              )
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div")
      ]),
      _vm._v(" "),
      _c(
        "v-card-text",
        [
          _vm.uploadResponse.ufiles != undefined &&
          _vm.uploadResponse.ufiles.length
            ? _c(
                "div",
                { staticClass: "mb-3" },
                [
                  _c(
                    "v-sheet",
                    {
                      staticClass: "pa-4 error--text",
                      attrs: { elevation: "1" }
                    },
                    [
                      _c("h4", [
                        _vm._v(
                          _vm._s(_vm.uploadResponse.ufiles.length) +
                            " unknown file/s"
                        )
                      ]),
                      _vm._v(" "),
                      _c("h6", [_vm._v("Unmatched group prefix in filename")]),
                      _vm._v(" "),
                      _c("v-divider"),
                      _vm._v(" "),
                      _vm._l(_vm.uploadResponse.ufiles, function(uf, i) {
                        return _c("div", { key: i }, [
                          _vm._v(
                            "\n                    " +
                              _vm._s(uf) +
                              "\n                "
                          )
                        ])
                      })
                    ],
                    2
                  )
                ],
                1
              )
            : _vm._e(),
          _vm._v(" "),
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
                      staticClass: "pa-0 px-2",
                      attrs: { "disable-icon-rotate": "" },
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "actions",
                            fn: function() {
                              return [
                                _c(
                                  "v-chip",
                                  {
                                    attrs: {
                                      "x-small": "",
                                      title: "Number of uploaded item invoices"
                                    }
                                  },
                                  [
                                    _vm._v(
                                      "\n                            " +
                                        _vm._s(
                                          summary.lines_count_uploaded +
                                            summary.cm_lines_count_uploaded
                                        ) +
                                        "\n                        "
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
                      _c("span", { staticClass: "text-caption" }, [
                        _vm._v(_vm._s(summary.file_name))
                      ])
                    ]
                  ),
                  _vm._v(" "),
                  _c("v-expansion-panel-content", { staticClass: "pa-0" }, [
                    _c(
                      "div",
                      { staticClass: "px-0 pt-3" },
                      [
                        _c(
                          "v-row",
                          [
                            _c("v-col", [
                              _c("div", { staticClass: "caption" }, [
                                _vm._v(
                                  "\n                                    Invoice\n                                "
                                )
                              ]),
                              _vm._v(" "),
                              _c("table", { staticClass: "table" }, [
                                _c("tbody", [
                                  _c("tr", [
                                    _c(
                                      "td",
                                      {
                                        staticClass:
                                          "caption font-weight-bold pr-4"
                                      },
                                      [_vm._v("Headers Read")]
                                    ),
                                    _vm._v(" "),
                                    _c("td", [
                                      _vm._v(_vm._s(summary.headers_count))
                                    ])
                                  ]),
                                  _vm._v(" "),
                                  _c("tr", [
                                    _c(
                                      "td",
                                      {
                                        staticClass:
                                          "caption font-weight-bold pr-4"
                                      },
                                      [_vm._v("Headers Existing")]
                                    ),
                                    _vm._v(" "),
                                    _c("td", [
                                      _vm._v(
                                        _vm._s(summary.headers_count_existing)
                                      )
                                    ])
                                  ]),
                                  _vm._v(" "),
                                  _c("tr", [
                                    _c(
                                      "td",
                                      {
                                        staticClass:
                                          "caption font-weight-bold pr-4"
                                      },
                                      [_vm._v("Headers Uploaded")]
                                    ),
                                    _vm._v(" "),
                                    _c("td", [
                                      _vm._v(
                                        _vm._s(summary.headers_count_uploaded)
                                      )
                                    ])
                                  ]),
                                  _vm._v(" "),
                                  _c("tr", [
                                    _c(
                                      "td",
                                      { attrs: { colspan: "2" } },
                                      [_c("v-divider")],
                                      1
                                    )
                                  ]),
                                  _vm._v(" "),
                                  _c("tr", [
                                    _c(
                                      "td",
                                      {
                                        staticClass:
                                          "caption font-weight-bold pr-4"
                                      },
                                      [_vm._v("Lines Read")]
                                    ),
                                    _vm._v(" "),
                                    _c("td", [
                                      _vm._v(_vm._s(summary.lines_count))
                                    ])
                                  ]),
                                  _vm._v(" "),
                                  _c("tr", [
                                    _c(
                                      "td",
                                      {
                                        staticClass:
                                          "caption font-weight-bold pr-4"
                                      },
                                      [_vm._v("Lines Existing")]
                                    ),
                                    _vm._v(" "),
                                    _c("td", [
                                      _vm._v(
                                        _vm._s(summary.lines_count_existing)
                                      )
                                    ])
                                  ]),
                                  _vm._v(" "),
                                  _c("tr", [
                                    _c(
                                      "td",
                                      {
                                        staticClass:
                                          "caption font-weight-bold pr-4"
                                      },
                                      [_vm._v("Lines Uploaded")]
                                    ),
                                    _vm._v(" "),
                                    _c("td", [
                                      _vm._v(
                                        _vm._s(summary.lines_count_uploaded)
                                      )
                                    ])
                                  ])
                                ])
                              ])
                            ]),
                            _vm._v(" "),
                            _c("v-col", [
                              _c("div", { staticClass: "caption" }, [
                                _vm._v(
                                  "\n                                    Return (CM)\n                                "
                                )
                              ]),
                              _vm._v(" "),
                              _c("table", { staticClass: "table" }, [
                                _c("tbody", [
                                  _c("tr", [
                                    _c(
                                      "td",
                                      {
                                        staticClass:
                                          "caption font-weight-bold pr-4"
                                      },
                                      [_vm._v("Headers Read")]
                                    ),
                                    _vm._v(" "),
                                    _c("td", [
                                      _vm._v(_vm._s(summary.cm_headers_count))
                                    ])
                                  ]),
                                  _vm._v(" "),
                                  _c("tr", [
                                    _c(
                                      "td",
                                      { attrs: { colspan: "2" } },
                                      [_c("v-divider")],
                                      1
                                    )
                                  ]),
                                  _vm._v(" "),
                                  _c("tr", [
                                    _c(
                                      "td",
                                      {
                                        staticClass:
                                          "caption font-weight-bold pr-4"
                                      },
                                      [_vm._v("Lines Read")]
                                    ),
                                    _vm._v(" "),
                                    _c("td", [
                                      _vm._v(_vm._s(summary.cm_lines_count))
                                    ])
                                  ]),
                                  _vm._v(" "),
                                  _c("tr", [
                                    _c(
                                      "td",
                                      {
                                        staticClass:
                                          "caption font-weight-bold pr-4"
                                      },
                                      [_vm._v("Lines Existing")]
                                    ),
                                    _vm._v(" "),
                                    _c("td", [
                                      _vm._v(
                                        _vm._s(summary.cm_lines_count_existing)
                                      )
                                    ])
                                  ]),
                                  _vm._v(" "),
                                  _c("tr", [
                                    _c(
                                      "td",
                                      {
                                        staticClass:
                                          "caption font-weight-bold pr-4"
                                      },
                                      [_vm._v("Lines Uploaded")]
                                    ),
                                    _vm._v(" "),
                                    _c("td", [
                                      _vm._v(
                                        _vm._s(summary.cm_lines_count_uploaded)
                                      )
                                    ])
                                  ])
                                ])
                              ])
                            ])
                          ],
                          1
                        )
                      ],
                      1
                    )
                  ])
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
//# sourceMappingURL=2.js.map