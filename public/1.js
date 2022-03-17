(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

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
/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    Base: function Base() {
      return __webpack_require__.e(/*! import() */ 5).then(__webpack_require__.bind(null, /*! ../common/Base.vue */ "./resources/js/pages/Principals/common/Base.vue"));
    }
  },
  data: function data() {
    return {};
  },
  computed: {
    tabs: function tabs() {
      return [{
        title: 'Import and Generate',
        icon: 'mdi-file-upload',
        component: function component() {
          return __webpack_require__.e(/*! import() */ 7).then(__webpack_require__.bind(null, /*! ../common/Generated.vue */ "./resources/js/pages/Principals/common/Generated.vue"));
        }
      }, {
        title: 'Generated Data History',
        icon: 'mdi-timetable',
        component: function component() {
          return __webpack_require__.e(/*! import() */ 8).then(__webpack_require__.bind(null, /*! ../common/GeneratedHistory.vue */ "./resources/js/pages/Principals/common/GeneratedHistory.vue"));
        }
      }, {
        title: 'Transactions and Uploaded Invoices',
        icon: 'mdi-file-check',
        component: function component() {
          return __webpack_require__.e(/*! import() */ 13).then(__webpack_require__.bind(null, /*! ../common/TransAndInvoices.vue */ "./resources/js/pages/Principals/common/TransAndInvoices.vue"));
        }
      }, {
        title: 'Masterfiles',
        icon: 'mdi-folder-multiple',
        component: function component() {
          return __webpack_require__.e(/*! import() */ 11).then(__webpack_require__.bind(null, /*! ../common/MasterFiles.vue */ "./resources/js/pages/Principals/common/MasterFiles.vue"));
        }
      }, {
        title: 'Settings',
        icon: 'mdi-tune',
        component: function component() {
          return __webpack_require__.e(/*! import() */ 3).then(__webpack_require__.bind(null, /*! ../common/Settings.vue */ "./resources/js/pages/Principals/common/Settings.vue"));
        }
      }];
    },
    selectedPrincipalCode: function selectedPrincipalCode() {
      return this.PrincipalsStore.state.selectedPrincipalCode;
    }
  },
  methods: {
    test: function test() {// window.location.href = `/logout`;
    }
  },
  created: function created() {
    this.PrincipalsStore.initialize();

    if (this[this.selectedPrincipalCode] == null || this[this.selectedPrincipalCode] == undefined) {
      Vue.prototype[this.selectedPrincipalCode] = __webpack_require__("./resources/js/stores.custom/principals sync recursive ^\\.\\/.*$")("./".concat(this.selectedPrincipalCode))["default"];
    }
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
  return _c("div", [_c("Base", { attrs: { tabs: _vm.tabs } })], 1)
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



/***/ }),

