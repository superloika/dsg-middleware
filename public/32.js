(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[32],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/ManageAccounts/AccountsEditPassword.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/ManageAccounts/AccountsEditPassword.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    var _this = this;

    return {
      frmEditPw: false,
      account: {
        id: this.ManageAccounts.state.toEdit.id,
        // old_password_hashed: this.ManageAccounts.state.toEdit.old_password_hashed,
        old_password: '',
        password: '',
        password_confirmation: '',
        rules: {
          old_password: [function (v) {
            return !!v || "Old password is required.";
          }],
          password: [function (v) {
            return !!v || "Password is required.";
          }, function (v) {
            return v.length >= 5 || "Password must be 5 characters or above.";
          }],
          password_confirmation: [function (v) {
            return !!v || "Please confirm your password.";
          }, function (v) {
            return v === _this.account.password || "Password confirmation is incorrect.";
          }]
        }
      },
      updatingPassword: false,
      errMsgs: [],
      errMsgsShown: false,
      errorMsgs: {}
    };
  },
  watch: {},
  methods: {
    updatePassword: function updatePassword() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var url, payload, response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!_this2.$refs.form.validate()) {
                  _context.next = 16;
                  break;
                }

                url = "".concat(_this2.AppStore.state.siteUrl, "accounts/update-password");
                payload = {
                  _method: "PATCH",
                  id: _this2.account.id,
                  // old_password_hashed: this.account.old_password_hashed,
                  old_password: _this2.account.old_password,
                  password: _this2.account.password,
                  password_confirmation: _this2.account.password_confirmation
                };
                _context.prev = 3;
                _this2.updatingPassword = true;
                _context.next = 7;
                return axios.post(url, payload);

              case 7:
                response = _context.sent;

                if (response.data == true) {
                  if (_this2.$route.meta.name === 'Account') {
                    location.reload();
                  }

                  _this2.ManageAccounts.initUsers();

                  _this2.ManageAccounts.state.modalEditIsOpen = false;

                  _this2.AppStore.toast("Password updated", 1500);
                } else if (response.data.invalidations != undefined || response.data.invalidations != null) {
                  _this2.errMsgs = [];
                  _this2.errorMsgs = {};
                  _this2.errorMsgs = response.data.invalidations;
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
                _this2.updatingPassword = false;

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[3, 11]]);
      }))();
    }
  },
  mounted: function mounted() {
    console.log('AccountsEditPassword component mounted');
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/ManageAccounts/AccountsEditPassword.vue?vue&type=template&id=0f82d596&":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/ManageAccounts/AccountsEditPassword.vue?vue&type=template&id=0f82d596& ***!
  \*********************************************************************************************************************************************************************************************************************************/
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
    "v-container",
    [
      _c(
        "v-form",
        {
          ref: "form",
          model: {
            value: _vm.frmEditPw,
            callback: function($$v) {
              _vm.frmEditPw = $$v
            },
            expression: "frmEditPw"
          }
        },
        [
          _c(
            "v-row",
            [
              _c(
                "v-col",
                { attrs: { cols: "12", md: "4", sm: "6" } },
                [
                  _c("v-text-field", {
                    attrs: {
                      outlined: "",
                      dense: "",
                      text: "",
                      label: "Old Password *",
                      required: "",
                      type: "password",
                      rules: _vm.account.rules.old_password,
                      error:
                        _vm.errorMsgs.old_password != undefined ? true : false,
                      "error-messages":
                        _vm.errorMsgs.old_password != undefined
                          ? _vm.errorMsgs.old_password
                          : []
                    },
                    model: {
                      value: _vm.account.old_password,
                      callback: function($$v) {
                        _vm.$set(_vm.account, "old_password", $$v)
                      },
                      expression: "account.old_password"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "12", md: "4", sm: "6" } },
                [
                  _c("v-text-field", {
                    attrs: {
                      outlined: "",
                      dense: "",
                      text: "",
                      label: "New Password *",
                      required: "",
                      type: "password",
                      rules: _vm.account.rules.password,
                      error: _vm.errorMsgs.password != undefined ? true : false,
                      "error-messages":
                        _vm.errorMsgs.password != undefined
                          ? _vm.errorMsgs.password
                          : []
                    },
                    model: {
                      value: _vm.account.password,
                      callback: function($$v) {
                        _vm.$set(_vm.account, "password", $$v)
                      },
                      expression: "account.password"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-col",
                { attrs: { cols: "12", md: "4", sm: "6" } },
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
                      rules: _vm.account.rules.password_confirmation
                    },
                    model: {
                      value: _vm.account.password_confirmation,
                      callback: function($$v) {
                        _vm.$set(_vm.account, "password_confirmation", $$v)
                      },
                      expression: "account.password_confirmation"
                    }
                  })
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-row",
            { staticClass: "pt-0 pb-0", attrs: { "background-color": "red" } },
            [
              _c(
                "v-col",
                {
                  staticClass: "pt-0 pb-0",
                  attrs: { "background-color": "red" }
                },
                [
                  _c(
                    "v-btn",
                    {
                      staticClass:
                        "float-lg-right float-md-right float-sm-right",
                      attrs: {
                        color: "primary",
                        loading: _vm.updatingPassword,
                        outlinedx: "",
                        smallx: "",
                        roundedx: ""
                      },
                      on: {
                        click: function($event) {
                          return _vm.updatePassword()
                        }
                      }
                    },
                    [
                      _vm._v(
                        "\n                    Update Password\n                "
                      )
                    ]
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

/***/ "./resources/js/pages/ManageAccounts/AccountsEditPassword.vue":
/*!********************************************************************!*\
  !*** ./resources/js/pages/ManageAccounts/AccountsEditPassword.vue ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AccountsEditPassword_vue_vue_type_template_id_0f82d596___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AccountsEditPassword.vue?vue&type=template&id=0f82d596& */ "./resources/js/pages/ManageAccounts/AccountsEditPassword.vue?vue&type=template&id=0f82d596&");
/* harmony import */ var _AccountsEditPassword_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AccountsEditPassword.vue?vue&type=script&lang=js& */ "./resources/js/pages/ManageAccounts/AccountsEditPassword.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _AccountsEditPassword_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AccountsEditPassword_vue_vue_type_template_id_0f82d596___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AccountsEditPassword_vue_vue_type_template_id_0f82d596___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/ManageAccounts/AccountsEditPassword.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/ManageAccounts/AccountsEditPassword.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************!*\
  !*** ./resources/js/pages/ManageAccounts/AccountsEditPassword.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AccountsEditPassword_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./AccountsEditPassword.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/ManageAccounts/AccountsEditPassword.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AccountsEditPassword_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/ManageAccounts/AccountsEditPassword.vue?vue&type=template&id=0f82d596&":
/*!***************************************************************************************************!*\
  !*** ./resources/js/pages/ManageAccounts/AccountsEditPassword.vue?vue&type=template&id=0f82d596& ***!
  \***************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AccountsEditPassword_vue_vue_type_template_id_0f82d596___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./AccountsEditPassword.vue?vue&type=template&id=0f82d596& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/ManageAccounts/AccountsEditPassword.vue?vue&type=template&id=0f82d596&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AccountsEditPassword_vue_vue_type_template_id_0f82d596___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AccountsEditPassword_vue_vue_type_template_id_0f82d596___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=32.js.map