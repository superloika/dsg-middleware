(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/principal.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/principal.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************/
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
      return __webpack_require__.e(/*! import() */ 15).then(__webpack_require__.bind(null, /*! ./common/Base.vue */ "./resources/js/pages/Principals/common/Base.vue"));
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
          return __webpack_require__.e(/*! import() */ 18).then(__webpack_require__.bind(null, /*! ./common/Generated.vue */ "./resources/js/pages/Principals/common/Generated.vue"));
        }
      }, // {
      //     title: 'Templated Data History',
      //     icon: 'mdi-timetable',
      //     component: () => import("./common/GeneratedHistory.vue"),
      // },
      {
        title: 'Transactions',
        icon: 'mdi-file-check',
        // component: () => import("../common/TransAndInvoices.vue"),
        component: function component() {
          return Promise.all(/*! import() */[__webpack_require__.e(27), __webpack_require__.e(26)]).then(__webpack_require__.bind(null, /*! ./common/Transactions.vue */ "./resources/js/pages/Principals/common/Transactions.vue"));
        }
      }, {
        title: 'Masterfiles',
        icon: 'mdi-folder-multiple',
        component: function component() {
          return __webpack_require__.e(/*! import() */ 22).then(__webpack_require__.bind(null, /*! ./common/MasterFiles.vue */ "./resources/js/pages/Principals/common/MasterFiles.vue"));
        }
      }, {
        title: 'Settings',
        icon: 'mdi-tune',
        component: function component() {
          return __webpack_require__.e(/*! import() */ 25).then(__webpack_require__.bind(null, /*! ./common/Settings.vue */ "./resources/js/pages/Principals/common/Settings.vue"));
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

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/principal.vue?vue&type=template&id=e42900a6&":
/*!******************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/principal.vue?vue&type=template&id=e42900a6& ***!
  \******************************************************************************************************************************************************************************************************************/
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
        key: _vm.selectedPrincipalCode + "_tabs_" + new Date().getTime(),
        attrs: { tabs: _vm.tabs }
      })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/pages/Principals/principal.vue":
/*!*****************************************************!*\
  !*** ./resources/js/pages/Principals/principal.vue ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _principal_vue_vue_type_template_id_e42900a6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./principal.vue?vue&type=template&id=e42900a6& */ "./resources/js/pages/Principals/principal.vue?vue&type=template&id=e42900a6&");
/* harmony import */ var _principal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./principal.vue?vue&type=script&lang=js& */ "./resources/js/pages/Principals/principal.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _principal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _principal_vue_vue_type_template_id_e42900a6___WEBPACK_IMPORTED_MODULE_0__["render"],
  _principal_vue_vue_type_template_id_e42900a6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Principals/principal.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Principals/principal.vue?vue&type=script&lang=js&":
/*!******************************************************************************!*\
  !*** ./resources/js/pages/Principals/principal.vue?vue&type=script&lang=js& ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_principal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./principal.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/principal.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_principal_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Principals/principal.vue?vue&type=template&id=e42900a6&":
/*!************************************************************************************!*\
  !*** ./resources/js/pages/Principals/principal.vue?vue&type=template&id=e42900a6& ***!
  \************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_principal_vue_vue_type_template_id_e42900a6___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./principal.vue?vue&type=template&id=e42900a6& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/principal.vue?vue&type=template&id=e42900a6&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_principal_vue_vue_type_template_id_e42900a6___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_principal_vue_vue_type_template_id_e42900a6___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./resources/js/stores.custom/principals sync recursive ^\\.\\/.*$":
/*!*************************************************************!*\
  !*** ./resources/js/stores.custom/principals sync ^\.\/.*$ ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./alaska": "./resources/js/stores.custom/principals/alaska.js",
	"./alaska.js": "./resources/js/stores.custom/principals/alaska.js",
	"./bevi": "./resources/js/stores.custom/principals/bevi.js",
	"./bevi.js": "./resources/js/stores.custom/principals/bevi.js",
	"./cadbury_adams": "./resources/js/stores.custom/principals/cadbury_adams.js",
	"./cadbury_adams.js": "./resources/js/stores.custom/principals/cadbury_adams.js",
	"./century_canning": "./resources/js/stores.custom/principals/century_canning.js",
	"./century_canning.js": "./resources/js/stores.custom/principals/century_canning.js",
	"./cle_ace": "./resources/js/stores.custom/principals/cle_ace.js",
	"./cle_ace.js": "./resources/js/stores.custom/principals/cle_ace.js",
	"./columbus_seafoods": "./resources/js/stores.custom/principals/columbus_seafoods.js",
	"./columbus_seafoods.js": "./resources/js/stores.custom/principals/columbus_seafoods.js",
	"./del_monte": "./resources/js/stores.custom/principals/del_monte.js",
	"./del_monte.js": "./resources/js/stores.custom/principals/del_monte.js",
	"./dole": "./resources/js/stores.custom/principals/dole.js",
	"./dole.js": "./resources/js/stores.custom/principals/dole.js",
	"./ecossentials": "./resources/js/stores.custom/principals/ecossentials.js",
	"./ecossentials.js": "./resources/js/stores.custom/principals/ecossentials.js",
	"./food_fabricators": "./resources/js/stores.custom/principals/food_fabricators.js",
	"./food_fabricators.js": "./resources/js/stores.custom/principals/food_fabricators.js",
	"./foodsphere_inc": "./resources/js/stores.custom/principals/foodsphere_inc.js",
	"./foodsphere_inc.js": "./resources/js/stores.custom/principals/foodsphere_inc.js",
	"./green_cross": "./resources/js/stores.custom/principals/green_cross.js",
	"./green_cross.js": "./resources/js/stores.custom/principals/green_cross.js",
	"./gsmi": "./resources/js/stores.custom/principals/gsmi.js",
	"./gsmi.js": "./resources/js/stores.custom/principals/gsmi.js",
	"./gspi": "./resources/js/stores.custom/principals/gspi.js",
	"./gspi.js": "./resources/js/stores.custom/principals/gspi.js",
	"./jnj": "./resources/js/stores.custom/principals/jnj.js",
	"./jnj.js": "./resources/js/stores.custom/principals/jnj.js",
	"./jsu": "./resources/js/stores.custom/principals/jsu.js",
	"./jsu.js": "./resources/js/stores.custom/principals/jsu.js",
	"./mead_johnson": "./resources/js/stores.custom/principals/mead_johnson.js",
	"./mead_johnson.js": "./resources/js/stores.custom/principals/mead_johnson.js",
	"./megasoft": "./resources/js/stores.custom/principals/megasoft.js",
	"./megasoft.js": "./resources/js/stores.custom/principals/megasoft.js",
	"./mondelez": "./resources/js/stores.custom/principals/mondelez.js",
	"./mondelez.js": "./resources/js/stores.custom/principals/mondelez.js",
	"./others": "./resources/js/stores.custom/principals/others.js",
	"./others.js": "./resources/js/stores.custom/principals/others.js",
	"./others_ni": "./resources/js/stores.custom/principals/others_ni.js",
	"./others_ni.js": "./resources/js/stores.custom/principals/others_ni.js",
	"./pacific_meat": "./resources/js/stores.custom/principals/pacific_meat.js",
	"./pacific_meat.js": "./resources/js/stores.custom/principals/pacific_meat.js",
	"./peerless": "./resources/js/stores.custom/principals/peerless.js",
	"./peerless.js": "./resources/js/stores.custom/principals/peerless.js",
	"./purefoods": "./resources/js/stores.custom/principals/purefoods.js",
	"./purefoods.js": "./resources/js/stores.custom/principals/purefoods.js",
	"./rfm": "./resources/js/stores.custom/principals/rfm.js",
	"./rfm.js": "./resources/js/stores.custom/principals/rfm.js",
	"./smfi_smis_frozen": "./resources/js/stores.custom/principals/smfi_smis_frozen.js",
	"./smfi_smis_frozen.js": "./resources/js/stores.custom/principals/smfi_smis_frozen.js",
	"./snow_mountain_dairy": "./resources/js/stores.custom/principals/snow_mountain_dairy.js",
	"./snow_mountain_dairy.js": "./resources/js/stores.custom/principals/snow_mountain_dairy.js",
	"./splash": "./resources/js/stores.custom/principals/splash.js",
	"./splash.js": "./resources/js/stores.custom/principals/splash.js",
	"./wyeth": "./resources/js/stores.custom/principals/wyeth.js",
	"./wyeth.js": "./resources/js/stores.custom/principals/wyeth.js"
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

/***/ "./resources/js/stores.custom/principals/alaska.js":
/*!*********************************************************!*\
  !*** ./resources/js/stores.custom/principals/alaska.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
  customersTableHeader: [[{
    text: "Customer Code",
    value: "customer_code"
  }, {
    text: "Customer Code (Supplier)",
    value: "customer_code_supplier"
  }, {
    text: "Name",
    value: "customer_name"
  }]],
  itemsTableHeader: [[{
    text: "Item Code",
    value: "item_code"
  }, {
    text: "Item Code (Supplier)",
    value: "item_code_supplier"
  }, {
    text: "Description (Supplier)",
    value: "description_supplier"
  }]],
  // templated data table header
  generatedDataTableHeader: [[{
    text: "Invoice #",
    value: "invoice_no"
  }, {
    text: "Customer Code",
    value: "customer_code"
  }, {
    text: "Customer Name",
    value: "customer_name"
  }, {
    text: "Invoice Date (M/D/Y)",
    value: "invoice_date"
  }, {
    text: "Item Code (NAV)",
    value: "alturas_item_code"
  }, // {text:"Item Code (Supplier)", value: "item_code"},
  {
    text: "Item Name (NAV)",
    value: "description"
  }, // {text:"Item Name (Supplier)", value: "description_supplier"},
  {
    text: "Quantity",
    value: "quantity"
  }, // {text:"Bulk Quantity", value: "bulk_qty"},
  // {text:"Loose Quantity", value: "loose_qty"},
  {
    text: "Price",
    value: "price"
  }, {
    text: "Amount",
    value: "amount"
  }, {
    text: "UOM",
    value: "uom"
  }, // {text:"Base UOM", value: "base_uom"},
  // {text:"Conversion UOM", value: "uom"},
  {
    text: "Salesman Name",
    value: "sm_name"
  }]],
  // transactions table header
  transactionsTableHeader: [[{
    text: "Upload Date",
    value: "updated_at"
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
  }]],
  // ***********************************************************************************
  generatedDataHistoryFilters: [[{
    text: 'Generated Date',
    value: 'generated_at'
  }, {
    text: 'Item Code',
    value: 'item_code'
  }, {
    text: 'Customer Code',
    value: 'customer_code'
  }]],
  generatedDataDBTableColumns: [// common
  'id', 'principal_code', 'template_variation', 'generated_at', 'uploaded_by', 'status', 'doc_no', // principal template
  'invoice_no', 'customer_code', 'alturas_customer_code', 'customer_name', 'invoice_date', 'alturas_item_code', 'item_code', 'description', 'description_supplier', 'quantity', // 'bulk_qty',
  // 'loose_qty',
  'price', 'amount', 'base_uom', 'uom', 'sm_name', 'system_date']
});
var actions = {};
/* harmony default export */ __webpack_exports__["default"] = ({
  state: state // ...actions

});

