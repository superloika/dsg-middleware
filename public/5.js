(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

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
      return __webpack_require__.e(/*! import() */ 16).then(__webpack_require__.bind(null, /*! ./common/Base.vue */ "./resources/js/pages/Principals/common/Base.vue"));
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
          return __webpack_require__.e(/*! import() */ 19).then(__webpack_require__.bind(null, /*! ./common/Generated.vue */ "./resources/js/pages/Principals/common/Generated.vue"));
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
      }, // {
      //     title: 'Stats',
      //     icon: 'mdi-chart-line',
      //     // component: () => import("../common/TransAndInvoices.vue"),
      //     component: () => import("./common/Stats.vue"),
      // },
      {
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
      //     component: () => import("./common/DevChat.vue"),
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
    console.log(this.selectedPrincipalCode + ' component mounted'); // br test ****************************************************
    // this.BrStore.refresh();

    var data = [{
      "retailer_br_id": "5499574",
      "erp_invoice_number": "INV-103",
      "invoice_date": "2023-06-02",
      // "total_value": "-1",
      "details": [// {
      //     "sku_external_id": "000000000000159626",
      //     "quantity": "2",
      //     "sku_uom": "",
      //     "price_per_item": "1",
      //     "discount_value": "",
      //     "gross_value": "",
      // },
      // {
      //     "sku_external_id": "000000501120020002",
      //     // "sku_external_id": "000000000000159626",
      //     "quantity": "3",
      //     "sku_uom": "",
      //     "price_per_item": "1",
      //     "discount_value": "",
      //     "gross_value": "",
      // },
      // {
      //     "sku_external_id": "000005011200361519",
      //     "quantity": "2",
      //     "sku_uom": "",
      //     "price_per_item": "1",
      //     "discount_value": "",
      //     "gross_value": "",
      // },
      {
        "sku_external_id": "000005011151165925",
        "quantity": "-1",
        "sku_uom": "SCK",
        "price_per_item": "1",
        "discount_value": "",
        "gross_value": ""
      }],
      "customFields": [// {
        //     "id": "629",
        //     "value": "Jessa Alas"
        // },
        // {
        //     "id": "638",
        //     "value": "Trade Return Bad"
        // },
      ]
    }];
    var raw = JSON.stringify([{
      "retailer_br_id": "5321913",
      "retailer_external_id": "",
      "erp_invoice_number": "CDC-S4819309",
      "invoice_date": "2023-05-29",
      "status": 1,
      "order_id": "",
      "external_order_id": "",
      "ship_to_external_id": "",
      "order_status": "",
      "total_tax": "",
      "total_value": "",
      "remarks": "",
      "payment_due_date": "",
      "invoice_level_discount": "",
      "details": [{
        "sku_external_id": "000005013180259503",
        "quantity": "2",
        "sku_uom": "CS",
        "price_per_item": "988.8000",
        "discount_value": "",
        "gross_value": "",
        "tax_code": "",
        "tax": ""
      }],
      "customFields": [{
        "id": "629",
        "value": "Jessa Alas"
      }]
    }]); // this.BrStore.invoiceCreate(data);
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
	"./3m_ph": "./resources/js/stores.custom/principals/3m_ph.js",
	"./3m_ph.js": "./resources/js/stores.custom/principals/3m_ph.js",
	"./a_tung_chingco": "./resources/js/stores.custom/principals/a_tung_chingco.js",
	"./a_tung_chingco.js": "./resources/js/stores.custom/principals/a_tung_chingco.js",
	"./alaska_milk": "./resources/js/stores.custom/principals/alaska_milk.js",
	"./alaska_milk.js": "./resources/js/stores.custom/principals/alaska_milk.js",
	"./apollo": "./resources/js/stores.custom/principals/apollo.js",
	"./apollo.js": "./resources/js/stores.custom/principals/apollo.js",
	"./arla_foods": "./resources/js/stores.custom/principals/arla_foods.js",
	"./arla_foods.js": "./resources/js/stores.custom/principals/arla_foods.js",
	"./benby_enterprises": "./resources/js/stores.custom/principals/benby_enterprises.js",
	"./benby_enterprises.js": "./resources/js/stores.custom/principals/benby_enterprises.js",
	"./bevi_asia_pacific": "./resources/js/stores.custom/principals/bevi_asia_pacific.js",
	"./bevi_asia_pacific.js": "./resources/js/stores.custom/principals/bevi_asia_pacific.js",
	"./cadbury_adams": "./resources/js/stores.custom/principals/cadbury_adams.js",
	"./cadbury_adams.js": "./resources/js/stores.custom/principals/cadbury_adams.js",
	"./candy_castle_foods": "./resources/js/stores.custom/principals/candy_castle_foods.js",
	"./candy_castle_foods.js": "./resources/js/stores.custom/principals/candy_castle_foods.js",
	"./candyline_food": "./resources/js/stores.custom/principals/candyline_food.js",
	"./candyline_food.js": "./resources/js/stores.custom/principals/candyline_food.js",
	"./century_canning": "./resources/js/stores.custom/principals/century_canning.js",
	"./century_canning.js": "./resources/js/stores.custom/principals/century_canning.js",
	"./cle_ace_corp": "./resources/js/stores.custom/principals/cle_ace_corp.js",
	"./cle_ace_corp.js": "./resources/js/stores.custom/principals/cle_ace_corp.js",
	"./cle_ace_corp1": "./resources/js/stores.custom/principals/cle_ace_corp1.js",
	"./cle_ace_corp1.js": "./resources/js/stores.custom/principals/cle_ace_corp1.js",
	"./colgate_palmolive": "./resources/js/stores.custom/principals/colgate_palmolive.js",
	"./colgate_palmolive.js": "./resources/js/stores.custom/principals/colgate_palmolive.js",
	"./columbus_seafoods": "./resources/js/stores.custom/principals/columbus_seafoods.js",
	"./columbus_seafoods.js": "./resources/js/stores.custom/principals/columbus_seafoods.js",
	"./cosmetique_asia": "./resources/js/stores.custom/principals/cosmetique_asia.js",
	"./cosmetique_asia.js": "./resources/js/stores.custom/principals/cosmetique_asia.js",
	"./del_monte_ph": "./resources/js/stores.custom/principals/del_monte_ph.js",
	"./del_monte_ph.js": "./resources/js/stores.custom/principals/del_monte_ph.js",
	"./diageo_ph": "./resources/js/stores.custom/principals/diageo_ph.js",
	"./diageo_ph.js": "./resources/js/stores.custom/principals/diageo_ph.js",
	"./diamond_instant": "./resources/js/stores.custom/principals/diamond_instant.js",
	"./diamond_instant.js": "./resources/js/stores.custom/principals/diamond_instant.js",
	"./dole_ph": "./resources/js/stores.custom/principals/dole_ph.js",
	"./dole_ph.js": "./resources/js/stores.custom/principals/dole_ph.js",
	"./ecossentials": "./resources/js/stores.custom/principals/ecossentials.js",
	"./ecossentials.js": "./resources/js/stores.custom/principals/ecossentials.js",
	"./emperador_distillers": "./resources/js/stores.custom/principals/emperador_distillers.js",
	"./emperador_distillers.js": "./resources/js/stores.custom/principals/emperador_distillers.js",
	"./enerlife": "./resources/js/stores.custom/principals/enerlife.js",
	"./enerlife.js": "./resources/js/stores.custom/principals/enerlife.js",
	"./first_pgmc": "./resources/js/stores.custom/principals/first_pgmc.js",
	"./first_pgmc.js": "./resources/js/stores.custom/principals/first_pgmc.js",
	"./fonterra_brands": "./resources/js/stores.custom/principals/fonterra_brands.js",
	"./fonterra_brands.js": "./resources/js/stores.custom/principals/fonterra_brands.js",
	"./food_fabricators": "./resources/js/stores.custom/principals/food_fabricators.js",
	"./food_fabricators.js": "./resources/js/stores.custom/principals/food_fabricators.js",
	"./foodsphere_inc": "./resources/js/stores.custom/principals/foodsphere_inc.js",
	"./foodsphere_inc.js": "./resources/js/stores.custom/principals/foodsphere_inc.js",
	"./goldshine_pharma": "./resources/js/stores.custom/principals/goldshine_pharma.js",
	"./goldshine_pharma.js": "./resources/js/stores.custom/principals/goldshine_pharma.js",
	"./green_cross": "./resources/js/stores.custom/principals/green_cross.js",
	"./green_cross.js": "./resources/js/stores.custom/principals/green_cross.js",
	"./gsmi": "./resources/js/stores.custom/principals/gsmi.js",
	"./gsmi.js": "./resources/js/stores.custom/principals/gsmi.js",
	"./gspi": "./resources/js/stores.custom/principals/gspi.js",
	"./gspi.js": "./resources/js/stores.custom/principals/gspi.js",
	"./gspi1": "./resources/js/stores.custom/principals/gspi1.js",
	"./gspi1.js": "./resources/js/stores.custom/principals/gspi1.js",
	"./gymboree_marketing": "./resources/js/stores.custom/principals/gymboree_marketing.js",
	"./gymboree_marketing.js": "./resources/js/stores.custom/principals/gymboree_marketing.js",
	"./hormel_foods": "./resources/js/stores.custom/principals/hormel_foods.js",
	"./hormel_foods.js": "./resources/js/stores.custom/principals/hormel_foods.js",
	"./ipi": "./resources/js/stores.custom/principals/ipi.js",
	"./ipi.js": "./resources/js/stores.custom/principals/ipi.js",
	"./ipi_chemical": "./resources/js/stores.custom/principals/ipi_chemical.js",
	"./ipi_chemical.js": "./resources/js/stores.custom/principals/ipi_chemical.js",
	"./ipi_food": "./resources/js/stores.custom/principals/ipi_food.js",
	"./ipi_food.js": "./resources/js/stores.custom/principals/ipi_food.js",
	"./ipi_soap": "./resources/js/stores.custom/principals/ipi_soap.js",
	"./ipi_soap.js": "./resources/js/stores.custom/principals/ipi_soap.js",
	"./jnj": "./resources/js/stores.custom/principals/jnj.js",
	"./jnj.js": "./resources/js/stores.custom/principals/jnj.js",
	"./jordan_toothbrush": "./resources/js/stores.custom/principals/jordan_toothbrush.js",
	"./jordan_toothbrush.js": "./resources/js/stores.custom/principals/jordan_toothbrush.js",
	"./jsu": "./resources/js/stores.custom/principals/jsu.js",
	"./jsu.js": "./resources/js/stores.custom/principals/jsu.js",
	"./kalbe_international": "./resources/js/stores.custom/principals/kalbe_international.js",
	"./kalbe_international.js": "./resources/js/stores.custom/principals/kalbe_international.js",
	"./kareila_management": "./resources/js/stores.custom/principals/kareila_management.js",
	"./kareila_management.js": "./resources/js/stores.custom/principals/kareila_management.js",
	"./kimberly": "./resources/js/stores.custom/principals/kimberly.js",
	"./kimberly.js": "./resources/js/stores.custom/principals/kimberly.js",
	"./loraines_mktg": "./resources/js/stores.custom/principals/loraines_mktg.js",
	"./loraines_mktg.js": "./resources/js/stores.custom/principals/loraines_mktg.js",
	"./magnolia_inc": "./resources/js/stores.custom/principals/magnolia_inc.js",
	"./magnolia_inc.js": "./resources/js/stores.custom/principals/magnolia_inc.js",
	"./makarios_ph": "./resources/js/stores.custom/principals/makarios_ph.js",
	"./makarios_ph.js": "./resources/js/stores.custom/principals/makarios_ph.js",
	"./marketventure_dist": "./resources/js/stores.custom/principals/marketventure_dist.js",
	"./marketventure_dist.js": "./resources/js/stores.custom/principals/marketventure_dist.js",
	"./mead_johnson": "./resources/js/stores.custom/principals/mead_johnson.js",
	"./mead_johnson.js": "./resources/js/stores.custom/principals/mead_johnson.js",
	"./mega_fishing": "./resources/js/stores.custom/principals/mega_fishing.js",
	"./mega_fishing.js": "./resources/js/stores.custom/principals/mega_fishing.js",
	"./megasoft": "./resources/js/stores.custom/principals/megasoft.js",
	"./megasoft.js": "./resources/js/stores.custom/principals/megasoft.js",
	"./mondelez": "./resources/js/stores.custom/principals/mondelez.js",
	"./mondelez.js": "./resources/js/stores.custom/principals/mondelez.js",
	"./moondish": "./resources/js/stores.custom/principals/moondish.js",
	"./moondish.js": "./resources/js/stores.custom/principals/moondish.js",
	"./nutri_asia": "./resources/js/stores.custom/principals/nutri_asia.js",
	"./nutri_asia.js": "./resources/js/stores.custom/principals/nutri_asia.js",
	"./others": "./resources/js/stores.custom/principals/others.js",
	"./others.js": "./resources/js/stores.custom/principals/others.js",
	"./others_ni": "./resources/js/stores.custom/principals/others_ni.js",
	"./others_ni.js": "./resources/js/stores.custom/principals/others_ni.js",
	"./pacific_meat": "./resources/js/stores.custom/principals/pacific_meat.js",
	"./pacific_meat.js": "./resources/js/stores.custom/principals/pacific_meat.js",
	"./peerless": "./resources/js/stores.custom/principals/peerless.js",
	"./peerless.js": "./resources/js/stores.custom/principals/peerless.js",
	"./permex_producer": "./resources/js/stores.custom/principals/permex_producer.js",
	"./permex_producer.js": "./resources/js/stores.custom/principals/permex_producer.js",
	"./philusa_corp": "./resources/js/stores.custom/principals/philusa_corp.js",
	"./philusa_corp.js": "./resources/js/stores.custom/principals/philusa_corp.js",
	"./premier_wine": "./resources/js/stores.custom/principals/premier_wine.js",
	"./premier_wine.js": "./resources/js/stores.custom/principals/premier_wine.js",
	"./prifood_corp": "./resources/js/stores.custom/principals/prifood_corp.js",
	"./prifood_corp.js": "./resources/js/stores.custom/principals/prifood_corp.js",
	"./procter_gamble": "./resources/js/stores.custom/principals/procter_gamble.js",
	"./procter_gamble.js": "./resources/js/stores.custom/principals/procter_gamble.js",
	"./quanta_paper": "./resources/js/stores.custom/principals/quanta_paper.js",
	"./quanta_paper.js": "./resources/js/stores.custom/principals/quanta_paper.js",
	"./reckitt": "./resources/js/stores.custom/principals/reckitt.js",
	"./reckitt.js": "./resources/js/stores.custom/principals/reckitt.js",
	"./regent_food_corp": "./resources/js/stores.custom/principals/regent_food_corp.js",
	"./regent_food_corp.js": "./resources/js/stores.custom/principals/regent_food_corp.js",
	"./rfm": "./resources/js/stores.custom/principals/rfm.js",
	"./rfm.js": "./resources/js/stores.custom/principals/rfm.js",
	"./sc_johnson": "./resources/js/stores.custom/principals/sc_johnson.js",
	"./sc_johnson.js": "./resources/js/stores.custom/principals/sc_johnson.js",
	"./scpg_asia": "./resources/js/stores.custom/principals/scpg_asia.js",
	"./scpg_asia.js": "./resources/js/stores.custom/principals/scpg_asia.js",
	"./snow_mountain_dairy": "./resources/js/stores.custom/principals/snow_mountain_dairy.js",
	"./snow_mountain_dairy.js": "./resources/js/stores.custom/principals/snow_mountain_dairy.js",
	"./southern_unicoast": "./resources/js/stores.custom/principals/southern_unicoast.js",
	"./southern_unicoast.js": "./resources/js/stores.custom/principals/southern_unicoast.js",
	"./splash_corp": "./resources/js/stores.custom/principals/splash_corp.js",
	"./splash_corp.js": "./resources/js/stores.custom/principals/splash_corp.js",
	"./stay_and_shop": "./resources/js/stores.custom/principals/stay_and_shop.js",
	"./stay_and_shop.js": "./resources/js/stores.custom/principals/stay_and_shop.js",
	"./sunpride_foods": "./resources/js/stores.custom/principals/sunpride_foods.js",
	"./sunpride_foods.js": "./resources/js/stores.custom/principals/sunpride_foods.js",
	"./suychicken_corp": "./resources/js/stores.custom/principals/suychicken_corp.js",
	"./suychicken_corp.js": "./resources/js/stores.custom/principals/suychicken_corp.js",
	"./suyen_corp": "./resources/js/stores.custom/principals/suyen_corp.js",
	"./suyen_corp.js": "./resources/js/stores.custom/principals/suyen_corp.js",
	"./swedish_match": "./resources/js/stores.custom/principals/swedish_match.js",
	"./swedish_match.js": "./resources/js/stores.custom/principals/swedish_match.js",
	"./symply_g": "./resources/js/stores.custom/principals/symply_g.js",
	"./symply_g.js": "./resources/js/stores.custom/principals/symply_g.js",
	"./tekson": "./resources/js/stores.custom/principals/tekson.js",
	"./tekson.js": "./resources/js/stores.custom/principals/tekson.js",
	"./temprincipals": "./resources/js/stores.custom/principals/temprincipals.js",
	"./temprincipals.js": "./resources/js/stores.custom/principals/temprincipals.js",
	"./tentay_foods": "./resources/js/stores.custom/principals/tentay_foods.js",
	"./tentay_foods.js": "./resources/js/stores.custom/principals/tentay_foods.js",
	"./the_purefoods_hormel": "./resources/js/stores.custom/principals/the_purefoods_hormel.js",
	"./the_purefoods_hormel.js": "./resources/js/stores.custom/principals/the_purefoods_hormel.js",
	"./tridharma": "./resources/js/stores.custom/principals/tridharma.js",
	"./tridharma.js": "./resources/js/stores.custom/principals/tridharma.js",
	"./uni_president": "./resources/js/stores.custom/principals/uni_president.js",
	"./uni_president.js": "./resources/js/stores.custom/principals/uni_president.js",
	"./uni_soft": "./resources/js/stores.custom/principals/uni_soft.js",
	"./uni_soft.js": "./resources/js/stores.custom/principals/uni_soft.js",
	"./urc": "./resources/js/stores.custom/principals/urc.js",
	"./urc.js": "./resources/js/stores.custom/principals/urc.js",
	"./wellmade_manufacturing": "./resources/js/stores.custom/principals/wellmade_manufacturing.js",
	"./wellmade_manufacturing.js": "./resources/js/stores.custom/principals/wellmade_manufacturing.js",
	"./wrigley_ph": "./resources/js/stores.custom/principals/wrigley_ph.js",
	"./wrigley_ph.js": "./resources/js/stores.custom/principals/wrigley_ph.js",
	"./wyeth_ph": "./resources/js/stores.custom/principals/wyeth_ph.js",
	"./wyeth_ph.js": "./resources/js/stores.custom/principals/wyeth_ph.js"
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

/***/ "./resources/js/stores.custom/principals/3m_ph.js":
/*!********************************************************!*\
  !*** ./resources/js/stores.custom/principals/3m_ph.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/a_tung_chingco.js":
/*!*****************************************************************!*\
  !*** ./resources/js/stores.custom/principals/a_tung_chingco.js ***!
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
  } // {text:"CASE", value:"case"},
  // {text:"PCS", value:"conversion_qty"},
  ]],
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

/***/ "./resources/js/stores.custom/principals/alaska_milk.js":
/*!**************************************************************!*\
  !*** ./resources/js/stores.custom/principals/alaska_milk.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/apollo.js":
/*!*********************************************************!*\
  !*** ./resources/js/stores.custom/principals/apollo.js ***!
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
    text: "SM_NAME",
    value: "sm_name"
  }, {
    text: "SM_CODE_NAV",
    value: "sm_code"
  }, {
    text: "SM_CODE_SUPPLIER",
    value: "sm_code_supplier"
  }, {
    text: "GROUP_CODE",
    value: "group_code"
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
    text: "Salesman Code",
    value: "sm_code_supplier"
  }, {
    text: "Group",
    value: "group"
  }]],
  // ***********************************************************************************
  generatedDataHistoryFilters: [[{
    text: 'System Date',
    value: 'system_date'
  }, {
    text: 'Salesman',
    value: 'sm_name'
  }, {
    text: 'Salesman Code',
    value: 'sm_code'
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

/***/ "./resources/js/stores.custom/principals/arla_foods.js":
/*!*************************************************************!*\
  !*** ./resources/js/stores.custom/principals/arla_foods.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/benby_enterprises.js":
/*!********************************************************************!*\
  !*** ./resources/js/stores.custom/principals/benby_enterprises.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/bevi_asia_pacific.js":
/*!********************************************************************!*\
  !*** ./resources/js/stores.custom/principals/bevi_asia_pacific.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/candy_castle_foods.js":
/*!*********************************************************************!*\
  !*** ./resources/js/stores.custom/principals/candy_castle_foods.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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
  }, {
    text: 'Invoice #',
    value: 'doc_no'
  }]]
});
var actions = {};
/* harmony default export */ __webpack_exports__["default"] = (_objectSpread({
  state: state
}, actions));

/***/ }),

