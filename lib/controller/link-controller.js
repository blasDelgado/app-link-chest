"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ControladorDeLink = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _linkModel = _interopRequireDefault(require("../model/link-model.js"));

var _userModel = _interopRequireDefault(require("../model/user-model"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = require("../config.js");

var ControladorDeLink = /*#__PURE__*/function () {
  function ControladorDeLink() {
    (0, _classCallCheck2["default"])(this, ControladorDeLink);
  }

  (0, _createClass2["default"])(ControladorDeLink, [{
    key: "agregarLink",
    value: function () {
      var _agregarLink = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var _req$body, name, url, description, userId, user, userName, newLink;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, name = _req$body.name, url = _req$body.url, description = _req$body.description;
                userId = _jsonwebtoken["default"].verify(req.cookies.token, _config.token_crypt).id;
                _context.prev = 2;
                _context.next = 5;
                return _userModel["default"].findById(userId).lean();

              case 5:
                user = _context.sent;
                userName = user.user;
                newLink = new _linkModel["default"]({
                  name: name,
                  url: url,
                  description: description,
                  user_id: userId,
                  user_name: userName
                });
                _context.next = 10;
                return newLink.save();

              case 10:
                res.redirect('/link-chest');
                _context.next = 17;
                break;

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](2);
                res.redirect('error');
                console.error(_context.t0);

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 13]]);
      }));

      function agregarLink(_x, _x2) {
        return _agregarLink.apply(this, arguments);
      }

      return agregarLink;
    }()
  }, {
    key: "editarLink",
    value: function () {
      var _editarLink = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var _req$body2, name, url, description;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _req$body2 = req.body, name = _req$body2.name, url = _req$body2.url, description = _req$body2.description;
                _context2.prev = 1;
                _context2.next = 4;
                return _linkModel["default"].findByIdAndUpdate(req.params.id, {
                  name: name,
                  url: url,
                  description: description,
                  user: _jsonwebtoken["default"].verify(req.cookies.token, _config.token_crypt).id
                });

              case 4:
                req.flash('mensaje', 'link editado con éxito');
                res.redirect('/link-chest');
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

      function editarLink(_x3, _x4) {
        return _editarLink.apply(this, arguments);
      }

      return editarLink;
    }()
  }, {
    key: "eliminarLink",
    value: function () {
      var _eliminarLink = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _linkModel["default"].findByIdAndDelete(req.params.id);

              case 3:
                req.flash('mensaje', 'link eliminado con éxito');
                res.redirect('/link-chest');
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

      function eliminarLink(_x5, _x6) {
        return _eliminarLink.apply(this, arguments);
      }

      return eliminarLink;
    }()
  }, {
    key: "compartirLink",
    value: function () {
      var _compartirLink = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var linkId;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                linkId = req.params.id;
                _context4.prev = 1;
                _context4.next = 4;
                return _linkModel["default"].findByIdAndUpdate(linkId, {
                  share: true
                });

              case 4:
                req.flash('mensaje', 'link compartido con éxito');
                res.redirect('/link-chest');
                _context4.next = 13;
                break;

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](1);
                console.error(_context4.t0);
                req.flash('mensaje', 'ocurrió un problema, no se pudo compartir este link');
                res.redirect('/link-chest');

              case 13:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[1, 8]]);
      }));

      function compartirLink(_x7, _x8) {
        return _compartirLink.apply(this, arguments);
      }

      return compartirLink;
    }()
  }, {
    key: "noCompartirLink",
    value: function () {
      var _noCompartirLink = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var linkId;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                linkId = req.params.id;
                _context5.prev = 1;
                _context5.next = 4;
                return _linkModel["default"].findByIdAndUpdate(linkId, {
                  share: false
                });

              case 4:
                req.flash('mensaje', 'este link ya no se comparte más');
                res.redirect('/link-chest');
                _context5.next = 13;
                break;

              case 8:
                _context5.prev = 8;
                _context5.t0 = _context5["catch"](1);
                console.error(_context5.t0);
                req.flash('mensaje', 'ocurrió un problema inesperado');
                res.redirect('/link-chest');

              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[1, 8]]);
      }));

      function noCompartirLink(_x9, _x10) {
        return _noCompartirLink.apply(this, arguments);
      }

      return noCompartirLink;
    }()
  }, {
    key: "guardarLinkCompartido",
    value: function () {
      var _guardarLinkCompartido = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
        var linkId, userId, userQueLoGuarda, _yield$link$findById, name, url, description, userIdQueLoGuarda, userNameQueLoGuarda, newLink;

        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                linkId = req.params.id;
                userId = _jsonwebtoken["default"].verify(req.cookies.token, _config.token_crypt).id;
                _context6.prev = 2;
                _context6.next = 5;
                return _userModel["default"].findById(userId);

              case 5:
                userQueLoGuarda = _context6.sent;
                _context6.next = 8;
                return _linkModel["default"].findById(linkId);

              case 8:
                _yield$link$findById = _context6.sent;
                name = _yield$link$findById.name;
                url = _yield$link$findById.url;
                description = _yield$link$findById.description;
                userIdQueLoGuarda = userQueLoGuarda._id;
                userNameQueLoGuarda = userQueLoGuarda.user;
                newLink = new _linkModel["default"]({
                  name: name,
                  url: url,
                  description: description,
                  user_id: userIdQueLoGuarda,
                  user_name: userNameQueLoGuarda
                });
                _context6.next = 17;
                return newLink.save();

              case 17:
                req.flash('mensaje', 'link guardado con éxito');
                res.redirect('/link-chest/links-compartidos');
                _context6.next = 25;
                break;

              case 21:
                _context6.prev = 21;
                _context6.t0 = _context6["catch"](2);
                res.render('error');
                console.error(_context6.t0);

              case 25:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[2, 21]]);
      }));

      function guardarLinkCompartido(_x11, _x12) {
        return _guardarLinkCompartido.apply(this, arguments);
      }

      return guardarLinkCompartido;
    }()
  }]);
  return ControladorDeLink;
}();

exports.ControladorDeLink = ControladorDeLink;