/***/ }),

/***/ "./resources/js/stores.custom/principals/bevi.js":
/*!*******************************************************!*\
  !*** ./resources/js/stores.custom/principals/bevi.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
  customersTableHeader: [[{
    text: "Customer Code",
    value: "customer_code"
  }, {
    text: "Customer Code (Supplier)",
    value: "customer_code_supplier"
  }, {
    text: "Name",
    value: "customer_name"
  }]],
  itemsTableHeader: [[{
    text: "Item Code",
    value: "item_code"
  }, {
    text: "Item Code (Supplier)",
    value: "item_code_supplier"
  }, {
    text: "Description (Supplier)",
    value: "description_supplier"
  }]],
  // templated data table header
  generatedDataTableHeader: [[{
    text: "Invoice #",
    value: "invoice_no"
  }, {
    text: "Customer Code",
    value: "customer_code"
  }, {
    text: "Customer Name",
    value: "customer_name"
  }, {
    text: "Invoice Date (M/D/Y)",
    value: "invoice_date"
  }, {
    text: "Item Code (NAV)",
    value: "alturas_item_code"
  }, // {text:"Item Code (Supplier)", value: "item_code"},
  {
    text: "Item Name (NAV)",
    value: "description"
  }, // {text:"Item Name (Supplier)", value: "description_supplier"},
  {
    text: "Quantity",
    value: "quantity"
  }, // {text:"Bulk Quantity", value: "bulk_qty"},
  // {text:"Loose Quantity", value: "loose_qty"},
  {
    text: "Price",
    value: "price"
  }, {
    text: "Amount",
    value: "amount"
  }, {
    text: "UOM",
    value: "uom"
  }, // {text:"Base UOM", value: "base_uom"},
  // {text:"Conversion UOM", value: "uom"},
  {
    text: "Salesman Name",
    value: "sm_name"
  }]],
  // transactions table header
  transactionsTableHeader: [[{
    text: "Upload Date",
    value: "updated_at"
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
  }]],
  // ***********************************************************************************
  generatedDataHistoryFilters: [[{
    text: 'Generated Date',
    value: 'generated_at'
  }, {
    text: 'Item Code',
    value: 'item_code'
  }, {
    text: 'Customer Code',
    value: 'customer_code'
  }]],
  generatedDataDBTableColumns: [// common
  'id', 'principal_code', 'template_variation', 'generated_at', 'uploaded_by', 'status', 'doc_no', // principal template
  'invoice_no', 'customer_code', 'alturas_customer_code', 'customer_name', 'invoice_date', 'alturas_item_code', 'item_code', 'description', 'description_supplier', 'quantity', // 'bulk_qty',
  // 'loose_qty',
  'price', 'amount', 'base_uom', 'uom', 'sm_name', 'system_date']
});
var actions = {};
/* harmony default export */ __webpack_exports__["default"] = ({
  state: state // ...actions

});

/***/ }),

/***/ "./resources/js/stores.custom/principals/cadbury_adams.js":
/*!****************************************************************!*\
  !*** ./resources/js/stores.custom/principals/cadbury_adams.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
  // customersTableHeader: [
  //     [
  //         { text: "Customer Code", value: "customer_code" },
  //         { text: "Customer Code (Supplier)", value: "customer_code_supplier" },
  //         { text: "Name", value: "customer_name" },
  //     ],
  // ],
  itemsTableHeader: [[{
    text: "Item Code",
    value: "item_code"
  }, {
    text: "Item Code (Supplier)",
    value: "item_code_supplier"
  }, {
    text: "Description (Nav)",
    value: "description"
  }]],
  // salesmenTableHeader: [
  //     [
  //         {text:"Group Code", value:"group_code"},
  //         {text:"Salesman Name", value:"sm_name"},
  //     ]
  // ],
  // templated data table header
  generatedDataTableHeader: [[{
    text: "Invoice #",
    value: "invoice_no"
  }, {
    text: "Customer Code",
    value: "customer_code"
  }, {
    text: "Customer Name",
    value: "customer_name"
  }, {
    text: "Invoice Date (M/D/Y)",
    value: "invoice_date"
  }, {
    text: "Item Code (NAV)",
    value: "alturas_item_code"
  }, {
    text: "Item Code (Supplier)",
    value: "item_code"
  }, {
    text: "Item Name (NAV)",
    value: "item_description"
  }, {
    text: "Item Name (Supplier)",
    value: "description_supplier"
  }, {
    text: "UOM",
    value: "uom"
  }, {
    text: "Quantity",
    value: "quantity"
  }, {
    text: "Price",
    value: "price"
  }, {
    text: "Amount",
    value: "amount"
  }, {
    text: "Salesman",
    value: "sm_name"
  }, {
    text: "Group",
    value: "group"
  }]],
  // ***********************************************************************************
  generatedDataHistoryFilters: [[{
    text: 'System Date',
    value: 'system_date'
  }, {
    text: 'Item Code',
    value: 'item_code'
  }, {
    text: 'Customer Code',
    value: 'customer_code'
  }, {
    text: 'Source Group',
    value: 'group_code'
  }]]
});
var actions = {};
/* harmony default export */ __webpack_exports__["default"] = ({
  state: state // ...actions

});

/***/ }),

/***/ "./resources/js/stores.custom/principals/century_canning.js":
/*!******************************************************************!*\
  !*** ./resources/js/stores.custom/principals/century_canning.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
  // customersTableHeader: [
  //     [
  //         { text: "Customer Code", value: "customer_code" },
  //         { text: "Principal Customer Code", value: "customer_code_supplier" },
  //     ],
  // ],
  itemsTableHeader: [[{
    text: "Item Code",
    value: "item_code"
  }, // {text:"Description", value:"description"},
  {
    text: "Supplier Item Code",
    value: "item_code_supplier"
  }, {
    text: "Supplier Item Description",
    value: "description_supplier"
  }, {
    text: "CASE",
    value: "case"
  }, {
    text: "PCS",
    value: "conversion_qty"
  }]],
  salesmenTableHeader: [[{
    text: "Group Code",
    value: "group_code"
  }, {
    text: "Salesman Code - NOAH",
    value: "sm_code_supplier"
  }, {
    text: "Location Code - NOAH",
    value: "location_code_supplier"
  }]],
  // templated data table header(s)
  generatedDataTableHeader: [[{
    text: "Distributor ID",
    value: "distributor_id"
  }, {
    text: "Salesman",
    value: "sales_agent_id"
  }, {
    text: "Docno",
    value: "doc_no"
  }, {
    text: "Location",
    value: "location"
  }, {
    text: "Ordered Date",
    value: "order_date"
  }, {
    text: "Request Delivery Date",
    value: "request_delivery_date"
  }, {
    text: "Payment Term",
    value: "payment_term_code"
  }, {
    text: "Account Code",
    value: "customer_code"
  }, {
    text: "Product Code",
    value: "item_code"
  }, {
    text: "Bulk Qty",
    value: "bulk_qty"
  }, {
    text: "Loose Qty",
    value: "loose_qty"
  }, {
    text: "System Date",
    value: "system_date"
  }, {
    text: "User",
    value: "default_user"
  }] // [
  //     {text:"Distributor ID", value: "distributor_id"},
  //     {text:"Sales Agent ID", value: "sales_agent_id"},
  //     {text:"Invoice No (Doc No)", value: "doc_no"},
  //     {text:"Location", value: "location"},
  //     {text:"Invoice Date", value: "invoice_date"},
  //     {text:"Payment Term Code", value: "payment_term_code"},
  //     {text:"Customer No", value: "customer_code"},
  //     {text:"Product Code", value: "item_code"},
  //     {text:"Bulk Qty", value: "bulk_qty"},
  //     {text:"Loose Qty", value: "loose_qty"},
  //     {text:"System Date", value: "system_date"},
  //     {text:"Default User", value: "default_user"},
  //     {text:"Invoice No", value: "invoice_no"},
  //     {text:"Expiry Date", value: "expiry_date"},
  // ],
  ],
  generatedDataHistoryFilters: [[{
    text: 'Order Date',
    value: 'order_date'
  }, {
    text: 'Invoice #',
    value: 'doc_no'
  }, {
    text: 'Product Code',
    value: 'item_code'
  }, {
    text: 'Customer Code',
    value: 'customer_code'
  }, {
    text: 'Salesman',
    value: 'sm_code_supplier'
  }, {
    text: 'Location',
    value: 'location'
  }, {
    text: 'Invoice Posting Date',
    value: 'posting_date'
  }, {
    text: 'Source Group',
    value: 'group_code'
  }]]
});
var actions = {};
/* harmony default export */ __webpack_exports__["default"] = ({
  state: state // ...actions

});

/***/ }),

/***/ "./resources/js/stores.custom/principals/cle_ace.js":
/*!**********************************************************!*\
  !*** ./resources/js/stores.custom/principals/cle_ace.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
  customersTableHeader: [[{
    text: "Customer Code",
    value: "customer_code"
  }, {
    text: "Customer Code (Supplier)",
    value: "customer_code_supplier"
  }, {
    text: "Name",
    value: "customer_name"
  }]],
  itemsTableHeader: [[{
    text: "Item Code",
    value: "item_code"
  }, {
    text: "Item Code (Supplier)",
    value: "item_code_supplier"
  }, {
    text: "Description (Supplier)",
    value: "description_supplier"
  }]],
  // templated data table header
  generatedDataTableHeader: [[{
    text: "Invoice #",
    value: "invoice_no"
  }, {
    text: "Customer Code",
    value: "customer_code"
  }, {
    text: "Customer Name",
    value: "customer_name"
  }, {
    text: "Invoice Date (M/D/Y)",
    value: "invoice_date"
  }, {
    text: "Item Code (NAV)",
    value: "alturas_item_code"
  }, // {text:"Item Code (Supplier)", value: "item_code"},
  {
    text: "Item Name (NAV)",
    value: "description"
  }, // {text:"Item Name (Supplier)", value: "description_supplier"},
  {
    text: "Quantity",
    value: "quantity"
  }, // {text:"Bulk Quantity", value: "bulk_qty"},
  // {text:"Loose Quantity", value: "loose_qty"},
  {
    text: "Price",
    value: "price"
  }, {
    text: "Amount",
    value: "amount"
  }, {
    text: "UOM",
    value: "uom"
  }, // {text:"Base UOM", value: "base_uom"},
  // {text:"Conversion UOM", value: "uom"},
  {
    text: "Salesman Name",
    value: "sm_name"
  }]],
  // transactions table header
  transactionsTableHeader: [[{
    text: "Upload Date",
    value: "updated_at"
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
  }]],
  // ***********************************************************************************
  generatedDataHistoryFilters: [[{
    text: 'Generated Date',
    value: 'generated_at'
  }, {
    text: 'Item Code',
    value: 'item_code'
  }, {
    text: 'Customer Code',
    value: 'customer_code'
  }]],
  generatedDataDBTableColumns: [// common
  'id', 'principal_code', 'template_variation', 'generated_at', 'uploaded_by', 'status', 'doc_no', // principal template
  'invoice_no', 'customer_code', 'alturas_customer_code', 'customer_name', 'invoice_date', 'alturas_item_code', 'item_code', 'description', 'description_supplier', 'quantity', // 'bulk_qty',
  // 'loose_qty',
  'price', 'amount', 'base_uom', 'uom', 'sm_name', 'system_date']
});
var actions = {};
/* harmony default export */ __webpack_exports__["default"] = ({
  state: state // ...actions

});

