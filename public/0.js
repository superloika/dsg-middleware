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
	"./gspi": "./resources/js/stores.custom/principals/gspi.js",
	"./gspi.js": "./resources/js/stores.custom/principals/gspi.js",
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
  }, // { text: "Name", value: "customer_name" },
  // { text: "Address", value: "address" },
  {
    text: "Principal Customer Code",
    value: "customer_code_supplier"
  }]],
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
    text: "Salesman Name",
    value: "sm_name"
  }, {
    text: "Salesman Code",
    value: "sm_code"
  }, {
    text: "Salesman Code - Supplier",
    value: "sm_code_supplier"
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
  'item_code', 'customer_code', 'distributor_id', 'sales_agent_id', // salesman code
  'invoice_no', 'location', 'invoice_date', 'payment_term_code', 'bulk_qty', 'loose_qty', 'default_user', 'system_date', 'expiry_date', 'order_date', 'request_delivery_date'],
  generatedDataHistoryFilters: [[{
    text: 'Order Date',
    value: 'order_date'
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
    value: 'sales_agent_id'
  }, {
    text: 'Location',
    value: 'location'
  }, {
    text: 'Invoice Posting Date',
    value: 'invoice_date'
  }]] // ************************* /Templated Data History *******************************

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
    text: "Salesman Name",
    value: "sm_name"
  }, {
    text: "Salesman Code",
    value: "sm_code"
  }, {
    text: "Salesman Code (Supplier)",
    value: "sm_code_supplier"
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
  'item_code', 'customer_code', 'distributor_id', 'sales_agent_id', // salesman code
  'invoice_no', 'location', 'invoice_date', 'payment_term_code', 'bulk_qty', 'loose_qty', 'default_user', 'system_date', 'expiry_date', 'order_date', 'request_delivery_date'],
  generatedDataHistoryFilters: [[{
    text: 'Order Date',
    value: 'order_date'
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
    value: 'sales_agent_id'
  }, {
    text: 'Location',
    value: 'location'
  }, {
    text: 'Invoice Posting Date',
    value: 'invoice_date'
  }]] // ************************* /Templated Data History *******************************

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
  'order_date', 'customer_code', 'route_code', 'product_category_code', 'ship_to', 'order_no', 'remarks', 'item_code', 'quantity'],
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