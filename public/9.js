(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/ExpendituresPage/ExpendituresAdd.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/ExpendituresPage/ExpendituresAdd.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      particulars: [],
      modal_datepicker: false,
      isSaving: false,
      tags: this.Expenditures.state.tags,
      particular: null,
      amount: null,
      quantity: null,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
      selectedTags: null
    };
  },
  methods: {
    initParticulars: function initParticulars() {
      var _this = this;

      // const vm = this;
      var url = "".concat(this.AppStore.state.siteUrl, "api_expenses/particulars");
      axios.get(url).then(function (response) {
        console.log(response.data);

        try {
          _this.particulars = response.data.map(function (el) {
            return el.particular;
          });
        } catch (error) {
          _this.AppStore.toast(error);
        }
      })["catch"](function (err) {
        _this.AppStore.toast(err);
      });
    },
    saveExpense: function saveExpense() {
      var _this2 = this;

      var url = "".concat(this.AppStore.state.siteUrl, "api_expenses/store");
      this.isSaving = true;
      var expenseData = {
        "particular": this.particular,
        "amount": this.amount,
        "quantity": this.quantity,
        "expense_date": this.date,
        "tag_ids": this.selectedTags
      };
      axios.post(url, expenseData).then(function (response) {
        if (response.data == true) {
          _this2.AppStore.toast('New expense added');

          _this2.Expenditures.expenses();

          _this2.Expenditures.state.add_expense = false;
          _this2.isSaving = false;
        }
      })["catch"](function (err) {
        console.log(err);
        _this2.isSaving = false;
      });
    },
    appendNewParticular: function appendNewParticular(e) {
      var newParticular = e.target.value;

      if (newParticular != '') {
        var newParticularExists = false;
        this.particulars.forEach(function (el) {
          if (el.toLowerCase() === newParticular.toLowerCase()) {
            newParticularExists = true;
          }
        });

        if (!newParticularExists) {
          this.particulars.push(newParticular);
          this.particular = newParticular;
        }

        console.log('PARTICULARS:', this.particulars);
      }
    }
  },
  computed: {},
  watch: {
    selectedTags: function selectedTags() {
      console.log(this.selectedTags);
    }
  },
  created: function created() {
    this.initParticulars();
  },
  mounted: function mounted() {
    console.log("ExpendituresAdd mounted.");
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/ExpendituresPage/ExpendituresAdd.vue?vue&type=template&id=0ca3598a&":
/*!******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/ExpendituresPage/ExpendituresAdd.vue?vue&type=template&id=0ca3598a& ***!
  \******************************************************************************************************************************************************************************************************************************/
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
      _c("v-card-title", { staticClass: "mb-5" }, [
        _c("span", { staticClass: "text-h5" }, [_vm._v("Add Test Data")])
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
                {
                  staticClass: "pb-0 pt-0",
                  attrs: { cols: "12", sm: "6", md: "4" }
                },
                [
                  _c("v-autocomplete", {
                    attrs: {
                      items: _vm.particulars,
                      dense: "",
                      outlined: "",
                      autofocus: "",
                      label: "Particular *"
                    },
                    on: {
                      blur: function($event) {
                        return _vm.appendNewParticular($event)
                      }
                    },
                    model: {
                      value: _vm.particular,
                      callback: function($$v) {
                        _vm.particular = $$v
                      },
                      expression: "particular"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                {
                  staticClass: "pb-0 pt-0",
                  attrs: { cols: "12", sm: "6", md: "4" }
                },
                [
                  _c("v-text-field", {
                    attrs: {
                      outlined: "",
                      dense: "",
                      label: "Amount *",
                      prefix: "P"
                    },
                    model: {
                      value: _vm.amount,
                      callback: function($$v) {
                        _vm.amount = $$v
                      },
                      expression: "amount"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                {
                  staticClass: "pb-0 pt-0",
                  attrs: { cols: "12", sm: "6", md: "4" }
                },
                [
                  _c("v-text-field", {
                    attrs: {
                      outlined: "",
                      dense: "",
                      label: "Quantity*",
                      required: ""
                    },
                    model: {
                      value: _vm.quantity,
                      callback: function($$v) {
                        _vm.quantity = $$v
                      },
                      expression: "quantity"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                {
                  staticClass: "pb-0 pt-0",
                  attrs: { cols: "12", sm: "6", md: "4" }
                },
                [
                  _c(
                    "v-dialog",
                    {
                      ref: "dialog_datepicker",
                      attrs: { "return-value": _vm.date, width: "290px" },
                      on: {
                        "update:returnValue": function($event) {
                          _vm.date = $event
                        },
                        "update:return-value": function($event) {
                          _vm.date = $event
                        }
                      },
                      scopedSlots: _vm._u([
                        {
                          key: "activator",
                          fn: function(ref) {
                            var on = ref.on
                            var attrs = ref.attrs
                            return [
                              _c(
                                "v-text-field",
                                _vm._g(
                                  _vm._b(
                                    {
                                      attrs: {
                                        label: "Date *",
                                        readonly: "",
                                        dense: "",
                                        outlined: ""
                                      },
                                      model: {
                                        value: _vm.date,
                                        callback: function($$v) {
                                          _vm.date = $$v
                                        },
                                        expression: "date"
                                      }
                                    },
                                    "v-text-field",
                                    attrs,
                                    false
                                  ),
                                  on
                                )
                              )
                            ]
                          }
                        }
                      ]),
                      model: {
                        value: _vm.modal_datepicker,
                        callback: function($$v) {
                          _vm.modal_datepicker = $$v
                        },
                        expression: "modal_datepicker"
                      }
                    },
                    [
                      _vm._v(" "),
                      _c(
                        "v-date-picker",
                        {
                          attrs: { scrollable: "" },
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
                                  _vm.modal_datepicker = false
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
                                  return _vm.$refs.dialog_datepicker.save(
                                    _vm.date
                                  )
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
              ),
              _vm._v(" "),
              _c(
                "v-col",
                {
                  staticClass: "pb-0 pt-0",
                  attrs: { cols: "12", sm: "6", md: "4" }
                },
                [
                  _c("v-select", {
                    attrs: {
                      items: _vm.tags,
                      "item-text": "tag_name",
                      "item-value": "tag_id",
                      label: "Tags",
                      multiple: "",
                      chips: "",
                      dense: "",
                      outlined: "",
                      "small-chips": ""
                    },
                    model: {
                      value: _vm.selectedTags,
                      callback: function($$v) {
                        _vm.selectedTags = $$v
                      },
                      expression: "selectedTags"
                    }
                  })
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c("small", [_vm._v("* indicates required field")]),
          _vm._v(" "),
          _c(
            "v-row",
            [
              _c("v-col", [
                _c(
                  "div",
                  { staticClass: "float-right" },
                  [
                    _c(
                      "v-btn",
                      {
                        attrs: {
                          color: "primary",
                          loading: _vm.isSaving,
                          dense: "",
                          outlinedx: "",
                          text: "",
                          smallx: ""
                        },
                        on: {
                          click: function($event) {
                            return _vm.saveExpense()
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n                        Save\n                    "
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "v-btn",
                      {
                        attrs: {
                          color: "primary",
                          dense: "",
                          outlinedx: "",
                          text: "",
                          smallx: ""
                        },
                        on: {
                          click: function($event) {
                            _vm.Expenditures.state.add_expense = false
                          }
                        }
                      },
                      [
                        _vm._v(
                          "\n                        Close\n                    "
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

/***/ "./resources/js/pages/ExpendituresPage/ExpendituresAdd.vue":
/*!*****************************************************************!*\
  !*** ./resources/js/pages/ExpendituresPage/ExpendituresAdd.vue ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ExpendituresAdd_vue_vue_type_template_id_0ca3598a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ExpendituresAdd.vue?vue&type=template&id=0ca3598a& */ "./resources/js/pages/ExpendituresPage/ExpendituresAdd.vue?vue&type=template&id=0ca3598a&");
/* harmony import */ var _ExpendituresAdd_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ExpendituresAdd.vue?vue&type=script&lang=js& */ "./resources/js/pages/ExpendituresPage/ExpendituresAdd.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _ExpendituresAdd_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _ExpendituresAdd_vue_vue_type_template_id_0ca3598a___WEBPACK_IMPORTED_MODULE_0__["render"],
  _ExpendituresAdd_vue_vue_type_template_id_0ca3598a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/ExpendituresPage/ExpendituresAdd.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/ExpendituresPage/ExpendituresAdd.vue?vue&type=script&lang=js&":
/*!******************************************************************************************!*\
  !*** ./resources/js/pages/ExpendituresPage/ExpendituresAdd.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ExpendituresAdd_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./ExpendituresAdd.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/ExpendituresPage/ExpendituresAdd.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ExpendituresAdd_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/ExpendituresPage/ExpendituresAdd.vue?vue&type=template&id=0ca3598a&":
/*!************************************************************************************************!*\
  !*** ./resources/js/pages/ExpendituresPage/ExpendituresAdd.vue?vue&type=template&id=0ca3598a& ***!
  \************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ExpendituresAdd_vue_vue_type_template_id_0ca3598a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./ExpendituresAdd.vue?vue&type=template&id=0ca3598a& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/ExpendituresPage/ExpendituresAdd.vue?vue&type=template&id=0ca3598a&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ExpendituresAdd_vue_vue_type_template_id_0ca3598a___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_ExpendituresAdd_vue_vue_type_template_id_0ca3598a___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=9.js.map