/***/ }),

/***/ "./resources/js/stores.custom/principals/columbus_seafoods.js":
/*!********************************************************************!*\
  !*** ./resources/js/stores.custom/principals/columbus_seafoods.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
  // customersTableHeader: [
  //     [
  //         { text: "Customer Code", value: "customer_code" },
  //         { text: "Principal Customer Code", value: "customer_code_supplier" },
  //     ],
  // ],
  itemsTableHeader: [[{
    text: "Item Code",
    value: "item_code"
  }, // {text:"Description", value:"description"},
  {
    text: "Supplier Item Code",
    value: "item_code_supplier"
  }, {
    text: "Supplier Item Description",
    value: "description_supplier"
  }, {
    text: "CASE",
    value: "case"
  }, {
    text: "PCS",
    value: "conversion_qty"
  }]],
  salesmenTableHeader: [[{
    text: "Group Code",
    value: "group_code"
  }, {
    text: "Salesman Code - NOAH",
    value: "sm_code_supplier"
  }, {
    text: "Location Code - NOAH",
    value: "location_code_supplier"
  }]],
  // templated data table header(s)
  generatedDataTableHeader: [[{
    text: "Distributor ID",
    value: "distributor_id"
  }, {
    text: "Salesman",
    value: "sales_agent_id"
  }, {
    text: "Docno",
    value: "doc_no"
  }, {
    text: "Location",
    value: "location"
  }, {
    text: "Ordered Date",
    value: "order_date"
  }, {
    text: "Request Delivery Date",
    value: "request_delivery_date"
  }, {
    text: "Payment Term",
    value: "payment_term_code"
  }, {
    text: "Account Code",
    value: "customer_code"
  }, {
    text: "Product Code",
    value: "item_code"
  }, {
    text: "Bulk Qty",
    value: "bulk_qty"
  }, {
    text: "Loose Qty",
    value: "loose_qty"
  }, {
    text: "System Date",
    value: "system_date"
  }, {
    text: "User",
    value: "default_user"
  }] // [
  //     {text:"Distributor ID", value: "distributor_id"},
  //     {text:"Sales Agent ID", value: "sales_agent_id"},
  //     {text:"Invoice No (Doc No)", value: "doc_no"},
  //     {text:"Location", value: "location"},
  //     {text:"Invoice Date", value: "invoice_date"},
  //     {text:"Payment Term Code", value: "payment_term_code"},
  //     {text:"Customer No", value: "customer_code"},
  //     {text:"Product Code", value: "item_code"},
  //     {text:"Bulk Qty", value: "bulk_qty"},
  //     {text:"Loose Qty", value: "loose_qty"},
  //     {text:"System Date", value: "system_date"},
  //     {text:"Default User", value: "default_user"},
  //     {text:"Invoice No", value: "invoice_no"},
  //     {text:"Expiry Date", value: "expiry_date"},
  // ],
  ],
  generatedDataHistoryFilters: [[{
    text: 'Order Date',
    value: 'order_date'
  }, {
    text: 'Invoice #',
    value: 'doc_no'
  }, {
    text: 'Product Code',
    value: 'item_code'
  }, {
    text: 'Customer Code',
    value: 'customer_code'
  }, {
    text: 'Salesman',
    value: 'sm_code_supplier'
  }, {
    text: 'Location',
    value: 'location'
  }, {
    text: 'Invoice Posting Date',
    value: 'posting_date'
  }, {
    text: 'Source Group',
    value: 'group_code'
  }]]
});
var actions = {};
/* harmony default export */ __webpack_exports__["default"] = ({
  state: state // ...actions

});

/***/ }),

/***/ "./resources/js/stores.custom/principals/del_monte.js":
/*!************************************************************!*\
  !*** ./resources/js/stores.custom/principals/del_monte.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
  customersTableHeader: [[{
    text: "Customer Code",
    value: "customer_code"
  }, {
    text: "Customer Code (Supplier)",
    value: "customer_code_supplier"
  }, {
    text: "Name",
    value: "customer_name"
  }]],
  itemsTableHeader: [[{
    text: "Item Code",
    value: "item_code"
  }, {
    text: "Item Code (Supplier)",
    value: "item_code_supplier"
  }, {
    text: "Description (Supplier)",
    value: "description_supplier"
  }]],
  // templated data table header
  generatedDataTableHeader: [[{
    text: "Invoice #",
    value: "invoice_no"
  }, {
    text: "Customer Code",
    value: "customer_code"
  }, {
    text: "Customer Name",
    value: "customer_name"
  }, {
    text: "Invoice Date (M/D/Y)",
    value: "invoice_date"
  }, {
    text: "Item Code (NAV)",
    value: "alturas_item_code"
  }, // {text:"Item Code (Supplier)", value: "item_code"},
  {
    text: "Item Name (NAV)",
    value: "description"
  }, // {text:"Item Name (Supplier)", value: "description_supplier"},
  {
    text: "Quantity",
    value: "quantity"
  }, // {text:"Bulk Quantity", value: "bulk_qty"},
  // {text:"Loose Quantity", value: "loose_qty"},
  {
    text: "Price",
    value: "price"
  }, {
    text: "Amount",
    value: "amount"
  }, {
    text: "UOM",
    value: "uom"
  }, // {text:"Base UOM", value: "base_uom"},
  // {text:"Conversion UOM", value: "uom"},
  {
    text: "Salesman Name",
    value: "sm_name"
  }]],
  // transactions table header
  transactionsTableHeader: [[{
    text: "Upload Date",
    value: "updated_at"
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
  }]],
  // ***********************************************************************************
  generatedDataHistoryFilters: [[{
    text: 'Generated Date',
    value: 'generated_at'
  }, {
    text: 'Item Code',
    value: 'item_code'
  }, {
    text: 'Customer Code',
    value: 'customer_code'
  }]],
  generatedDataDBTableColumns: [// common
  'id', 'principal_code', 'template_variation', 'generated_at', 'uploaded_by', 'status', 'doc_no', // principal template
  'invoice_no', 'customer_code', 'alturas_customer_code', 'customer_name', 'invoice_date', 'alturas_item_code', 'item_code', 'description', 'description_supplier', 'quantity', // 'bulk_qty',
  // 'loose_qty',
  'price', 'amount', 'base_uom', 'uom', 'sm_name', 'system_date']
});
var actions = {};
/* harmony default export */ __webpack_exports__["default"] = ({
  state: state // ...actions

});

/***/ }),

/***/ "./resources/js/stores.custom/principals/dole.js":
/*!*******************************************************!*\
  !*** ./resources/js/stores.custom/principals/dole.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
  customersTableHeader: [[{
    text: "Customer Code",
    value: "customer_code"
  }, {
    text: "Customer Code (Supplier)",
    value: "customer_code_supplier"
  }, {
    text: "Name",
    value: "customer_name"
  }]],
  itemsTableHeader: [[{
    text: "Item Code",
    value: "item_code"
  }, {
    text: "Item Code (Supplier)",
    value: "item_code_supplier"
  }, {
    text: "Description (Supplier)",
    value: "description_supplier"
  }]],
  // templated data table header
  generatedDataTableHeader: [[{
    text: "Invoice #",
    value: "invoice_no"
  }, {
    text: "Customer Code",
    value: "customer_code"
  }, {
    text: "Customer Name",
    value: "customer_name"
  }, {
    text: "Invoice Date (M/D/Y)",
    value: "invoice_date"
  }, {
    text: "Item Code (NAV)",
    value: "alturas_item_code"
  }, // {text:"Item Code (Supplier)", value: "item_code"},
  {
    text: "Item Name (NAV)",
    value: "description"
  }, // {text:"Item Name (Supplier)", value: "description_supplier"},
  {
    text: "Quantity",
    value: "quantity"
  }, // {text:"Bulk Quantity", value: "bulk_qty"},
  // {text:"Loose Quantity", value: "loose_qty"},
  {
    text: "Price",
    value: "price"
  }, {
    text: "Amount",
    value: "amount"
  }, {
    text: "UOM",
    value: "uom"
  }, // {text:"Base UOM", value: "base_uom"},
  // {text:"Conversion UOM", value: "uom"},
  {
    text: "Salesman Name",
    value: "sm_name"
  }]],
  // transactions table header
  transactionsTableHeader: [[{
    text: "Upload Date",
    value: "updated_at"
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
  }]],
  // ***********************************************************************************
  generatedDataHistoryFilters: [[{
    text: 'Generated Date',
    value: 'generated_at'
  }, {
    text: 'Item Code',
    value: 'item_code'
  }, {
    text: 'Customer Code',
    value: 'customer_code'
  }]],
  generatedDataDBTableColumns: [// common
  'id', 'principal_code', 'template_variation', 'generated_at', 'uploaded_by', 'status', 'doc_no', // principal template
  'invoice_no', 'customer_code', 'alturas_customer_code', 'customer_name', 'invoice_date', 'alturas_item_code', 'item_code', 'description', 'description_supplier', 'quantity', // 'bulk_qty',
  // 'loose_qty',
  'price', 'amount', 'base_uom', 'uom', 'sm_name', 'system_date']
});
var actions = {};
/* harmony default export */ __webpack_exports__["default"] = ({
  state: state // ...actions

});

/***/ }),

/***/ "./resources/js/stores.custom/principals/ecossentials.js":
/*!***************************************************************!*\
  !*** ./resources/js/stores.custom/principals/ecossentials.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
  customersTableHeader: [[{
    text: "Customer Code",
    value: "customer_code"
  }, {
    text: "Customer Code (Supplier)",
    value: "customer_code_supplier"
  }, {
    text: "Name",
    value: "customer_name"
  }]],
  itemsTableHeader: [[{
    text: "Item Code",
    value: "item_code"
  }, {
    text: "Item Code (Supplier)",
    value: "item_code_supplier"
  }, {
    text: "Description (Supplier)",
    value: "description_supplier"
  }]],
  // templated data table header
  generatedDataTableHeader: [[{
    text: "Invoice #",
    value: "invoice_no"
  }, {
    text: "Customer Code",
    value: "customer_code"
  }, {
    text: "Customer Name",
    value: "customer_name"
  }, {
    text: "Invoice Date (M/D/Y)",
    value: "invoice_date"
  }, {
    text: "Item Code (NAV)",
    value: "alturas_item_code"
  }, // {text:"Item Code (Supplier)", value: "item_code"},
  {
    text: "Item Name (NAV)",
    value: "description"
  }, // {text:"Item Name (Supplier)", value: "description_supplier"},
  {
    text: "Quantity",
    value: "quantity"
  }, // {text:"Bulk Quantity", value: "bulk_qty"},
  // {text:"Loose Quantity", value: "loose_qty"},
  {
    text: "Price",
    value: "price"
  }, {
    text: "Amount",
    value: "amount"
  }, {
    text: "UOM",
    value: "uom"
  }, // {text:"Base UOM", value: "base_uom"},
  // {text:"Conversion UOM", value: "uom"},
  {
    text: "Salesman Name",
    value: "sm_name"
  }]],
  // transactions table header
  transactionsTableHeader: [[{
    text: "Upload Date",
    value: "updated_at"
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
  }]],
  // ***********************************************************************************
  generatedDataHistoryFilters: [[{
    text: 'Generated Date',
    value: 'generated_at'
  }, {
    text: 'Item Code',
    value: 'item_code'
  }, {
    text: 'Customer Code',
    value: 'customer_code'
  }]],
  generatedDataDBTableColumns: [// common
  'id', 'principal_code', 'template_variation', 'generated_at', 'uploaded_by', 'status', 'doc_no', // principal template
  'invoice_no', 'customer_code', 'alturas_customer_code', 'customer_name', 'invoice_date', 'alturas_item_code', 'item_code', 'description', 'description_supplier', 'quantity', // 'bulk_qty',
  // 'loose_qty',
  'price', 'amount', 'base_uom', 'uom', 'sm_name', 'system_date']
});
var actions = {};
/* harmony default export */ __webpack_exports__["default"] = ({
  state: state // ...actions

});