/***/ "./resources/js/stores.custom/principals/candyline_food.js":
/*!*****************************************************************!*\
  !*** ./resources/js/stores.custom/principals/candyline_food.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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
  } // {text:"CASE", value:"case"},
  // {text:"PCS", value:"conversion_qty"},
  ]],
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

/***/ "./resources/js/stores.custom/principals/cle_ace_corp.js":
/*!***************************************************************!*\
  !*** ./resources/js/stores.custom/principals/cle_ace_corp.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/cle_ace_corp1.js":
/*!****************************************************************!*\
  !*** ./resources/js/stores.custom/principals/cle_ace_corp1.js ***!
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
  //         { text: "Principal Customer Code", value: "customer_code_supplier" },
  //     ],
  // ],
  itemsTableHeader: [[{
    text: "Item Code",
    value: "item_code"
  }, {
    text: "FAC Item Code",
    value: "item_code_supplier"
  }, {
    text: "Description",
    value: "description"
  }, {
    text: "Inner case",
    value: "conversion_qty"
  }, {
    text: "cp_cases",
    value: "cp_cases"
  }, {
    text: "cp_pcs",
    value: "cp_pcs"
  }, {
    text: "cp_panel_cases",
    value: "cp_panel_cases"
  }, {
    text: "cp_panel_pcs",
    value: "cp_panel_pcs"
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

/***/ "./resources/js/stores.custom/principals/colgate_palmolive.js":
/*!********************************************************************!*\
  !*** ./resources/js/stores.custom/principals/colgate_palmolive.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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
  } // {text:"CASE", value:"case"},
  // {text:"PCS", value:"conversion_qty"},
  ]],
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

/***/ "./resources/js/stores.custom/principals/cosmetique_asia.js":
/*!******************************************************************!*\
  !*** ./resources/js/stores.custom/principals/cosmetique_asia.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/del_monte_ph.js":
/*!***************************************************************!*\
  !*** ./resources/js/stores.custom/principals/del_monte_ph.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (d/m/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/diageo_ph.js":
/*!************************************************************!*\
  !*** ./resources/js/stores.custom/principals/diageo_ph.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/diamond_instant.js":
/*!******************************************************************!*\
  !*** ./resources/js/stores.custom/principals/diamond_instant.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/dole_ph.js":
/*!**********************************************************!*\
  !*** ./resources/js/stores.custom/principals/dole_ph.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/emperador_distillers.js":
/*!***********************************************************************!*\
  !*** ./resources/js/stores.custom/principals/emperador_distillers.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/enerlife.js":
/*!***********************************************************!*\
  !*** ./resources/js/stores.custom/principals/enerlife.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/first_pgmc.js":
/*!*************************************************************!*\
  !*** ./resources/js/stores.custom/principals/first_pgmc.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/fonterra_brands.js":
/*!******************************************************************!*\
  !*** ./resources/js/stores.custom/principals/fonterra_brands.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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
    value: "sm_code"
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/goldshine_pharma.js":
/*!*******************************************************************!*\
  !*** ./resources/js/stores.custom/principals/goldshine_pharma.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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
    text: "Supplier Item Code",
    value: "item_code_supplier"
  }, {
    text: "Supplier Item Description",
    value: "description_supplier"
  }, {
    text: "Item Code",
    value: "item_code"
  }, {
    text: "Description",
    value: "description"
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
    text: 'Salesman',
    value: 'sm_name'
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/gspi1.js":
/*!********************************************************!*\
  !*** ./resources/js/stores.custom/principals/gspi1.js ***!
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

/***/ "./resources/js/stores.custom/principals/gymboree_marketing.js":
/*!*********************************************************************!*\
  !*** ./resources/js/stores.custom/principals/gymboree_marketing.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/hormel_foods.js":
/*!***************************************************************!*\
  !*** ./resources/js/stores.custom/principals/hormel_foods.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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
  }, {
    text: 'Invoice #',
    value: 'doc_no'
  }]]
});
var actions = {};
/* harmony default export */ __webpack_exports__["default"] = ({
  state: state // ...actions

});

