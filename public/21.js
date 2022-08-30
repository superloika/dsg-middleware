(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[21],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/GeneratedActions.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/GeneratedActions.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stores_custom_PrincipalsStore__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../stores.custom/PrincipalsStore */ "./resources/js/stores.custom/PrincipalsStore.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  props: ['lineCount', 'warningsCount'],
  components: {
    MissingInMaster: function MissingInMaster() {
      return __webpack_require__.e(/*! import() */ 14).then(__webpack_require__.bind(null, /*! ./MissingInMaster.vue */ "./resources/js/pages/Principals/common/MissingInMaster.vue"));
    },
    ConfirmExport: function ConfirmExport() {
      return __webpack_require__.e(/*! import() */ 13).then(__webpack_require__.bind(null, /*! ./ConfirmExport.vue */ "./resources/js/pages/Principals/common/ConfirmExport.vue"));
    }
  },
  data: function data() {
    return {
      dlgMissingCustomers: null,
      dlgMissingItems: null,
      dlgMissingSalesmen: null // dlgPendings: null

    };
  },
  computed: {
    generatedData: function generatedData() {
      return _stores_custom_PrincipalsStore__WEBPACK_IMPORTED_MODULE_0__["default"].state.currentGeneratedData;
    },
    selectedPrincipalCode: function selectedPrincipalCode() {
      return _stores_custom_PrincipalsStore__WEBPACK_IMPORTED_MODULE_0__["default"].state.selectedPrincipalCode;
    },
    searchKeyLength: function searchKeyLength() {
      try {
        return _stores_custom_PrincipalsStore__WEBPACK_IMPORTED_MODULE_0__["default"].state.currentGeneratedDataSearchKey.length;
      } catch (error) {
        return 0;
      }
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
              if (type == "customer") {
                if (line.customer_notfound == 1) {
                  tempArray.push({
                    customer_code: line.customer_code,
                    missing_customer_name: line.missing_customer_name
                  });
                }
              } else if (type == "item") {
                if (line.item_notfound == 1) {
                  tempArray.push({
                    item_code: line.item_code,
                    missing_item_name: line.missing_item_name
                  });
                }
              } else if (type == "salesman") {
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
          if (!unique[result[i][type + "_code"]]) {
            distinct.push(result[i]);
            unique[result[i][type + "_code"]] = 1;
          }
        }

        return distinct;
      } catch (error) {
        console.log("missingInMaster() - ERR:", error);
        return [];
      }
    },
    refresh: function refresh() {
      _stores_custom_PrincipalsStore__WEBPACK_IMPORTED_MODULE_0__["default"].initCurrentGeneratedData(this.selectedPrincipalCode);
      _stores_custom_PrincipalsStore__WEBPACK_IMPORTED_MODULE_0__["default"].state.currentGeneratedDataSearchKey = '';
    }
  },
  mounted: function mounted() {
    console.log("GeneratedActions component mounted");
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/GeneratedActions.vue?vue&type=template&id=75a8551e&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/GeneratedActions.vue?vue&type=template&id=75a8551e& ***!
  \********************************************************************************************************************************************************************************************************************************/
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
      _c(
        "v-app-bar",
        { attrs: { elevation: "0" } },
        [
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
                  return _vm.refresh()
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
                _vm.PrincipalsStore.state.currentGeneratedData.length < 1
            },
            model: {
              value: _vm.PrincipalsStore.state.currentGeneratedDataSearchKey,
              callback: function($$v) {
                _vm.$set(
                  _vm.PrincipalsStore.state,
                  "currentGeneratedDataSearchKey",
                  $$v
                )
              },
              expression: "PrincipalsStore.state.currentGeneratedDataSearchKey"
            }
          }),
          _vm._v(" "),
          _c(
            "v-btn",
            {
              attrs: {
                title: "Export to Excel",
                dense: "",
                rounded: "",
                color: "primary",
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
              _c("v-icon", { attrs: { left: "", size: "25" } }, [
                _vm._v("mdi-file-excel")
              ]),
              _vm._v(
                "\n            Export(" +
                  _vm._s(_vm.lineCount - _vm.warningsCount) +
                  ")\n        "
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
                value: _vm.PrincipalsStore.state.confirmExportDialogOpen,
                callback: function($$v) {
                  _vm.$set(
                    _vm.PrincipalsStore.state,
                    "confirmExportDialogOpen",
                    $$v
                  )
                },
                expression: "PrincipalsStore.state.confirmExportDialogOpen"
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
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/pages/Principals/common/GeneratedActions.vue":
/*!*******************************************************************!*\
  !*** ./resources/js/pages/Principals/common/GeneratedActions.vue ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _GeneratedActions_vue_vue_type_template_id_75a8551e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GeneratedActions.vue?vue&type=template&id=75a8551e& */ "./resources/js/pages/Principals/common/GeneratedActions.vue?vue&type=template&id=75a8551e&");
/* harmony import */ var _GeneratedActions_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GeneratedActions.vue?vue&type=script&lang=js& */ "./resources/js/pages/Principals/common/GeneratedActions.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _GeneratedActions_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _GeneratedActions_vue_vue_type_template_id_75a8551e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _GeneratedActions_vue_vue_type_template_id_75a8551e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Principals/common/GeneratedActions.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Principals/common/GeneratedActions.vue?vue&type=script&lang=js&":
/*!********************************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/GeneratedActions.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GeneratedActions_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./GeneratedActions.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/GeneratedActions.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GeneratedActions_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Principals/common/GeneratedActions.vue?vue&type=template&id=75a8551e&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/GeneratedActions.vue?vue&type=template&id=75a8551e& ***!
  \**************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GeneratedActions_vue_vue_type_template_id_75a8551e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./GeneratedActions.vue?vue&type=template&id=75a8551e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/GeneratedActions.vue?vue&type=template&id=75a8551e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GeneratedActions_vue_vue_type_template_id_75a8551e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_GeneratedActions_vue_vue_type_template_id_75a8551e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=21.js.map