/***/ }),

/***/ "./resources/js/stores.custom/principals/food_fabricators.js":
/*!*******************************************************************!*\
  !*** ./resources/js/stores.custom/principals/food_fabricators.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
  // customersTableHeader: [
  //     [
  //         { text: "Customer Code", value: "customer_code" },
  //         { text: "Customer Code (Supplier)", value: "customer_code_supplier" },
  //         { text: "Name", value: "customer_name" },
  //     ],
  // ],
  itemsTableHeader: [[{
    text: "Item Code",
    value: "item_code"
  }, {
    text: "Item Code (Supplier)",
    value: "item_code_supplier"
  }, {
    text: "Description (Supplier)",
    value: "description_supplier"
  }]],
  // templated data table header
  generatedDataTableHeader: [[{
    text: "Invoice #",
    value: "invoice_no"
  }, {
    text: "Customer Code",
    value: "customer_code"
  }, {
    text: "Customer Name",
    value: "customer_name"
  }, {
    text: "Invoice Date (M/D/Y)",
    value: "invoice_date"
  }, {
    text: "Item Code (NAV)",
    value: "alturas_item_code"
  }, {
    text: "Item Code (Supplier)",
    value: "item_code"
  }, {
    text: "Item Name (NAV)",
    value: "item_description"
  }, {
    text: "Item Name (Supplier)",
    value: "description_supplier"
  }, {
    text: "UOM",
    value: "uom"
  }, {
    text: "Quantity",
    value: "quantity"
  }, {
    text: "Price",
    value: "price"
  }, {
    text: "Amount",
    value: "amount"
  }, {
    text: "Salesman",
    value: "sm_name"
  }, {
    text: "Group",
    value: "group"
  }]],
  // ***********************************************************************************
  generatedDataHistoryFilters: [[{
    text: 'System Date',
    value: 'system_date'
  }, {
    text: 'Item Code',
    value: 'item_code'
  }, {
    text: 'Customer Code',
    value: 'customer_code'
  }, {
    text: 'Source Group',
    value: 'group_code'
  }]]
});
var actions = {};
/* harmony default export */ __webpack_exports__["default"] = ({
  state: state // ...actions

});

/***/ }),

/***/ "./resources/js/stores.custom/principals/foodsphere_inc.js":
/*!*****************************************************************!*\
  !*** ./resources/js/stores.custom/principals/foodsphere_inc.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
  // customersTableHeader: [
  //     [
  //         { text: "Customer Code", value: "customer_code" },
  //         { text: "Customer Code (Supplier)", value: "customer_code_supplier" },
  //         { text: "Name", value: "customer_name" },
  //     ],
  // ],
  itemsTableHeader: [[{
    text: "Item Code",
    value: "item_code"
  }, {
    text: "Item Code (Supplier)",
    value: "item_code_supplier"
  }, {
    text: "Description (Supplier)",
    value: "description_supplier"
  }]],
  // templated data table header
  generatedDataTableHeader: [[{
    text: "Invoice #",
    value: "invoice_no"
  }, {
    text: "Customer Code",
    value: "customer_code"
  }, {
    text: "Customer Name",
    value: "customer_name"
  }, {
    text: "Invoice Date (M/D/Y)",
    value: "invoice_date"
  }, {
    text: "Item Code (NAV)",
    value: "alturas_item_code"
  }, {
    text: "Item Code (Supplier)",
    value: "item_code"
  }, {
    text: "Item Name (NAV)",
    value: "item_description"
  }, {
    text: "Item Name (Supplier)",
    value: "description_supplier"
  }, {
    text: "UOM",
    value: "uom"
  }, {
    text: "Quantity",
    value: "quantity"
  }, {
    text: "Price",
    value: "price"
  }, {
    text: "Amount",
    value: "amount"
  }, {
    text: "Salesman",
    value: "sm_name"
  }, {
    text: "Group",
    value: "group"
  }]],
  // ***********************************************************************************
  generatedDataHistoryFilters: [[{
    text: 'System Date',
    value: 'system_date'
  }, {
    text: 'Item Code',
    value: 'item_code'
  }, {
    text: 'Customer Code',
    value: 'customer_code'
  }, {
    text: 'Source Group',
    value: 'group_code'
  }]]
});
var actions = {};
/* harmony default export */ __webpack_exports__["default"] = ({
  state: state // ...actions

});

/***/ }),

/***/ "./resources/js/stores.custom/principals/green_cross.js":
/*!**************************************************************!*\
  !*** ./resources/js/stores.custom/principals/green_cross.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
  customersTableHeader: [[{
    text: "Customer Code",
    value: "customer_code"
  }, {
    text: "Customer Code (Supplier)",
    value: "customer_code_supplier"
  }, {
    text: "Name",
    value: "customer_name"
  }]],
  itemsTableHeader: [[{
    text: "Item Code",
    value: "item_code"
  }, {
    text: "Item Code (Supplier)",
    value: "item_code_supplier"
  }, {
    text: "Description (Supplier)",
    value: "description_supplier"
  }]],
  // templated data table header
  generatedDataTableHeader: [[{
    text: "Invoice #",
    value: "invoice_no"
  }, {
    text: "Customer Code",
    value: "customer_code"
  }, {
    text: "Customer Name",
    value: "customer_name"
  }, {
    text: "Invoice Date (M/D/Y)",
    value: "invoice_date"
  }, {
    text: "Item Code (NAV)",
    value: "alturas_item_code"
  }, // {text:"Item Code (Supplier)", value: "item_code"},
  {
    text: "Item Name (NAV)",
    value: "description"
  }, // {text:"Item Name (Supplier)", value: "description_supplier"},
  {
    text: "Quantity",
    value: "quantity"
  }, // {text:"Bulk Quantity", value: "bulk_qty"},
  // {text:"Loose Quantity", value: "loose_qty"},
  {
    text: "Price",
    value: "price"
  }, {
    text: "Amount",
    value: "amount"
  }, {
    text: "UOM",
    value: "uom"
  }, // {text:"Base UOM", value: "base_uom"},
  // {text:"Conversion UOM", value: "uom"},
  {
    text: "Salesman Name",
    value: "sm_name"
  }]],
  // transactions table header
  transactionsTableHeader: [[{
    text: "Upload Date",
    value: "updated_at"
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
  }]],
  // ***********************************************************************************
  generatedDataHistoryFilters: [[{
    text: 'Generated Date',
    value: 'generated_at'
  }, {
    text: 'Item Code',
    value: 'item_code'
  }, {
    text: 'Customer Code',
    value: 'customer_code'
  }]],
  generatedDataDBTableColumns: [// common
  'id', 'principal_code', 'template_variation', 'generated_at', 'uploaded_by', 'status', 'doc_no', // principal template
  'invoice_no', 'customer_code', 'alturas_customer_code', 'customer_name', 'invoice_date', 'alturas_item_code', 'item_code', 'description', 'description_supplier', 'quantity', // 'bulk_qty',
  // 'loose_qty',
  'price', 'amount', 'base_uom', 'uom', 'sm_name', 'system_date']
});
var actions = {};
/* harmony default export */ __webpack_exports__["default"] = ({
  state: state // ...actions

});

/***/ }),

/***/ "./resources/js/stores.custom/principals/gsmi.js":
/*!*******************************************************!*\
  !*** ./resources/js/stores.custom/principals/gsmi.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
  customersTableHeader: [[{
    text: "Customer Code",
    value: "customer_code"
  }, {
    text: "Salesman Name",
    value: "salesman_name"
  }, {
    text: "Customer Name",
    value: "customer_name"
  }]],
  itemsTableHeader: [[{
    text: "Item Code",
    value: "item_code"
  }, {
    text: "Description",
    value: "description"
  }, {
    text: "Supplier Item Code",
    value: "item_code_supplier"
  }, {
    text: "Supplier Item Description",
    value: "description_supplier"
  }, {
    text: "UOM",
    value: "uom"
  }, {
    text: "Conversion UOM",
    value: "conversion_uom"
  }, {
    text: "Conversion Quantity",
    value: "conversion_qty"
  }]],
  // templated data table header
  generatedDataTableHeader: [[{
    text: "Invoice #",
    value: "invoice_no"
  }, {
    text: "Customer Code",
    value: "customer_code"
  }, {
    text: "Customer Name",
    value: "customer_name"
  }, {
    text: "Invoice Date (M/D/Y)",
    value: "invoice_date"
  }, {
    text: "Item Code (NAV)",
    value: "alturas_item_code"
  }, {
    text: "Item Code (Supplier)",
    value: "item_code"
  }, {
    text: "Item Name (NAV)",
    value: "item_description"
  }, {
    text: "Item Name (Supplier)",
    value: "description_supplier"
  }, {
    text: "UOM",
    value: "uom"
  }, {
    text: "Quantity",
    value: "quantity"
  }, {
    text: "Price",
    value: "price"
  }, {
    text: "Amount",
    value: "amount"
  }, {
    text: "Salesman",
    value: "sm_name"
  }, {
    text: "Group",
    value: "group"
  }]],
  // ***********************************************************************************
  generatedDataHistoryFilters: [[{
    text: 'System Date',
    value: 'system_date'
  }, {
    text: 'Invoice #',
    value: 'doc_no'
  }, {
    text: 'Posting Date',
    value: 'posting_date'
  }, {
    text: 'Source Group',
    value: 'group_code'
  }]]
});
var actions = {};
/* harmony default export */ __webpack_exports__["default"] = ({
  state: state // ...actions

});

/***/ }),

