(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
        text: 'Price per Item (VAT-Ex)',
        value: 'price_per_item'
      }, {
        text: 'Quantity',
        value: 'quantity'
      }, // {
      //     text: 'Amount',
      //     value: 'amount_wo_discount'
      // },
      {
        text: 'Discount %',
        value: 'discount_percentage'
      }, {
        text: 'Discount Amount',
        value: 'discount_value'
      }, {
        text: 'Amount (Discounted)',
        value: 'discounted_amount'
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
      return this.PrincipalsStore.state.configs.bu;
    },
    disableUploadBtn: function disableUploadBtn() {
      return !this.batches.length || this.stillUploading || !this.enableReupload && this.uploadAttempts > 0;
    }
  },
  methods: {
    // set status to '0' for cancel/archive
    upload: function upload() {
      var _this = this;

      if (this.batches) {
        var confMsg = this.enableReupload ? 'This action will reupload the failed batch(es) to the BeatRoute backend' : 'This action will upload the invoices to the BeatRoute backend';

        if (confirm(confMsg)) {
          this.uploadAttempts++;

          var _loop = function _loop(i) {
            // refilter prepared payload, unchecked(included==false) are not uploaded
            var batch = _this.batches[i].filter(function (e) {
              return e.included;
            });

            console.log('BATCH ' + i, batch);
            var batchLen = batch.length;

            if ((_this.batchUploadStates[i] == undefined || _this.batchUploadStates[i] == 'failed') && batchLen) {
              Vue.set(_this.batchUploadStates, i, 'uploading');

              _this.BrStore.invoiceCreate(_this.bussinessUnit, batch).then(function (res) {
                if (res.success) {
                  if (_this.InvoicesStore.state.invoiceStatus == 'completed' || _this.InvoicesStore.state.invoiceStatus == 'pending') {
                    // set status as 'uploaded'
                    _this.InvoicesStore.setInvoicesUploaded(res.data).then(function (response) {
                      if (response.success) {
                        Vue.set(_this.batchUploadStates, i, 'success');

                        for (var j = 0; j < batchLen; j++) {
                          batch[j].upload_status = response.batch[j];
                        }
                      } else {
                        Vue.set(_this.batchUploadStates, i, 'failed');
                      }
                    });
                  } else if (_this.InvoicesStore.state.invoiceStatus == 'uploaded') {
                    // set status from 'uploaded' back to 'completed''
                    _this.InvoicesStore.setInvoicesCancelled(res.data).then(function (response) {
                      if (response.success) {
                        Vue.set(_this.batchUploadStates, i, 'success');

                        for (var j = 0; j < batchLen; j++) {
                          batch[j].upload_status = response.batch[j];
                        }
                      } else {
                        Vue.set(_this.batchUploadStates, i, 'failed');
                      }
                    });
                  }
                } else {
                  Vue.set(_this.batchUploadStates, i, 'failed');

                  try {
                    for (var j = 0; j < batchLen; j++) {
                      batch[j].upload_status = res.data[j];
                    }
                  } catch (error) {
                    console.log('ERRRRR1111111111111111111', error);
                  }
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
        if (this.batchUploadStates[0] || this.uploadAttempts > 0) {
          var _this$PrincipalsStore;

          this.batchUploadStates = [];
          this.PrincipalsStore.initCurrentGeneratedData(null, this.InvoicesStore.state.invoiceStatus, (_this$PrincipalsStore = this.PrincipalsStore.state.configs.posting_date_format) !== null && _this$PrincipalsStore !== void 0 ? _this$PrincipalsStore : 'm/d/Y');
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
        _this2.batches = [];
        _this2.batches = batches;
        vm.AppStore.overlay(false);
        console.log('BATCHES:', _this2.batches);
      });
    },
    selectAll: function selectAll(batchIndex) {
      var included = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (this.batches) {
        this.batches[batchIndex].forEach(function (e) {
          // mo gana ra if walay error ang invoice
          if (e.with_errors.length == 0) {
            e.included = included;
          }
        });
      }
    },
    // display invoices in currently selected batch
    checkdata: function checkdata(batchIndex) {
      if (this.batches) {
        console.log('BATCH:', this.batches[batchIndex]);
      }
    },
    overrideInvoiceProperty: function overrideInvoiceProperty(batchIndex, invoiceIndex, errorCode, overrideValue) {
      if (confirm("Override with \"".concat(overrideValue, "\"?"))) {
        if (errorCode == 'return_indicator_empty') {
          this.batches[batchIndex][invoiceIndex].customFields[1].value = overrideValue;
        } else if (errorCode == 'return_reason_empty') {
          this.batches[batchIndex][invoiceIndex].remarks = overrideValue;
        }

        this.batches[batchIndex][invoiceIndex].with_errors = this.batches[batchIndex][invoiceIndex].with_errors.filter(function (e) {
          return e.search(errorCode) == -1;
        });

        if (this.batches[batchIndex][invoiceIndex].with_errors.length < 1) {
          this.batches[batchIndex][invoiceIndex].included = true;
        }
      }
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

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/BRUpload.vue?vue&type=style&index=0&id=c07a9e58&scoped=true&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/BRUpload.vue?vue&type=style&index=0&id=c07a9e58&scoped=true&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\ntable.invoice-detail[data-v-c07a9e58] {\n    font-size: smaller;\n    border-collapse: collapse;\n    width: 100%;\n}\ntable.invoice-detail td[data-v-c07a9e58], table.invoice-detail th[data-v-c07a9e58] {\n    border: 1px solid #f3f3f3;\n    text-align: left;\n    padding: 4px;\n}\ntable.invoice-detail tr th[data-v-c07a9e58] {\n    background-color: #f3f3f3;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/BRUpload.vue?vue&type=style&index=0&id=c07a9e58&scoped=true&lang=css&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/BRUpload.vue?vue&type=style&index=0&id=c07a9e58&scoped=true&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--6-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--6-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./BRUpload.vue?vue&type=style&index=0&id=c07a9e58&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/BRUpload.vue?vue&type=style&index=0&id=c07a9e58&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/BRUpload.vue?vue&type=template&id=c07a9e58&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/BRUpload.vue?vue&type=template&id=c07a9e58&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************/
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
              _vm._v(
                "\n            BeatRoute Upload\n            " +
                  _vm._s(
                    this.InvoicesStore.state.invoiceStatus == "uploaded"
                      ? "(Cancellation)"
                      : ""
                  ) +
                  "\n        "
              )
            ],
            1
          ),
          _vm._v(" "),
          _c("v-spacer"),
          _vm._v(" "),
          _c(
            "v-btn",
            {
              attrs: {
                rounded: "",
                dense: "",
                depressed: "",
                color:
                  this.InvoicesStore.state.invoiceStatus == "completed" ||
                  this.InvoicesStore.state.invoiceStatus == "pending"
                    ? "primary"
                    : "error",
                disabled: _vm.disableUploadBtn
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
          _c("div", { staticClass: "ml-3" }, [_c("InvoiceLookup")], 1),
          _vm._v(" "),
          _c(
            "v-btn",
            {
              attrs: { icon: "", disabled: _vm.stillUploading },
              on: {
                click: function($event) {
                  $event.stopPropagation()
                  return _vm.cancel.apply(null, arguments)
                }
              }
            },
            [_c("v-icon", [_vm._v("mdi-close")])],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _vm.batches.length < 1
        ? _c("v-card-text", { staticClass: "d-flex justify-center" }, [
            _c("div", [_vm._v("No available data to display")])
          ])
        : _vm._e(),
      _vm._v(" "),
      _c(
        "v-toolbar",
        { attrs: { elevation: "0", dense: "" } },
        [
          _c(
            "v-tabs",
            {
              attrs: { verticalx: "", growx: "" },
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
                  {
                    staticClass: "px-2 font-weight-bold text-left text-caption"
                  },
                  [
                    _vm._v(
                      "\n                    Batch " +
                        _vm._s(i + 1) +
                        "/" +
                        _vm._s(_vm.batches.length) +
                        "\n                    "
                    ),
                    _vm.batchUploadStates[i] == "uploading"
                      ? _c("v-progress-circular", {
                          attrs: { indeterminate: "", dark: "", size: 20 }
                        })
                      : _vm.batchUploadStates[i] == "success"
                      ? _c("v-icon", { attrs: { color: "success" } }, [
                          _vm._v(
                            "\n                        mdi-check-circle\n                    "
                          )
                        ])
                      : _vm.batchUploadStates[i] == "failed"
                      ? _c("v-icon", { attrs: { color: "error" } }, [
                          _vm._v(
                            "\n                        mdi-alert\n                    "
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
        "v-card-text",
        { staticClass: "pt-2" },
        [
          _c(
            "v-row",
            [
              _c(
                "v-col",
                { attrs: { cols: "12", md: "12" } },
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
                        { key: b[0].erp_invoice_number + b[0].invoice_date },
                        [
                          _c(
                            "v-container",
                            { attrs: { fluid: "" } },
                            [
                              _c(
                                "v-btn",
                                {
                                  attrs: {
                                    small: "",
                                    rounded: "",
                                    depressed: "",
                                    color: "primary",
                                    disabled: _vm.disableUploadBtn
                                  },
                                  on: {
                                    click: function($event) {
                                      return _vm.selectAll(batchIndex, true)
                                    }
                                  }
                                },
                                [
                                  _vm._v(
                                    "\n                                Select All\n                            "
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c(
                                "v-btn",
                                {
                                  attrs: {
                                    small: "",
                                    rounded: "",
                                    depressed: "",
                                    color: "primary",
                                    disabled: _vm.disableUploadBtn
                                  },
                                  on: {
                                    click: function($event) {
                                      return _vm.selectAll(batchIndex, false)
                                    }
                                  }
                                },
                                [
                                  _vm._v(
                                    "\n                                Deselect All\n                            "
                                  )
                                ]
                              )
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-container",
                            { attrs: { fluid: "" } },
                            [
                              _c(
                                "v-expansion-panels",
                                { attrs: { focusable: "", multiple: "" } },
                                _vm._l(b, function(invoice, invoiceIndex) {
                                  return _c(
                                    "v-expansion-panel",
                                    {
                                      key: "xpnsn-" + invoice.erp_invoice_number
                                    },
                                    [
                                      _c("v-expansion-panel-header", [
                                        _c(
                                          "div",
                                          {
                                            staticClass:
                                              "text-caption font-weight-boldx d-flex",
                                            class:
                                              invoice.upload_status !=
                                                undefined &&
                                              invoice.upload_status.success ==
                                                true
                                                ? "primary--text"
                                                : (invoice.upload_status !=
                                                    undefined &&
                                                    invoice.upload_status
                                                      .success == false) ||
                                                  invoice.with_errors.length
                                                ? "error--text"
                                                : ""
                                          },
                                          [
                                            _c("v-checkbox", {
                                              key:
                                                "chkbx-" +
                                                invoice.erp_invoice_number,
                                              staticClass: "pa-0 ma-0",
                                              attrs: {
                                                dense: "",
                                                "hide-details": "",
                                                color: "secondary",
                                                title:
                                                  "Check to include, uncheck to exclude",
                                                disabled:
                                                  _vm.disableUploadBtn ||
                                                  invoice.with_errors.length > 0
                                              },
                                              model: {
                                                value: invoice.included,
                                                callback: function($$v) {
                                                  _vm.$set(
                                                    invoice,
                                                    "included",
                                                    $$v
                                                  )
                                                },
                                                expression: "invoice.included"
                                              }
                                            }),
                                            _vm._v(
                                              "\n\n                                            " +
                                                _vm._s(invoiceIndex + 1) +
                                                ". " +
                                                _vm._s(
                                                  invoice.isReturn
                                                    ? "CM #:"
                                                    : "Invoice #:"
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
                                            invoice.upload_status !=
                                              undefined &&
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
                                            invoice.upload_status !=
                                              undefined &&
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
                                          ],
                                          1
                                        )
                                      ]),
                                      _vm._v(" "),
                                      _c(
                                        "v-expansion-panel-content",
                                        { staticClass: "pt-4" },
                                        [
                                          invoice.with_errors.length
                                            ? _c(
                                                "div",
                                                { staticClass: "p-2 mb-4" },
                                                _vm._l(
                                                  invoice.with_errors,
                                                  function(err, i) {
                                                    return _c(
                                                      "div",
                                                      {
                                                        key: i,
                                                        staticClass: "mb-1"
                                                      },
                                                      [
                                                        _c(
                                                          "div",
                                                          {
                                                            staticClass:
                                                              "error--text"
                                                          },
                                                          [
                                                            _c(
                                                              "v-chip",
                                                              {
                                                                attrs: {
                                                                  color:
                                                                    "error",
                                                                  "x-small": ""
                                                                }
                                                              },
                                                              [
                                                                _vm._v(
                                                                  "\n                                                        Error\n                                                    "
                                                                )
                                                              ]
                                                            ),
                                                            _vm._v(
                                                              "\n                                                    " +
                                                                _vm._s(err) +
                                                                "\n                                                "
                                                            )
                                                          ],
                                                          1
                                                        )
                                                      ]
                                                    )
                                                  }
                                                ),
                                                0
                                              )
                                            : _vm._e(),
                                          _vm._v(" "),
                                          _c("div", { staticClass: "pb-4" }, [
                                            _c(
                                              "table",
                                              { staticClass: "invoice-detail" },
                                              [
                                                _c("tr", [
                                                  _c("th", [
                                                    _vm._v(
                                                      _vm._s(
                                                        invoice.isReturn
                                                          ? "CM"
                                                          : "Invoice"
                                                      ) + " #"
                                                    )
                                                  ]),
                                                  _vm._v(" "),
                                                  _c("th", [
                                                    _vm._v("Invoice Date")
                                                  ]),
                                                  _vm._v(" "),
                                                  _c("th", [
                                                    _vm._v("Customer")
                                                  ]),
                                                  _vm._v(" "),
                                                  _c("th", [_vm._v("Amount")]),
                                                  _vm._v(" "),
                                                  _c("th", [_vm._v("DSP")]),
                                                  _vm._v(" "),
                                                  invoice.isReturn
                                                    ? _c("th", [
                                                        _vm._v(
                                                          "Return Indicator"
                                                        )
                                                      ])
                                                    : _vm._e(),
                                                  _vm._v(" "),
                                                  invoice.isReturn
                                                    ? _c("th", [
                                                        _vm._v(
                                                          "Return Invoice Reference"
                                                        )
                                                      ])
                                                    : _vm._e(),
                                                  _vm._v(" "),
                                                  invoice.isReturn
                                                    ? _c("th", [
                                                        _vm._v("Remarks")
                                                      ])
                                                    : _vm._e()
                                                ]),
                                                _vm._v(" "),
                                                _c("tr", [
                                                  _c("td", [
                                                    _vm._v(
                                                      _vm._s(
                                                        invoice.erp_invoice_number
                                                      )
                                                    )
                                                  ]),
                                                  _vm._v(" "),
                                                  _c("td", [
                                                    _vm._v(
                                                      _vm._s(
                                                        invoice.invoice_date
                                                      )
                                                    )
                                                  ]),
                                                  _vm._v(" "),
                                                  _c("td", [
                                                    _vm._v(
                                                      _vm._s(
                                                        invoice.customer_name
                                                      )
                                                    )
                                                  ]),
                                                  _vm._v(" "),
                                                  _c("td", [
                                                    _vm._v(
                                                      _vm._s(
                                                        invoice.invoice_total_amount.toFixed(
                                                          5
                                                        )
                                                      )
                                                    )
                                                  ]),
                                                  _vm._v(" "),
                                                  _c("td", [
                                                    _vm._v(
                                                      _vm._s(
                                                        invoice.customFields[0]
                                                          .value
                                                      )
                                                    )
                                                  ]),
                                                  _vm._v(" "),
                                                  invoice.isReturn
                                                    ? _c(
                                                        "td",
                                                        [
                                                          _vm._v(
                                                            "\n                                                        " +
                                                              _vm._s(
                                                                invoice
                                                                  .customFields[1]
                                                                  .value
                                                              ) +
                                                              "\n                                                        "
                                                          ),
                                                          _c(
                                                            "v-menu",
                                                            {
                                                              attrs: {
                                                                "offset-y": ""
                                                              },
                                                              scopedSlots: _vm._u(
                                                                [
                                                                  {
                                                                    key:
                                                                      "activator",
                                                                    fn: function(
                                                                      ref
                                                                    ) {
                                                                      var on =
                                                                        ref.on
                                                                      var attrs =
                                                                        ref.attrs
                                                                      return [
                                                                        (invoice
                                                                          .customFields[1]
                                                                          .value ==
                                                                          "" ||
                                                                          invoice
                                                                            .customFields[1]
                                                                            .value ==
                                                                            null ||
                                                                          invoice
                                                                            .customFields[1]
                                                                            .value ==
                                                                            "not_specified") &&
                                                                        !_vm.disableUploadBtn
                                                                          ? _c(
                                                                              "v-btn",
                                                                              _vm._g(
                                                                                _vm._b(
                                                                                  {
                                                                                    attrs: {
                                                                                      small:
                                                                                        "",
                                                                                      rounded:
                                                                                        "",
                                                                                      color:
                                                                                        "warning"
                                                                                    }
                                                                                  },
                                                                                  "v-btn",
                                                                                  attrs,
                                                                                  false
                                                                                ),
                                                                                on
                                                                              ),
                                                                              [
                                                                                _vm._v(
                                                                                  "\n                                                                    Override\n                                                                "
                                                                                )
                                                                              ]
                                                                            )
                                                                          : _vm._e()
                                                                      ]
                                                                    }
                                                                  }
                                                                ],
                                                                null,
                                                                true
                                                              )
                                                            },
                                                            [
                                                              _vm._v(" "),
                                                              _c(
                                                                "v-list",
                                                                _vm._l(
                                                                  _vm.BrStore
                                                                    .state
                                                                    .return_indicators,
                                                                  function(
                                                                    reason,
                                                                    index
                                                                  ) {
                                                                    return _c(
                                                                      "v-list-item",
                                                                      {
                                                                        key: index,
                                                                        on: {
                                                                          click: function(
                                                                            $event
                                                                          ) {
                                                                            return _vm.overrideInvoiceProperty(
                                                                              batchIndex,
                                                                              invoiceIndex,
                                                                              "return_indicator_empty",
                                                                              reason
                                                                            )
                                                                          }
                                                                        }
                                                                      },
                                                                      [
                                                                        _c(
                                                                          "v-list-item-title",
                                                                          [
                                                                            _vm._v(
                                                                              _vm._s(
                                                                                reason
                                                                              )
                                                                            )
                                                                          ]
                                                                        )
                                                                      ],
                                                                      1
                                                                    )
                                                                  }
                                                                ),
                                                                1
                                                              )
                                                            ],
                                                            1
                                                          )
                                                        ],
                                                        1
                                                      )
                                                    : _vm._e(),
                                                  _vm._v(" "),
                                                  invoice.isReturn
                                                    ? _c("td", [
                                                        _vm._v(
                                                          _vm._s(
                                                            invoice
                                                              .customFields[2]
                                                              .value
                                                          )
                                                        )
                                                      ])
                                                    : _vm._e(),
                                                  _vm._v(" "),
                                                  invoice.isReturn
                                                    ? _c(
                                                        "td",
                                                        [
                                                          _vm._v(
                                                            "\n                                                        " +
                                                              _vm._s(
                                                                invoice.remarks
                                                              ) +
                                                              "\n                                                        "
                                                          ),
                                                          _c(
                                                            "v-menu",
                                                            {
                                                              attrs: {
                                                                "offset-y": ""
                                                              },
                                                              scopedSlots: _vm._u(
                                                                [
                                                                  {
                                                                    key:
                                                                      "activator",
                                                                    fn: function(
                                                                      ref
                                                                    ) {
                                                                      var on =
                                                                        ref.on
                                                                      var attrs =
                                                                        ref.attrs
                                                                      return [
                                                                        (invoice.remarks ==
                                                                          "" ||
                                                                          invoice.remarks ==
                                                                            null ||
                                                                          invoice.remarks ==
                                                                            "not_specified") &&
                                                                        !_vm.disableUploadBtn
                                                                          ? _c(
                                                                              "v-btn",
                                                                              _vm._g(
                                                                                _vm._b(
                                                                                  {
                                                                                    attrs: {
                                                                                      small:
                                                                                        "",
                                                                                      rounded:
                                                                                        "",
                                                                                      color:
                                                                                        "warning"
                                                                                    }
                                                                                  },
                                                                                  "v-btn",
                                                                                  attrs,
                                                                                  false
                                                                                ),
                                                                                on
                                                                              ),
                                                                              [
                                                                                _vm._v(
                                                                                  "\n                                                                    Override\n                                                                "
                                                                                )
                                                                              ]
                                                                            )
                                                                          : _vm._e()
                                                                      ]
                                                                    }
                                                                  }
                                                                ],
                                                                null,
                                                                true
                                                              )
                                                            },
                                                            [
                                                              _vm._v(" "),
                                                              _c(
                                                                "v-list",
                                                                _vm._l(
                                                                  _vm.BrStore
                                                                    .state
                                                                    .return_reasons,
                                                                  function(
                                                                    reason,
                                                                    index
                                                                  ) {
                                                                    return _c(
                                                                      "v-list-item",
                                                                      {
                                                                        key: index,
                                                                        on: {
                                                                          click: function(
                                                                            $event
                                                                          ) {
                                                                            return _vm.overrideInvoiceProperty(
                                                                              batchIndex,
                                                                              invoiceIndex,
                                                                              "return_reason_empty",
                                                                              reason
                                                                            )
                                                                          }
                                                                        }
                                                                      },
                                                                      [
                                                                        _c(
                                                                          "v-list-item-title",
                                                                          [
                                                                            _vm._v(
                                                                              _vm._s(
                                                                                reason
                                                                              )
                                                                            )
                                                                          ]
                                                                        )
                                                                      ],
                                                                      1
                                                                    )
                                                                  }
                                                                ),
                                                                1
                                                              )
                                                            ],
                                                            1
                                                          )
                                                        ],
                                                        1
                                                      )
                                                    : _vm._e()
                                                ])
                                              ]
                                            )
                                          ]),
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
                                                                    Math.abs(
                                                                      item.discount_value
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
                                                                    item.gross_value
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
                                                        "item.discounted_amount",
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
                                                                    item.discounted_amount
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
                                                        "item.amount_vat_inc",
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
                                                                    item.discounted_amount
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
/* harmony import */ var _BRUpload_vue_vue_type_template_id_c07a9e58_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BRUpload.vue?vue&type=template&id=c07a9e58&scoped=true& */ "./resources/js/pages/Principals/common/BRUpload.vue?vue&type=template&id=c07a9e58&scoped=true&");
/* harmony import */ var _BRUpload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BRUpload.vue?vue&type=script&lang=js& */ "./resources/js/pages/Principals/common/BRUpload.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _BRUpload_vue_vue_type_style_index_0_id_c07a9e58_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BRUpload.vue?vue&type=style&index=0&id=c07a9e58&scoped=true&lang=css& */ "./resources/js/pages/Principals/common/BRUpload.vue?vue&type=style&index=0&id=c07a9e58&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _BRUpload_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _BRUpload_vue_vue_type_template_id_c07a9e58_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _BRUpload_vue_vue_type_template_id_c07a9e58_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "c07a9e58",
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

/***/ "./resources/js/pages/Principals/common/BRUpload.vue?vue&type=style&index=0&id=c07a9e58&scoped=true&lang=css&":
/*!********************************************************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/BRUpload.vue?vue&type=style&index=0&id=c07a9e58&scoped=true&lang=css& ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_BRUpload_vue_vue_type_style_index_0_id_c07a9e58_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader??ref--6-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--6-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./BRUpload.vue?vue&type=style&index=0&id=c07a9e58&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/BRUpload.vue?vue&type=style&index=0&id=c07a9e58&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_BRUpload_vue_vue_type_style_index_0_id_c07a9e58_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_BRUpload_vue_vue_type_style_index_0_id_c07a9e58_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_BRUpload_vue_vue_type_style_index_0_id_c07a9e58_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_BRUpload_vue_vue_type_style_index_0_id_c07a9e58_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/pages/Principals/common/BRUpload.vue?vue&type=template&id=c07a9e58&scoped=true&":
/*!******************************************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/BRUpload.vue?vue&type=template&id=c07a9e58&scoped=true& ***!
  \******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BRUpload_vue_vue_type_template_id_c07a9e58_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./BRUpload.vue?vue&type=template&id=c07a9e58&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/BRUpload.vue?vue&type=template&id=c07a9e58&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BRUpload_vue_vue_type_template_id_c07a9e58_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_BRUpload_vue_vue_type_template_id_c07a9e58_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=7.js.map