/***/ }),

/***/ "./resources/js/stores.custom/principals/ipi.js":
/*!******************************************************!*\
  !*** ./resources/js/stores.custom/principals/ipi.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/ipi_chemical.js":
/*!***************************************************************!*\
  !*** ./resources/js/stores.custom/principals/ipi_chemical.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/ipi_food.js":
/*!***********************************************************!*\
  !*** ./resources/js/stores.custom/principals/ipi_food.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/ipi_soap.js":
/*!***********************************************************!*\
  !*** ./resources/js/stores.custom/principals/ipi_soap.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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
    text: "SM_NAME",
    value: "sm_name"
  }, {
    text: "SM_CODE_NAV",
    value: "sm_code"
  }, {
    text: "SM_CODE_SUPPLIER",
    value: "sm_code_supplier"
  }, {
    text: "GROUP_CODE",
    value: "group_code"
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
    text: "Salesman Code",
    value: "sm_code_supplier"
  }, {
    text: "Group",
    value: "group"
  }]],
  // ***********************************************************************************
  generatedDataHistoryFilters: [[{
    text: 'System Date',
    value: 'system_date'
  }, {
    text: 'Salesman',
    value: 'sm_name'
  }, {
    text: 'Salesman Code',
    value: 'sm_code'
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

/***/ "./resources/js/stores.custom/principals/jordan_toothbrush.js":
/*!********************************************************************!*\
  !*** ./resources/js/stores.custom/principals/jordan_toothbrush.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/kalbe_international.js":
/*!**********************************************************************!*\
  !*** ./resources/js/stores.custom/principals/kalbe_international.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/kareila_management.js":
/*!*********************************************************************!*\
  !*** ./resources/js/stores.custom/principals/kareila_management.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/kimberly.js":
/*!***********************************************************!*\
  !*** ./resources/js/stores.custom/principals/kimberly.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/loraines_mktg.js":
/*!****************************************************************!*\
  !*** ./resources/js/stores.custom/principals/loraines_mktg.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/magnolia_inc.js":
/*!***************************************************************!*\
  !*** ./resources/js/stores.custom/principals/magnolia_inc.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/makarios_ph.js":
/*!**************************************************************!*\
  !*** ./resources/js/stores.custom/principals/makarios_ph.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/marketventure_dist.js":
/*!*********************************************************************!*\
  !*** ./resources/js/stores.custom/principals/marketventure_dist.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/mega_fishing.js":
/*!***************************************************************!*\
  !*** ./resources/js/stores.custom/principals/mega_fishing.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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
  }, {
    text: "Conversion",
    value: "conversion_qty"
  }, {
    text: "UOM",
    value: "uom"
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
    value: "sm_code"
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/moondish.js":
/*!***********************************************************!*\
  !*** ./resources/js/stores.custom/principals/moondish.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/nutri_asia.js":
/*!*************************************************************!*\
  !*** ./resources/js/stores.custom/principals/nutri_asia.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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
  } // {text:"CASE", value:"case"},
  // {text:"PCS", value:"conversion_qty"},
  ]],
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/permex_producer.js":
/*!******************************************************************!*\
  !*** ./resources/js/stores.custom/principals/permex_producer.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/philusa_corp.js":
/*!***************************************************************!*\
  !*** ./resources/js/stores.custom/principals/philusa_corp.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/premier_wine.js":
/*!***************************************************************!*\
  !*** ./resources/js/stores.custom/principals/premier_wine.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/prifood_corp.js":
/*!***************************************************************!*\
  !*** ./resources/js/stores.custom/principals/prifood_corp.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/procter_gamble.js":
/*!*****************************************************************!*\
  !*** ./resources/js/stores.custom/principals/procter_gamble.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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
  }, {
    text: 'Invoice #',
    value: 'doc_no'
  }]]
});
var actions = {};
/* harmony default export */ __webpack_exports__["default"] = (_objectSpread({
  state: state
}, actions));

