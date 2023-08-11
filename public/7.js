(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/GeneratedTableWrapper.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/GeneratedTableWrapper.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ["generatedData", "allow_export"],
  // props: ["allow_export"],
  data: function data() {
    return {
      tab_template_variation: null
    };
  },
  computed: {
    // generatedData() {
    //     return this.PrincipalsStore.state.currentGeneratedData;
    // },
    GeneratedTable: function GeneratedTable() {
      var vm = this; // return () =>
      //     import(`../${vm.PrincipalsStore.state.selectedPrincipalCode}/GeneratedTable.vue`);

      return function () {
        return __webpack_require__.e(/*! import() */ 6).then(__webpack_require__.bind(null, /*! ./GeneratedTable.vue */ "./resources/js/pages/Principals/common/GeneratedTable.vue"));
      };
    }
  },
  methods: {
    // // get item_notfound line count per group
    // groupItemsNotFoundLineCount(lines = []) {
    //     const test = lines.filter(e => {
    //         return e.item_notfound == 1;
    //     });
    //     return test.length;
    // },
    // // get customer_notfound line count per group
    // groupCustomersNotFoundLineCount(lines = []) {
    //     const test = lines.filter(e => {
    //         return e.customer_notfound == 1;
    //     });
    //     return test.length;
    // },
    // get total warnings (e.g. unmapped customers, items, salesmen)
    warningsCount: function warningsCount() {
      var lines = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var test = lines.filter(function (e) {
        return e.customer_notfound == 1 || e.item_notfound == 1 || e.salesman_notfound == 1;
      });
      return test.length;
    },
    lineCount: function lineCount() {
      var output_template = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var count = 0;
      output_template.forEach(function (e) {
        count += e[1].length;
      });
      return count;
    }
  },
  watch: {
    tab_template_variation: function tab_template_variation() {
      this.tab = null;
    }
  },
  created: function created() {},
  mounted: function mounted() {
    console.log("GeneratedTableWrapper component mounted");
    console.log(this.generatedData);
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/GeneratedTableWrapper.vue?vue&type=style&index=0&id=61458e21&scoped=true&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/GeneratedTableWrapper.vue?vue&type=style&index=0&id=61458e21&scoped=true&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\ndiv[data-v-61458e21] {\n    color: #eeeeee;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/GeneratedTableWrapper.vue?vue&type=style&index=0&id=61458e21&scoped=true&lang=css&":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--6-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--6-2!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/GeneratedTableWrapper.vue?vue&type=style&index=0&id=61458e21&scoped=true&lang=css& ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader??ref--6-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--6-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./GeneratedTableWrapper.vue?vue&type=style&index=0&id=61458e21&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/GeneratedTableWrapper.vue?vue&type=style&index=0&id=61458e21&scoped=true&lang=css&");

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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/GeneratedTableWrapper.vue?vue&type=template&id=61458e21&scoped=true&":
/*!*************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/GeneratedTableWrapper.vue?vue&type=template&id=61458e21&scoped=true& ***!
  \*************************************************************************************************************************************************************************************************************************************************/
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
    "v-sheet",
    [
      _c(
        "v-tabs",
        {
          attrs: { height: _vm.generatedData.length > 1 ? 30 : 0 },
          model: {
            value: _vm.tab_template_variation,
            callback: function($$v) {
              _vm.tab_template_variation = $$v
            },
            expression: "tab_template_variation"
          }
        },
        _vm._l(_vm.generatedData, function(templatedData, index) {
          return _c(
            "v-tab",
            { key: index, staticClass: "px-3 text-caption" },
            [
              _vm._v(
                "\n            " +
                  _vm._s(templatedData.name) +
                  "\n\n            "
              ),
              _c(
                "v-chip",
                {
                  staticClass: "ml-1 text-captionx px-1",
                  attrs: { color: "primary", "x-small": "" }
                },
                [
                  _vm._v(
                    "\n                " +
                      _vm._s(_vm.lineCount(templatedData.output_template)) +
                      "\n            "
                  )
                ]
              )
            ],
            1
          )
        }),
        1
      ),
      _vm._v(" "),
      _c(
        "v-tabs-items",
        {
          model: {
            value: _vm.tab_template_variation,
            callback: function($$v) {
              _vm.tab_template_variation = $$v
            },
            expression: "tab_template_variation"
          }
        },
        _vm._l(_vm.generatedData, function(
          templatedData,
          template_variation_tabitem_index
        ) {
          return _c(
            "v-tab-item",
            { key: template_variation_tabitem_index },
            [
              _c(
                "v-sheet",
                [
                  _c(
                    "v-tabs",
                    {
                      attrs: { height: "30", "show-arrow": "" },
                      model: {
                        value: templatedData.tab,
                        callback: function($$v) {
                          _vm.$set(templatedData, "tab", $$v)
                        },
                        expression: "templatedData.tab"
                      }
                    },
                    _vm._l(templatedData.output_template, function(
                      data,
                      index
                    ) {
                      return _c(
                        "v-tab",
                        { key: index, staticClass: "px-2 text-captionx" },
                        [
                          _c("h5", [_vm._v(_vm._s(data[0]))]),
                          _vm._v(" "),
                          _vm.warningsCount(data[1]) > 0
                            ? _c(
                                "v-chip",
                                {
                                  staticClass: "ml-1 text-captionx px-1",
                                  attrs: { color: "warning", "x-small": "" }
                                },
                                [
                                  _vm._v(
                                    "\n                            " +
                                      _vm._s(_vm.warningsCount(data[1])) +
                                      "\n                        "
                                  )
                                ]
                              )
                            : _vm._e()
                        ],
                        1
                      )
                    }),
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-tabs-items",
                    {
                      model: {
                        value: templatedData.tab,
                        callback: function($$v) {
                          _vm.$set(templatedData, "tab", $$v)
                        },
                        expression: "templatedData.tab"
                      }
                    },
                    _vm._l(templatedData.output_template, function(
                      data,
                      index
                    ) {
                      return _c("v-tab-item", { key: index }, [
                        data[1].length > 0
                          ? _c(
                              "div",
                              { staticClass: "mb-2 pa-0 overflow-auto" },
                              [
                                _c(_vm.GeneratedTable, {
                                  tag: "component",
                                  attrs: {
                                    id:
                                      _vm.PrincipalsStore.state
                                        .selectedPrincipalCode + "_gentable",
                                    tab_caption: data[0],
                                    items: data[1],
                                    template_variation_index: template_variation_tabitem_index,
                                    allow_export: _vm.allow_export
                                  }
                                })
                              ],
                              1
                            )
                          : _vm._e()
                      ])
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
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/pages/Principals/common/GeneratedTableWrapper.vue":
/*!************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/GeneratedTableWrapper.vue ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GeneratedTableWrapper_vue_vue_type_template_id_61458e21_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GeneratedTableWrapper.vue?vue&type=template&id=61458e21&scoped=true& */ "./resources/js/pages/Principals/common/GeneratedTableWrapper.vue?vue&type=template&id=61458e21&scoped=true&");
/* harmony import */ var _GeneratedTableWrapper_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GeneratedTableWrapper.vue?vue&type=script&lang=js& */ "./resources/js/pages/Principals/common/GeneratedTableWrapper.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _GeneratedTableWrapper_vue_vue_type_style_index_0_id_61458e21_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GeneratedTableWrapper.vue?vue&type=style&index=0&id=61458e21&scoped=true&lang=css& */ "./resources/js/pages/Principals/common/GeneratedTableWrapper.vue?vue&type=style&index=0&id=61458e21&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _GeneratedTableWrapper_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _GeneratedTableWrapper_vue_vue_type_template_id_61458e21_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _GeneratedTableWrapper_vue_vue_type_template_id_61458e21_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "61458e21",
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Principals/common/GeneratedTableWrapper.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Principals/common/GeneratedTableWrapper.vue?vue&type=script&lang=js&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/GeneratedTableWrapper.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GeneratedTableWrapper_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./GeneratedTableWrapper.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/GeneratedTableWrapper.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GeneratedTableWrapper_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Principals/common/GeneratedTableWrapper.vue?vue&type=style&index=0&id=61458e21&scoped=true&lang=css&":
/*!*********************************************************************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/GeneratedTableWrapper.vue?vue&type=style&index=0&id=61458e21&scoped=true&lang=css& ***!
  \*********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_GeneratedTableWrapper_vue_vue_type_style_index_0_id_61458e21_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/style-loader!../../../../../node_modules/css-loader??ref--6-1!../../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../../node_modules/postcss-loader/src??ref--6-2!../../../../../node_modules/vue-loader/lib??vue-loader-options!./GeneratedTableWrapper.vue?vue&type=style&index=0&id=61458e21&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/GeneratedTableWrapper.vue?vue&type=style&index=0&id=61458e21&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_GeneratedTableWrapper_vue_vue_type_style_index_0_id_61458e21_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_GeneratedTableWrapper_vue_vue_type_style_index_0_id_61458e21_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_GeneratedTableWrapper_vue_vue_type_style_index_0_id_61458e21_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_6_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_2_node_modules_vue_loader_lib_index_js_vue_loader_options_GeneratedTableWrapper_vue_vue_type_style_index_0_id_61458e21_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ "./resources/js/pages/Principals/common/GeneratedTableWrapper.vue?vue&type=template&id=61458e21&scoped=true&":
/*!*******************************************************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/GeneratedTableWrapper.vue?vue&type=template&id=61458e21&scoped=true& ***!
  \*******************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GeneratedTableWrapper_vue_vue_type_template_id_61458e21_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./GeneratedTableWrapper.vue?vue&type=template&id=61458e21&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/GeneratedTableWrapper.vue?vue&type=template&id=61458e21&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GeneratedTableWrapper_vue_vue_type_template_id_61458e21_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GeneratedTableWrapper_vue_vue_type_template_id_61458e21_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=7.js.map