/***/ "./resources/js/stores.custom/principals/gspi.js":
/*!*******************************************************!*\
  !*** ./resources/js/stores.custom/principals/gspi.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
  customersTableHeader: [[{
    text: "Customer Code",
    value: "customer_code"
  }, {
    text: "Name",
    value: "customer_name"
  }, {
    text: "Barangay",
    value: "address_1"
  }, {
    text: "Town",
    value: "address_2"
  }, {
    text: "Province",
    value: "address_3"
  }]],
  itemsTableHeader: [[{
    text: "Item Code",
    value: "item_code"
  }, {
    text: "Item Code (Supplier)",
    value: "item_code_supplier"
  }, {
    text: "Description (Supplier)",
    value: "description_supplier"
  }, {
    text: "Description",
    value: "description"
  }, {
    text: "Price in PCS",
    value: "conversion_uom_price"
  }, {
    text: "Price in CASE",
    value: "uom_price"
  }]],
  salesmenTableHeader: [[{
    text: "Salesman Code",
    value: "sm_code"
  }, {
    text: "Salesman Contact",
    value: "sm_contact_no"
  }, {
    text: "Division",
    value: "division"
  }, {
    text: "Salesman Name",
    value: "sm_name"
  }, {
    text: "Supervisor Contact",
    value: "supervisor_contact_no"
  }, {
    text: "Supervisor",
    value: "supervisor_name"
  }]],
  // templated data table header(s)
  generatedDataTableHeader: [[{
    text: "InvoiceDate",
    value: "invoice_date"
  }, {
    text: "ItemNo",
    value: "item_code"
  }, {
    text: "Description",
    value: "description_supplier"
  }, {
    text: "SalesQty",
    value: "quantity"
  }, {
    text: "SalesPrice",
    value: "price"
  }, {
    text: "SalesAmount",
    value: "amount"
  }, {
    text: "UOM",
    value: "uom"
  }, {
    text: "Currency",
    value: "currency"
  }, {
    text: "CustomerNo",
    value: "customer_code"
  }, {
    text: "CustomerName",
    value: "customer_name"
  }, {
    text: "CustomerAddress",
    value: "address_1"
  }, {
    text: "CustomerCity",
    value: "address_2"
  }, {
    text: "CustomerProvince",
    value: "address_3"
  }, {
    text: "SalesmanNo",
    value: "sm_code"
  }, {
    text: "SalesManName",
    value: "sm_name"
  }, {
    text: "SalesmanPhoneNumber",
    value: "sm_contact_no"
  }, {
    text: "SupervisorNo",
    value: "supervisor_contact_no"
  }, {
    text: "SupervisorName",
    value: "supervisor_name"
  }, {
    text: "InvoiceNo",
    value: "invoice_no"
  }]],
  // transactions table header
  transactionsTableHeader: [[{
    text: "Upload Date",
    value: "updated_at"
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
  }]],
  // ************************* Templated Data History *******************************
  // custom cols (Templated Data History)
  generatedDataDBTableColumns: [// common
  'id', 'generated_at', 'uploaded_by', 'doc_no', // principal template
  "invoice_date", "item_code", "description_supplier", "quantity", "price", "amount", "uom", "currency", "customer_code", "customer_name", "address_1", "address_2", "address_3", "sm_code", "sm_name", "sm_contact_no", "supervisor_contact_no", "supervisor_name", "invoice_no"],
  generatedDataHistoryFilters: [[{
    text: 'Invoice Posting Date',
    value: 'invoice_date'
  }, {
    text: 'Document #',
    value: 'doc_no'
  }, {
    text: 'Product Code',
    value: 'item_code'
  }, {
    text: 'Account Code',
    value: 'customer_code'
  }, {
    text: 'Salesman',
    value: 'sm_code'
  }]] // ************************* /Templated Data History *******************************

});
var actions = {};
/* harmony default export */ __webpack_exports__["default"] = ({
  state: state // ...actions

});

/***/ }),

/***/ "./resources/js/stores.custom/principals/jnj.js":
/*!******************************************************!*\
  !*** ./resources/js/stores.custom/principals/jnj.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
  // customersTableHeader: [
  //     [
  //         { text: "Customer Code", value: "customer_code" },
  //         { text: "Customer Code (Supplier)", value: "customer_code_supplier" },
  //         { text: "Name", value: "customer_name" },
  //     ],
  // ],
  itemsTableHeader: [[{
    text: "Item Code",
    value: "item_code"
  }, {
    text: "Description (Nav)",
    value: "description"
  }, {
    text: "Item Code (Supplier)",
    value: "item_code_supplier"
  }, {
    text: "Description (Supplier)",
    value: "description_supplier"
  }]],
  salesmenTableHeader: [[{
    text: "Group",
    value: "group_code"
  }, {
    text: "Salesman Name",
    value: "sm_name"
  }]],
  // templated data table header
  generatedDataTableHeader: [[{
    text: "Invoice #",
    value: "invoice_no"
  }, {
    text: "Customer Code",
    value: "customer_code"
  }, {
    text: "Customer Name",
    value: "customer_name"
  }, {
    text: "Invoice Date (M/D/Y)",
    value: "invoice_date"
  }, {
    text: "Item Code (NAV)",
    value: "alturas_item_code"
  }, {
    text: "Item Code (Supplier)",
    value: "item_code"
  }, {
    text: "Item Name (NAV)",
    value: "item_description"
  }, {
    text: "Item Name (Supplier)",
    value: "description_supplier"
  }, {
    text: "UOM",
    value: "uom"
  }, {
    text: "Quantity",
    value: "quantity"
  }, {
    text: "Price",
    value: "price"
  }, {
    text: "Amount",
    value: "amount"
  }, {
    text: "Salesman",
    value: "sm_name"
  }, {
    text: "Group",
    value: "group"
  }]],
  // ***********************************************************************************
  generatedDataHistoryFilters: [[{
    text: 'System Date',
    value: 'system_date'
  }, {
    text: 'Item Code',
    value: 'item_code'
  }, {
    text: 'Customer Code',
    value: 'customer_code'
  }, {
    text: 'Source Group',
    value: 'group_code'
  }]]
});
var actions = {};
/* harmony default export */ __webpack_exports__["default"] = ({
  state: state // ...actions

});

/***/ }),

/***/ "./resources/js/stores.custom/principals/jsu.js":
/*!******************************************************!*\
  !*** ./resources/js/stores.custom/principals/jsu.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
  customersTableHeader: [[{
    text: "Customer Code",
    value: "customer_code"
  }, {
    text: "Customer Code (Supplier)",
    value: "customer_code_supplier"
  }, {
    text: "Name",
    value: "customer_name"
  }]],
  itemsTableHeader: [[{
    text: "Item Code",
    value: "item_code"
  }, {
    text: "Item Code (Supplier)",
    value: "item_code_supplier"
  }, {
    text: "Description (Supplier)",
    value: "description_supplier"
  }]],
  // templated data table header
  generatedDataTableHeader: [[{
    text: "Invoice #",
    value: "invoice_no"
  }, {
    text: "Customer Code",
    value: "customer_code"
  }, {
    text: "Customer Name",
    value: "customer_name"
  }, {
    text: "Invoice Date (M/D/Y)",
    value: "invoice_date"
  }, {
    text: "Item Code (NAV)",
    value: "alturas_item_code"
  }, // {text:"Item Code (Supplier)", value: "item_code"},
  {
    text: "Item Name (NAV)",
    value: "description"
  }, // {text:"Item Name (Supplier)", value: "description_supplier"},
  {
    text: "Quantity",
    value: "quantity"
  }, // {text:"Bulk Quantity", value: "bulk_qty"},
  // {text:"Loose Quantity", value: "loose_qty"},
  {
    text: "Price",
    value: "price"
  }, {
    text: "Amount",
    value: "amount"
  }, {
    text: "UOM",
    value: "uom"
  }, // {text:"Base UOM", value: "base_uom"},
  // {text:"Conversion UOM", value: "uom"},
  {
    text: "Salesman Name",
    value: "sm_name"
  }]],
  // transactions table header
  transactionsTableHeader: [[{
    text: "Upload Date",
    value: "updated_at"
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
  }]],
  // ***********************************************************************************
  generatedDataHistoryFilters: [[{
    text: 'Generated Date',
    value: 'generated_at'
  }, {
    text: 'Item Code',
    value: 'item_code'
  }, {
    text: 'Customer Code',
    value: 'customer_code'
  }]],
  generatedDataDBTableColumns: [// common
  'id', 'principal_code', 'template_variation', 'generated_at', 'uploaded_by', 'status', 'doc_no', // principal template
  'invoice_no', 'customer_code', 'alturas_customer_code', 'customer_name', 'invoice_date', 'alturas_item_code', 'item_code', 'description', 'description_supplier', 'quantity', // 'bulk_qty',
  // 'loose_qty',
  'price', 'amount', 'base_uom', 'uom', 'sm_name', 'system_date']
});
var actions = {};
/* harmony default export */ __webpack_exports__["default"] = ({
  state: state // ...actions

});

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

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
  customersTableHeader: [[{
    text: "Distributor",
    value: "distributor_code"
  }, {
    text: "Customer Code",
    value: "customer_code"
  }, {
    text: "Customer Name",
    value: "customer_name"
  }, {
    text: "Outlet Type",
    value: "outlet_type"
  }, {
    text: "Salesman Name",
    value: "salesman_name"
  } // { text: "Operation Type",   value: "operation_type" },
  ]],
  itemsTableHeader: [[{
    text: "Item Code",
    value: "item_code"
  }, {
    text: "Description",
    value: "description"
  }, {
    text: "Supplier Item Code",
    value: "item_code_supplier"
  }, {
    text: "Supplier Item Description",
    value: "description_supplier"
  }]],
  salesmenTableHeader: [[{
    text: "Salesman Name",
    value: "sm_name"
  }, {
    text: "Route Code",
    value: "route_code"
  }]],
  // templated data table header
  generatedDataTableHeader: [[{
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
    value: "item_code"
  }, {
    text: "Quantity (numeric 25,4)",
    value: "quantity"
  }]],
  // transactions table header
  // transactionsTableHeader: [
  //     [
  //         {text:"Upload Date",    value:"updated_at"},
  //         {text:"Customer Code",  value:"customer_code"},
  //         {text:"Account Name",   value:"customer_name"},
  //         {text:"Sales Invoice",  value:"doc_no"},
  //         {text:"Item Code",      value:"item_code"},
  //         {text:"Description",    value:"description"},
  //         {text:"UOM",            value:"uom"},
  //         {text:"Quantity",       value:"quantity"},
  //         {text:"Amount",         value:"u3"},
  //     ]
  // ],
  // ************************* Templated Data History *******************************
  // custom cols (Templated Data History)
  // generatedDataDBTableColumns: [
  //     // common
  //     'id',
  //     'generated_at',
  //     'uploaded_by',
  //     'doc_no',
  //     // principal template
  //     'order_date',
  //     'customer_code',
  //     'route_code',
  //     'product_category_code',
  //     'ship_to',
  //     'order_no',
  //     'remarks',
  //     'item_code',
  //     'quantity'
  // ],
  generatedDataHistoryFilters: [[{
    text: 'Route Code',
    value: 'route_code'
  }, {
    text: 'Order Date',
    value: 'order_date'
  }, {
    text: 'Item Code',
    value: 'item_code'
  }, {
    text: 'Customer Code',
    value: 'customer_code'
  }, {
    text: 'Invoice #',
    value: 'doc_no'
  }, {
    text: 'Source Group',
    value: 'group_code'
  }]] // ************************* /Templated Data History *******************************

});
var actions = {};
/* harmony default export */ __webpack_exports__["default"] = ({
  state: state // ...actions

});

/***/ }),

