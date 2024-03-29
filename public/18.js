(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[18],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/Base.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/Base.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['tabs'],
  data: function data() {
    return {
      tab: null
    };
  },
  computed: {
    selectedPrincipal: function selectedPrincipal() {
      var _this$PrincipalsStore,
          _this = this;

      // let p = this.AppStore.state.principals
      //     .find(e => e[0] == this.$route.params.main_vendor_code)[1]
      //     .find(e => e.vendor_code == this.$route.params.main_vendor_code)
      //     ?? {name:'NA', vendor_code:'NA'}
      //     ;
      var p = (_this$PrincipalsStore = this.PrincipalsStore.state.selectedPrincipal[1].find(function (e) {
        return e.vendor_code == _this.$route.params.main_vendor_code;
      })) !== null && _this$PrincipalsStore !== void 0 ? _this$PrincipalsStore : {
        name: 'NA',
        vendor_code: 'NA'
      };
      return {
        name: p.name,
        vendor_code: p.vendor_code
      };
    }
  },
  mounted: function mounted() {
    console.log('Principal Base component mounted');
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/Base.vue?vue&type=template&id=1a177a58&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/Base.vue?vue&type=template&id=1a177a58& ***!
  \********************************************************************************************************************************************************************************************************************/
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
        "v-app-bar",
        { attrs: { elevation: "27", dense: "", color: "white", app: "" } },
        [
          _c(
            "v-toolbar-title",
            { staticClass: "primary--text" },
            [
              _c(
                "span",
                {
                  staticClass: "font-weight-bold text-subtitle-2",
                  attrs: { title: _vm.selectedPrincipal.name }
                },
                [
                  _vm._v(
                    "\n                " +
                      _vm._s(_vm.selectedPrincipal.name) +
                      "\n            "
                  )
                ]
              ),
              _vm._v(" "),
              _vm._l(_vm.PrincipalsStore.state.selectedPrincipal[1], function(
                p
              ) {
                return _c(
                  "v-chip",
                  {
                    key: p.vendor_code,
                    staticClass: "mr-1",
                    attrs: { "x-small": "", title: p.name }
                  },
                  [
                    _vm._v(
                      "\n                " +
                        _vm._s(p.vendor_code) +
                        "\n            "
                    )
                  ]
                )
              })
            ],
            2
          ),
          _vm._v(" "),
          _c("v-spacer"),
          _vm._v(" "),
          _c(
            "v-sheet",
            [
              _c(
                "v-tabs",
                {
                  attrs: {
                    "hide-slider": "",
                    "show-arrows": "",
                    "center-active": "",
                    "background-color": "transparent",
                    "active-class": "primary--text"
                  },
                  model: {
                    value: _vm.tab,
                    callback: function($$v) {
                      _vm.tab = $$v
                    },
                    expression: "tab"
                  }
                },
                _vm._l(_vm.tabs, function(t, index) {
                  return _c(
                    "v-tooltip",
                    {
                      key: index,
                      attrs: { bottom: "" },
                      scopedSlots: _vm._u(
                        [
                          {
                            key: "activator",
                            fn: function(ref) {
                              var on = ref.on
                              var attrs = ref.attrs
                              return [
                                _c(
                                  "v-tab",
                                  _vm._g(_vm._b({}, "v-tab", attrs, false), on),
                                  [_c("v-icon", [_vm._v(_vm._s(t.icon))])],
                                  1
                                )
                              ]
                            }
                          }
                        ],
                        null,
                        true
                      )
                    },
                    [_vm._v(" "), _c("span", [_vm._v(_vm._s(t.title))])]
                  )
                }),
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
        "v-tabs-items",
        {
          staticClass: "pa-0",
          model: {
            value: _vm.tab,
            callback: function($$v) {
              _vm.tab = $$v
            },
            expression: "tab"
          }
        },
        _vm._l(_vm.tabs, function(t, index) {
          return _c(
            "v-tab-item",
            { key: index, staticClass: "pa-0" },
            [
              _c(t.component, {
                tag: "component",
                attrs: {
                  id:
                    _vm.selectedPrincipal.vendor_code +
                    "_tab_" +
                    new Date().getTime()
                }
              })
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

/***/ "./resources/js/pages/Principals/common/Base.vue":
/*!*******************************************************!*\
  !*** ./resources/js/pages/Principals/common/Base.vue ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Base_vue_vue_type_template_id_1a177a58___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base.vue?vue&type=template&id=1a177a58& */ "./resources/js/pages/Principals/common/Base.vue?vue&type=template&id=1a177a58&");
/* harmony import */ var _Base_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Base.vue?vue&type=script&lang=js& */ "./resources/js/pages/Principals/common/Base.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Base_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Base_vue_vue_type_template_id_1a177a58___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Base_vue_vue_type_template_id_1a177a58___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Principals/common/Base.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Principals/common/Base.vue?vue&type=script&lang=js&":
/*!********************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/Base.vue?vue&type=script&lang=js& ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Base_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Base.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/Base.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Base_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Principals/common/Base.vue?vue&type=template&id=1a177a58&":
/*!**************************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/Base.vue?vue&type=template&id=1a177a58& ***!
  \**************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Base_vue_vue_type_template_id_1a177a58___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Base.vue?vue&type=template&id=1a177a58& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/Base.vue?vue&type=template&id=1a177a58&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Base_vue_vue_type_template_id_1a177a58___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Base_vue_vue_type_template_id_1a177a58___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=18.js.map