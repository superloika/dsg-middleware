(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/MissingInMaster.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/MissingInMaster.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['missingInMaster', 'type', 'temptxt_id', 'title'],
  data: function data() {
    return {
      searchKey: ''
    };
  },
  computed: {
    codesNA: function codesNA() {
      var temp = '';
      var len = this.missingInMaster.length;

      for (var i = 0; i < len; i++) {
        temp += this.missingInMaster[i];

        if (i != len - 1) {
          temp += '\r\n';
        }
      }

      return temp;
    },
    // variantColor() {
    //     return this.type=='warning' ? 'warning' :
    //         this.type=='error' ? 'error' :
    //         '';
    // },
    tblHeader: function tblHeader() {
      if (this.type == 'customer') {
        return [{
          text: 'Customer Code',
          value: 'customer_code'
        }, {
          text: 'Customer Name',
          value: 'missing_customer_name'
        }];
      } else if (this.type = 'product') {
        return [{
          text: 'Product Code',
          value: 'product_code'
        }, {
          text: 'Product Name',
          value: 'missing_product_name'
        }];
      }
    },
    exportToExcel: function exportToExcel() {
      this.PrincipalsStore.exportToExcel();
    }
  },
  methods: {},
  mounted: function mounted() {
    console.log('MissingInMaster component mounted', this.missingInMaster);
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/MissingInMaster.vue?vue&type=template&id=b6a7c68c&":
/*!*******************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/MissingInMaster.vue?vue&type=template&id=b6a7c68c& ***!
  \*******************************************************************************************************************************************************************************************************************************/
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
        { staticClass: "text-h6" },
        [
          _vm._v("\n        " + _vm._s(_vm.title) + " \n        "),
          _c(
            "v-chip",
            {
              staticStyle: { color: "#fff" },
              attrs: { color: "warning", small: "" }
            },
            [
              _vm._v(
                "\n            " +
                  _vm._s(_vm.missingInMaster.length) +
                  "\n        "
              )
            ]
          ),
          _vm._v(" "),
          _c("v-spacer"),
          _vm._v(" "),
          _c("v-text-field", {
            staticStyle: { "max-width": "180px" },
            attrs: {
              label: "Search",
              title: "Search",
              "hide-details": "",
              dense: "",
              flat: "",
              rounded: "",
              clearable: "",
              "solo-inverted": ""
            },
            model: {
              value: _vm.searchKey,
              callback: function($$v) {
                _vm.searchKey = $$v
              },
              expression: "searchKey"
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-card-text",
        [
          _c("v-data-table", {
            attrs: {
              headers: _vm.tblHeader,
              items: _vm.missingInMaster,
              search: _vm.searchKey,
              dense: ""
            }
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

/***/ "./resources/js/pages/Principals/common/MissingInMaster.vue":
/*!******************************************************************!*\
  !*** ./resources/js/pages/Principals/common/MissingInMaster.vue ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MissingInMaster_vue_vue_type_template_id_b6a7c68c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MissingInMaster.vue?vue&type=template&id=b6a7c68c& */ "./resources/js/pages/Principals/common/MissingInMaster.vue?vue&type=template&id=b6a7c68c&");
/* harmony import */ var _MissingInMaster_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MissingInMaster.vue?vue&type=script&lang=js& */ "./resources/js/pages/Principals/common/MissingInMaster.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _MissingInMaster_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _MissingInMaster_vue_vue_type_template_id_b6a7c68c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _MissingInMaster_vue_vue_type_template_id_b6a7c68c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Principals/common/MissingInMaster.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Principals/common/MissingInMaster.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/MissingInMaster.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MissingInMaster_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./MissingInMaster.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/MissingInMaster.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_MissingInMaster_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Principals/common/MissingInMaster.vue?vue&type=template&id=b6a7c68c&":
/*!*************************************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/MissingInMaster.vue?vue&type=template&id=b6a7c68c& ***!
  \*************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MissingInMaster_vue_vue_type_template_id_b6a7c68c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./MissingInMaster.vue?vue&type=template&id=b6a7c68c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/MissingInMaster.vue?vue&type=template&id=b6a7c68c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MissingInMaster_vue_vue_type_template_id_b6a7c68c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_MissingInMaster_vue_vue_type_template_id_b6a7c68c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=6.js.map