/***/ }),

/***/ "./resources/js/stores.custom/principals/quanta_paper.js":
/*!***************************************************************!*\
  !*** ./resources/js/stores.custom/principals/quanta_paper.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/reckitt.js":
/*!**********************************************************!*\
  !*** ./resources/js/stores.custom/principals/reckitt.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/regent_food_corp.js":
/*!*******************************************************************!*\
  !*** ./resources/js/stores.custom/principals/regent_food_corp.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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
  }, {
    text: 'Invoice #',
    value: 'doc_no'
  }]]
});
var actions = {};
/* harmony default export */ __webpack_exports__["default"] = (_objectSpread({
  state: state
}, actions));

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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/sc_johnson.js":
/*!*************************************************************!*\
  !*** ./resources/js/stores.custom/principals/sc_johnson.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/scpg_asia.js":
/*!************************************************************!*\
  !*** ./resources/js/stores.custom/principals/scpg_asia.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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
  } // {text:"CASE", value:"case"},
  // {text:"PCS", value:"conversion_qty"},
  ]],
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

/***/ "./resources/js/stores.custom/principals/southern_unicoast.js":
/*!********************************************************************!*\
  !*** ./resources/js/stores.custom/principals/southern_unicoast.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/splash_corp.js":
/*!**************************************************************!*\
  !*** ./resources/js/stores.custom/principals/splash_corp.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/stay_and_shop.js":
/*!****************************************************************!*\
  !*** ./resources/js/stores.custom/principals/stay_and_shop.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/sunpride_foods.js":
/*!*****************************************************************!*\
  !*** ./resources/js/stores.custom/principals/sunpride_foods.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/suychicken_corp.js":
/*!******************************************************************!*\
  !*** ./resources/js/stores.custom/principals/suychicken_corp.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/suyen_corp.js":
/*!*************************************************************!*\
  !*** ./resources/js/stores.custom/principals/suyen_corp.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/swedish_match.js":
/*!****************************************************************!*\
  !*** ./resources/js/stores.custom/principals/swedish_match.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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
  }, {
    text: 'Invoice #',
    value: 'doc_no'
  }]]
});
var actions = {};
/* harmony default export */ __webpack_exports__["default"] = (_objectSpread({
  state: state
}, actions));

