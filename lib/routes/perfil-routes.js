"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _verifyToken = require("../middleware/verify-token.js");

var _perfilController = require("../controller/perfil-controller");

var _viewsController = _interopRequireDefault(require("../controller/views-controller"));

var vista = new _viewsController["default"]();
var controladorPerfil = new _perfilController.ControladorDePerfil();
var router = (0, _express.Router)();
router.get('/link-chest/perfil', _verifyToken.verifyToken, vista.vistaPerfil);
router.get('/link-chest/perfil/editar-usuario', _verifyToken.verifyToken, vista.vistaEditarUsuario);
router.patch('/link-chest/perfil/editar-usuario', _verifyToken.verifyToken, controladorPerfil.editarUsuario);
router.get('/link-chest/perfil/eliminar-usuario', _verifyToken.verifyToken, vista.vistaEliminarPerfil);
router["delete"]('/link-chest/perfil/eliminar-usuario', _verifyToken.verifyToken, controladorPerfil.eliminarCuenta);
var _default = router;
exports["default"] = _default;