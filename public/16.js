(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[16],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/Customers.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/Customers.vue?vue&type=script&lang=js& ***!
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
/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    MasterfileUpload: function MasterfileUpload() {
      return __webpack_require__.e(/*! import() */ 10).then(__webpack_require__.bind(null, /*! ./MasterfileUpload.vue */ "./resources/js/pages/Principals/common/MasterfileUpload.vue"));
    }
  },
  data: function data() {
    return {
      searchKey: ''
    };
  },
  computed: {
    selectedPrincipalCode: function selectedPrincipalCode() {
      return this.PrincipalsStore.state.selectedPrincipalCode;
    },
    tblHeader: function tblHeader() {
      return this[this.selectedPrincipalCode].state.customersTableHeader; // if(this.PrincipalsStore.state.selectedPrincipalCode == 'wyeth') {
      //     return this.WyethStore.state.customersTableHeader;
      // } else {
      //     return [];
      // }
    },
    updatedAt: function updatedAt() {
      try {
        return this.PrincipalsStore.state.customers[0].upload_date;
      } catch (error) {
        return '...';
      }
    } // principal_code() {
    //     const principal = this.AppStore.state.principals.find(e => e.id == this.$route.params.principal_id);
    //     return principal.code.toLowerCase();\
    // },

  },
  methods: {
    exportToExcel: function exportToExcel() {
      var data = [['Customers', this.PrincipalsStore.state.customers]];
      var config = this.PrincipalsStore.getHeaderAndFormat('customersTableHeader');
      this.PrincipalsStore.exportToExcel(config.header, this.PrincipalsStore.generatedDataSubset(data, config.format), null, "".concat(this.selectedPrincipalCode, "_Customers"));
    }
  },
  created: function created() {
    this.PrincipalsStore.initCustomers(this.selectedPrincipalCode);
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/Customers.vue?vue&type=template&id=74861d62&":
/*!*************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/Customers.vue?vue&type=template&id=74861d62& ***!
  \*************************************************************************************************************************************************************************************************************************/
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
    { staticClass: "elevation-0", attrs: { outlinedx: "" } },
    [
      _c(
        "v-card-title",
        { staticClass: "pa-0 mb-2" },
        [
          _c(
            "v-app-bar",
            { attrs: { elevation: "0", colorx: "white" } },
            [
              _c("v-toolbar-title", [
                _vm._v(
                  "\n                Customers Masterfile\n                "
                ),
                _c("em", { staticClass: "text-caption primary--text" }, [
                  _vm._v(
                    "\n                    Updated at " +
                      _vm._s(_vm.updatedAt) +
                      "\n                "
                  )
                ])
              ]),
              _vm._v(" "),
              _c("v-spacer"),
              _vm._v(" "),
              _c("v-text-field", {
                staticClass: "mr-3",
                staticStyle: { "max-width": "300px" },
                attrs: {
                  label: "Search",
                  clearable: "",
                  "hide-details": "",
                  dense: "",
                  flat: "",
                  rounded: "",
                  "solo-inverted": ""
                },
                model: {
                  value: _vm.searchKey,
                  callback: function($$v) {
                    _vm.searchKey = $$v
                  },
                  expression: "searchKey"
                }
              }),
              _vm._v(" "),
              _c(
                "v-btn",
                {
                  attrs: { title: "Import", icon: "", dense: "" },
                  on: {
                    click: function($event) {
                      $event.stopPropagation()
                      _vm.PrincipalsStore.state.isUploadMasterCustomersOpen = true
                    }
                  }
                },
                [_c("v-icon", [_vm._v("mdi-file-upload")])],
                1
              ),
              _vm._v(" "),
              _c(
                "v-btn",
                {
                  attrs: { title: "Export to Excel", icon: "", dense: "" },
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
        { staticClass: "mx-0 px-0" },
        [
          _c("v-data-table", {
            attrs: {
              items: _vm.PrincipalsStore.state.customers,
              headers: _vm.tblHeader,
              dense: "",
              search: _vm.searchKey
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-dialog",
        {
          attrs: { "max-width": "800", persistent: "" },
          model: {
            value: _vm.PrincipalsStore.state.isUploadMasterCustomersOpen,
            callback: function($$v) {
              _vm.$set(
                _vm.PrincipalsStore.state,
                "isUploadMasterCustomersOpen",
                $$v
              )
            },
            expression: "PrincipalsStore.state.isUploadMasterCustomersOpen"
          }
        },
        [_c("MasterfileUpload", { attrs: { id: "customers" } })],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/pages/Principals/common/Customers.vue":
/*!************************************************************!*\
  !*** ./resources/js/pages/Principals/common/Customers.vue ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Customers_vue_vue_type_template_id_74861d62___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Customers.vue?vue&type=template&id=74861d62& */ "./resources/js/pages/Principals/common/Customers.vue?vue&type=template&id=74861d62&");
/* harmony import */ var _Customers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Customers.vue?vue&type=script&lang=js& */ "./resources/js/pages/Principals/common/Customers.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Customers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Customers_vue_vue_type_template_id_74861d62___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Customers_vue_vue_type_template_id_74861d62___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Principals/common/Customers.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Principals/common/Customers.vue?vue&type=script&lang=js&":
/*!*************************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/Customers.vue?vue&type=script&lang=js& ***!
  \*************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Customers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Customers.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/Customers.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Customers_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Principals/common/Customers.vue?vue&type=template&id=74861d62&":
/*!*******************************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/Customers.vue?vue&type=template&id=74861d62& ***!
  \*******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Customers_vue_vue_type_template_id_74861d62___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Customers.vue?vue&type=template&id=74861d62& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/Customers.vue?vue&type=template&id=74861d62&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Customers_vue_vue_type_template_id_74861d62___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Customers_vue_vue_type_template_id_74861d62___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=16.js.map