/***/ "./resources/js/stores.custom/principals/megasoft.js":
/*!***********************************************************!*\
  !*** ./resources/js/stores.custom/principals/megasoft.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
  customersTableHeader: [[{
    text: "Customer Code",
    value: "customer_code"
  }, {
    text: "Customer Code (Supplier)",
    value: "customer_code_supplier"
  }, {
    text: "Name",
    value: "customer_name"
  }]],
  itemsTableHeader: [[{
    text: "Item Code",
    value: "item_code"
  }, {
    text: "Item Code (Supplier)",
    value: "item_code_supplier"
  }, {
    text: "Description (Supplier)",
    value: "description_supplier"
  }, {
    text: "UOM",
    value: "uom"
  }, {
    text: "Conversion Quantity",
    value: "conversion_qty"
  }]],
  // templated data table header
  generatedDataTableHeader: [[{
    text: "Invoice #",
    value: "invoice_no"
  }, {
    text: "Customer Code",
    value: "customer_code"
  }, {
    text: "Customer Name",
    value: "customer_name"
  }, {
    text: "Invoice Date (M/D/Y)",
    value: "invoice_date"
  }, {
    text: "Item Code (NAV)",
    value: "alturas_item_code"
  }, {
    text: "Item Code (Supplier)",
    value: "item_code"
  }, {
    text: "Item Name (NAV)",
    value: "item_description"
  }, {
    text: "Item Name (Supplier)",
    value: "description_supplier"
  }, {
    text: "UOM",
    value: "uom"
  }, {
    text: "Quantity",
    value: "quantity"
  }, {
    text: "Price",
    value: "price"
  }, {
    text: "Amount",
    value: "amount"
  }, {
    text: "Salesman",
    value: "sm_name"
  }, {
    text: "Group",
    value: "group"
  }]],
  // ***********************************************************************************
  generatedDataHistoryFilters: [[{
    text: 'System Date',
    value: 'system_date'
  }, {
    text: 'Item Code',
    value: 'item_code'
  }, {
    text: 'Customer Code',
    value: 'customer_code'
  }, {
    text: 'Source Group',
    value: 'group_code'
  }]]
});
var actions = {};
/* harmony default export */ __webpack_exports__["default"] = ({
  state: state // ...actions

});

/***/ }),

/***/ "./resources/js/stores.custom/principals/mondelez.js":
/*!***********************************************************!*\
  !*** ./resources/js/stores.custom/principals/mondelez.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
  // customersTableHeader: [
  //     [
  //         { text: "Customer Code", value: "customer_code" },
  //         { text: "Customer Code (Supplier)", value: "customer_code_supplier" },
  //         { text: "Name", value: "customer_name" },
  //     ],
  // ],
  itemsTableHeader: [[{
    text: "Item Code",
    value: "item_code"
  }, {
    text: "Item Code (Supplier)",
    value: "item_code_supplier"
  }, {
    text: "Description (Nav)",
    value: "description"
  }]],
  // salesmenTableHeader: [
  //     [
  //         {text:"Group Code", value:"group_code"},
  //         {text:"Salesman Name", value:"sm_name"},
  //     ]
  // ],
  // templated data table header
  generatedDataTableHeader: [[{
    text: "Invoice #",
    value: "invoice_no"
  }, {
    text: "Customer Code",
    value: "customer_code"
  }, {
    text: "Customer Name",
    value: "customer_name"
  }, {
    text: "Invoice Date (M/D/Y)",
    value: "invoice_date"
  }, {
    text: "Item Code (NAV)",
    value: "alturas_item_code"
  }, {
    text: "Item Code (Supplier)",
    value: "item_code"
  }, {
    text: "Item Name (NAV)",
    value: "item_description"
  }, {
    text: "Item Name (Supplier)",
    value: "description_supplier"
  }, {
    text: "UOM",
    value: "uom"
  }, {
    text: "Quantity",
    value: "quantity"
  }, {
    text: "Price",
    value: "price"
  }, {
    text: "Amount",
    value: "amount"
  }, {
    text: "Salesman",
    value: "sm_name"
  }, {
    text: "Group",
    value: "group"
  }]],
  // ***********************************************************************************
  generatedDataHistoryFilters: [[{
    text: 'System Date',
    value: 'system_date'
  }, {
    text: 'Item Code',
    value: 'item_code'
  }, {
    text: 'Customer Code',
    value: 'customer_code'
  }, {
    text: 'Source Group',
    value: 'group_code'
  }]]
});
var actions = {};
/* harmony default export */ __webpack_exports__["default"] = ({
  state: state // ...actions

});

/***/ }),

/***/ "./resources/js/stores.custom/principals/others.js":
/*!*********************************************************!*\
  !*** ./resources/js/stores.custom/principals/others.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
  // customersTableHeader: [
  //     [
  //         { text: "Customer Code", value: "customer_code" },
  //         { text: "Customer Code (Supplier)", value: "customer_code_supplier" },
  //         { text: "Name", value: "customer_name" },
  //     ],
  // ],
  // itemsTableHeader: [
  //     [
  //         {text:"Item Code", value:"item_code"},
  //         {text:"Item Code (Supplier)", value:"item_code_supplier"},
  //         {text:"Description (Supplier)", value:"description_supplier"},
  //     ]
  // ],
  // templated data table header
  generatedDataTableHeader: [[{
    text: "Invoice #",
    value: "invoice_no"
  }, {
    text: "Customer Code",
    value: "customer_code"
  }, {
    text: "Customer Name",
    value: "customer_name"
  }, {
    text: "Invoice Date (M/D/Y)",
    value: "invoice_date"
  }, {
    text: "Item Code",
    value: "alturas_item_code"
  }, {
    text: "Item Name",
    value: "description"
  }, {
    text: "Quantity",
    value: "quantity"
  }, // {text:"Bulk Quantity", value: "bulk_qty"},
  // {text:"Loose Quantity", value: "loose_qty"},
  {
    text: "Price",
    value: "price"
  }, {
    text: "Amount",
    value: "amount"
  }, {
    text: "UOM",
    value: "uom"
  }, // {text:"Base UOM", value: "base_uom"},
  // {text:"Conversion UOM", value: "uom"},
  {
    text: "Salesman Name",
    value: "sm_name"
  }]],
  // transactions table header
  // transactionsTableHeader: [
  //     [
  //         {text:"Upload Date", value:"updated_at"},
  //         {text:"Customer Code", value:"customer_code"},
  //         {text:"Account Name", value:"customer_name"},
  //         {text:"Sales Invoice", value:"doc_no"},
  //         {text:"Item Code", value:"item_code"},
  //         {text:"Description", value:"description"},
  //         {text:"UOM", value:"uom"},
  //         {text:"Quantity", value:"quantity"},
  //         {text:"Amount", value:"u3"},
  //     ]
  // ],
  // ***********************************************************************************
  generatedDataHistoryFilters: [[{
    text: 'Invoice #',
    value: 'doc_no'
  }, {
    text: 'Item Code',
    value: 'item_code'
  }, {
    text: 'Customer Code',
    value: 'customer_code'
  }]] // generatedDataDBTableColumns: [
  //     // common
  //     'id',
  //     'principal_code',
  //     'template_variation',
  //     'generated_at',
  //     'uploaded_by',
  //     'status',
  //     'doc_no',
  //     // principal template
  //     'invoice_no',
  //     'customer_code',
  //     'alturas_customer_code',
  //     'customer_name',
  //     'invoice_date',
  //     'alturas_item_code',
  //     'item_code',
  //     'description',
  //     'description_supplier',
  //     'quantity',
  //     // 'bulk_qty',
  //     // 'loose_qty',
  //     'price',
  //     'amount',
  //     'base_uom',
  //     'uom',
  //     'sm_name',
  //     'system_date'
  // ],

});
var actions = {};
/* harmony default export */ __webpack_exports__["default"] = ({
  state: state // ...actions

});

/***/ }),

/***/ "./resources/js/stores.custom/principals/others_ni.js":
/*!************************************************************!*\
  !*** ./resources/js/stores.custom/principals/others_ni.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
  // customersTableHeader: [
  //     [
  //         { text: "Customer Code", value: "customer_code" },
  //         { text: "Customer Code (Supplier)", value: "customer_code_supplier" },
  //         { text: "Name", value: "customer_name" },
  //     ],
  // ],
  // itemsTableHeader: [
  //     [
  //         {text:"Item Code", value:"item_code"},
  //         {text:"Item Code (Supplier)", value:"item_code_supplier"},
  //         {text:"Description (Supplier)", value:"description_supplier"},
  //     ]
  // ],
  // salesmenTableHeader: [
  //     [
  //         {text:"Group Code", value:"group_code"},
  //         {text:"Salesman Name", value:"sm_name"},
  //     ]
  // ],
  // templated data table header
  generatedDataTableHeader: [[{
    text: "Invoice #",
    value: "invoice_no"
  }, {
    text: "Customer Code",
    value: "customer_code"
  }, {
    text: "Customer Name",
    value: "customer_name"
  }, {
    text: "Invoice Date (M/D/Y)",
    value: "invoice_date"
  }, {
    text: "Item Code (NAV)",
    value: "alturas_item_code"
  }, {
    text: "Item Code (Supplier)",
    value: "item_code"
  }, {
    text: "Item Name (NAV)",
    value: "item_description"
  }, {
    text: "Item Name (Supplier)",
    value: "description_supplier"
  }, {
    text: "UOM",
    value: "uom"
  }, {
    text: "Quantity",
    value: "quantity"
  }, {
    text: "Price",
    value: "price"
  }, {
    text: "Amount",
    value: "amount"
  }, {
    text: "Salesman",
    value: "sm_name"
  }, {
    text: "Group",
    value: "group"
  }]],
  // ***********************************************************************************
  generatedDataHistoryFilters: [[{
    text: 'Vendor Code',
    value: 'vendor_code'
  }]]
});
var actions = {};
/* harmony default export */ __webpack_exports__["default"] = ({
  state: state // ...actions

});

/***/ }),

