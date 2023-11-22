(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Principals/common/DevChat.vue?vue&type=script&lang=js&":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Principals/common/DevChat.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
      // messages: [],
      newMessage: "",
      sending: false,
      files: []
    };
  },
  computed: {
    channel: function channel() {
      // return this.PrincipalsStore.state.selectedPrincipalCode;
      return this.DevChatStore.state.groupChannel;
    },
    onlineUsers: function onlineUsers() {
      return this.DevChatStore.state.onlineUsers;
    }
  },
  methods: {
    fetchMessages: function fetchMessages() {
      var _this = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this.sending = true;
                _context.next = 3;
                return axios.get("/devchat/fetch-messages?channel=".concat(_this.channel)).then(function (response) {
                  _this.DevChatStore.state.messages = response.data;
                  _this.sending = false;
                });

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    sendMessage: function sendMessage(message) {
      var _arguments = arguments,
          _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
        var attachments, config, formData, i;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                attachments = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : [];
                config = {
                  headers: {
                    'content-type': 'multipart/form-data'
                  }
                };
                formData = new FormData();

                for (i = 0; i < attachments.length; i++) {
                  formData.append('attachments[' + i + ']', attachments[i]);
                }

                formData.append('message', message);
                formData.append('channel', _this2.channel); // const payload = {
                //     message: message,
                //     channel: this.channel,
                //     attachments: attachments
                // };

                _this2.sending = true;
                _context2.next = 9;
                return axios.post("/devchat/send-message", formData, config).then(function (response) {
                  _this2.newMessage = "";
                  _this2.files = [];
                  console.log(response.data);
                  _this2.sending = false;
                });

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    } // onKeyup(event) {
    //     console.log(event.key);
    //     if(event.key == '@') {
    //         alert('test');
    //     }
    // },

  },
  watch: {// subscribedUsers() {
    //     console.log(this.subscribedUsers);
    // }
  },
  mounted: function mounted() {
    console.log("DevChat page mounted.");
    this.DevChatStore.state.unreadMsgCount = 0;
  },
  created: function created() {
    this.fetchMessages();
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
    "v-sheet",
    {
      staticClass: "pa-2 ma-0",
      on: {
        mousedown: function($event) {
          _vm.DevChatStore.state.unreadMsgCount = 0
        }
      }
    },
    [
      _c(
        "v-row",
        [
          _c(
            "v-col",
            { attrs: { cols: "12", md: "8" } },
            [
              _c(
                "v-sheet",
                { staticClass: "pb-4" },
                [
                  _c("v-textarea", {
                    staticClass: "pb-2",
                    attrs: {
                      solo: "",
                      "auto-grow": "",
                      "hide-details": "",
                      rounded: "",
                      label: "Type your message here",
                      rows: "1"
                    },
                    model: {
                      value: _vm.newMessage,
                      callback: function($$v) {
                        _vm.newMessage = $$v
                      },
                      expression: "newMessage"
                    }
                  }),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "d-flex justify-end" },
                    [
                      _c("v-file-input", {
                        staticClass: "mr-3",
                        attrs: {
                          counter: "",
                          rounded: "",
                          "small-chips": "",
                          outlined: "",
                          multiple: "",
                          dense: "",
                          color: "primary",
                          "prepend-icon": "mdi-paperclip",
                          "show-size": 1000,
                          label: "Attachments",
                          placeholder: "Select files",
                          loading: _vm.sending
                        },
                        scopedSlots: _vm._u([
                          {
                            key: "selection",
                            fn: function(ref) {
                              var index = ref.index
                              var text = ref.text
                              return [
                                index < 2
                                  ? _c(
                                      "v-chip",
                                      {
                                        attrs: {
                                          color: "primary",
                                          dark: "",
                                          label: "",
                                          small: ""
                                        }
                                      },
                                      [
                                        _vm._v(
                                          "\n                            " +
                                            _vm._s(text) +
                                            "\n                        "
                                        )
                                      ]
                                    )
                                  : index === 2
                                  ? _c(
                                      "span",
                                      {
                                        staticClass:
                                          "text-overline grey--text text--darken-3 mx-2"
                                      },
                                      [
                                        _vm._v(
                                          "\n                            +" +
                                            _vm._s(_vm.files.length - 2) +
                                            " File(s)\n                        "
                                        )
                                      ]
                                    )
                                  : _vm._e()
                              ]
                            }
                          }
                        ]),
                        model: {
                          value: _vm.files,
                          callback: function($$v) {
                            _vm.files = $$v
                          },
                          expression: "files"
                        }
                      }),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          attrs: {
                            rounded: "",
                            depressed: "",
                            "hide-details": "",
                            color: "primary",
                            loading: _vm.sending,
                            disabled:
                              _vm.newMessage == "" || _vm.newMessage == null
                          },
                          on: {
                            click: function($event) {
                              return _vm.sendMessage(_vm.newMessage, _vm.files)
                            }
                          }
                        },
                        [
                          _c("v-icon", [_vm._v("mdi-send")]),
                          _vm._v(
                            "\n                        Send\n                    "
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-card",
                {
                  staticStyle: {
                    "overflow-y": "scroll",
                    "max-height": "400px"
                  },
                  attrs: { flat: "" }
                },
                _vm._l(_vm.DevChatStore.state.messages, function(message, i) {
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
                            staticClass: "rounded-lg",
                            class:
                              _vm.AuthUser.username == message.username
                                ? "primary"
                                : "secondary",
                            staticStyle: { "max-width": "700px" }
                          },
                          [
                            _c(
                              "div",
                              {
                                staticClass: "pl-4 pr-6 pt-4 pb-2 white--text"
                              },
                              [
                                _c("div", { staticClass: "d-flex" }, [
                                  _c(
                                    "div",
                                    { staticClass: "font-weight-bold" },
                                    [
                                      _vm._v(
                                        "\n                                        " +
                                          _vm._s(message.name) +
                                          "\n                                    "
                                      )
                                    ]
                                  ),
                                  _vm._v(
                                    "\n                                     \n                                    "
                                  ),
                                  _c(
                                    "div",
                                    {
                                      staticClass: "caption",
                                      class:
                                        _vm.AuthUser.username ==
                                        message.username
                                          ? "lime--text"
                                          : "grey--text"
                                    },
                                    [
                                      _vm._v(
                                        "\n                                        @" +
                                          _vm._s(message.username) +
                                          "\n                                    "
                                      )
                                    ]
                                  )
                                ]),
                                _vm._v(" "),
                                _c("div", {
                                  staticClass: "caption",
                                  staticStyle: { "white-space": "pre-line" },
                                  domProps: {
                                    innerHTML: _vm._s(message.message)
                                  }
                                }),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  { staticClass: "caption pt-2" },
                                  _vm._l(
                                    JSON.parse(message.attachments),
                                    function(attachment, attachment_index) {
                                      return _c(
                                        "div",
                                        { key: attachment_index },
                                        [
                                          _c(
                                            "a",
                                            {
                                              staticClass: "white--text",
                                              staticStyle: {
                                                "text-decoration": "none"
                                              },
                                              attrs: {
                                                href:
                                                  "/storage/attachments/" +
                                                  message.channel +
                                                  "/" +
                                                  attachment,
                                                target: "_blank",
                                                "x-small": ""
                                              }
                                            },
                                            [
                                              _c(
                                                "v-icon",
                                                {
                                                  attrs: {
                                                    small: "",
                                                    color: "white"
                                                  }
                                                },
                                                [_vm._v("mdi-attachment")]
                                              ),
                                              _vm._v(" "),
                                              _c("small", [
                                                _vm._v(_vm._s(attachment))
                                              ])
                                            ],
                                            1
                                          )
                                        ]
                                      )
                                    }
                                  ),
                                  0
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  {
                                    staticClass:
                                      "mt-2 caption d-flex justify-end"
                                  },
                                  [
                                    _c("small", [
                                      _vm._v(_vm._s(message.created_at))
                                    ])
                                  ]
                                )
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
          ),
          _vm._v(" "),
          _c(
            "v-col",
            { attrs: { cols: "12", md: "4" } },
            [
              _c(
                "v-card",
                [
                  _c(
                    "v-card-text",
                    _vm._l(_vm.onlineUsers, function(u) {
                      return _c("div", { key: u.username }, [
                        _c(
                          "span",
                          {
                            staticClass:
                              "caption primary--text font-weight-bold"
                          },
                          [
                            _vm._v(
                              "\n                            " +
                                _vm._s(u.name) +
                                " "
                            ),
                            _c("span", { staticClass: "grey--text" }, [
                              _vm._v("@" + _vm._s(u.username))
                            ])
                          ]
                        )
                      ])
                    }),
                    0
                  )
                ],
                1
              )
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
//# sourceMappingURL=4.js.map