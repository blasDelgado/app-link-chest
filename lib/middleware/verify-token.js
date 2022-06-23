"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = verifyToken;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _userModel = _interopRequireDefault(require("../model/user-model.js"));

var _config = require("../config.js");

function verifyToken(_x, _x2, _x3) {
  return _verifyToken.apply(this, arguments);
}

function _verifyToken() {
  _verifyToken = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var token, userId, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = req.cookies.token;

            if (token) {
              _context.next = 5;
              break;
            }

            res.redirect('/login');
            _context.next = 18;
            break;

          case 5:
            _context.prev = 5;
            userId = _jsonwebtoken["default"].verify(token, _config.token_crypt).id;
            _context.next = 9;
            return _userModel["default"].findById(userId, {
              password: 0
            });

          case 9:
            user = _context.sent;

            if (!user) {
              res.redirect('/login');
              req.flash('mensaje', 'token');
            } else {
              next();
            }

            _context.next = 18;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](5);
            console.error('no se pudo verificar el token');
            res.clearCookie('token');
            res.redirect('/login');

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5, 13]]);
  }));
  return _verifyToken.apply(this, arguments);
}