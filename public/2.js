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
                                        _vm._s(summary.lines_count_uploaded) +
                                        "\n                        "
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                summary.lines_count == 0 ||
                                summary.headers_count == 0
                                  ? _c(
                                      "v-icon",
                                      { attrs: { color: "error", small: "" } },
                                      [
                                        _vm._v(
                                          "\n                            mdi-alert-circle\n                        "
                                        )
                                      ]
                                    )
                                  : summary.lines_count > 0 &&
                                    summary.lines_count_uploaded == 0
                                  ? _c(
                                      "v-icon",
                                      {
                                        attrs: { color: "warning", small: "" }
                                      },
                                      [
                                        _vm._v(
                                          "\n                            mdi-alert-circle\n                        "
                                        )
                                      ]
                                    )
                                  : summary.lines_count_uploaded > 0 &&
                                    summary.lines_count_existing > 0
                                  ? _c(
                                      "v-icon",
                                      {
                                        attrs: { color: "warning", small: "" }
                                      },
                                      [
                                        _vm._v(
                                          "\n                            mdi-check\n                        "
                                        )
                                      ]
                                    )
                                  : summary.lines_count ==
                                    summary.lines_count_uploaded
                                  ? _c(
                                      "v-icon",
                                      {
                                        attrs: { color: "success", small: "" }
                                      },
                                      [
                                        _vm._v(
                                          "\n                            mdi-check\n                        "
                                        )
                                      ]
                                    )
                                  : _vm._e()
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
                          "v-chip",
                          {
                            staticClass: "px-2 ma-1",
                            attrs: {
                              small: "",
                              title:
                                "Total number of headers being read as valid invoice data header",
                              color:
                                summary.headers_count < 1 ? "error" : "default"
                            }
                          },
                          [
                            _vm._v(
                              "\n                            Headers Read:\n                            " +
                                _vm._s(summary.headers_count) +
                                "\n                        "
                            )
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "v-chip",
                          {
                            staticClass: "px-2 ma-1",
                            attrs: {
                              color: "default",
                              small: "",
                              title:
                                "Total number of headers already exist in the database"
                            }
                          },
                          [
                            _vm._v(
                              "\n                            Headers Existing:\n                            " +
                                _vm._s(summary.headers_count_existing) +
                                "\n                        "
                            )
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "v-chip",
                          {
                            staticClass: "px-2 ma-1",
                            attrs: {
                              color: "default",
                              small: "",
                              title: "Total number of headers uploaded"
                            }
                          },
                          [
                            _vm._v(
                              "\n                            Headers Uploaded:\n                            " +
                                _vm._s(summary.headers_count_uploaded) +
                                "\n                        "
                            )
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "v-chip",
                          {
                            staticClass: "px-2 ma-1",
                            attrs: {
                              small: "",
                              title:
                                "Total number of lines being read as valid invoice data",
                              color:
                                summary.lines_count < 1 ? "error" : "default"
                            }
                          },
                          [
                            _vm._v(
                              "\n                            Lines Read:\n                            " +
                                _vm._s(summary.lines_count) +
                                "\n                        "
                            )
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "v-chip",
                          {
                            staticClass: "px-2 ma-1",
                            attrs: {
                              small: "",
                              title:
                                "Total number of lines already exist in the database"
                            }
                          },
                          [
                            _vm._v(
                              "\n                            Lines Existing:\n                            " +
                                _vm._s(summary.lines_count_existing) +
                                "\n                        "
                            )
                          ]
                        ),
                        _vm._v(" "),
                        _c(
                          "v-chip",
                          {
                            staticClass: "px-2 ma-1",
                            attrs: {
                              color: "default",
                              small: "",
                              title: "Total number of lines uploaded"
                            }
                          },
                          [
                            _vm._v(
                              "\n                            Lines Uploaded:\n                            " +
                                _vm._s(summary.lines_count_uploaded) +
                                "\n                        "
                            )
                          ]
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