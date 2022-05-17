(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/GeneratedHistory.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/GeneratedHistory.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    GeneratedTable: function GeneratedTable() {
      return __webpack_require__.e(/*! import() */ 7).then(__webpack_require__.bind(null, /*! ./GeneratedTableWrapper.vue */ "./resources/js/pages/Principals/common/GeneratedTableWrapper.vue"));
    }
  },
  data: function data() {
    return {
      datePickerShown: false,
      date: [new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10)],
      generatedData: [],
      isGenerating: false,
      wrapperID: 'gendata_history_wrapper',
      selectedFilter: null
    };
  },
  computed: {
    // overall
    lineCount: function lineCount() {
      var count = 0;
      this.generatedData.forEach(function (e) {
        count += e[1].length;
      });
      return count;
    },
    dateRangeText: function dateRangeText() {
      return this.date.join(' ~ ');
    },
    myStore: function myStore() {
      return this[this.PrincipalsStore.state.selectedPrincipalCode];
    }
  },
  methods: {
    /**
     * This will regenerate the templated data
     * and will be filtered based on the passed 'date'.
     * The reult will also be grouped based on 'dataProp'
     */
    generate: function generate(date) {
      var _arguments = arguments,
          _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var dataProp, url, payload, res, grouped;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                dataProp = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : '';
                date.sort(); // const url =
                //     this.AppStore.state.siteUrl + "principals/"
                //      + `generated?date=${date}&table_generated=`
                //      + `generated_${this.PrincipalsStore.state.selectedPrincipalCode}`;
                // const url =
                //     this.AppStore.state.siteUrl + "principals"
                //      + `/generated`
                //      + `?date=${date}`
                //      + `&principal_code=${this.PrincipalsStore.state.selectedPrincipalCode}`;

                url = _this.AppStore.state.siteUrl + "principals" + "/generated";
                payload = {
                  date: date,
                  principal_code: _this.PrincipalsStore.state.selectedPrincipalCode,
                  cols: _this.myStore.state.generatedDataDBTableColumns
                };
                _context.prev = 4;
                _this.AppStore.state.showTopLoading = true;
                _this.isGenerating = true;
                _this.generatedData = [];
                _context.next = 10;
                return axios.post(url, payload);

              case 10:
                res = _context.sent;
                grouped = res.data.generated_data.reduce(function (r, a) {
                  r[a[dataProp]] = r[a[dataProp]] || [];
                  r[a[dataProp]].push(a);
                  return r;
                }, Object.create(null));
                _this.generatedData = Object.entries(grouped);
                _this.isGenerating = false;
                _this.AppStore.state.showTopLoading = false;
                _this.dlgSelectDatesShown = false;
                _context.next = 22;
                break;

              case 18:
                _context.prev = 18;
                _context.t0 = _context["catch"](4);
                console.log("generate(): ", _context.t0);

                _this.AppStore.toast(_context.t0);

              case 22:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[4, 18]]);
      }))();
    },
    exportToExcel: function exportToExcel() {
      var config = this.PrincipalsStore.getHeaderAndFormat('generatedDataTableHeader');
      this.PrincipalsStore.exportToExcel(config.header, this.PrincipalsStore.generatedDataSubset(this.generatedData, config.format), null, this.PrincipalsStore.state.selectedPrincipalCode);
    }
  },
  watch: {
    selectedFilter: function selectedFilter(val) {
      this.generate(this.date, val);
    }
  },
  created: function created() {
    this.selectedFilter = this.myStore.state.generatedDataHistoryFilters[0].value; // this.generate(this.date, this.selectedFilter);
  },
  mounted: function mounted() {
    console.log("GeneratedHistory component mounted");
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/GeneratedHistory.vue?vue&type=template&id=7ab5cd88&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/GeneratedHistory.vue?vue&type=template&id=7ab5cd88& ***!
  \********************************************************************************************************************************************************************************************************************************/
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
              _c("v-toolbar-title", [
                _vm._v(
                  "\n                Generated Data History\n                "
                ),
                _vm.lineCount > 0
                  ? _c(
                      "div",
                      [
                        _c(
                          "v-chip",
                          {
                            attrs: {
                              "x-small": "",
                              outlinedx: "",
                              label: "",
                              color: "primary"
                            }
                          },
                          [
                            _vm._v(
                              "\n                        " +
                                _vm._s(_vm.lineCount) +
                                " total line/s\n                    "
                            )
                          ]
                        )
                      ],
                      1
                    )
                  : _vm._e()
              ]),
              _vm._v(" "),
              _c("v-spacer"),
              _vm._v(" "),
              _c("v-text-field", {
                staticClass: "mr-3",
                staticStyle: { "max-width": "230px" },
                attrs: {
                  label: "Date (YYYY-MM-DD)",
                  "hide-details": "",
                  readonly: "",
                  dense: "",
                  outlined: "",
                  rounded: "",
                  disabled: _vm.isGenerating
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
                              _vm.generate(_vm.date, _vm.selectedFilter)
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
              _c("v-select", {
                staticClass: "mr-3",
                staticStyle: { "max-width": "215px" },
                attrs: {
                  items: _vm.myStore.state.generatedDataHistoryFilters,
                  label: "Group By",
                  "item-text": "text",
                  "item-value": "value",
                  disabled: _vm.isGenerating,
                  outlined: "",
                  rounded: "",
                  "hide-details": "",
                  dense: ""
                },
                model: {
                  value: _vm.selectedFilter,
                  callback: function($$v) {
                    _vm.selectedFilter = $$v
                  },
                  expression: "selectedFilter"
                }
              }),
              _vm._v(" "),
              _c(
                "v-btn",
                {
                  attrs: {
                    title: "Export to Excel",
                    icon: "",
                    dense: "",
                    rounded: "",
                    outlinedx: "",
                    color: "success",
                    disabled: _vm.generatedData.length < 1
                  },
                  on: {
                    click: function($event) {
                      return _vm.exportToExcel()
                    }
                  }
                },
                [_c("v-icon", [_vm._v("mdi-file-excel")])],
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
        "v-card-text",
        { staticClass: "pa-0 pb-4" },
        [
          _vm.generatedData.length < 1
            ? _c(
                "div",
                { staticClass: "d-flex justify-center mt-5" },
                [
                  _c("v-chip", { attrs: { color: "accent", small: "" } }, [
                    _vm._v(
                      "\n                No available data to display\n            "
                    )
                  ])
                ],
                1
              )
            : _c("GeneratedTable", {
                attrs: { id: _vm.wrapperID, generatedData: _vm.generatedData }
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

/***/ "./resources/js/pages/Principals/common/GeneratedHistory.vue":
/*!*******************************************************************!*\
  !*** ./resources/js/pages/Principals/common/GeneratedHistory.vue ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GeneratedHistory_vue_vue_type_template_id_7ab5cd88___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GeneratedHistory.vue?vue&type=template&id=7ab5cd88& */ "./resources/js/pages/Principals/common/GeneratedHistory.vue?vue&type=template&id=7ab5cd88&");
/* harmony import */ var _GeneratedHistory_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GeneratedHistory.vue?vue&type=script&lang=js& */ "./resources/js/pages/Principals/common/GeneratedHistory.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _GeneratedHistory_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _GeneratedHistory_vue_vue_type_template_id_7ab5cd88___WEBPACK_IMPORTED_MODULE_0__["render"],
  _GeneratedHistory_vue_vue_type_template_id_7ab5cd88___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Principals/common/GeneratedHistory.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Principals/common/GeneratedHistory.vue?vue&type=script&lang=js&":
/*!********************************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/GeneratedHistory.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GeneratedHistory_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./GeneratedHistory.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/GeneratedHistory.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GeneratedHistory_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Principals/common/GeneratedHistory.vue?vue&type=template&id=7ab5cd88&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/GeneratedHistory.vue?vue&type=template&id=7ab5cd88& ***!
  \**************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GeneratedHistory_vue_vue_type_template_id_7ab5cd88___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./GeneratedHistory.vue?vue&type=template&id=7ab5cd88& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/GeneratedHistory.vue?vue&type=template&id=7ab5cd88&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GeneratedHistory_vue_vue_type_template_id_7ab5cd88___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GeneratedHistory_vue_vue_type_template_id_7ab5cd88___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=4.js.map