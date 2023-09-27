(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[23],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/Items.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/Items.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      return this[this.selectedPrincipalCode].state.itemsTableHeader[0];
    },
    // principal_code() {
    //     const principal = this.AppStore.state.principals.find(e => e.id == this.$route.params.principal_id);
    //     return principal.code.toLowerCase();\
    // },
    updatedAt: function updatedAt() {
      try {
        return this.PrincipalsStore.state.items.data[0].upload_date;
      } catch (error) {
        return 'NA';
      }
    }
  },
  methods: {
    // exportToExcel() {
    //     const data = [
    //         [
    //             'Items',
    //             this.PrincipalsStore.state.items
    //         ]
    //     ];
    //     const config = this.PrincipalsStore.getHeaderAndFormat('itemsTableHeader');
    //     this.PrincipalsStore.exportToExcel(
    //         config[0].header,
    //         this.PrincipalsStore.generatedDataSubset(
    //             data,
    //             config[0].format
    //         ),
    //         null,
    //         `${this.selectedPrincipalCode}_Items`
    //     );
    // },
    exportToExcel: function exportToExcel() {
      var _this = this;

      try {
        this.PrincipalsStore.state.items.current_page = 1;
      } catch (error) {}

      this.PrincipalsStore.initItems('', 9999999).then(function () {
        _this.PrincipalsStore.toExcel_simple('Items', _this.PrincipalsStore.state.items.data, {
          storeName: _this.selectedPrincipalCode,
          propertyName: 'itemsTableHeader'
        }, null, "".concat(_this.selectedPrincipalCode, "_Items"));

        _this.PrincipalsStore.initItems(_this.searchKey);
      });
    },
    onPageChange: function onPageChange() {
      this.PrincipalsStore.initItems(this.searchKey);
    }
  },
  watch: {
    searchKey: Object(lodash__WEBPACK_IMPORTED_MODULE_0__["debounce"])(function () {
      if (this.PrincipalsStore.state.items.current_page != undefined) {
        this.PrincipalsStore.state.items.current_page = 1;
      }

      this.PrincipalsStore.initItems(this.searchKey);
    }, 500)
  },
  created: function created() {
    this.PrincipalsStore.initItems();
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/Items.vue?vue&type=template&id=5be49dcd&":
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/Items.vue?vue&type=template&id=5be49dcd& ***!
  \*********************************************************************************************************************************************************************************************************************/
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
        { attrs: { elevation: "1" } },
        [
          _c("v-toolbar-title", [
            _c("div", [_vm._v("\n                Items\n            ")]),
            _vm._v(" "),
            _c("div", [
              _c("em", { staticClass: "text-caption primary--text" }, [
                _vm._v(
                  "\n                    Updated at " +
                    _vm._s(_vm.updatedAt) +
                    "\n                "
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
                  return _vm.PrincipalsStore.initItems(_vm.searchKey)
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
                  _vm.PrincipalsStore.state.isUploadMasterItemsOpen = true
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
      ),
      _vm._v(" "),
      _c("v-data-table", {
        attrs: {
          items: _vm.PrincipalsStore.state.items.data,
          headers: _vm.tblHeader,
          dense: "",
          "disable-pagination": "",
          "hide-default-footer": ""
        },
        scopedSlots: _vm._u(
          [
            {
              key: "item.item_code",
              fn: function(ref) {
                var item = ref.item
                return [
                  item.vendor_code == null || item.vendor_code == ""
                    ? _c(
                        "v-chip",
                        {
                          attrs: {
                            color: "error",
                            outlined: "",
                            "x-small": "",
                            title: "Not found in General Masterfile"
                          }
                        },
                        [
                          _vm._v(
                            "\n                " +
                              _vm._s(item.item_code) +
                              "\n            "
                          )
                        ]
                      )
                    : item.vendor_code !=
                      _vm.PrincipalsStore.getVendorCode(
                        _vm.$route.params.principal_code
                      )
                    ? _c(
                        "div",
                        [
                          _c(
                            "v-chip",
                            {
                              attrs: {
                                color: "warning",
                                outlined: "",
                                "x-small": ""
                              }
                            },
                            [
                              _vm._v(
                                "\n                    " +
                                  _vm._s(item.item_code) +
                                  "\n                "
                              )
                            ]
                          ),
                          _vm._v(" "),
                          _c("v-chip", { attrs: { "x-small": "" } }, [
                            _vm._v(
                              "\n                    " +
                                _vm._s(item.principal_name) +
                                " - " +
                                _vm._s(item.vendor_code) +
                                "\n                "
                            )
                          ])
                        ],
                        1
                      )
                    : _c("span", [_vm._v(_vm._s(item.item_code))])
                ]
              }
            }
          ],
          null,
          true
        )
      }),
      _vm._v(" "),
      _c(
        "v-container",
        [
          _c("v-pagination", {
            attrs: {
              length: _vm.PrincipalsStore.state.items.last_page,
              "total-visible": "10"
            },
            on: {
              input: function($event) {
                return _vm.onPageChange()
              }
            },
            model: {
              value: _vm.PrincipalsStore.state.items.current_page,
              callback: function($$v) {
                _vm.$set(_vm.PrincipalsStore.state.items, "current_page", $$v)
              },
              expression: "PrincipalsStore.state.items.current_page"
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
            value: _vm.PrincipalsStore.state.isUploadMasterItemsOpen,
            callback: function($$v) {
              _vm.$set(
                _vm.PrincipalsStore.state,
                "isUploadMasterItemsOpen",
                $$v
              )
            },
            expression: "PrincipalsStore.state.isUploadMasterItemsOpen"
          }
        },
        [_c("MasterfileUpload", { attrs: { id: "items" } })],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/pages/Principals/common/Items.vue":
/*!********************************************************!*\
  !*** ./resources/js/pages/Principals/common/Items.vue ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Items_vue_vue_type_template_id_5be49dcd___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Items.vue?vue&type=template&id=5be49dcd& */ "./resources/js/pages/Principals/common/Items.vue?vue&type=template&id=5be49dcd&");
/* harmony import */ var _Items_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Items.vue?vue&type=script&lang=js& */ "./resources/js/pages/Principals/common/Items.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Items_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Items_vue_vue_type_template_id_5be49dcd___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Items_vue_vue_type_template_id_5be49dcd___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Principals/common/Items.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Principals/common/Items.vue?vue&type=script&lang=js&":
/*!*********************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/Items.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Items_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Items.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/Items.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Items_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Principals/common/Items.vue?vue&type=template&id=5be49dcd&":
/*!***************************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/Items.vue?vue&type=template&id=5be49dcd& ***!
  \***************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Items_vue_vue_type_template_id_5be49dcd___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Items.vue?vue&type=template&id=5be49dcd& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/Items.vue?vue&type=template&id=5be49dcd&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Items_vue_vue_type_template_id_5be49dcd___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Items_vue_vue_type_template_id_5be49dcd___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=23.js.map