"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _verifyToken = require("../middleware/verify-token.js");

var _linkController = require("../controller/link-controller.js");

var _viewsController = _interopRequireDefault(require("../controller/views-controller"));

var vista = new _viewsController["default"]();
var controladorLink = new _linkController.ControladorDeLink();
var router = (0, _express.Router)(); //Todos los links

router.get('/', _verifyToken.verifyToken, vista.mainVista);
router.get('/link-chest', _verifyToken.verifyToken, vista.mainVista); //Agregar link

router.get('/link-chest/agregar-link', _verifyToken.verifyToken, vista.agregarVista);
router.post('/link-chest/agregar-link', _verifyToken.verifyToken, controladorLink.agregarLink); //Editar link

router.get('/link-chest/editar-link/:id', _verifyToken.verifyToken, vista.editarVista);
router.put('/link-chest/editar-link/:id', _verifyToken.verifyToken, controladorLink.editarLink); //Eliminar link

router.get('/link-chest/eliminar-link/:id', _verifyToken.verifyToken, vista.eliminarVista);
router["delete"]('/link-chest/eliminar-link/:id', _verifyToken.verifyToken, controladorLink.eliminarLink); //Links compartidos
//Compartir link

router.patch('/link-chest/compartir-link/:id', _verifyToken.verifyToken, controladorLink.compartirLink);
router.patch('/link-chest/no-compartir-link/:id', _verifyToken.verifyToken, controladorLink.noCompartirLink);
router.get('/link-chest/links-compartidos', _verifyToken.verifyToken, vista.linkCompartidosVista);
router.post('/link-chest/guardar-link-compartido/:id', _verifyToken.verifyToken, controladorLink.guardarLinkCompartido); //Error

router.get('/link-chest/error', function (req, res) {
  res.render('error');
});
var _default = router;
exports["default"] = _default;