'use strict';

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.ControladorDePerfil = void 0;

var _regenerator = _interopRequireDefault(
  require('@babel/runtime/regenerator')
);

var _asyncToGenerator2 = _interopRequireDefault(
  require('@babel/runtime/helpers/asyncToGenerator')
);

var _classCallCheck2 = _interopRequireDefault(
  require('@babel/runtime/helpers/classCallCheck')
);

var _createClass2 = _interopRequireDefault(
  require('@babel/runtime/helpers/createClass')
);

var _userModel = _interopRequireDefault(require('../model/user-model.js'));

var _linkModel = _interopRequireDefault(require('../model/link-model.js'));

var _jsonwebtoken = _interopRequireDefault(require('jsonwebtoken'));

var _response = require('express/lib/response.js');

var _config = require('../config.js');

var encriptador = new _userModel['default']();

var ControladorDePerfil = /*#__PURE__*/ (function () {
  function ControladorDePerfil() {
    (0, _classCallCheck2['default'])(this, ControladorDePerfil);
  }

  (0, _createClass2['default'])(ControladorDePerfil, [
    {
      key: 'editarUsuario',
      value: (function () {
        var _editarUsuario = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee(
            req,
            res
          ) {
            var _req$body, password, nuevoPassword, userId, user, valido;

            return _regenerator['default'].wrap(
              function _callee$(_context) {
                while (1) {
                  switch ((_context.prev = _context.next)) {
                    case 0:
                      (_req$body = req.body),
                        (password = _req$body.password),
                        (nuevoPassword = _req$body.nuevoPassword);
                      userId = _jsonwebtoken['default'].verify(
                        req.cookies.token,
                        _config.token_crypt
                      ).id;
                      _context.prev = 2;
                      _context.next = 5;
                      return _userModel['default'].findOne({
                        _id: userId,
                      });

                    case 5:
                      user = _context.sent;
                      _context.next = 8;
                      return user.comparePassword(password, user.password);

                    case 8:
                      valido = _context.sent;
                      console.log(user._id);

                      if (!(valido == true)) {
                        _context.next = 22;
                        break;
                      }

                      _context.t0 = _userModel['default'];
                      _context.t1 = user._id;
                      _context.next = 15;
                      return encriptador.encryptPassword(nuevoPassword);

                    case 15:
                      _context.t2 = _context.sent;
                      _context.t3 = {
                        password: _context.t2,
                      };
                      _context.next = 19;
                      return _context.t0.findByIdAndUpdate.call(
                        _context.t0,
                        _context.t1,
                        _context.t3
                      );

                    case 19:
                      res.redirect('/link-chest/perfil');
                      _context.next = 24;
                      break;

                    case 22:
                      req.flash('mensaje', 'El password es incorrecto');
                      res.redirect('/link-chest/perfil/editar-usuario');

                    case 24:
                      _context.next = 30;
                      break;

                    case 26:
                      _context.prev = 26;
                      _context.t4 = _context['catch'](2);
                      console.error(_context.t4);
                      res.render('error');

                    case 30:
                    case 'end':
                      return _context.stop();
                  }
                }
              },
              _callee,
              null,
              [[2, 26]]
            );
          })
        );

        function editarUsuario(_x, _x2) {
          return _editarUsuario.apply(this, arguments);
        }

        return editarUsuario;
      })(),
    },
    {
      key: 'eliminarCuenta',
      value: (function () {
        var _eliminarCuenta = (0, _asyncToGenerator2['default'])(
          /*#__PURE__*/ _regenerator['default'].mark(function _callee2(
            req,
            res
          ) {
            var userId;
            return _regenerator['default'].wrap(
              function _callee2$(_context2) {
                while (1) {
                  switch ((_context2.prev = _context2.next)) {
                    case 0:
                      userId = _jsonwebtoken['default'].verify(
                        req.cookies.token,
                        _config.token_crypt
                      ).id;
                      _context2.prev = 1;
                      _context2.next = 4;
                      return _userModel['default'].findByIdAndDelete({
                        _id: userId,
                      });

                    case 4:
                      _context2.next = 6;
                      return _linkModel['default']
                        .find({
                          user_id: userId,
                        })
                        .deleteMany();

                    case 6:
                      res.clearCookie('token');
                      res.redirect('/login');
                      _context2.next = 15;
                      break;

                    case 10:
                      _context2.prev = 10;
                      _context2.t0 = _context2['catch'](1);
                      console.error(_context2.t0);
                      res.clearCookie('token');
                      res.render('error');

                    case 15:
                    case 'end':
                      return _context2.stop();
                  }
                }
              },
              _callee2,
              null,
              [[1, 10]]
            );
          })
        );

        function eliminarCuenta(_x3, _x4) {
          return _eliminarCuenta.apply(this, arguments);
        }

        return eliminarCuenta;
      })(),
    },
  ]);
  return ControladorDePerfil;
})();

exports.ControladorDePerfil = ControladorDePerfil;
