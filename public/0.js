(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./resources/js/stores.custom/principals sync recursive ^\\.\\/.*$":
/*!*************************************************************!*\
  !*** ./resources/js/stores.custom/principals sync ^\.\/.*$ ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./century": "./resources/js/stores.custom/principals/century.js",
	"./century.js": "./resources/js/stores.custom/principals/century.js",
	"./gsmi": "./resources/js/stores.custom/principals/gsmi.js",
	"./gsmi.js": "./resources/js/stores.custom/principals/gsmi.js",
	"./mead_johnson": "./resources/js/stores.custom/principals/mead_johnson.js",
	"./mead_johnson.js": "./resources/js/stores.custom/principals/mead_johnson.js",
	"./megasoft": "./resources/js/stores.custom/principals/megasoft.js",
	"./megasoft.js": "./resources/js/stores.custom/principals/megasoft.js"
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

/***/ "./resources/js/stores.custom/principals/century.js":
/*!**********************************************************!*\
  !*** ./resources/js/stores.custom/principals/century.js ***!
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
    text: "Name",
    value: "customer_name"
  }, {
    text: "Address",
    value: "address"
  }, {
    text: "Principal Customer Code",
    value: "customer_code_supplier"
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
    text: "PCS per CASE",
    value: "conversion_qty"
  }]],
  // templated data table header
  generatedDataTableHeader: [[{
    text: "Distributor ID",
    value: "distributor_id"
  }, {
    text: "Salesman",
    value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  }, {
    text: "Docno",
    value: "doc_no"
  }, {
    text: "Location",
    value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  }, {
    text: "Ordered Date",
    value: "order_date"
  }, {
    text: "Request Delivery Date",
    value: "request_delivery_date"
  }, {
    text: "Payment Term",
    value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
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
    value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  }], [{
    text: "Distributor ID",
    value: "distributor_id"
  }, {
    text: "Sales Agent ID",
    value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  }, {
    text: "Invoice No (Doc No)",
    value: "doc_no"
  }, {
    text: "Location",
    value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  }, {
    text: "Invoice Date",
    value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  }, {
    text: "Payment Term Code",
    value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  }, {
    text: "Customer No",
    value: "customer_code"
  }, {
    text: "Product Code",
    value: "item_code"
  }, {
    text: "Bulk Qty",
    value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  }, {
    text: "Loose Qty",
    value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  }, {
    text: "System Date",
    value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  }, {
    text: "Default User",
    value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  }, {
    text: "Invoice No",
    value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  }, {
    text: "Expiry Date",
    value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
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
    text: 'Order Date',
    value: 'order_date'
  }, {
    text: 'Route Code',
    value: 'route_code'
  }, {
    text: 'Item Code',
    value: 'item_code'
  }, {
    text: 'Customer Code',
    value: 'customer_code'
  }]],
  generatedDataDBTableColumns: [// common
  'id', 'generated_at', 'uploaded_by', 'doc_no', // principal template
  'distributor_id', 'sales_agent_id', 'invoice_no', 'location', 'invoice_date', 'payment_term_code', 'bulk_qty', 'loose_qty', 'system_date', 'default_user', 'expiry_date', 'request_delivery_date']
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
    text: "Name",
    value: "customer_name"
  }, {
    text: "Address",
    value: "address"
  } // { text: "Principal Customer Code", value: "customer_code_supplier" },
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
  generatedDataTableHeader: [[// {text:"Distributor ID", value: "distributor_id"},
  // {text:"Salesman", value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},
  {
    text: "Docno",
    value: "doc_no"
  }, // {text:"Location", value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},
  {
    text: "Ordered Date",
    value: "order_date"
  }, {
    text: "Request Delivery Date",
    value: "request_delivery_date"
  }, // {text:"Payment Term", value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},
  {
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
  } // {text:"User", value: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"},
  ]],
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
    text: 'Customer Code',
    value: 'customer_code'
  }, {
    text: 'Item Code',
    value: 'item_code'
  }]],
  generatedDataDBTableColumns: [// common
  'id', 'generated_at', 'uploaded_by', 'doc_no', // principal template
  'customer_code', 'item_code', 'bulk_qty', 'loose_qty']
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
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

 // import PrincipalsStore from "./PrincipalsStore";

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
  title: '',
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
  customersTableHeader: [[{
    text: "Customer Code",
    value: "customer_code"
  }, {
    text: "Name",
    value: "customer_name"
  }, {
    text: "Outlet Type",
    value: "outlet_type"
  }, {
    text: "Salesman Name",
    value: "salesman_name"
  }, {
    text: "Operation Type",
    value: "operation_type"
  } // { text: "Route Code", value: "route_code" },
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
  }] // [
  //     {text:"Order Date (Date) (YYYY/MM/DD)", value: "order_date"},
  //     {text:"Customer Code (nv20)", value: "customer_code"},
  //     {text:"Product Code (nv20)", value: "item_code"},
  //     // {text:"Route Code (nv20)", value: "route_code"},
  //     // {text:"Product Category Code (nv20)", value: "product_category_code"},
  //     // {text:"Ship To (nv40)", value: "ship_to"},
  //     {text:"Order Number (nv20)", value: "order_no"},
  //     // {text:"Remarks (nv50)", value: "remarks"},
  //     {text:"Quantity (numeric 25,4)", value: "quantity"},
  // ]
  ],
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
    text: 'Order Date',
    value: 'order_date'
  }, {
    text: 'Route Code',
    value: 'route_code'
  } // {text: 'Item Code', value: 'item_code'},
  // {text: 'Customer Code', value: 'customer_code'},
  ]],
  generatedDataDBTableColumns: [// common
  'id', 'generated_at', 'uploaded_by', 'doc_no', // principal template
  'order_date', 'customer_code', 'route_code', 'product_category_code', 'ship_to', 'order_no', 'remarks', 'item_code', 'quantity'] // uploadedInvoicesTableHeader: [
  //     // {text:"Status", value:"status"},
  //     {text:"Upload Date", value:"upload_date"},
  //     {text:"Document Type", value:"doc_type"},
  //     {text:"Document #", value:"doc_no"},
  //     {text:"Customer Code", value:"customer_code"},
  //     {text:"Posting Date", value:"posting_date"},
  //     {text:"Item Code", value:"item_code"},
  //     {text:"Quantity", value:"quantity"},
  //     {text:"u1", value:"u1"},
  //     {text:"u2", value:"u2"},
  //     {text:"u3", value:"u3"},
  //     {text:"u4", value:"u4"},
  //     {text:"u5", value:"u5"},
  //     {text:"UOM", value:"uom"},
  // ],

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
    text: "Name",
    value: "customer_name"
  }, {
    text: "Address",
    value: "address"
  }, {
    text: "Principal Customer Code",
    value: "customer_code_supplier"
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
    text: "Docno",
    value: "doc_no"
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
  'customer_code', 'item_code', 'bulk_qty', 'loose_qty']
});
var actions = {};
/* harmony default export */ __webpack_exports__["default"] = ({
  state: state // ...actions

});

/***/ })

}]);
//# sourceMappingURL=0.js.map