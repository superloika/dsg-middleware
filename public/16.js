(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[16],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/BRUpload.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/BRUpload.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      tab: null,
      uploadAttempts: 0,
      batchUploadStates: [],
      batches: []
    };
  },
  computed: {
    tblHeader: function tblHeader() {
      return [{
        text: 'Item Name',
        value: 'item_name'
      }, {
        text: 'SKU External ID',
        value: 'sku_external_id'
      }, {
        text: 'SKU UOM',
        value: 'sku_uom'
      }, {
        text: 'Price per Item',
        value: 'price_per_item'
      }, {
        text: 'Quantity',
        value: 'quantity'
      }, {
        text: 'Discount Amount',
        value: 'discount_value'
      }, {
        text: 'Amount',
        value: 'gross_value'
      }];
    },
    // batches() {
    //     return this.BrStore.state.currentGeneratedBatches;
    // },
    stillUploading: function stillUploading() {
      return this.batchUploadStates.find(function (e) {
        return e == 'uploading';
      }) != undefined;
    },
    enableReupload: function enableReupload() {
      return this.batchUploadStates.find(function (e) {
        return e == 'failed';
      }) != undefined;
    },
    bussinessUnit: function bussinessUnit() {
      return this[this.PrincipalsStore.state.selectedPrincipalCode].state.bu;
    }
  },
  methods: {
    upload: function upload() {
      var _this = this;

      if (this.batches) {
        var confMsg = this.enableReupload ? 'This action will reupload the failed batch(es) to the BeatRoute backend' : 'This action will upload the invoices to the BeatRoute backend';

        if (confirm(confMsg)) {
          this.uploadAttempts++;

          var _loop = function _loop(i) {
            if (_this.batchUploadStates[i] == undefined || _this.batchUploadStates[i] == 'failed') {
              Vue.set(_this.batchUploadStates, i, 'uploading');
              var batch = _this.batches[i];

              _this.BrStore.invoiceCreate(_this.bussinessUnit, batch).then(function (res) {
                if (res.success) {
                  // set status as 'uploaded'
                  _this.InvoicesStore.setInvoicesUploaded(res.data).then(function (response) {
                    if (response.success) {
                      Vue.set(_this.batchUploadStates, i, 'success');
                      var batchLen = batch.length;

                      for (var j = 0; j < batchLen; j++) {
                        batch[j].upload_status = response.batch[j];
                      }
                    } else {
                      Vue.set(_this.batchUploadStates, i, 'failed');
                    }
                  });
                } else {
                  Vue.set(_this.batchUploadStates, i, 'failed');
                }
              });
            }
          };

          for (var i = 0; i < this.batches.length; i++) {
            _loop(i);
          }
        }
      }
    },
    cancel: function cancel() {
      if (confirm('Are you sure you want to close this window?')) {
        // regenerate templated data if upload states has been modified
        if (this.batchUploadStates[0]) {
          this.batchUploadStates = [];
          this.PrincipalsStore.initCurrentGeneratedData(null, this.InvoicesStore.state.invoiceStatus);
        }

        this.tab = null;
        this.uploadAttempts = 0;
        this.BrStore.state.brUploadDialogOpen = false;
      }
    },
    prepareBatches: function prepareBatches() {
      var _this2 = this;

      var vm = this;
      vm.AppStore.overlay(true, 'Preparing batches...');
      vm.BrStore.preparePayload(vm.PrincipalsStore.state.currentGeneratedData).then(function (batches) {
        // vm.BrStore.state.currentGeneratedBatches = [];
        // vm.BrStore.state.currentGeneratedBatches = batches;
        _this2.batches = [];
        _this2.batches = batches;
        vm.AppStore.overlay(false);
        console.log('BATCHES:', _this2.batches);
      });
    }
  },
  created: function created() {
    this.prepareBatches();
  },
  mounted: function mounted() {
    console.log("BRUpload component mounted");
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/BRUpload.vue?vue&type=template&id=c07a9e58&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/BRUpload.vue?vue&type=template&id=c07a9e58& ***!
  \************************************************************************************************************************************************************************************************************************/
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
      _c(
        "v-toolbar",
        { attrs: { elevation: "0" } },
        [
          _c(
            "v-toolbar-title",
            [
              _c("v-icon", { attrs: { color: "primary" } }, [
                _vm._v("mdi-cloud-upload")
              ]),
              _vm._v("\n            BeatRoute Upload\n        ")
            ],
            1
          ),
          _vm._v(" "),
          _c("v-spacer"),
          _vm._v(" "),
          _c(
            "v-btn",
            {
              staticClass: "ml-2",
              attrs: {
                color: "primary",
                rounded: "",
                dense: "",
                depressed: "",
                disabled:
                  !_vm.batches.length ||
                  _vm.stillUploading ||
                  (!_vm.enableReupload && _vm.uploadAttempts > 0)
              },
              on: { click: _vm.upload }
            },
            [
              _vm._v(
                "\n            " +
                  _vm._s(
                    _vm.enableReupload ? "Reupload failed batch(es)" : "Upload"
                  ) +
                  "\n        "
              )
            ]
          ),
          _vm._v(" "),
          _c(
            "v-btn",
            {
              staticClass: "ml-2",
              attrs: {
                rounded: "",
                dense: "",
                depressed: "",
                disabled: _vm.stillUploading
              },
              on: {
                click: function($event) {
                  $event.stopPropagation()
                  return _vm.cancel.apply(null, arguments)
                }
              }
            },
            [_vm._v("\n            Close\n        ")]
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-card-text",
        { staticClass: "pt-2" },
        [
          _c(
            "v-row",
            [
              _c(
                "v-col",
                { attrs: { cols: "12", md: "2" } },
                [
                  _c(
                    "v-tabs",
                    {
                      attrs: { vertical: "", grow: "" },
                      model: {
                        value: _vm.tab,
                        callback: function($$v) {
                          _vm.tab = $$v
                        },
                        expression: "tab"
                      }
                    },
                    _vm._l(_vm.batches, function(b, i) {
                      return _c("v-tab", { key: i }, [
                        _c(
                          "div",
                          { staticClass: "px-2 font-weight-bold text-left" },
                          [
                            _vm._v(
                              "\n                            Batch " +
                                _vm._s(i + 1) +
                                " of " +
                                _vm._s(_vm.batches.length) +
                                "\n                            "
                            ),
                            _vm.batchUploadStates[i] == "uploading"
                              ? _c("v-progress-circular", {
                                  attrs: {
                                    indeterminate: "",
                                    dark: "",
                                    size: 20
                                  }
                                })
                              : _vm.batchUploadStates[i] == "success"
                              ? _c("v-icon", { attrs: { color: "success" } }, [
                                  _vm._v(
                                    "\n                                mdi-check-circle\n                            "
                                  )
                                ])
                              : _vm.batchUploadStates[i] == "failed"
                              ? _c("v-icon", { attrs: { color: "error" } }, [
                                  _vm._v(
                                    "\n                                mdi-alert\n                            "
                                  )
                                ])
                              : _vm._e()
                          ],
                          1
                        )
                      ])
                    }),
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "12", md: "10" } },
                [
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
                    _vm._l(_vm.batches, function(b, batchIndex) {
                      return _c(
                        "v-tab-item",
                        { key: batchIndex },
                        [
                          _c(
                            "v-container",
                            { attrs: { fluid: "" } },
                            [
                              _c(
                                "v-expansion-panels",
                                { attrs: { focusable: "", multiple: "" } },
                                _vm._l(b, function(invoice, i) {
                                  return _c(
                                    "v-expansion-panel",
                                    { key: i },
                                    [
                                      _c("v-expansion-panel-header", [
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "text-caption font-weight-boldx",
                                            class:
                                              invoice.upload_status.success ==
                                              true
                                                ? "primary--text"
                                                : invoice.upload_status
                                                    .success == false
                                                ? "error--text"
                                                : ""
                                          },
                                          [
                                            _vm._v(
                                              "\n                                            " +
                                                _vm._s(i + 1) +
                                                ". " +
                                                _vm._s(
                                                  invoice.isReturn
                                                    ? "Return Invoice"
                                                    : "Invoice"
                                                ) +
                                                " " +
                                                _vm._s(
                                                  invoice.erp_invoice_number
                                                ) +
                                                "\n                                            ("
                                            ),
                                            _c("em", [
                                              _vm._v(
                                                _vm._s(invoice.details.length) +
                                                  " item/s"
                                              )
                                            ]),
                                            _vm._v(
                                              ")\n\n                                            "
                                            ),
                                            invoice.upload_status.success ==
                                            false
                                              ? _c(
                                                  "span",
                                                  {
                                                    staticClass:
                                                      "font-weight-bold"
                                                  },
                                                  [
                                                    _vm._v(
                                                      "\n                                                | Error:\n                                                " +
                                                        _vm._s(
                                                          invoice.upload_status
                                                            .message
                                                        ) +
                                                        "\n                                                (" +
                                                        _vm._s(
                                                          invoice.upload_status
                                                            .value
                                                        ) +
                                                        ")\n                                            "
                                                    )
                                                  ]
                                                )
                                              : _vm._e(),
                                            _vm._v(" "),
                                            invoice.upload_status.success ==
                                            true
                                              ? _c(
                                                  "span",
                                                  {
                                                    staticClass:
                                                      "font-weight-bold"
                                                  },
                                                  [
                                                    _vm._v(
                                                      "\n                                                | " +
                                                        _vm._s(
                                                          invoice.upload_status
                                                            .message
                                                        ) +
                                                        "\n                                            "
                                                    )
                                                  ]
                                                )
                                              : _vm._e()
                                          ]
                                        )
                                      ]),
                                      _vm._v(" "),
                                      _c(
                                        "v-expansion-panel-content",
                                        { staticClass: "pt-4" },
                                        [
                                          _c(
                                            "div",
                                            { staticClass: "d-flex pb-4" },
                                            [
                                              _c(
                                                "div",
                                                { staticClass: "pr-6 " },
                                                [
                                                  _vm._v(
                                                    "\n                                                " +
                                                      _vm._s(
                                                        invoice.isReturn
                                                          ? "Return Invoice"
                                                          : "Invoice"
                                                      ) +
                                                      " #: "
                                                  ),
                                                  _c("br"),
                                                  _c("b", [
                                                    _vm._v(
                                                      _vm._s(
                                                        invoice.erp_invoice_number
                                                      )
                                                    )
                                                  ])
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "div",
                                                { staticClass: "pr-6 " },
                                                [
                                                  _vm._v("Customer: "),
                                                  _c("br"),
                                                  _c("b", [
                                                    _vm._v(
                                                      _vm._s(
                                                        invoice.customer_name
                                                      )
                                                    )
                                                  ])
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "div",
                                                { staticClass: "pr-6 " },
                                                [
                                                  _vm._v("Amount: "),
                                                  _c("br"),
                                                  _c("b", [
                                                    _vm._v(
                                                      _vm._s(
                                                        invoice.total_value.toFixed(
                                                          4
                                                        )
                                                      )
                                                    )
                                                  ])
                                                ]
                                              ),
                                              _vm._v(" "),
                                              invoice.isReturn
                                                ? _c(
                                                    "div",
                                                    { staticClass: "pr-6 " },
                                                    [
                                                      _vm._v(
                                                        "\n                                                Return Indicator: "
                                                      ),
                                                      _c("br"),
                                                      _c("b", [
                                                        _vm._v(
                                                          _vm._s(
                                                            invoice
                                                              .customFields[1]
                                                              .value
                                                          )
                                                        )
                                                      ])
                                                    ]
                                                  )
                                                : _vm._e(),
                                              _vm._v(" "),
                                              invoice.isReturn
                                                ? _c(
                                                    "div",
                                                    { staticClass: "pr-6 " },
                                                    [
                                                      _vm._v(
                                                        "\n                                                Return Invoice Reference: "
                                                      ),
                                                      _c("br"),
                                                      _c("b", [
                                                        _vm._v(
                                                          _vm._s(
                                                            invoice
                                                              .customFields[2]
                                                              .value
                                                          )
                                                        )
                                                      ])
                                                    ]
                                                  )
                                                : _vm._e(),
                                              _vm._v(" "),
                                              invoice.isReturn
                                                ? _c(
                                                    "div",
                                                    { staticClass: "pr-6 " },
                                                    [
                                                      _vm._v(
                                                        "\n                                                Remarks: "
                                                      ),
                                                      _c("br"),
                                                      _c("b", [
                                                        _vm._v(
                                                          _vm._s(
                                                            invoice.remarks
                                                          )
                                                        )
                                                      ])
                                                    ]
                                                  )
                                                : _vm._e()
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "div",
                                            [
                                              _c("v-data-table", {
                                                attrs: {
                                                  dense: "",
                                                  headers: _vm.tblHeader,
                                                  items: invoice.details
                                                },
                                                scopedSlots: _vm._u(
                                                  [
                                                    {
                                                      key:
                                                        "item.price_per_item",
                                                      fn: function(ref) {
                                                        var item = ref.item
                                                        return [
                                                          _c(
                                                            "div",
                                                            {
                                                              staticClass:
                                                                "text-right"
                                                            },
                                                            [
                                                              _vm._v(
                                                                "\n                                                        " +
                                                                  _vm._s(
                                                                    item.price_per_item
                                                                  ) +
                                                                  "\n                                                    "
                                                              )
                                                            ]
                                                          )
                                                        ]
                                                      }
                                                    },
                                                    {
                                                      key:
                                                        "item.discount_value",
                                                      fn: function(ref) {
                                                        var item = ref.item
                                                        return [
                                                          _c(
                                                            "div",
                                                            {
                                                              staticClass:
                                                                "text-right"
                                                            },
                                                            [
                                                              _vm._v(
                                                                "\n                                                        " +
                                                                  _vm._s(
                                                                    item.discount_value.toFixed(
                                                                      4
                                                                    )
                                                                  ) +
                                                                  "\n                                                    "
                                                              )
                                                            ]
                                                          )
                                                        ]
                                                      }
                                                    },
                                                    {
                                                      key: "item.gross_value",
                                                      fn: function(ref) {
                                                        var item = ref.item
                                                        return [
                                                          _c(
                                                            "div",
                                                            {
                                                              staticClass:
                                                                "text-right"
                                                            },
                                                            [
                                                              _vm._v(
                                                                "\n                                                        " +
                                                                  _vm._s(
                                                                    item.gross_value.toFixed(
                                                                      4
                                                                    )
                                                                  ) +
                                                                  "\n                                                    "
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
                                            ],
                                            1
                                          )
                                        ]
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
                    }),
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

/***/ "./resources/js/pages/Principals/common/BRUpload.vue":
/*!***********************************************************!*\
  !*** ./resources/js/pages/Principals/common/BRUpload.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BRUpload_vue_vue_type_template_id_c07a9e58___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BRUpload.vue?vue&type=template&id=c07a9e58& */ "./resources/js/pages/Principals/common/BRUpload.vue?vue&type=template&id=c07a9e58&");
/* harmony import */ var _BRUpload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BRUpload.vue?vue&type=script&lang=js& */ "./resources/js/pages/Principals/common/BRUpload.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _BRUpload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _BRUpload_vue_vue_type_template_id_c07a9e58___WEBPACK_IMPORTED_MODULE_0__["render"],
  _BRUpload_vue_vue_type_template_id_c07a9e58___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Principals/common/BRUpload.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Principals/common/BRUpload.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/BRUpload.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BRUpload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./BRUpload.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/BRUpload.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_BRUpload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Principals/common/BRUpload.vue?vue&type=template&id=c07a9e58&":
/*!******************************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/BRUpload.vue?vue&type=template&id=c07a9e58& ***!
  \******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BRUpload_vue_vue_type_template_id_c07a9e58___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./BRUpload.vue?vue&type=template&id=c07a9e58& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/BRUpload.vue?vue&type=template&id=c07a9e58&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BRUpload_vue_vue_type_template_id_c07a9e58___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BRUpload_vue_vue_type_template_id_c07a9e58___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=16.js.map