/***/ "./resources/js/stores.custom/principals sync recursive ^\\.\\/.*$":
/*!*************************************************************!*\
  !*** ./resources/js/stores.custom/principals sync ^\.\/.*$ ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./PrincipalsStore": "./resources/js/stores.custom/principals/PrincipalsStore.js",
	"./PrincipalsStore.js": "./resources/js/stores.custom/principals/PrincipalsStore.js",
	"./mead_johnson": "./resources/js/stores.custom/principals/mead_johnson.js",
	"./mead_johnson.js": "./resources/js/stores.custom/principals/mead_johnson.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./resources/js/stores.custom/principals sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./resources/js/stores.custom/principals/mead_johnson.js":
/*!***************************************************************!*\
  !*** ./resources/js/stores.custom/principals/mead_johnson.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _PrincipalsStore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PrincipalsStore */ "./resources/js/stores.custom/principals/PrincipalsStore.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
  title: "MEAD JOHNSON",
  // customersTableHeader: [
  //     { text: "Distributor Code", value: "distributor_code" },
  //     { text: "Customer Code", value: "customer_code" },
  //     { text: "Customer Name", value: "customer_name" },
  //     { text: "Outlet Type", value: "outlet_type" },
  //     { text: "Salesman Name", value: "salesman_name" },
  //     { text: "Route Code", value: "route_code" },
  //     { text: "Operation Type", value: "operation_type" },
  //     { text: "Status", value: "status" },
  //     { text: "Address_1", value: "address_1" },
  //     { text: "Address_4", value: "address_4" },
  //     { text: "Address_5", value: "address_5" },
  //     { text: "postal_code", value: "postal_code" },
  // ],
  customersTableHeader: [{
    text: "Customer Code",
    value: "customer_code"
  }, {
    text: "Customer Name",
    value: "customer_name"
  }, {
    text: "Salesman Name",
    value: "salesman_name"
  }, {
    text: "Route Code",
    value: "route_code"
  }],
  productsTableHeader: [{
    text: "Item Code",
    value: "item_code"
  }, {
    text: "Description",
    value: "description"
  }, {
    text: "MJ Code",
    value: "item_code_supplier"
  }, {
    text: "MJ Description",
    value: "description_supplier"
  }],
  generatedDataTableHeader: [{
    text: "Order Date (Date) (YYYY/MM/DD)",
    value: "order_date"
  }, {
    text: "Customer Code (nv20)",
    value: "customer_code"
  }, {
    text: "Route Code (nv20)",
    value: "route_code"
  }, {
    text: "Product Category Code (nv20)",
    value: "product_category_code"
  }, {
    text: "Ship To (nv40)",
    value: "ship_to"
  }, {
    text: "Order Number (nv20)",
    value: "order_no"
  }, {
    text: "Remarks (nv50)",
    value: "remarks"
  }, {
    text: "Product Code (nv20)",
    value: "product_code"
  }, {
    text: "Quantity (numeric 25,4)",
    value: "quantity"
  }],
  uploadedInvoicesTableHeader: [{
    text: "Upload Date",
    value: "upload_date"
  }, {
    text: "Document Type",
    value: "doc_type"
  }, {
    text: "Document #",
    value: "doc_no"
  }, {
    text: "Customer Code",
    value: "customer_code"
  }, {
    text: "Posting Date",
    value: "posting_date"
  }, {
    text: "Item Code",
    value: "item_code"
  }, {
    text: "Quantity",
    value: "quantity"
  }, {
    text: "u1",
    value: "u1"
  }, {
    text: "u2",
    value: "u2"
  }, {
    text: "u3",
    value: "u3"
  }, {
    text: "u4",
    value: "u4"
  }, {
    text: "u5",
    value: "u5"
  }, {
    text: "UOM",
    value: "uom"
  }],
  transactionsTableHeader: [{
    text: "Upload Date",
    value: "upload_date"
  }, {
    text: "Customer Code",
    value: "customer_code"
  }, {
    text: "Account Name",
    value: "customer_name"
  }, {
    text: "Sales Invoice",
    value: "doc_no"
  }, {
    text: "Item Code",
    value: "item_code"
  }, {
    text: "Description",
    value: "description"
  }, {
    text: "UOM",
    value: "uom"
  }, {
    text: "Quantity",
    value: "quantity"
  }, {
    text: "Amount",
    value: "u3"
  }],
  generatedDataHistoryFilters: [{
    text: 'Order Date',
    value: 'order_date'
  }, {
    text: 'Route Code',
    value: 'route_code'
  } // {text: 'Customer Code', value: 'customer_code'},
  // {text: 'Product Code', value: 'product_code'},
  ]
});
var actions = {// generatedDataHeader() {
  //     return state.generatedDataTableHeader.map(e=>{
  //         return e.text;
  //     });
  // },
  // generatedDataFormat() {
  //     return state.generatedDataTableHeader.map(e=>{
  //         return e.value;
  //     });
  // },
  // transactionsHeader() {
  //     return state.transactionsTableHeader.map(e=>{
  //         return e.text;
  //     });
  // },
  // transactionsFormat() {
  //     return state.transactionsTableHeader.map(e=>{
  //         return e.value;
  //     });
  // },
};
/* harmony default export */ __webpack_exports__["default"] = (_objectSpread({
  state: state
}, actions));

/***/ })

}]);
//# sourceMappingURL=1.js.map