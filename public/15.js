(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[15],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/UnknownCodes.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/UnknownCodes.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['unknownCodes', 'type', 'temptxt_id', 'title'],
  data: function data() {
    return {};
  },
  computed: {
    codesNA: function codesNA() {
      var temp = '';
      var len = this.unknownCodes.length;

      for (var i = 0; i < len; i++) {
        temp += this.unknownCodes[i];

        if (i != len - 1) {
          temp += '\r\n';
        }
      }

      return temp;
    },
    variantColor: function variantColor() {
      return this.type == 'warning' ? 'warning' : this.type == 'error' ? 'error' : '';
    }
  },
  mounted: function mounted() {
    console.log('UnknownCodes component mounted');
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/UnknownCodes.vue?vue&type=template&id=5f20257f&":
/*!****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/UnknownCodes.vue?vue&type=template&id=5f20257f& ***!
  \****************************************************************************************************************************************************************************************************************************/
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
    { attrs: { outlined: "" } },
    [
      _c(
        "v-card-title",
        { staticClass: "text-subtitle-1" },
        [
          _vm._v("\n        " + _vm._s(_vm.title) + " \n        "),
          _c(
            "v-chip",
            {
              staticStyle: { color: "#fff" },
              attrs: { color: _vm.variantColor, small: "" }
            },
            [
              _vm._v(
                "\n            " +
                  _vm._s(_vm.unknownCodes.length) +
                  "\n        "
              )
            ]
          ),
          _vm._v(" "),
          _c("v-spacer"),
          _vm._v(" "),
          _c(
            "v-btn",
            {
              attrs: { icon: "", title: "Copy All" },
              on: {
                click: function($event) {
                  return _vm.AppStore.copyToClip(_vm.temptxt_id, "value")
                }
              }
            },
            [_c("v-icon", [_vm._v("mdi-content-copy")])],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-card-text",
        { staticClass: "pa-1" },
        [
          _c("textarea", {
            directives: [
              {
                name: "model",
                rawName: "v-model",
                value: _vm.codesNA,
                expression: "codesNA"
              }
            ],
            staticStyle: { display: "none" },
            attrs: { id: _vm.temptxt_id, cols: "30", rows: "10" },
            domProps: { value: _vm.codesNA },
            on: {
              input: function($event) {
                if ($event.target.composing) {
                  return
                }
                _vm.codesNA = $event.target.value
              }
            }
          }),
          _vm._v(" "),
          _vm._l(_vm.unknownCodes, function(pcode) {
            return _c(
              "v-chip",
              {
                key: pcode,
                staticClass: "ma-1",
                attrs: { color: _vm.variantColor, small: "", outlined: "" }
              },
              [_vm._v("\n            " + _vm._s(pcode) + "\n        ")]
            )
          })
        ],
        2
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/pages/Principals/common/UnknownCodes.vue":
/*!***************************************************************!*\
  !*** ./resources/js/pages/Principals/common/UnknownCodes.vue ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UnknownCodes_vue_vue_type_template_id_5f20257f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UnknownCodes.vue?vue&type=template&id=5f20257f& */ "./resources/js/pages/Principals/common/UnknownCodes.vue?vue&type=template&id=5f20257f&");
/* harmony import */ var _UnknownCodes_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./UnknownCodes.vue?vue&type=script&lang=js& */ "./resources/js/pages/Principals/common/UnknownCodes.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _UnknownCodes_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _UnknownCodes_vue_vue_type_template_id_5f20257f___WEBPACK_IMPORTED_MODULE_0__["render"],
  _UnknownCodes_vue_vue_type_template_id_5f20257f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Principals/common/UnknownCodes.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Principals/common/UnknownCodes.vue?vue&type=script&lang=js&":
/*!****************************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/UnknownCodes.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UnknownCodes_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./UnknownCodes.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/UnknownCodes.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_UnknownCodes_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Principals/common/UnknownCodes.vue?vue&type=template&id=5f20257f&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/UnknownCodes.vue?vue&type=template&id=5f20257f& ***!
  \**********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UnknownCodes_vue_vue_type_template_id_5f20257f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./UnknownCodes.vue?vue&type=template&id=5f20257f& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/UnknownCodes.vue?vue&type=template&id=5f20257f&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UnknownCodes_vue_vue_type_template_id_5f20257f___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_UnknownCodes_vue_vue_type_template_id_5f20257f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=15.js.map