(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[22],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/mead_johnson/index.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/mead_johnson/index.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    Base: function Base() {
      return __webpack_require__.e(/*! import() */ 4).then(__webpack_require__.bind(null, /*! ../common/Base.vue */ "./resources/js/pages/Principals/common/Base.vue"));
    }
  },
  data: function data() {
    return {};
  },
  computed: {
    tabs: function tabs() {
      return [{
        title: 'Templated Data',
        icon: 'mdi-table',
        component: function component() {
          return __webpack_require__.e(/*! import() */ 5).then(__webpack_require__.bind(null, /*! ../common/Generated.vue */ "./resources/js/pages/Principals/common/Generated.vue"));
        }
      }, {
        title: 'Templated Data History',
        icon: 'mdi-timetable',
        component: function component() {
          return __webpack_require__.e(/*! import() */ 6).then(__webpack_require__.bind(null, /*! ../common/GeneratedHistory.vue */ "./resources/js/pages/Principals/common/GeneratedHistory.vue"));
        }
      }, {
        title: 'Transactions',
        icon: 'mdi-file-check',
        // component: () => import("../common/TransAndInvoices.vue"),
        component: function component() {
          return Promise.all(/*! import() */[__webpack_require__.e(3), __webpack_require__.e(2)]).then(__webpack_require__.bind(null, /*! ../common/Transactions.vue */ "./resources/js/pages/Principals/common/Transactions.vue"));
        }
      }, {
        title: 'Masterfiles',
        icon: 'mdi-folder-multiple',
        component: function component() {
          return __webpack_require__.e(/*! import() */ 7).then(__webpack_require__.bind(null, /*! ../common/MasterFiles.vue */ "./resources/js/pages/Principals/common/MasterFiles.vue"));
        }
      }, {
        title: 'Settings',
        icon: 'mdi-tune',
        component: function component() {
          return __webpack_require__.e(/*! import() */ 1).then(__webpack_require__.bind(null, /*! ../common/Settings.vue */ "./resources/js/pages/Principals/common/Settings.vue"));
        }
      } // {
      //     title: 'DevChat (TEST)',
      //     icon: 'mdi-message',
      //     component: () => import("../common/DevChat.vue"),
      // },
      ];
    },
    selectedPrincipalCode: function selectedPrincipalCode() {
      return this.PrincipalsStore.state.selectedPrincipalCode;
    }
  },
  methods: {},
  created: function created() {
    if (this[this.selectedPrincipalCode] == null || this[this.selectedPrincipalCode] == undefined) {
      Vue.prototype[this.selectedPrincipalCode] = __webpack_require__("./resources/js/stores.custom/principals sync recursive ^\\.\\/.*$")("./".concat(this.selectedPrincipalCode))["default"];
    } // Initialize settings


    this.PrincipalsStore.initSettings();
  },
  mounted: function mounted() {
    console.log(this.selectedPrincipalCode + ' component mounted');
  },
  beforeDestroy: function beforeDestroy() {
    if (this.PrincipalsStore != null) {
      this.PrincipalsStore.cleanup();
    }

    this[this.selectedPrincipalCode] = null;
    Vue.prototype[this.selectedPrincipalCode] = null;
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/mead_johnson/index.vue?vue&type=template&id=5d8f9112&":
/*!***************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/mead_johnson/index.vue?vue&type=template&id=5d8f9112& ***!
  \***************************************************************************************************************************************************************************************************************************/
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
    [
      _c("Base", {
        attrs: {
          tabs: _vm.tabs,
          id: _vm.selectedPrincipalCode + "_tabs_" + new Date().getTime()
        }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/pages/Principals/mead_johnson/index.vue":
/*!**************************************************************!*\
  !*** ./resources/js/pages/Principals/mead_johnson/index.vue ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_5d8f9112___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=5d8f9112& */ "./resources/js/pages/Principals/mead_johnson/index.vue?vue&type=template&id=5d8f9112&");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "./resources/js/pages/Principals/mead_johnson/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_5d8f9112___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_5d8f9112___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Principals/mead_johnson/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Principals/mead_johnson/index.vue?vue&type=script&lang=js&":
/*!***************************************************************************************!*\
  !*** ./resources/js/pages/Principals/mead_johnson/index.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/mead_johnson/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Principals/mead_johnson/index.vue?vue&type=template&id=5d8f9112&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/pages/Principals/mead_johnson/index.vue?vue&type=template&id=5d8f9112& ***!
  \*********************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_5d8f9112___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=5d8f9112& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/mead_johnson/index.vue?vue&type=template&id=5d8f9112&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_5d8f9112___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_5d8f9112___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=22.js.map