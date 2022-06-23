"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _haveToken = require("../middleware/have-token.js");

var _loginController = _interopRequireDefault(require("../controller/login-controller.js"));

var _viewsController = _interopRequireDefault(require("../controller/views-controller"));

var router = (0, _express.Router)();
var vista = new _viewsController["default"]();
var controladorLogin = new _loginController["default"]();
router.get('/login', _haveToken.haveToken, vista.vistaLogin);
router.post('/login', _haveToken.haveToken, controladorLogin.login);
router.get('/signup', _haveToken.haveToken, vista.vistaSignup);
router.post('/signup', _haveToken.haveToken, controladorLogin.signup);
router.get('/logout', controladorLogin.logout);
var _default = router;
exports["default"] = _default;