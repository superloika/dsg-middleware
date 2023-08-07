(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[26],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/Settings.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/Settings.vue?vue&type=script&lang=js& ***!
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
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {};
  },
  created: function created() {
    this.PrincipalsStore.initSettings();
  },
  mounted: function mounted() {
    console.log('Settings component mounted'); // console.log(
    //     this.PrincipalsStore.state.settings.find(e => e.name=='strict_export').value
    // );
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/Settings.vue?vue&type=template&id=97f5dcb4&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/Settings.vue?vue&type=template&id=97f5dcb4& ***!
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
    { staticClass: "pa-0" },
    [
      _c(
        "v-card-title",
        { staticClass: "pa-0 mb-6" },
        [
          _c(
            "v-toolbar",
            { staticClass: "elevation-0" },
            [
              _c("v-toolbar-title", [_vm._v("Settings")]),
              _vm._v(" "),
              _c("v-spacer"),
              _vm._v(" "),
              _c(
                "v-btn",
                {
                  attrs: {
                    title: "Save Settings",
                    icon: "",
                    dense: "",
                    loading: _vm.AppStore.state.showTopLoading,
                    disabled: _vm.PrincipalsStore.state.settings.length < 1
                  },
                  on: {
                    click: function($event) {
                      return _vm.PrincipalsStore.saveSettings()
                    }
                  }
                },
                [_c("v-icon", [_vm._v("mdi-content-save")])],
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
        [
          _vm.PrincipalsStore.state.settings.length > 0
            ? _c(
                "v-row",
                _vm._l(_vm.PrincipalsStore.state.settings, function(
                  setting,
                  index
                ) {
                  return _c(
                    "v-col",
                    { key: index, attrs: { cols: "12" } },
                    [
                      setting.type == "number" || setting.type == "text"
                        ? _c("v-text-field", {
                            attrs: {
                              label: setting.description,
                              outlined: "",
                              hint: setting.hint,
                              "persistent-hint": "",
                              type: setting.type
                            },
                            model: {
                              value: setting.value,
                              callback: function($$v) {
                                _vm.$set(setting, "value", $$v)
                              },
                              expression: "setting.value"
                            }
                          })
                        : _vm._e(),
                      _vm._v(" "),
                      setting.type == "toggle"
                        ? _c("v-switch", {
                            attrs: {
                              label: setting.description,
                              hint: setting.hint,
                              "persistent-hint": "",
                              inset: ""
                            },
                            model: {
                              value: _vm.parPrincipalsStore.state.settings.find(
                                function(e) {
                                  return e.name == setting.name
                                }
                              ).value,
                              callback: function($$v) {
                                _vm.$set(
                                  _vm.parPrincipalsStore.state.settings.find(
                                    function(e) {
                                      return e.name == setting.name
                                    }
                                  ),
                                  "value",
                                  $$v
                                )
                              },
                              expression:
                                "\n                        parPrincipalsStore.state.settings.find(\n                            e => e.name==setting.name\n                        ).value\n                    "
                            }
                          })
                        : _vm._e(),
                      _vm._v(" "),
                      setting.type == "json"
                        ? _c("v-textarea", {
                            attrs: {
                              label: setting.description,
                              value: setting.value,
                              hint: setting.hint,
                              "persistent-hint": "",
                              outlined: "",
                              color: "warning",
                              "auto-grow": ""
                            },
                            model: {
                              value: setting.value,
                              callback: function($$v) {
                                _vm.$set(setting, "value", $$v)
                              },
                              expression: "setting.value"
                            }
                          })
                        : _vm._e()
                    ],
                    1
                  )
                }),
                1
              )
            : _vm._e()
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

/***/ "./resources/js/pages/Principals/common/Settings.vue":
/*!***********************************************************!*\
  !*** ./resources/js/pages/Principals/common/Settings.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Settings_vue_vue_type_template_id_97f5dcb4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Settings.vue?vue&type=template&id=97f5dcb4& */ "./resources/js/pages/Principals/common/Settings.vue?vue&type=template&id=97f5dcb4&");
/* harmony import */ var _Settings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Settings.vue?vue&type=script&lang=js& */ "./resources/js/pages/Principals/common/Settings.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Settings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Settings_vue_vue_type_template_id_97f5dcb4___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Settings_vue_vue_type_template_id_97f5dcb4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Principals/common/Settings.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Principals/common/Settings.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/Settings.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Settings.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/Settings.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Principals/common/Settings.vue?vue&type=template&id=97f5dcb4&":
/*!******************************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/Settings.vue?vue&type=template&id=97f5dcb4& ***!
  \******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_template_id_97f5dcb4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Settings.vue?vue&type=template&id=97f5dcb4& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/Settings.vue?vue&type=template&id=97f5dcb4&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_template_id_97f5dcb4___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Settings_vue_vue_type_template_id_97f5dcb4___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=26.js.map