/***/ "./resources/js/stores.custom/principals/pacific_meat.js":
/*!***************************************************************!*\
  !*** ./resources/js/stores.custom/principals/pacific_meat.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
  // customersTableHeader: [
  //     [
  //         { text: "Customer Code", value: "customer_code" },
  //         { text: "Principal Customer Code", value: "customer_code_supplier" },
  //     ],
  // ],
  itemsTableHeader: [[{
    text: "Item Code",
    value: "item_code"
  }, // {text:"Description", value:"description"},
  {
    text: "Supplier Item Code",
    value: "item_code_supplier"
  }, {
    text: "Supplier Item Description",
    value: "description_supplier"
  }, {
    text: "CASE",
    value: "case"
  }, {
    text: "PCS",
    value: "conversion_qty"
  }]],
  salesmenTableHeader: [[{
    text: "Group Code",
    value: "group_code"
  }, {
    text: "Salesman Code - NOAH",
    value: "sm_code_supplier"
  }, {
    text: "Location Code - NOAH",
    value: "location_code_supplier"
  }]],
  // templated data table header(s)
  generatedDataTableHeader: [[{
    text: "Distributor ID",
    value: "distributor_id"
  }, {
    text: "Salesman",
    value: "sales_agent_id"
  }, {
    text: "Docno",
    value: "doc_no"
  }, {
    text: "Location",
    value: "location"
  }, {
    text: "Ordered Date",
    value: "order_date"
  }, {
    text: "Request Delivery Date",
    value: "request_delivery_date"
  }, {
    text: "Payment Term",
    value: "payment_term_code"
  }, {
    text: "Account Code",
    value: "customer_code"
  }, {
    text: "Product Code",
    value: "item_code"
  }, {
    text: "Bulk Qty",
    value: "bulk_qty"
  }, {
    text: "Loose Qty",
    value: "loose_qty"
  }, {
    text: "System Date",
    value: "system_date"
  }, {
    text: "User",
    value: "default_user"
  }] // [
  //     {text:"Distributor ID", value: "distributor_id"},
  //     {text:"Sales Agent ID", value: "sales_agent_id"},
  //     {text:"Invoice No (Doc No)", value: "doc_no"},
  //     {text:"Location", value: "location"},
  //     {text:"Invoice Date", value: "invoice_date"},
  //     {text:"Payment Term Code", value: "payment_term_code"},
  //     {text:"Customer No", value: "customer_code"},
  //     {text:"Product Code", value: "item_code"},
  //     {text:"Bulk Qty", value: "bulk_qty"},
  //     {text:"Loose Qty", value: "loose_qty"},
  //     {text:"System Date", value: "system_date"},
  //     {text:"Default User", value: "default_user"},
  //     {text:"Invoice No", value: "invoice_no"},
  //     {text:"Expiry Date", value: "expiry_date"},
  // ],
  ],
  generatedDataHistoryFilters: [[{
    text: 'Order Date',
    value: 'order_date'
  }, {
    text: 'Invoice #',
    value: 'doc_no'
  }, {
    text: 'Product Code',
    value: 'item_code'
  }, {
    text: 'Customer Code',
    value: 'customer_code'
  }, {
    text: 'Salesman',
    value: 'sm_code_supplier'
  }, {
    text: 'Location',
    value: 'location'
  }, {
    text: 'Invoice Posting Date',
    value: 'posting_date'
  }, {
    text: 'Source Group',
    value: 'group_code'
  }]]
});
var actions = {};
/* harmony default export */ __webpack_exports__["default"] = ({
  state: state // ...actions

});

/***/ }),

/***/ "./resources/js/stores.custom/principals/peerless.js":
/*!***********************************************************!*\
  !*** ./resources/js/stores.custom/principals/peerless.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
  customersTableHeader: [[{
    text: "Customer Code",
    value: "customer_code"
  }, {
    text: "Customer Code (Supplier)",
    value: "customer_code_supplier"
  }, {
    text: "Name",
    value: "customer_name"
  }]],
  itemsTableHeader: [[{
    text: "Item Code",
    value: "item_code"
  }, {
    text: "Item Code (Supplier)",
    value: "item_code_supplier"
  }, {
    text: "Description (Supplier)",
    value: "description_supplier"
  }]],
  // templated data table header
  generatedDataTableHeader: [[{
    text: "Invoice #",
    value: "invoice_no"
  }, {
    text: "Customer Code",
    value: "customer_code"
  }, {
    text: "Customer Name",
    value: "customer_name"
  }, {
    text: "Invoice Date (M/D/Y)",
    value: "invoice_date"
  }, {
    text: "Item Code (NAV)",
    value: "alturas_item_code"
  }, // {text:"Item Code (Supplier)", value: "item_code"},
  {
    text: "Item Name (NAV)",
    value: "description"
  }, // {text:"Item Name (Supplier)", value: "description_supplier"},
  {
    text: "Quantity",
    value: "quantity"
  }, // {text:"Bulk Quantity", value: "bulk_qty"},
  // {text:"Loose Quantity", value: "loose_qty"},
  {
    text: "Price",
    value: "price"
  }, {
    text: "Amount",
    value: "amount"
  }, {
    text: "UOM",
    value: "uom"
  }, // {text:"Base UOM", value: "base_uom"},
  // {text:"Conversion UOM", value: "uom"},
  {
    text: "Salesman Name",
    value: "sm_name"
  }]],
  // transactions table header
  transactionsTableHeader: [[{
    text: "Upload Date",
    value: "updated_at"
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
  }]],
  // ***********************************************************************************
  generatedDataHistoryFilters: [[{
    text: 'Generated Date',
    value: 'generated_at'
  }, {
    text: 'Item Code',
    value: 'item_code'
  }, {
    text: 'Customer Code',
    value: 'customer_code'
  }]],
  generatedDataDBTableColumns: [// common
  'id', 'principal_code', 'template_variation', 'generated_at', 'uploaded_by', 'status', 'doc_no', // principal template
  'invoice_no', 'customer_code', 'alturas_customer_code', 'customer_name', 'invoice_date', 'alturas_item_code', 'item_code', 'description', 'description_supplier', 'quantity', // 'bulk_qty',
  // 'loose_qty',
  'price', 'amount', 'base_uom', 'uom', 'sm_name', 'system_date']
});
var actions = {};
/* harmony default export */ __webpack_exports__["default"] = ({
  state: state // ...actions

});

/***/ }),

/***/ "./resources/js/stores.custom/principals/purefoods.js":
/*!************************************************************!*\
  !*** ./resources/js/stores.custom/principals/purefoods.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
  customersTableHeader: [[{
    text: "Customer Code",
    value: "customer_code"
  }, {
    text: "Customer Code (Supplier)",
    value: "customer_code_supplier"
  }, {
    text: "Name",
    value: "customer_name"
  }]],
  itemsTableHeader: [[{
    text: "Item Code",
    value: "item_code"
  }, {
    text: "Item Code (Supplier)",
    value: "item_code_supplier"
  }, {
    text: "Description (Supplier)",
    value: "description_supplier"
  }]],
  // templated data table header
  generatedDataTableHeader: [[{
    text: "Invoice #",
    value: "invoice_no"
  }, {
    text: "Customer Code",
    value: "customer_code"
  }, {
    text: "Customer Name",
    value: "customer_name"
  }, {
    text: "Invoice Date (M/D/Y)",
    value: "invoice_date"
  }, {
    text: "Item Code (NAV)",
    value: "alturas_item_code"
  }, // {text:"Item Code (Supplier)", value: "item_code"},
  {
    text: "Item Name (NAV)",
    value: "description"
  }, // {text:"Item Name (Supplier)", value: "description_supplier"},
  {
    text: "Quantity",
    value: "quantity"
  }, // {text:"Bulk Quantity", value: "bulk_qty"},
  // {text:"Loose Quantity", value: "loose_qty"},
  {
    text: "Price",
    value: "price"
  }, {
    text: "Amount",
    value: "amount"
  }, {
    text: "UOM",
    value: "uom"
  }, // {text:"Base UOM", value: "base_uom"},
  // {text:"Conversion UOM", value: "uom"},
  {
    text: "Salesman Name",
    value: "sm_name"
  }]],
  // transactions table header
  transactionsTableHeader: [[{
    text: "Upload Date",
    value: "updated_at"
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
  }]],
  // ***********************************************************************************
  generatedDataHistoryFilters: [[{
    text: 'Generated Date',
    value: 'generated_at'
  }, {
    text: 'Item Code',
    value: 'item_code'
  }, {
    text: 'Customer Code',
    value: 'customer_code'
  }]],
  generatedDataDBTableColumns: [// common
  'id', 'principal_code', 'template_variation', 'generated_at', 'uploaded_by', 'status', 'doc_no', // principal template
  'invoice_no', 'customer_code', 'alturas_customer_code', 'customer_name', 'invoice_date', 'alturas_item_code', 'item_code', 'description', 'description_supplier', 'quantity', // 'bulk_qty',
  // 'loose_qty',
  'price', 'amount', 'base_uom', 'uom', 'sm_name', 'system_date']
});
var actions = {};
/* harmony default export */ __webpack_exports__["default"] = ({
  state: state // ...actions

});

/***/ }),

/***/ "./resources/js/stores.custom/principals/rfm.js":
/*!******************************************************!*\
  !*** ./resources/js/stores.custom/principals/rfm.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
  // customersTableHeader: [
  //     [
  //         { text: "Customer Code", value: "customer_code" },
  //         { text: "Customer Code (Supplier)", value: "customer_code_supplier" },
  //         { text: "Name", value: "customer_name" },
  //     ],
  // ],
  itemsTableHeader: [[{
    text: "Item Code",
    value: "item_code"
  }, {
    text: "Item Code (Supplier)",
    value: "item_code_supplier"
  }, {
    text: "Description (Supplier)",
    value: "description_supplier"
  }]],
  // salesmenTableHeader: [
  //     [
  //         {text:"Group Code", value:"group_code"},
  //         {text:"Salesman Name", value:"sm_name"},
  //     ]
  // ],
  // templated data table header
  generatedDataTableHeader: [[{
    text: "Invoice #",
    value: "invoice_no"
  }, {
    text: "Customer Code",
    value: "customer_code"
  }, {
    text: "Customer Name",
    value: "customer_name"
  }, {
    text: "Invoice Date (M/D/Y)",
    value: "invoice_date"
  }, {
    text: "Item Code (NAV)",
    value: "alturas_item_code"
  }, {
    text: "Item Code (Supplier)",
    value: "item_code"
  }, {
    text: "Item Name (NAV)",
    value: "item_description"
  }, {
    text: "Item Name (Supplier)",
    value: "description_supplier"
  }, {
    text: "UOM",
    value: "uom"
  }, {
    text: "Quantity",
    value: "quantity"
  }, {
    text: "Price",
    value: "price"
  }, {
    text: "Amount",
    value: "amount"
  }, {
    text: "Salesman",
    value: "sm_name"
  }, {
    text: "Group",
    value: "group"
  }]],
  // ***********************************************************************************
  generatedDataHistoryFilters: [[{
    text: 'System Date',
    value: 'system_date'
  }, {
    text: 'Item Code',
    value: 'item_code'
  }, {
    text: 'Customer Code',
    value: 'customer_code'
  }, {
    text: 'Source Group',
    value: 'group_code'
  }]]
});
var actions = {};
/* harmony default export */ __webpack_exports__["default"] = ({
  state: state // ...actions

});

/***/ }),