/***/ }),

/***/ "./resources/js/stores.custom/principals/symply_g.js":
/*!***********************************************************!*\
  !*** ./resources/js/stores.custom/principals/symply_g.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/tekson.js":
/*!*********************************************************!*\
  !*** ./resources/js/stores.custom/principals/tekson.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/temprincipals.js":
/*!****************************************************************!*\
  !*** ./resources/js/stores.custom/principals/temprincipals.js ***!
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/tentay_foods.js":
/*!***************************************************************!*\
  !*** ./resources/js/stores.custom/principals/tentay_foods.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/the_purefoods_hormel.js":
/*!***********************************************************************!*\
  !*** ./resources/js/stores.custom/principals/the_purefoods_hormel.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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
  }, {
    text: 'Invoice #',
    value: 'doc_no'
  }]]
});
var actions = {};
/* harmony default export */ __webpack_exports__["default"] = (_objectSpread({
  state: state
}, actions));

/***/ }),

/***/ "./resources/js/stores.custom/principals/tridharma.js":
/*!************************************************************!*\
  !*** ./resources/js/stores.custom/principals/tridharma.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/uni_president.js":
/*!****************************************************************!*\
  !*** ./resources/js/stores.custom/principals/uni_president.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/uni_soft.js":
/*!***********************************************************!*\
  !*** ./resources/js/stores.custom/principals/uni_soft.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/urc.js":
/*!******************************************************!*\
  !*** ./resources/js/stores.custom/principals/urc.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/wellmade_manufacturing.js":
/*!*************************************************************************!*\
  !*** ./resources/js/stores.custom/principals/wellmade_manufacturing.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/wrigley_ph.js":
/*!*************************************************************!*\
  !*** ./resources/js/stores.custom/principals/wrigley_ph.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ "./resources/js/stores.custom/principals/wyeth_ph.js":
/*!***********************************************************!*\
  !*** ./resources/js/stores.custom/principals/wyeth_ph.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.common.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var state = vue__WEBPACK_IMPORTED_MODULE_0___default.a.observable({
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
    text: "Invoice Date (m/d/y)",
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
    value: "sm_code"
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

/***/ })

}]);
//# sourceMappingURL=5.js.map