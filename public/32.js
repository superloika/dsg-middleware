(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[32],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/ManageAccounts/AccountsAdd.vue?vue&type=script&lang=js&":
/*!********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/ManageAccounts/AccountsAdd.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    var _this = this;

    return {
      nameRegex: /^[a-zA-Z\s]+$/,
      usernameRegex: /^[a-zA-Z0-9]+$/,
      frm_add: false,
      newAccount: {
        // name: "test user",
        // username: "admin",
        // password: "admin",
        // passwordConfirm: "admin",
        // user_type: "user",
        name: "",
        username: "",
        password: "",
        passwordConfirm: "",
        user_type: "",
        selected_principals: [],
        rules: {
          name: [function (v) {
            return !!v || "Name is required";
          }, function (v) {
            return v.length >= 8 || "Name must be 8 characters or above";
          }, function (v) {
            return _this.nameRegex.test(v) || "Invalid name. Use alpha characters only";
          }],
          username: [function (v) {
            return !!v || "Username is required";
          }, function (v) {
            return v.length >= 5 || "Username must be 5 characters or above";
          }, function (v) {
            return _this.usernameRegex.test(v) || "Invalid username";
          }],
          password: [function (v) {
            return !!v || "Password is required";
          }, function (v) {
            return v.length >= 5 || "Password must be 5 characters or above";
          }],
          passwordConfirm: [function (v) {
            return !!v || "Please confirm password";
          }, function (v) {
            return _this.newAccount.password === _this.newAccount.passwordConfirm || "Password did not match";
          }],
          user_type: [function (v) {
            return !!v || "User type is required";
          }]
        }
      },
      savingNewUser: false,
      errMsgs: [],
      errMsgsShown: false
    };
  },
  watch: {
    'newAccount.name': function newAccountName() {
      this.newAccount.name = this.newAccount.name.replace('  ', ' ').trim();
    },
    'newAccount.user_type': function newAccountUser_type() {
      if (this.newAccount.user_type === 'super_admin') {
        this.newAccount.selected_principals = ["*"];
      } else {
        this.newAccount.selected_principals = [];
      }
    } // 'newAccount.selected_principals': function() {
    //     console.log(this.newAccount.selected_principals);
    // }

  },
  methods: {
    saveNewUser: function saveNewUser() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var vm, url, response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                vm = _this2;

                if (!_this2.$refs.frm_add.validate()) {
                  _context.next = 16;
                  break;
                }

                url = "".concat(_this2.AppStore.state.siteUrl, "accounts");
                _context.prev = 3;
                _this2.savingNewUser = true;
                _context.next = 7;
                return axios.post(url, {
                  name: vm.newAccount.name,
                  username: vm.newAccount.username,
                  password: vm.newAccount.password,
                  user_type: vm.newAccount.user_type,
                  selected_principals: vm.newAccount.selected_principals
                });

              case 7:
                response = _context.sent;

                // console.log(response.data);
                if (response.data == true) {
                  _this2.ManageAccounts.initUsers();

                  _this2.ManageAccounts.state.modalAddIsOpen = false;

                  _this2.AppStore.toast("New account added", 2000);
                } else if (response.data.invalidations != undefined || response.data.invalidations != null) {
                  _this2.errMsgs = [];
                  Object.entries(response.data.invalidations).forEach(function (field) {
                    _this2.errMsgs.push(field[1][0]);
                  }); // this.AppStore.toast(this.errMsgs, 3000);

                  _this2.errMsgsShown = true;
                } else if (response.data.errorInfo != null || response.data.errorInfo != undefined) {
                  _this2.AppStore.toast("An error occured", 2000);

                  console.log(response.data.errorInfo);
                }

                _context.next = 15;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context["catch"](3);
                console.log(_context.t0);

                _this2.AppStore.toast(_context.t0, 3000);

              case 15:
                _this2.savingNewUser = false;

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 11]]);
      }))();
    }
  },
  computed: {},
  created: function created() {},
  mounted: function mounted() {
    console.log("ExpendituresAdd mounted.");
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/ManageAccounts/AccountsAdd.vue?vue&type=template&id=1f6d23e0&":
/*!************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/ManageAccounts/AccountsAdd.vue?vue&type=template&id=1f6d23e0& ***!
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
        [
          _c("v-icon", [_vm._v("mdi-account-plus")]),
          _vm._v(" "),
          _c("span", { staticClass: "ml-2" }, [_vm._v("Add Account")]),
          _vm._v(" "),
          _c("v-spacer"),
          _vm._v(" "),
          _c(
            "v-btn",
            {
              attrs: { icon: "" },
              on: {
                click: function($event) {
                  _vm.ManageAccounts.state.modalAddIsOpen = false
                }
              }
            },
            [_c("v-icon", [_vm._v("mdi-close-box-outline")])],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-card-text",
        [
          _c(
            "v-alert",
            {
              attrs: {
                dense: "",
                text: "",
                type: "error",
                dismissible: "",
                transition: "scale-transition"
              },
              model: {
                value: _vm.errMsgsShown,
                callback: function($$v) {
                  _vm.errMsgsShown = $$v
                },
                expression: "errMsgsShown"
              }
            },
            _vm._l(_vm.errMsgs, function(errMsg, index) {
              return _c("p", { key: index, staticClass: "ma-0 pa-0" }, [
                _vm._v("\n                " + _vm._s(errMsg) + "\n            ")
              ])
            }),
            0
          ),
          _vm._v(" "),
          _c("br"),
          _vm._v(" "),
          _c(
            "v-form",
            {
              ref: "frm_add",
              model: {
                value: _vm.frm_add,
                callback: function($$v) {
                  _vm.frm_add = $$v
                },
                expression: "frm_add"
              }
            },
            [
              _c(
                "v-row",
                { staticClass: "pa-0" },
                [
                  _c(
                    "v-col",
                    {
                      staticClass: "pt-1 pb-1",
                      attrs: { cols: "12", md: "4", sm: "6" }
                    },
                    [
                      _c("v-text-field", {
                        attrs: {
                          outlined: "",
                          dense: "",
                          text: "",
                          label: "Name *",
                          required: "",
                          rules: _vm.newAccount.rules.name
                        },
                        model: {
                          value: _vm.newAccount.name,
                          callback: function($$v) {
                            _vm.$set(_vm.newAccount, "name", $$v)
                          },
                          expression: "newAccount.name"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-col",
                    {
                      staticClass: "pt-1 pb-1",
                      attrs: { cols: "12", md: "4", sm: "6" }
                    },
                    [
                      _c("v-text-field", {
                        attrs: {
                          outlined: "",
                          dense: "",
                          text: "",
                          label: "Username *",
                          required: "",
                          rules: _vm.newAccount.rules.username
                        },
                        model: {
                          value: _vm.newAccount.username,
                          callback: function($$v) {
                            _vm.$set(_vm.newAccount, "username", $$v)
                          },
                          expression: "newAccount.username"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-col",
                    {
                      staticClass: "pt-1 pb-1",
                      attrs: { cols: "12", md: "4", sm: "6" }
                    },
                    [
                      _c("v-select", {
                        attrs: {
                          items: _vm.AppStore.state.userTypes,
                          outlined: "",
                          dense: "",
                          text: "",
                          label: "User Type *",
                          required: "",
                          rules: _vm.newAccount.rules.user_type
                        },
                        model: {
                          value: _vm.newAccount.user_type,
                          callback: function($$v) {
                            _vm.$set(_vm.newAccount, "user_type", $$v)
                          },
                          expression: "newAccount.user_type"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-col",
                    {
                      staticClass: "pt-1 pb-1",
                      attrs: { cols: "12", md: "4", sm: "6" }
                    },
                    [
                      _c("v-text-field", {
                        attrs: {
                          outlined: "",
                          dense: "",
                          text: "",
                          label: "Password *",
                          autocomplete: "false",
                          required: "",
                          type: "password",
                          rules: _vm.newAccount.rules.password
                        },
                        model: {
                          value: _vm.newAccount.password,
                          callback: function($$v) {
                            _vm.$set(_vm.newAccount, "password", $$v)
                          },
                          expression: "newAccount.password"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-col",
                    {
                      staticClass: "pt-1 pb-1",
                      attrs: { cols: "12", md: "4", sm: "6" }
                    },
                    [
                      _c("v-text-field", {
                        attrs: {
                          outlined: "",
                          dense: "",
                          text: "",
                          label: "Confirm Password *",
                          autocomplete: "false",
                          required: "",
                          type: "password",
                          rules: _vm.newAccount.rules.passwordConfirm
                        },
                        model: {
                          value: _vm.newAccount.passwordConfirm,
                          callback: function($$v) {
                            _vm.$set(_vm.newAccount, "passwordConfirm", $$v)
                          },
                          expression: "newAccount.passwordConfirm"
                        }
                      })
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _vm.newAccount.user_type === "user"
                    ? _c(
                        "v-col",
                        {
                          staticClass: "pt-1 pb-1",
                          attrs: { cols: "12", md: "4", sm: "6" }
                        },
                        [
                          _c("v-select", {
                            attrs: {
                              items: _vm.AppStore.state.principals,
                              "item-text": "name",
                              "item-value": "id",
                              label: "Designated Principals",
                              multiple: "",
                              dense: "",
                              outlined: ""
                            },
                            model: {
                              value: _vm.newAccount.selected_principals,
                              callback: function($$v) {
                                _vm.$set(
                                  _vm.newAccount,
                                  "selected_principals",
                                  $$v
                                )
                              },
                              expression: "newAccount.selected_principals"
                            }
                          })
                        ],
                        1
                      )
                    : _vm._e()
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-row",
                { staticClass: "pa-0" },
                [
                  _c("v-col", [
                    _c(
                      "div",
                      { staticClass: "float-right" },
                      [
                        _c(
                          "v-btn",
                          {
                            attrs: {
                              color: "primary",
                              dense: "",
                              smallx: "",
                              outlinedx: "",
                              loading: _vm.savingNewUser,
                              roundedx: ""
                            },
                            on: {
                              click: function($event) {
                                return _vm.saveNewUser()
                              }
                            }
                          },
                          [
                            _vm._v(
                              "\n                            Save\n                        "
                            )
                          ]
                        )
                      ],
                      1
                    )
                  ])
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

/***/ "./resources/js/pages/ManageAccounts/AccountsAdd.vue":
/*!***********************************************************!*\
  !*** ./resources/js/pages/ManageAccounts/AccountsAdd.vue ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AccountsAdd_vue_vue_type_template_id_1f6d23e0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AccountsAdd.vue?vue&type=template&id=1f6d23e0& */ "./resources/js/pages/ManageAccounts/AccountsAdd.vue?vue&type=template&id=1f6d23e0&");