/***/ "./resources/js/stores.custom/principals/smfi_smis_frozen.js":
/*!*******************************************************************!*\
  !*** ./resources/js/stores.custom/principals/smfi_smis_frozen.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
  customersTableHeader: [[{
    text: "Customer Code",
    value: "customer_code"
  }, {
    text: "Customer Code (Supplier)",
    value: "customer_code_supplier"
  }, {
    text: "Name",
    value: "customer_name"
  }]],
  itemsTableHeader: [[{
    text: "Item Code",
    value: "item_code"
  }, {
    text: "Item Code (Supplier)",
    value: "item_code_supplier"
  }, {
    text: "Description (Supplier)",
    value: "description_supplier"
  }]],
  // templated data table header
  generatedDataTableHeader: [[{
    text: "Invoice #",
    value: "invoice_no"
  }, {
    text: "Customer Code",
    value: "customer_code"
  }, {
    text: "Customer Name",
    value: "customer_name"
  }, {
    text: "Invoice Date (M/D/Y)",
    value: "invoice_date"
  }, {
    text: "Item Code (NAV)",
    value: "alturas_item_code"
  }, {
    text: "Item Code (Supplier)",
    value: "item_code"
  }, {
    text: "Item Name (NAV)",
    value: "item_description"
  }, {
    text: "Item Name (Supplier)",
    value: "description_supplier"
  }, {
    text: "UOM",
    value: "uom"
  }, {
    text: "Quantity",
    value: "quantity"
  }, {
    text: "Price",
    value: "price"
  }, {
    text: "Amount",
    value: "amount"
  }, {
    text: "Salesman",
    value: "sm_name"
  }, {
    text: "Group",
    value: "group"
  }]],
  // transactions table header
  // transactionsTableHeader: [
  //     [
  //         {text:"Upload Date", value:"updated_at"},
  //         {text:"Customer Code", value:"customer_code"},
  //         {text:"Account Name", value:"customer_name"},
  //         {text:"Sales Invoice", value:"doc_no"},
  //         {text:"Item Code", value:"item_code"},
  //         {text:"Description", value:"description"},
  //         {text:"UOM", value:"uom"},
  //         {text:"Quantity", value:"quantity"},
  //         {text:"Amount", value:"u3"},
  //     ]
  // ],
  // ***********************************************************************************
  generatedDataHistoryFilters: [[{
    text: 'System Date',
    value: 'system_date'
  }, {
    text: 'Item Code',
    value: 'item_code'
  }, {
    text: 'Customer Code',
    value: 'customer_code'
  }]] // generatedDataDBTableColumns: [
  //     // common
  //     'id',
  //     'principal_code',
  //     'template_variation',
  //     'generated_at',
  //     'uploaded_by',
  //     'status',
  //     'doc_no',
  //     // principal template
  //     // principal template
  //     'invoice_no',
  //     'customer_code',
  //     'alturas_customer_code',
  //     'customer_name',
  //     'invoice_date',
  //     'alturas_item_code',
  //     'item_code',
  //     'description',
  //     'description_supplier',
  //     'bulk_qty',
  //     'loose_qty',
  //     'price',
  //     'amount',
  //     'base_uom',
  //     'uom',
  //     'sm_name',
  //     'system_date'
  // ],

});
var actions = {};
/* harmony default export */ __webpack_exports__["default"] = ({
  state: state // ...actions

});

/***/ }),

/***/ "./resources/js/stores.custom/principals/snow_mountain_dairy.js":
/*!**********************************************************************!*\
  !*** ./resources/js/stores.custom/principals/snow_mountain_dairy.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
  // customersTableHeader: [
  //     [
  //         { text: "Customer Code", value: "customer_code" },
  //         { text: "Principal Customer Code", value: "customer_code_supplier" },
  //     ],
  // ],
  itemsTableHeader: [[{
    text: "Item Code",
    value: "item_code"
  }, // {text:"Description", value:"description"},
  {
    text: "Supplier Item Code",
    value: "item_code_supplier"
  }, {
    text: "Supplier Item Description",
    value: "description_supplier"
  }, {
    text: "CASE",
    value: "case"
  }, {
    text: "PCS",
    value: "conversion_qty"
  }]],
  salesmenTableHeader: [[{
    text: "Group Code",
    value: "group_code"
  }, {
    text: "Salesman Code - NOAH",
    value: "sm_code_supplier"
  }, {
    text: "Location Code - NOAH",
    value: "location_code_supplier"
  }]],
  // templated data table header(s)
  generatedDataTableHeader: [[{
    text: "Distributor ID",
    value: "distributor_id"
  }, {
    text: "Salesman",
    value: "sales_agent_id"
  }, {
    text: "Docno",
    value: "doc_no"
  }, {
    text: "Location",
    value: "location"
  }, {
    text: "Ordered Date",
    value: "order_date"
  }, {
    text: "Request Delivery Date",
    value: "request_delivery_date"
  }, {
    text: "Payment Term",
    value: "payment_term_code"
  }, {
    text: "Account Code",
    value: "customer_code"
  }, {
    text: "Product Code",
    value: "item_code"
  }, {
    text: "Bulk Qty",
    value: "bulk_qty"
  }, {
    text: "Loose Qty",
    value: "loose_qty"
  }, {
    text: "System Date",
    value: "system_date"
  }, {
    text: "User",
    value: "default_user"
  }] // [
  //     {text:"Distributor ID", value: "distributor_id"},
  //     {text:"Sales Agent ID", value: "sales_agent_id"},
  //     {text:"Invoice No (Doc No)", value: "doc_no"},
  //     {text:"Location", value: "location"},
  //     {text:"Invoice Date", value: "invoice_date"},
  //     {text:"Payment Term Code", value: "payment_term_code"},
  //     {text:"Customer No", value: "customer_code"},
  //     {text:"Product Code", value: "item_code"},
  //     {text:"Bulk Qty", value: "bulk_qty"},
  //     {text:"Loose Qty", value: "loose_qty"},
  //     {text:"System Date", value: "system_date"},
  //     {text:"Default User", value: "default_user"},
  //     {text:"Invoice No", value: "invoice_no"},
  //     {text:"Expiry Date", value: "expiry_date"},
  // ],
  ],
  generatedDataHistoryFilters: [[{
    text: 'Order Date',
    value: 'order_date'
  }, {
    text: 'Invoice #',
    value: 'doc_no'
  }, {
    text: 'Product Code',
    value: 'item_code'
  }, {
    text: 'Customer Code',
    value: 'customer_code'
  }, {
    text: 'Salesman',
    value: 'sm_code_supplier'
  }, {
    text: 'Location',
    value: 'location'
  }, {
    text: 'Invoice Posting Date',
    value: 'posting_date'
  }, {
    text: 'Source Group',
    value: 'group_code'
  }]]
});
var actions = {};
/* harmony default export */ __webpack_exports__["default"] = ({
  state: state // ...actions

});

/***/ }),

/***/ "./resources/js/stores.custom/principals/splash.js":
/*!*********************************************************!*\
  !*** ./resources/js/stores.custom/principals/splash.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
  customersTableHeader: [[{
    text: "Customer Code",
    value: "customer_code"
  }, {
    text: "Customer Code (Supplier)",
    value: "customer_code_supplier"
  }, {
    text: "Name",
    value: "customer_name"
  }]],
  itemsTableHeader: [[{
    text: "Item Code",
    value: "item_code"
  }, {
    text: "Item Code (Supplier)",
    value: "item_code_supplier"
  }, {
    text: "Description (Supplier)",
    value: "description_supplier"
  }]],
  // templated data table header
  generatedDataTableHeader: [[{
    text: "Invoice #",
    value: "invoice_no"
  }, {
    text: "Customer Code",
    value: "customer_code"
  }, {
    text: "Customer Name",
    value: "customer_name"
  }, {
    text: "Invoice Date (M/D/Y)",
    value: "invoice_date"
  }, {
    text: "Item Code (NAV)",
    value: "alturas_item_code"
  }, // {text:"Item Code (Supplier)", value: "item_code"},
  {
    text: "Item Name (NAV)",
    value: "description"
  }, // {text:"Item Name (Supplier)", value: "description_supplier"},
  {
    text: "Quantity",
    value: "quantity"
  }, // {text:"Bulk Quantity", value: "bulk_qty"},
  // {text:"Loose Quantity", value: "loose_qty"},
  {
    text: "Price",
    value: "price"
  }, {
    text: "Amount",
    value: "amount"
  }, {
    text: "UOM",
    value: "uom"
  }, // {text:"Base UOM", value: "base_uom"},
  // {text:"Conversion UOM", value: "uom"},
  {
    text: "Salesman Name",
    value: "sm_name"
  }]],
  // transactions table header
  transactionsTableHeader: [[{
    text: "Upload Date",
    value: "updated_at"
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
  }]],
  // ***********************************************************************************
  generatedDataHistoryFilters: [[{
    text: 'Generated Date',
    value: 'generated_at'
  }, {
    text: 'Item Code',
    value: 'item_code'
  }, {
    text: 'Customer Code',
    value: 'customer_code'
  }]],
  generatedDataDBTableColumns: [// common
  'id', 'principal_code', 'template_variation', 'generated_at', 'uploaded_by', 'status', 'doc_no', // principal template
  'invoice_no', 'customer_code', 'alturas_customer_code', 'customer_name', 'invoice_date', 'alturas_item_code', 'item_code', 'description', 'description_supplier', 'quantity', // 'bulk_qty',
  // 'loose_qty',
  'price', 'amount', 'base_uom', 'uom', 'sm_name', 'system_date']
});
var actions = {};
/* harmony default export */ __webpack_exports__["default"] = ({
  state: state // ...actions

});

/***/ }),

/***/ "./resources/js/stores.custom/principals/wyeth.js":
/*!********************************************************!*\
  !*** ./resources/js/stores.custom/principals/wyeth.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
  customersTableHeader: [[{
    text: "Customer Code",
    value: "customer_code"
  }, {
    text: "Customer Code (Supplier)",
    value: "customer_code_supplier"
  }, {
    text: "Name",
    value: "customer_name"
  }]],
  itemsTableHeader: [[{
    text: "Item Code",
    value: "item_code"
  }, {
    text: "Item Code (Supplier)",
    value: "item_code_supplier"
  }, {
    text: "Description (Supplier)",
    value: "description_supplier"
  }]],
  // templated data table header
  generatedDataTableHeader: [[{
    text: "Invoice #",
    value: "invoice_no"
  }, {
    text: "Customer Code",
    value: "customer_code"
  }, {
    text: "Customer Name",
    value: "customer_name"
  }, {
    text: "Invoice Date (M/D/Y)",
    value: "invoice_date"
  }, {
    text: "Item Code (NAV)",
    value: "alturas_item_code"
  }, // {text:"Item Code (Supplier)", value: "item_code"},
  {
    text: "Item Name (NAV)",
    value: "description"
  }, // {text:"Item Name (Supplier)", value: "description_supplier"},
  {
    text: "Quantity",
    value: "quantity"
  }, // {text:"Bulk Quantity", value: "bulk_qty"},
  // {text:"Loose Quantity", value: "loose_qty"},
  {
    text: "Price",
    value: "price"
  }, {
    text: "Amount",
    value: "amount"
  }, {
    text: "UOM",
    value: "uom"
  }, // {text:"Base UOM", value: "base_uom"},
  // {text:"Conversion UOM", value: "uom"},
  {
    text: "Salesman Name",
    value: "sm_name"
  }]],
  // transactions table header
  transactionsTableHeader: [[{
    text: "Upload Date",
    value: "updated_at"
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
  }]],
  // ***********************************************************************************
  generatedDataHistoryFilters: [[{
    text: 'Generated Date',
    value: 'generated_at'
  }, {
    text: 'Item Code',
    value: 'item_code'
  }, {
    text: 'Customer Code',
    value: 'customer_code'
  }]],
  generatedDataDBTableColumns: [// common
  'id', 'principal_code', 'template_variation', 'generated_at', 'uploaded_by', 'status', 'doc_no', // principal template
  'invoice_no', 'customer_code', 'alturas_customer_code', 'customer_name', 'invoice_date', 'alturas_item_code', 'item_code', 'description', 'description_supplier', 'quantity', // 'bulk_qty',
  // 'loose_qty',
  'price', 'amount', 'base_uom', 'uom', 'sm_name', 'system_date']
});
var actions = {};
/* harmony default export */ __webpack_exports__["default"] = ({
  state: state // ...actions

});

/***/ })

}]);
//# sourceMappingURL=4.js.map