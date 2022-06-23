"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.haveToken = haveToken;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function haveToken(_x, _x2, _x3) {
  return _haveToken.apply(this, arguments);
}

function _haveToken() {
  _haveToken = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var token;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            token = req.cookies.token;

            if (token) {
              res.redirect('/link-chest');
            }

            next();

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _haveToken.apply(this, arguments);
}