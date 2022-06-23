"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _linkModel = _interopRequireDefault(require("../model/link-model.js"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = require("../config.js");

var _userModel = _interopRequireDefault(require("../model/user-model.js"));

var ControladorDeVista = /*#__PURE__*/function () {
  function ControladorDeVista() {
    (0, _classCallCheck2["default"])(this, ControladorDeVista);
  }

  (0, _createClass2["default"])(ControladorDeVista, [{
    key: "mainVista",
    value: //Links Vista
    function () {
      var _mainVista = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var userId, links;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                userId = _jsonwebtoken["default"].verify(req.cookies.token, _config.token_crypt).id;
                _context.next = 4;
                return _linkModel["default"].find({
                  user_id: userId
                }).lean();

              case 4:
                links = _context.sent;
                res.render('main-cards', {
                  links: links
                });
                _context.next = 12;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                console.error(_context.t0);
                res.render('error');

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 8]]);
      }));

      function mainVista(_x, _x2) {
        return _mainVista.apply(this, arguments);
      }

      return mainVista;
    }()
  }, {
    key: "agregarVista",
    value: function agregarVista(req, res) {
      res.render('agregar-link');
    }
  }, {
    key: "editarVista",
    value: function () {
      var _editarVista = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var id, links;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                id = req.params.id;
                _context2.prev = 1;
                _context2.next = 4;
                return _linkModel["default"].findById(id).lean();

              case 4:
                links = _context2.sent;
                res.render('editar-link', {
                  links: links
                });
                _context2.next = 12;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](1);
                console.error(_context2.t0);
                res.render('error');

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 8]]);
      }));

      function editarVista(_x3, _x4) {
        return _editarVista.apply(this, arguments);
      }

      return editarVista;
    }()
  }, {
    key: "eliminarVista",
    value: function () {
      var _eliminarVista = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var links;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _linkModel["default"].findById(req.params.id).lean();

              case 3:
                links = _context3.sent;
                res.render('eliminar-link', {
                  links: links
                });
                _context3.next = 11;
                break;

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);
                console.error(_context3.t0);
                res.render('error');

              case 11:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 7]]);
      }));

      function eliminarVista(_x5, _x6) {
        return _eliminarVista.apply(this, arguments);
      }

      return eliminarVista;
    }() //Link compartidos

  }, {
    key: "linkCompartidosVista",
    value: function () {
      var _linkCompartidosVista = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var id, todosLosLinks, links;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                id = _jsonwebtoken["default"].verify(req.cookies.token, _config.token_crypt).id;
                _context4.prev = 1;
                _context4.next = 4;
                return _linkModel["default"].find({
                  share: true
                }).lean();

              case 4:
                todosLosLinks = _context4.sent;
                links = todosLosLinks.filter(function (link) {
                  if (link.user_id != id) return true;
                });
                res.render('link-compartidos', {
                  links: links
                });
                _context4.next = 13;
                break;

              case 9:
                _context4.prev = 9;
                _context4.t0 = _context4["catch"](1);
                console.error(_context4.t0);
                res.render('error');

              case 13:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 9]]);
      }));

      function linkCompartidosVista(_x7, _x8) {
        return _linkCompartidosVista.apply(this, arguments);
      }

      return linkCompartidosVista;
    }() //Login Vista

  }, {
    key: "vistaLogin",
    value: function vistaLogin(req, res) {
      res.render('login');
    }
  }, {
    key: "vistaSignup",
    value: function vistaSignup(req, res) {
      res.render('signup');
    } //Perfil Vista

  }, {
    key: "vistaPerfil",
    value: function vistaPerfil(req, res) {
      res.render('perfil');
    }
  }, {
    key: "vistaEditarUsuario",
    value: function () {
      var _vistaEditarUsuario = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var id, usuario;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                id = _jsonwebtoken["default"].verify(req.cookies.token, _config.token_crypt).id;
                _context5.prev = 1;
                _context5.next = 4;
                return _userModel["default"].findById(id).lean();

              case 4:
                usuario = _context5.sent;
                res.render('editar-usuario', {
                  usuario: usuario
                });
                _context5.next = 12;
                break;

              case 8:
                _context5.prev = 8;
                _context5.t0 = _context5["catch"](1);
                console.error(_context5.t0);
                res.render('error');

              case 12:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[1, 8]]);
      }));

      function vistaEditarUsuario(_x9, _x10) {
        return _vistaEditarUsuario.apply(this, arguments);
      }

      return vistaEditarUsuario;
    }()
  }, {
    key: "vistaEliminarPerfil",
    value: function vistaEliminarPerfil(req, res) {
      res.render('eliminar-perfil');
    }
  }]);
  return ControladorDeVista;
}();

exports["default"] = ControladorDeVista;