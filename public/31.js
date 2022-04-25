(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[31],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/ManageAccounts/AccountsEditProfile.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/ManageAccounts/AccountsEditProfile.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************/
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
/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    var _this = this;

    return {
      nameRegex: /^[a-zA-Z\s]+$/,
      usernameRegex: /^[a-zA-Z0-9]+$/,
      frm_edit_profile: false,
      account: {
        id: this.ManageAccounts.state.toEdit.id,
        name: this.ManageAccounts.state.toEdit.name,
        old_username: this.ManageAccounts.state.toEdit.old_username,
        username: this.ManageAccounts.state.toEdit.username,
        user_type: this.ManageAccounts.state.toEdit.user_type,
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
          user_type: [function (v) {
            return !!v || "User type is required";
          }]
        }
      },
      updatingProfile: false,
      errMsgs: [],
      errMsgsShown: false,
      errorMsgs: {}
    };
  },
  watch: {
    "account.name": function accountName() {
      this.account.name = this.account.name.replace("  ", " ").trim();
    }
  },
  methods: {
    updateProfile: function updateProfile() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var vm, url, payload, response;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                vm = _this2;

                if (!_this2.$refs.frm_edit_profile.validate()) {
                  _context.next = 17;
                  break;
                }

                url = "".concat(_this2.AppStore.state.siteUrl, "accounts/update-profile");
                payload = {
                  _method: "PATCH",
                  id: vm.account.id,
                  name: vm.account.name,
                  old_username: vm.account.old_username,
                  username: vm.account.username,
                  user_type: vm.account.user_type
                };
                _context.prev = 4;
                _this2.updatingProfile = true;
                _context.next = 8;
                return axios.post(url, payload);

              case 8:
                response = _context.sent;

                if (response.data == true) {
                  if (_this2.$route.meta.name === 'Account') {
                    location.reload();
                  } // temp
                  // this.ManageAccounts.state.toEdit.name = vm.account.name;
                  // this.ManageAccounts.state.toEdit.old_username =
                  //     vm.account.username;
                  // this.ManageAccounts.state.toEdit.username =
                  //     vm.account.username;
                  // this.ManageAccounts.state.toEdit.user_type =
                  //     vm.account.user_type;


                  _this2.ManageAccounts.initUsers(); // this.ManageAccounts.state.modalEditIsOpen = false;


                  _this2.AppStore.toast("Account updated", 2000);
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

                _context.next = 16;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](4);
                console.log(_context.t0);

                _this2.AppStore.toast(_context.t0, 3000);

              case 16:
                _this2.updatingProfile = false;

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[4, 12]]);
      }))();
    }
  },
  mounted: function mounted() {
    console.log('AccountsEditProfile component mounted');
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/ManageAccounts/AccountsEditProfile.vue?vue&type=template&id=4c00497e&":
/*!********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/ManageAccounts/AccountsEditProfile.vue?vue&type=template&id=4c00497e& ***!
  \********************************************************************************************************************************************************************************************************************************/
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
          ref: "frm_edit_profile",
          model: {
            value: _vm.frm_edit_profile,
            callback: function($$v) {
              _vm.frm_edit_profile = $$v
            },
            expression: "frm_edit_profile"
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
                      label: "Name *",
                      required: "",
                      rules: _vm.account.rules.name,
                      error: _vm.errorMsgs.name != undefined ? true : false,
                      "error-messages":
                        _vm.errorMsgs.name != undefined
                          ? _vm.errorMsgs.name
                          : []
                    },
                    model: {
                      value: _vm.account.name,
                      callback: function($$v) {
                        _vm.$set(_vm.account, "name", $$v)
                      },
                      expression: "account.name"
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
                      label: "Username *",
                      required: "",
                      rules: _vm.account.rules.username,
                      error: _vm.errorMsgs.username != undefined ? true : false,
                      "error-messages":
                        _vm.errorMsgs.username != undefined
                          ? _vm.errorMsgs.username
                          : []
                    },
                    model: {
                      value: _vm.account.username,
                      callback: function($$v) {
                        _vm.$set(_vm.account, "username", $$v)
                      },
                      expression: "account.username"
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
                  _c("v-select", {
                    attrs: {
                      items: _vm.AppStore.state.userTypes,
                      outlined: "",
                      dense: "",
                      text: "",
                      label: "User Type",
                      required: "",
                      rules: _vm.account.rules.user_type,
                      error:
                        _vm.errorMsgs.user_type != undefined ? true : false,
                      "error-messages":
                        _vm.errorMsgs.user_type != undefined
                          ? _vm.errorMsgs.user_type
                          : [],
                      disabled: _vm.account.id == _vm.AuthUser.id
                    },
                    model: {
                      value: _vm.account.user_type,
                      callback: function($$v) {
                        _vm.$set(_vm.account, "user_type", $$v)
                      },
                      expression: "account.user_type"
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
                        loading: _vm.updatingProfile,
                        outlinedx: "",
                        smallx: "",
                        roundedx: ""
                      },
                      on: {
                        click: function($event) {
                          return _vm.updateProfile()
                        }
                      }
                    },
                    [
                      _vm._v(
                        "\n                    Update Profile\n                "
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

/***/ "./resources/js/pages/ManageAccounts/AccountsEditProfile.vue":
/*!*******************************************************************!*\
  !*** ./resources/js/pages/ManageAccounts/AccountsEditProfile.vue ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _AccountsEditProfile_vue_vue_type_template_id_4c00497e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AccountsEditProfile.vue?vue&type=template&id=4c00497e& */ "./resources/js/pages/ManageAccounts/AccountsEditProfile.vue?vue&type=template&id=4c00497e&");
/* harmony import */ var _AccountsEditProfile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AccountsEditProfile.vue?vue&type=script&lang=js& */ "./resources/js/pages/ManageAccounts/AccountsEditProfile.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _AccountsEditProfile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _AccountsEditProfile_vue_vue_type_template_id_4c00497e___WEBPACK_IMPORTED_MODULE_0__["render"],
  _AccountsEditProfile_vue_vue_type_template_id_4c00497e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/ManageAccounts/AccountsEditProfile.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/ManageAccounts/AccountsEditProfile.vue?vue&type=script&lang=js&":
/*!********************************************************************************************!*\
  !*** ./resources/js/pages/ManageAccounts/AccountsEditProfile.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AccountsEditProfile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib??ref--4-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./AccountsEditProfile.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/ManageAccounts/AccountsEditProfile.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AccountsEditProfile_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/ManageAccounts/AccountsEditProfile.vue?vue&type=template&id=4c00497e&":
/*!**************************************************************************************************!*\
  !*** ./resources/js/pages/ManageAccounts/AccountsEditProfile.vue?vue&type=template&id=4c00497e& ***!
  \**************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AccountsEditProfile_vue_vue_type_template_id_4c00497e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib??vue-loader-options!./AccountsEditProfile.vue?vue&type=template&id=4c00497e& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/ManageAccounts/AccountsEditProfile.vue?vue&type=template&id=4c00497e&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AccountsEditProfile_vue_vue_type_template_id_4c00497e___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_AccountsEditProfile_vue_vue_type_template_id_4c00497e___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);
//# sourceMappingURL=31.js.map