(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[27],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/DevChat.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/DevChat.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      users: [],
      messages: [],
      newMessage: ""
    };
  },
  computed: {
    channel: function channel() {
      return this.PrincipalsStore.state.selectedPrincipalCode;
    }
  },
  methods: {
    fetchMessages: function fetchMessages() {
      var _this = this;

      axios.get("/devchat/fetch-messages?channel=".concat(this.channel)).then(function (response) {
        _this.messages = response.data;
      });
    },
    sendMessage: function sendMessage(message) {
      var _this2 = this;

      var payload = {
        message: message,
        channel: this.channel
      };
      axios.post("/devchat/send-message", payload).then(function (response) {
        _this2.newMessage = "";
        console.log(response.data);
      });
    }
  },
  // watch: {
  //     messages() {
  //         console.log(this.messages);
  //     }
  // },
  mounted: function mounted() {
    console.log("DevChat page mounted.");
  },
  created: function created() {
    var _this3 = this;

    this.fetchMessages();
    Echo.join(this.channel).listen("MessageSent", function (event) {
      _this3.messages.unshift(event.message);
    });
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/DevChat.vue?vue&type=template&id=ca20914c&":
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/DevChat.vue?vue&type=template&id=ca20914c& ***!
  \***********************************************************************************************************************************************************************************************************************/
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
      _c("v-container", [
        _c(
          "div",
          [
            _c("v-text-field", {
              attrs: {
                rounded: "",
                solo: "",
                placeholder: "Enter message here (Press Enter to send)"
              },
              on: {
                keyup: function($event) {
                  if (
                    !$event.type.indexOf("key") &&
                    _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                  ) {
                    return null
                  }
                  return _vm.sendMessage(_vm.newMessage)
                }
              },
              model: {
                value: _vm.newMessage,
                callback: function($$v) {
                  _vm.newMessage = $$v
                },
                expression: "newMessage"
              }
            })
          ],
          1
        )
      ]),
      _vm._v(" "),
      _c(
        "v-sheet",
        { staticClass: "pa-4" },
        _vm._l(_vm.messages, function(message, i) {
          return _c("div", { key: i, staticClass: "mb-1" }, [
            _c(
              "div",
              {
                class:
                  _vm.AuthUser.username == message.username
                    ? "d-flex align-end flex-column"
                    : "d-flex align-start flex-column"
              },
              [
                _c(
                  "div",
                  {
                    class:
                      _vm.AuthUser.username == message.username
                        ? "light-blue darken-2"
                        : "secondary",
                    staticStyle: { "max-width": "700px" }
                  },
                  [
                    _c(
                      "div",
                      { staticClass: "pl-4 pr-6 pt-4 pb-2 white--text" },
                      [
                        _c("div", {}, [
                          _vm._v(
                            "\n                            " +
                              _vm._s(message.message) +
                              "\n                        "
                          )
                        ]),
                        _vm._v(" "),
                        _c("div", { staticClass: "mt-2" }, [
                          _c("em", { staticClass: "caption" }, [
                            _vm._v(
                              "\n                                " +
                                _vm._s(message.created_at) +
                                "\n                            "
                            )
                          ])
                        ])
                      ]
                    )
                  ]
                )
              ]
            )
          ])
        }),
        0
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/pages/Principals/common/DevChat.vue":
/*!**********************************************************!*\
  !*** ./resources/js/pages/Principals/common/DevChat.vue ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DevChat_vue_vue_type_template_id_ca20914c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DevChat.vue?vue&type=template&id=ca20914c& */ "./resources/js/pages/Principals/common/DevChat.vue?vue&type=template&id=ca20914c&");
/* harmony import */ var _DevChat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DevChat.vue?vue&type=script&lang=js& */ "./resources/js/pages/Principals/common/DevChat.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _DevChat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _DevChat_vue_vue_type_template_id_ca20914c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _DevChat_vue_vue_type_template_id_ca20914c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Principals/common/DevChat.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Principals/common/DevChat.vue?vue&type=script&lang=js&":
/*!***********************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/DevChat.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DevChat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/babel-loader/lib??ref--4-0!../../../../../node_modules/vue-loader/lib??vue-loader-options!./DevChat.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/DevChat.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_DevChat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Principals/common/DevChat.vue?vue&type=template&id=ca20914c&":
/*!*****************************************************************************************!*\
  !*** ./resources/js/pages/Principals/common/DevChat.vue?vue&type=template&id=ca20914c& ***!
  \*****************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DevChat_vue_vue_type_template_id_ca20914c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../node_modules/vue-loader/lib??vue-loader-options!./DevChat.vue?vue&type=template&id=ca20914c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/DevChat.vue?vue&type=template&id=ca20914c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DevChat_vue_vue_type_template_id_ca20914c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_DevChat_vue_vue_type_template_id_ca20914c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=27.js.map