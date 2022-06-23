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

var _userModel = _interopRequireDefault(require("../model/user-model.js"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _response = require("express/lib/response.js");

var _config = require("../config.js");

var ControladorLogin = /*#__PURE__*/function () {
  function ControladorLogin() {
    (0, _classCallCheck2["default"])(this, ControladorLogin);
  }

  (0, _createClass2["default"])(ControladorLogin, [{
    key: "login",
    value: function () {
      var _login = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var _req$body, username, password, passwordV, user, token;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _req$body = req.body, username = _req$body.username, password = _req$body.password;
                _context.prev = 1;
                _context.next = 4;
                return _userModel["default"].findOne({
                  user: username
                });

              case 4:
                user = _context.sent;

                if (!user) {
                  _context.next = 9;
                  break;
                }

                _context.next = 8;
                return user.comparePassword(password, user.password);

              case 8:
                passwordV = _context.sent;

              case 9:
                if (user == null) {
                  req.flash('mensaje', 'El Usuario no existe');
                  res.redirect('/login');
                } else if (passwordV == false) {
                  req.flash('mensaje', 'El password es incorrecto');
                  res.redirect('/login');
                } else {
                  token = _jsonwebtoken["default"].sign({
                    id: user._id
                  }, _config.token_crypt, {
                    expiresIn: 60 * 60 * 24
                  });
                  res.cookie('token', token, {
                    httpOnly: true
                  });
                  res.redirect('/link-chest');
                }

                _context.next = 16;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](1);
                console.error(_context.t0);
                res.redirect('/login');

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 12]]);
      }));

      function login(_x, _x2) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }, {
    key: "signup",
    value: function () {
      var _signup = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var _req$body2, username, email, password, usuarioExiste, emailExiste, user1, token;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _req$body2 = req.body, username = _req$body2.username, email = _req$body2.email, password = _req$body2.password;
                _context2.prev = 1;
                _context2.next = 4;
                return _userModel["default"].findOne({
                  user: username
                });

              case 4:
                usuarioExiste = _context2.sent;
                _context2.next = 7;
                return _userModel["default"].findOne({
                  email: email
                });

              case 7:
                emailExiste = _context2.sent;

                if (!usuarioExiste) {
                  _context2.next = 13;
                  break;
                }

                req.flash('mensaje', 'El Usuario ya existe');
                res.redirect('/signup');
                _context2.next = 26;
                break;

              case 13:
                if (!emailExiste) {
                  _context2.next = 18;
                  break;
                }

                req.flash('mensaje', 'El email ya existe');
                res.redirect('/signup');
                _context2.next = 26;
                break;

              case 18:
                user1 = new _userModel["default"]({
                  user: username,
                  email: email,
                  password: password
                });
                _context2.next = 21;
                return user1.encryptPassword(password);

              case 21:
                user1.password = _context2.sent;
                _context2.next = 24;
                return user1.save();

              case 24:
                token = _jsonwebtoken["default"].sign({
                  id: user1._id
                }, _config.token_crypt, {
                  expiresIn: 60 * 60 * 24
                });
                res.cookie('token', token, {
                  httpOnly: true
                });

              case 26:
                res.redirect('/link-chest');
                _context2.next = 33;
                break;

              case 29:
                _context2.prev = 29;
                _context2.t0 = _context2["catch"](1);
                console.error(_context2.t0);
                res.render('error');

              case 33:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 29]]);
      }));

      function signup(_x3, _x4) {
        return _signup.apply(this, arguments);
      }

      return signup;
    }()
  }, {
    key: "logout",
    value: function logout(req, res) {
      res.clearCookie('token');
      res.redirect('/login');
    }
  }]);
  return ControladorLogin;
}();

exports["default"] = ControladorLogin;