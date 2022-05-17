(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[20],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/Pendings.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/Pendings.vue?vue&type=script&lang=js& ***!
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
/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    PendingsDataTable: function PendingsDataTable() {
      return __webpack_require__.e(/*! import() */ 21).then(__webpack_require__.bind(null, /*! ./PendingsDataTable.vue */ "./resources/js/pages/Principals/common/PendingsDataTable.vue"));
    }
  },
  data: function data() {
    return {
      tab: null
    };
  },
  computed: {
    pendings: function pendings() {
      var rawInvoices = this.PrincipalsStore.state.currentRawInvoices;
      var tempPending = {};
      rawInvoices.forEach(function (element) {
        if (element.customer_notfound == 1 || element.item_notfound == 1) {
          if (tempPending[element.filename] == undefined) {
            tempPending[element.filename] = [];
          }

          tempPending[element.filename].push(element);
        }
      });
      return Object.entries(tempPending);
    }
  },
  methods: {
    downloadPendings: function downloadPendings() {
      var _this = this;

      var filename = '';
      var lines = '';
      this.pendings.forEach(function (e) {
        filename = "PENDING ".concat(_this.AppStore.state.strDateToday, " - ").concat(e[0], ".txt");
        e[1].forEach(function (el) {
          lines += "".concat(el.doc_type) + "|".concat(el.doc_no) + "|".concat(el.customer_code) + "|".concat(el.posting_date) + "|".concat(el.item_code) + "|".concat(el.quantity) + "|".concat(el.u1) + "|".concat(el.u2) + "|".concat(el.u3) + "|".concat(el.u4) + "|".concat(el.u5) + "|".concat(el.uom) + '\r\n';
        });

        _this.AppStore.exportToTxt(filename, lines);

        lines = '';
      });
    }
  },
  mounted: function mounted() {
    console.log('Pendings component mounted');
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/Pendings.vue?vue&type=template&id=c21eea82&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/Pendings.vue?vue&type=template&id=c21eea82& ***!
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
    { attrs: { outlined: "" } },
    [
      _c(
        "v-card-title",
        { staticClass: "text-h6" },
        [
          _vm._v("\n        Pending Lines\n\n        "),
          _c("v-spacer"),
          _vm._v(" "),
          _c(
            "v-btn",
            {
              attrs: { icon: "", title: "Download" },
              on: {
                click: function($event) {
                  return _vm.downloadPendings()
                }
              }
            },
            [_c("v-icon", [_vm._v("mdi-file-download")])],
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
          _c(
            "v-tabs",
            {
              model: {
                value: _vm.tab,
                callback: function($$v) {
                  _vm.tab = $$v
                },
                expression: "tab"
              }
            },
            _vm._l(_vm.pendings, function(pending, i) {
              return _c("v-tab", { key: i, staticClass: "px-3" }, [
                _vm._v(
                  "\n                " +
                    _vm._s(pending[0]) +
                    ".txt\n            "
                )
              ])
            }),
            1
          ),
          _vm._v(" "),
          _c(
            "v-tabs-items",
            {
              model: {
                value: _vm.tab,
                callback: function($$v) {
                  _vm.tab = $$v
                },
                expression: "tab"
              }
            },
            _vm._l(_vm.pendings, function(pending, j) {
              return _c(
                "v-tab-item",
                { key: j },
                [_c("PendingsDataTable", { attrs: { items: pending[1] } })],
                1
              )
            }),
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

/***/ "./resources/js/pages/Principals/common/Pendings.vue":
/*!***********************************************************!*\
  !*** ./resources/js/pages/Principals/common/Pendings.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Pendings_vue_vue_type_template_id_c21eea82___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Pendings.vue?vue&type=template&id=c21eea82& */ "./resources/js/pages/Principals/common/Pendings.vue?vue&type=template&id=c21eea82&");
/* harmony import */ var _Pendings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Pendings.vue?vue&type=script&lang=js& */ "./resources/js/pages/Principals/common/Pendings.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Pendings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Pendings_vue_vue_type_template_id_c21eea82___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Pendings_vue_vue_type_template_id_c21eea82___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Principals/common/Pendings.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Principals/common/Pendings.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/Pendings.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Pendings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Pendings.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/Pendings.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Pendings_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Principals/common/Pendings.vue?vue&type=template&id=c21eea82&":
/*!******************************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/Pendings.vue?vue&type=template&id=c21eea82& ***!
  \******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Pendings_vue_vue_type_template_id_c21eea82___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./Pendings.vue?vue&type=template&id=c21eea82& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/Pendings.vue?vue&type=template&id=c21eea82&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Pendings_vue_vue_type_template_id_c21eea82___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Pendings_vue_vue_type_template_id_c21eea82___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=20.js.map