(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[24],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/Salesmen.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/Salesmen.vue?vue&type=script&lang=js& ***!
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      return __webpack_require__.e(/*! import() */ 1).then(__webpack_require__.bind(null, /*! ./MasterfileUpload.vue */ "./resources/js/pages/Principals/common/MasterfileUpload.vue"));
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
      return this[this.selectedPrincipalCode].state.salesmenTableHeader[0]; // if(this.PrincipalsStore.state.selectedPrincipalCode == 'wyeth') {
      //     return this.WyethStore.state.customersTableHeader;
      // } else {
      //     return [];
      // }
    },
    updatedAt: function updatedAt() {
      try {
        return this.PrincipalsStore.state.salesmen[0].upload_date;
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
      this.PrincipalsStore.toExcel_simple('Salesmen', this.PrincipalsStore.state.salesmen, {
        storeName: this.selectedPrincipalCode,
        propertyName: 'salesmenTableHeader'
      }, null, "".concat(this.selectedPrincipalCode, "_Salesmen"));
    }
  },
  created: function created() {
    this.PrincipalsStore.initSalesmen(this.selectedPrincipalCode);
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/Salesmen.vue?vue&type=template&id=374cc966&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/Salesmen.vue?vue&type=template&id=374cc966& ***!
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
                _c("div", [
                  _vm._v("\n                    Salesmen\n                ")
                ]),
                _vm._v(" "),
                _c("div", [
                  _c("em", { staticClass: "text-caption primary--text" }, [
                    _vm._v(
                      "\n                        Updated at " +
                        _vm._s(_vm.updatedAt) +
                        "\n                    "
                    )
                  ])
                ])
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
                      return _vm.PrincipalsStore.initSalesmen(
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
                      _vm.PrincipalsStore.state.isUploadMasterSalesmenOpen = true
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
              items: _vm.PrincipalsStore.state.salesmen,
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
            value: _vm.PrincipalsStore.state.isUploadMasterSalesmenOpen,
            callback: function($$v) {
              _vm.$set(
                _vm.PrincipalsStore.state,
                "isUploadMasterSalesmenOpen",
                $$v
              )
            },
            expression: "PrincipalsStore.state.isUploadMasterSalesmenOpen"
          }
        },
        [_c("MasterfileUpload", { attrs: { id: "salesmen" } })],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/pages/Principals/common/Salesmen.vue":
/*!***********************************************************!*\
  !*** ./resources/js/pages/Principals/common/Salesmen.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Salesmen_vue_vue_type_template_id_374cc966___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Salesmen.vue?vue&type=template&id=374cc966& */ "./resources/js/pages/Principals/common/Salesmen.vue?vue&type=template&id=374cc966&");
/* harmony import */ var _Salesmen_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Salesmen.vue?vue&type=script&lang=js& */ "./resources/js/pages/Principals/common/Salesmen.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Salesmen_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Salesmen_vue_vue_type_template_id_374cc966___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Salesmen_vue_vue_type_template_id_374cc966___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Principals/common/Salesmen.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Principals/common/Salesmen.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/Salesmen.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Salesmen_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Salesmen.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/Salesmen.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Salesmen_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Principals/common/Salesmen.vue?vue&type=template&id=374cc966&":
/*!******************************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/Salesmen.vue?vue&type=template&id=374cc966& ***!
  \******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Salesmen_vue_vue_type_template_id_374cc966___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Salesmen.vue?vue&type=template&id=374cc966& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/Salesmen.vue?vue&type=template&id=374cc966&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Salesmen_vue_vue_type_template_id_374cc966___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Salesmen_vue_vue_type_template_id_374cc966___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=24.js.map