(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[30],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/Generated_2022_06_22.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/Generated_2022_06_22.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    GeneratedTableWrapper: function GeneratedTableWrapper() {
      return __webpack_require__.e(/*! import() */ 8).then(__webpack_require__.bind(null, /*! ./GeneratedTableWrapper.vue */ "./resources/js/pages/Principals/common/GeneratedTableWrapper.vue"));
    },
    InvoicesImport: function InvoicesImport() {
      return __webpack_require__.e(/*! import() */ 23).then(__webpack_require__.bind(null, /*! ./InvoicesImport.vue */ "./resources/js/pages/Principals/common/InvoicesImport.vue"));
    },
    MissingInMaster: function MissingInMaster() {
      return __webpack_require__.e(/*! import() */ 14).then(__webpack_require__.bind(null, /*! ./MissingInMaster.vue */ "./resources/js/pages/Principals/common/MissingInMaster.vue"));
    },
    Settings: function Settings() {
      return __webpack_require__.e(/*! import() */ 1).then(__webpack_require__.bind(null, /*! ./Settings.vue */ "./resources/js/pages/Principals/common/Settings.vue"));
    },
    Pendings: function Pendings() {
      return __webpack_require__.e(/*! import() */ 25).then(__webpack_require__.bind(null, /*! ./Pendings.vue */ "./resources/js/pages/Principals/common/Pendings.vue"));
    },
    ConfirmExport: function ConfirmExport() {
      return __webpack_require__.e(/*! import() */ 13).then(__webpack_require__.bind(null, /*! ./ConfirmExport.vue */ "./resources/js/pages/Principals/common/ConfirmExport.vue"));
    }
  },
  data: function data() {
    return {
      searchKey: "",
      dlgMissingCustomers: null,
      dlgMissingItems: null,
      dlgMissingSalesmen: null,
      dlgPendings: null
    };
  },
  computed: {
    generatedData: function generatedData() {
      return this.PrincipalsStore.state.currentGeneratedData;
    },
    // overall
    lineCount: function lineCount() {
      var count = 0; // this.generatedData.forEach(e => {
      //     count += e.output_template[1].length;
      // });

      if (this.generatedData.length > 0) {
        this.generatedData[0].output_template.forEach(function (e) {
          count += e[1].length;
        });
      }

      return count;
    },
    // overall
    warningsCount: function warningsCount() {
      var count = 0;

      if (this.generatedData.length > 0) {
        this.generatedData[0].output_template.forEach(function (e) {
          var nf = e[1].filter(function (line) {
            return line.customer_notfound == 1 || line.item_notfound == 1 || line.salesman_notfound == 1;
          });
          count += nf.length;
        });
      }

      return count;
    },
    selectedPrincipalCode: function selectedPrincipalCode() {
      return this.PrincipalsStore.state.selectedPrincipalCode;
    },
    searchKeyLength: function searchKeyLength() {
      try {
        return this.searchKey.length;
      } catch (error) {
        return 0;
      }
    },
    myStore: function myStore() {
      return this[this.selectedPrincipalCode];
    }
  },
  methods: {
    missingInMaster: function missingInMaster(type) {
      try {
        var result = [];

        if (this.generatedData.length > 0) {
          this.generatedData[0].output_template.forEach(function (e) {
            var tempArray = [];
            e[1].forEach(function (line) {
              if (type == 'customer') {
                if (line.customer_notfound == 1) {
                  tempArray.push({
                    customer_code: line.customer_code,
                    missing_customer_name: line.missing_customer_name
                  });
                }
              } else if (type == 'item') {
                if (line.item_notfound == 1) {
                  tempArray.push({
                    item_code: line.item_code,
                    missing_item_name: line.missing_item_name
                  });
                }
              } else if (type == 'salesman') {
                if (line.salesman_notfound == 1) {
                  tempArray.push({
                    // bit of hacking here haha..
                    real_salesman_code: line.alturas_sm_code,
                    salesman_code: line.missing_salesman_name,
                    missing_salesman_name: line.missing_salesman_name
                  });
                }
              }
            });

            if (tempArray.length > 0) {
              result.push.apply(result, tempArray);
            }
          });
        }

        var unique = [];
        var distinct = [];

        for (var i = 0; i < result.length; i++) {
          if (!unique[result[i][type + '_code']]) {
            distinct.push(result[i]);
            unique[result[i][type + '_code']] = 1;
          }
        }

        return distinct;
      } catch (error) {
        console.log("missingInMaster() - ERR:", error);
        return [];
      }
    }
  },
  created: function created() {
    this.PrincipalsStore.initCurrentGeneratedData(this.selectedPrincipalCode);
  },
  mounted: function mounted() {
    console.log("Generated component mounted");
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/Generated_2022_06_22.vue?vue&type=template&id=9b57206a&scoped=true&":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/Generated_2022_06_22.vue?vue&type=template&id=9b57206a&scoped=true& ***!
  \************************************************************************************************************************************************************************************************************************************************/
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
    "div",
    {},
    [
      _c(
        "v-card",
        { staticClass: "elevation-0", attrs: { color: "" } },
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
                      "\n                    Templated Data\n                    "
                    ),
                    _vm.lineCount > 0
                      ? _c(
                          "div",
                          [
                            _c(
                              "v-chip",
                              {
                                staticClass: "px-1 primary--text",
                                attrs: {
                                  small: "",
                                  outlinedx: "",
                                  label: "",
                                  color: "transparent"
                                }
                              },
                              [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(_vm.lineCount) +
                                    " total line/s\n                        "
                                )
                              ]
                            ),
                            _vm._v(" "),
                            _vm.warningsCount > 0
                              ? _c(
                                  "v-chip",
                                  {
                                    staticClass: "px-1 warning--text",
                                    attrs: {
                                      small: "",
                                      outlinedx: "",
                                      label: "",
                                      color: "transparent"
                                    }
                                  },
                                  [
                                    _vm._v(
                                      "\n                            " +
                                        _vm._s(_vm.warningsCount) +
                                        " total warning(s)\n                        "
                                    )
                                  ]
                                )
                              : _vm._e()
                          ],
                          1
                        )
                      : _vm._e()
                  ]),
                  _vm._v(" "),
                  _c("v-spacer"),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      staticClass: "mr-2",
                      attrs: {
                        title: "Refresh",
                        icon: "",
                        dense: "",
                        rounded: "",
                        depressed: ""
                      },
                      on: {
                        click: function($event) {
                          return _vm.PrincipalsStore.initCurrentGeneratedData(
                            _vm.selectedPrincipalCode
                          )
                        }
                      }
                    },
                    [_c("v-icon", [_vm._v("mdi-refresh")])],
                    1
                  ),
                  _vm._v(" "),
                  _c("v-text-field", {
                    staticClass: "mr-3",
                    staticStyle: { "max-width": "200px" },
                    attrs: {
                      label: "Search",
                      title: "Search",
                      "hide-details": "",
                      dense: "",
                      flat: "",
                      rounded: "",
                      clearable: "",
                      "solo-inverted": "",
                      disabled:
                        _vm.PrincipalsStore.state.currentGeneratedData.length <
                        1
                    },
                    model: {
                      value:
                        _vm.PrincipalsStore.state.currentGeneratedDataSearchKey,
                      callback: function($$v) {
                        _vm.$set(
                          _vm.PrincipalsStore.state,
                          "currentGeneratedDataSearchKey",
                          $$v
                        )
                      },
                      expression:
                        "PrincipalsStore.state.currentGeneratedDataSearchKey"
                    }
                  }),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: {
                        title: "Unmapped Customer/s",
                        icon: "",
                        dense: "",
                        rounded: "",
                        depressed: "",
                        color: "warning",
                        disabled: _vm.missingInMaster("customer").length < 1
                      },
                      on: {
                        click: function($event) {
                          $event.stopPropagation()
                          _vm.dlgMissingCustomers = true
                        }
                      }
                    },
                    [_c("v-icon", [_vm._v("mdi-account-multiple")])],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-dialog",
                    {
                      attrs: { "max-width": "700", scrollable: "" },
                      model: {
                        value: _vm.dlgMissingCustomers,
                        callback: function($$v) {
                          _vm.dlgMissingCustomers = $$v
                        },
                        expression: "dlgMissingCustomers"
                      }
                    },
                    [
                      _c("MissingInMaster", {
                        attrs: {
                          id: "customer",
                          type: "customer",
                          title: "Unmapped Customer/s",
                          missingInMaster: _vm.missingInMaster("customer")
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: {
                        title: "Unmapped Item/s",
                        icon: "",
                        dense: "",
                        rounded: "",
                        depressed: "",
                        color: "warning",
                        disabled: _vm.missingInMaster("item").length < 1
                      },
                      on: {
                        click: function($event) {
                          $event.stopPropagation()
                          _vm.dlgMissingItems = true
                        }
                      }
                    },
                    [_c("v-icon", [_vm._v("mdi-cube")])],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-dialog",
                    {
                      attrs: {
                        persistentx: "",
                        "max-width": "900",
                        scrollable: ""
                      },
                      model: {
                        value: _vm.dlgMissingItems,
                        callback: function($$v) {
                          _vm.dlgMissingItems = $$v
                        },
                        expression: "dlgMissingItems"
                      }
                    },
                    [
                      _c("MissingInMaster", {
                        attrs: {
                          id: "item",
                          type: "item",
                          title: "Unmapped Item/s",
                          missingInMaster: _vm.missingInMaster("item")
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: {
                        title: "Unmapped Salesmen",
                        icon: "",
                        dense: "",
                        rounded: "",
                        depressed: "",
                        color: "warning",
                        disabled: _vm.missingInMaster("salesman").length < 1
                      },
                      on: {
                        click: function($event) {
                          $event.stopPropagation()
                          _vm.dlgMissingSalesmen = true
                        }
                      }
                    },
                    [_c("v-icon", [_vm._v("mdi-account")])],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-dialog",
                    {
                      attrs: {
                        persistentx: "",
                        "max-width": "600",
                        scrollable: ""
                      },
                      model: {
                        value: _vm.dlgMissingSalesmen,
                        callback: function($$v) {
                          _vm.dlgMissingSalesmen = $$v
                        },
                        expression: "dlgMissingSalesmen"
                      }
                    },
                    [
                      _c("MissingInMaster", {
                        attrs: {
                          id: "salesman",
                          type: "salesman",
                          title: "Unmapped Salesmen",
                          missingInMaster: _vm.missingInMaster("salesman")
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: {
                        title: "Export to Excel",
                        iconx: "",
                        dense: "",
                        rounded: "",
                        outlinedx: "",
                        depressedx: "",
                        color: "white",
                        disabled:
                          _vm.lineCount < 1 ||
                          _vm.searchKeyLength > 0 ||
                          _vm.warningsCount >= _vm.lineCount
                      },
                      on: {
                        click: function($event) {
                          $event.stopPropagation()
                          _vm.PrincipalsStore.state.confirmExportDialogOpen = true
                        }
                      }
                    },
                    [
                      _vm._v(
                        "\n                    Export\n                    "
                      ),
                      _c(
                        "v-icon",
                        { attrs: { right: "", color: "success", size: "25" } },
                        [_vm._v("mdi-file-excel")]
                      )
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-dialog",
                    {
                      attrs: { persistent: "", "max-width": "500" },
                      model: {
                        value:
                          _vm.PrincipalsStore.state.confirmExportDialogOpen,
                        callback: function($$v) {
                          _vm.$set(
                            _vm.PrincipalsStore.state,
                            "confirmExportDialogOpen",
                            $$v
                          )
                        },
                        expression:
                          "PrincipalsStore.state.confirmExportDialogOpen"
                      }
                    },
                    [
                      _c("ConfirmExport", {
                        attrs: {
                          id:
                            "confirm_export_" +
                            _vm.PrincipalsStore.state.selectedPrincipalCode
                        }
                      })
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
          _c("v-card-text", { staticClass: "mx-0 px-0" }, [
            _c("div", {}, [
              _vm.PrincipalsStore.state.isGeneratingData
                ? _c(
                    "div",
                    { staticClass: "d-flex justify-center mt-6" },
                    [
                      _c("v-progress-circular", {
                        attrs: {
                          size: 50,
                          width: 4,
                          color: "accent",
                          indeterminate: ""
                        }
                      })
                    ],
                    1
                  )
                : _c(
                    "div",
                    [
                      _vm.generatedData.length < 1 ||
                      _vm.generatedData[0].output_template.length < 1
                        ? _c(
                            "div",
                            { staticClass: "d-flex justify-center mt-3" },
                            [
                              _c(
                                "v-chip",
                                { attrs: { color: "accent", small: "" } },
                                [
                                  _vm._v(
                                    "\n                            No available data to display\n                        "
                                  )
                                ]
                              )
                            ],
                            1
                          )
                        : _c("GeneratedTableWrapper", {
                            attrs: { generatedData: _vm.generatedData }
                          })
                    ],
                    1
                  )
            ])
          ])
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

/***/ "./resources/js/pages/Principals/common/Generated_2022_06_22.vue":
/*!***********************************************************************!*\
  !*** ./resources/js/pages/Principals/common/Generated_2022_06_22.vue ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Generated_2022_06_22_vue_vue_type_template_id_9b57206a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Generated_2022_06_22.vue?vue&type=template&id=9b57206a&scoped=true& */ "./resources/js/pages/Principals/common/Generated_2022_06_22.vue?vue&type=template&id=9b57206a&scoped=true&");
/* harmony import */ var _Generated_2022_06_22_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Generated_2022_06_22.vue?vue&type=script&lang=js& */ "./resources/js/pages/Principals/common/Generated_2022_06_22.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Generated_2022_06_22_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Generated_2022_06_22_vue_vue_type_template_id_9b57206a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Generated_2022_06_22_vue_vue_type_template_id_9b57206a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "9b57206a",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Principals/common/Generated_2022_06_22.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Principals/common/Generated_2022_06_22.vue?vue&type=script&lang=js&":
/*!************************************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/Generated_2022_06_22.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Generated_2022_06_22_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Generated_2022_06_22.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/Generated_2022_06_22.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Generated_2022_06_22_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Principals/common/Generated_2022_06_22.vue?vue&type=template&id=9b57206a&scoped=true&":
/*!******************************************************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/Generated_2022_06_22.vue?vue&type=template&id=9b57206a&scoped=true& ***!
  \******************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Generated_2022_06_22_vue_vue_type_template_id_9b57206a_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Generated_2022_06_22.vue?vue&type=template&id=9b57206a&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/Generated_2022_06_22.vue?vue&type=template&id=9b57206a&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Generated_2022_06_22_vue_vue_type_template_id_9b57206a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Generated_2022_06_22_vue_vue_type_template_id_9b57206a_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=30.js.map