/* harmony import */ var _AccountsAdd_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AccountsAdd.vue?vue&type=script&lang=js& */ "./resources/js/pages/ManageAccounts/AccountsAdd.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _AccountsAdd_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AccountsAdd_vue_vue_type_template_id_1f6d23e0___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AccountsAdd_vue_vue_type_template_id_1f6d23e0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/ManageAccounts/AccountsAdd.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/ManageAccounts/AccountsAdd.vue?vue&type=script&lang=js&":
/*!************************************************************************************!*\
  !*** ./resources/js/pages/ManageAccounts/AccountsAdd.vue?vue&type=script&lang=js& ***!
  \************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AccountsAdd_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./AccountsAdd.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/ManageAccounts/AccountsAdd.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AccountsAdd_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/ManageAccounts/AccountsAdd.vue?vue&type=template&id=1f6d23e0&":
/*!******************************************************************************************!*\
  !*** ./resources/js/pages/ManageAccounts/AccountsAdd.vue?vue&type=template&id=1f6d23e0& ***!
  \******************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AccountsAdd_vue_vue_type_template_id_1f6d23e0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./AccountsAdd.vue?vue&type=template&id=1f6d23e0& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/ManageAccounts/AccountsAdd.vue?vue&type=template&id=1f6d23e0&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AccountsAdd_vue_vue_type_template_id_1f6d23e0___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AccountsAdd_vue_vue_type_template_id_1f6d23e0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=32.js.map