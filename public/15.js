(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[15],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/MasterItems/index.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/MasterItems/index.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    MasterUpload: function MasterUpload() {
      return __webpack_require__.e(/*! import() */ 0).then(__webpack_require__.bind(null, /*! ../../page_common/master/MasterUpload.vue */ "./resources/js/page_common/master/MasterUpload.vue"));
    }
  },
  data: function data() {
    return {
      searchKey: ''
    };
  },
  methods: {
    exportToExcelTest: function exportToExcelTest() {
      this.isLoading = true;
      var tblWrapper = document.querySelector('.tbl-items');
      var tbl = tblWrapper.querySelector('table');
      var wb = XLSX.utils.book_new(); // var ws = XLSX.utils.table_to_sheet(tbl);

      var ws = XLSX.utils.json_to_sheet(this.sampleData);
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, 'tbl.csv');
      this.isLoading = false;
    },
    onPageChange: function onPageChange() {
      this.MasterItems.initItems(this.searchKey);
    }
  },
  computed: {},
  watch: {
    searchKey: Object(lodash__WEBPACK_IMPORTED_MODULE_0__["debounce"])(function () {
      if (this.MasterItems.state.items.current_page != undefined) {
        this.MasterItems.state.items.current_page = 1;
      }

      this.MasterItems.initItems(this.searchKey);
    }, 500)
  },
  created: function created() {
    this.MasterItems.initItems();
  },
  mounted: function mounted() {
    console.log('MasterItems page mounted.');
  },
  beforeDestroy: function beforeDestroy() {
    this.MasterCustomers.state.customers = {};
    this.MasterItems.state.items = {};
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/MasterItems/index.vue?vue&type=template&id=24e93970&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/MasterItems/index.vue?vue&type=template&id=24e93970& ***!
  \***************************************************************************************************************************************************************************************************************/
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
        {
          attrs: { elevation: "27" },
          scopedSlots: _vm._u([
            {
              key: "extension",
              fn: function() {
                return [
                  _c(
                    "div",
                    [
                      _c("v-pagination", {
                        attrs: {
                          length: _vm.MasterItems.state.items.last_page,
                          "total-visible": "5"
                        },
                        on: {
                          input: function($event) {
                            return _vm.onPageChange()
                          }
                        },
                        model: {
                          value: _vm.MasterItems.state.items.current_page,
                          callback: function($$v) {
                            _vm.$set(
                              _vm.MasterItems.state.items,
                              "current_page",
                              $$v
                            )
                          },
                          expression: "MasterItems.state.items.current_page"
                        }
                      })
                    ],
                    1
                  )
                ]
              },
              proxy: true
            }
          ])
        },
        [
          _c(
            "v-toolbar-title",
            [
              _c("v-icon", [_vm._v("mdi-cube")]),
              _vm._v("\n            Items Masterfile\n            "),
              _c("v-chip", { attrs: { color: "primary", small: "" } }, [
                _vm._v(
                  "\n                " +
                    _vm._s(_vm.MasterItems.state.items.total) +
                    "\n            "
                )
              ])
            ],
            1
          ),
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
                  return _vm.MasterItems.initItems()
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
          _vm.AppStore.isSuperAdmin()
            ? _c(
                "v-btn",
                {
                  attrs: { icon: "", title: "Import Items Masterfile" },
                  on: {
                    click: function($event) {
                      $event.stopPropagation()
                      _vm.AppStore.state.dlgImportMaster = true
                    }
                  }
                },
                [_c("v-icon", [_vm._v("mdi-file-upload")])],
                1
              )
            : _vm._e()
        ],
        1
      ),
      _vm._v(" "),
      _c("v-data-table", {
        attrs: {
          items: _vm.MasterItems.state.items.data,
          headers: _vm.MasterItems.state.tableHeader,
          loading: _vm.MasterItems.state.isLoadingItems,
          "hide-default-footer": "",
          "disable-pagination": ""
        }
      }),
      _vm._v(" "),
      _c(
        "v-dialog",
        {
          attrs: { "max-width": "800", persistent: "" },
          model: {
            value: _vm.AppStore.state.dlgImportMaster,
            callback: function($$v) {
              _vm.$set(_vm.AppStore.state, "dlgImportMaster", $$v)
            },
            expression: "AppStore.state.dlgImportMaster"
          }
        },
        [_c("MasterUpload", { attrs: { id: "items" } })],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/pages/MasterItems/index.vue":
/*!**************************************************!*\
  !*** ./resources/js/pages/MasterItems/index.vue ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_24e93970___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=24e93970& */ "./resources/js/pages/MasterItems/index.vue?vue&type=template&id=24e93970&");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "./resources/js/pages/MasterItems/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_24e93970___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_24e93970___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/MasterItems/index.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/MasterItems/index.vue?vue&type=script&lang=js&":
/*!***************************************************************************!*\
  !*** ./resources/js/pages/MasterItems/index.vue?vue&type=script&lang=js& ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/MasterItems/index.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/MasterItems/index.vue?vue&type=template&id=24e93970&":
/*!*********************************************************************************!*\
  !*** ./resources/js/pages/MasterItems/index.vue?vue&type=template&id=24e93970& ***!
  \*********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_24e93970___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=24e93970& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/MasterItems/index.vue?vue&type=template&id=24e93970&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_24e93970___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_24e93970___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=15.js.map