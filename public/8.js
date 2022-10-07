(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

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
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      principal_code: "",
      datePickerShown: false,
      date: [new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10)]
    };
  },
  computed: {
    dateRangeText: function dateRangeText() {
      return this.date.join(' ~ ');
    }
  },
  methods: {
    extract: function extract() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var _yield$axios$post, headers, data, contentDisposition, _contentDisposition$s, _contentDisposition$s2, attachment, file, _file$split, _file$split2, key, fileName, url, link;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return axios__WEBPACK_IMPORTED_MODULE_1___default.a.post(_this.AppStore.state.siteUrl + 'invoices/extract', {
                  principal_code: _this.principal_code,
                  posting_date: _this.date
                }, {
                  responseType: 'blob'
                });

              case 2:
                _yield$axios$post = _context.sent;
                headers = _yield$axios$post.headers;
                data = _yield$axios$post.data;
                contentDisposition = headers['content-disposition'];
                _contentDisposition$s = contentDisposition.split(' '), _contentDisposition$s2 = _slicedToArray(_contentDisposition$s, 2), attachment = _contentDisposition$s2[0], file = _contentDisposition$s2[1];
                _file$split = file.split('='), _file$split2 = _slicedToArray(_file$split, 2), key = _file$split2[0], fileName = _file$split2[1];
                url = window.URL.createObjectURL(new Blob([data]));
                link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    extractRawInvoicesToExcel: function extractRawInvoicesToExcel() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this2.InvoicesStore.extractRawInvoicesToExcel(_this2.principal_code, _this2.date);

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    asd: function asd() {
      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
        var _yield$axios$post2, headers, data, contentDisposition, _contentDisposition$s3, _contentDisposition$s4, attachment, file, _file$split3, _file$split4, key, fileName, url, link;

        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return axios__WEBPACK_IMPORTED_MODULE_1___default.a.post('dtr/start-matching', {
                  fileId: fileId
                }, {
                  responseType: 'blob',
                  onDownloadProgress: function onDownloadProgress(progressEvent) {// let percentCompleted = Math.floor(
                    //   (progressEvent.loaded / progressEvent.total) * 100
                    // )
                    // console.log(`${percentCompleted}% Downloaded`)
                  }
                });

              case 2:
                _yield$axios$post2 = _context3.sent;
                headers = _yield$axios$post2.headers;
                data = _yield$axios$post2.data;
                contentDisposition = headers['content-disposition'];
                _contentDisposition$s3 = contentDisposition.split(' '), _contentDisposition$s4 = _slicedToArray(_contentDisposition$s3, 2), attachment = _contentDisposition$s4[0], file = _contentDisposition$s4[1];
                _file$split3 = file.split('='), _file$split4 = _slicedToArray(_file$split3, 2), key = _file$split4[0], fileName = _file$split4[1];
                url = window.URL.createObjectURL(new Blob([data]));
                link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    }
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
                [
                  _c("v-combobox", {
                    attrs: {
                      items: _vm.AppStore.state.principals,
                      label: "Principal",
                      "item-text": "name",
                      "item-value": "code",
                      "return-object": false,
                      outlined: "",
                      rounded: "",
                      "hide-details": "",
                      dense: "",
                      clearable: ""
                    },
                    model: {
                      value: _vm.principal_code,
                      callback: function($$v) {
                        _vm.principal_code = $$v
                      },
                      expression: "principal_code"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
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
//# sourceMappingURL=8.js.map