(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[21],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/Generated.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/Generated.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    GeneratedTableWrapper: function GeneratedTableWrapper() {
      return __webpack_require__.e(/*! import() */ 8).then(__webpack_require__.bind(null, /*! ./GeneratedTableWrapper.vue */ "./resources/js/pages/Principals/common/GeneratedTableWrapper.vue"));
    },
    GeneratedActions: function GeneratedActions() {
      return __webpack_require__.e(/*! import() */ 22).then(__webpack_require__.bind(null, /*! ./GeneratedActions.vue */ "./resources/js/pages/Principals/common/GeneratedActions.vue"));
    }
  },
  data: function data() {
    return {
      menu: false
    };
  },
  computed: {
    // principalsStore() {
    //     return this.PrincipalsStore;
    // },
    generatedData: function generatedData() {
      // return this.PrincipalsStore.state.currentGeneratedData;
      return this.PrincipalsStore.state.currentGeneratedData;
    },
    // overall
    lineCount: function lineCount() {
      var count = 0;
      this.generatedData.forEach(function (e) {
        e.output_template.forEach(function (ot) {
          count += ot[1].length;
        });
      });
      return count;
    },
    // overall
    warningsCount: function warningsCount() {
      var count = 0;
      this.generatedData.forEach(function (e) {
        e.output_template.forEach(function (ot) {
          var nf = ot[1].filter(function (line) {
            return line.customer_notfound == 1 || line.item_notfound == 1 || line.salesman_notfound == 1;
          });
          count += nf.length;
        });
      });
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
  created: function created() {// PrincipalsStore.initCurrentGeneratedData(this.selectedPrincipalCode);
  },
  mounted: function mounted() {
    console.log("Generated component mounted");
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/Generated.vue?vue&type=template&id=5b6d0d9c&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/Generated.vue?vue&type=template&id=5b6d0d9c&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************/
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
        { attrs: { elevation: "1" } },
        [
          _c("v-toolbar-title", [
            _c("div", { staticClass: "text-subtitle-2 font-weight-bold" }, [
              _vm._v("\n                Templated Data\n            ")
            ]),
            _vm._v(" "),
            _vm.lineCount > 0
              ? _c(
                  "div",
                  [
                    _c(
                      "v-chip",
                      { attrs: { "x-small": "", label: "", color: "primary" } },
                      [
                        _c("h4", [
                          _vm._v(
                            "\n                        " +
                              _vm._s(_vm.lineCount) +
                              " total line/s\n                    "
                          )
                        ])
                      ]
                    ),
                    _vm._v(" "),
                    _vm.warningsCount > 0
                      ? _c(
                          "v-chip",
                          {
                            attrs: {
                              "x-small": "",
                              label: "",
                              color: "warning"
                            }
                          },
                          [
                            _c("h4", [
                              _vm._v(
                                "\n                        " +
                                  _vm._s(_vm.warningsCount) +
                                  "\n                        total warning(s) found. Keep masterfiles updated.\n                    "
                              )
                            ])
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
            "v-menu",
            {
              attrs: {
                "close-on-content-click": false,
                "offset-y": "",
                bottom: "",
                "z-indexx": "999",
                transition: "scroll-y-reverse-transition"
              },
              scopedSlots: _vm._u([
                {
                  key: "activator",
                  fn: function(ref) {
                    var on = ref.on
                    var attrs = ref.attrs
                    return [
                      _c(
                        "v-btn",
                        _vm._g(
                          _vm._b(
                            {
                              attrs: {
                                rounded: "",
                                color: "primary",
                                title: "More Options"
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
                            "\n                    Options\n                "
                          )
                        ]
                      )
                    ]
                  }
                }
              ]),
              model: {
                value: _vm.menu,
                callback: function($$v) {
                  _vm.menu = $$v
                },
                expression: "menu"
              }
            },
            [
              _vm._v(" "),
              _c("GeneratedActions", {
                attrs: {
                  lineCount: _vm.lineCount,
                  warningsCount: _vm.warningsCount
                }
              })
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("div", [
        _vm.PrincipalsStore.state.isGeneratingData
          ? _c("div", { staticClass: "d-flex justify-center pt-6" })
          : _c(
              "div",
              [
                _vm.generatedData.length < 1 || _vm.lineCount < 1
                  ? _c(
                      "div",
                      { staticClass: "d-flex justify-center pt-6" },
                      [
                        _c("v-chip", { attrs: { color: "transparent" } }, [
                          _vm._v(
                            "\n                    No available data to display\n                "
                          )
                        ])
                      ],
                      1
                    )
                  : _c("GeneratedTableWrapper", {
                      attrs: {
                        generatedData: _vm.generatedData,
                        allow_export: true
                      }
                    })
              ],
              1
            )
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/pages/Principals/common/Generated.vue":
/*!************************************************************!*\
  !*** ./resources/js/pages/Principals/common/Generated.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Generated_vue_vue_type_template_id_5b6d0d9c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Generated.vue?vue&type=template&id=5b6d0d9c&scoped=true& */ "./resources/js/pages/Principals/common/Generated.vue?vue&type=template&id=5b6d0d9c&scoped=true&");
/* harmony import */ var _Generated_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Generated.vue?vue&type=script&lang=js& */ "./resources/js/pages/Principals/common/Generated.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Generated_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Generated_vue_vue_type_template_id_5b6d0d9c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Generated_vue_vue_type_template_id_5b6d0d9c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "5b6d0d9c",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Principals/common/Generated.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Principals/common/Generated.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/Generated.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Generated_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Generated.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/Generated.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Generated_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Principals/common/Generated.vue?vue&type=template&id=5b6d0d9c&scoped=true&":
/*!*******************************************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/Generated.vue?vue&type=template&id=5b6d0d9c&scoped=true& ***!
  \*******************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Generated_vue_vue_type_template_id_5b6d0d9c_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Generated.vue?vue&type=template&id=5b6d0d9c&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/Generated.vue?vue&type=template&id=5b6d0d9c&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Generated_vue_vue_type_template_id_5b6d0d9c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Generated_vue_vue_type_template_id_5b6d0d9c_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=21.js.map