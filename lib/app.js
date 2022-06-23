"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _path = _interopRequireDefault(require("path"));

var _expressHandlebars = require("express-handlebars");

var _expressSession = _interopRequireDefault(require("express-session"));

var _connectFlash = _interopRequireDefault(require("connect-flash"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _methodOverride = _interopRequireDefault(require("method-override"));

var _loginRoutes = _interopRequireDefault(require("./routes/login-routes.js"));

var _linkRoutes = _interopRequireDefault(require("./routes/link-routes.js"));

var _perfilRoutes = _interopRequireDefault(require("./routes/perfil-routes"));

//Rutas
var app = (0, _express["default"])(); //Middleware

app.use((0, _morgan["default"])('dev'));
app.use((0, _methodOverride["default"])('_method')); //Configuraciones

app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _expressSession["default"])({
  secret: 'pass',
  resave: true,
  saveUninitialized: true
}));
app.use((0, _connectFlash["default"])());
app.use((0, _cookieParser["default"])()); //Variables globales

app.use(function (req, res, next) {
  res.locals.mensaje = req.flash('mensaje');
  next();
}); //Motor de vistas

app.set('views', _path["default"].join(__dirname, 'views'));
app.engine('.hbs', (0, _expressHandlebars.engine)({
  layoutsDir: _path["default"].join(app.get('views'), 'layouts'),
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', '.hbs'); //Rutas

app.use(_loginRoutes["default"]);
app.use(_linkRoutes["default"]);
app.use(_perfilRoutes["default"]);
var _default = app;
exports["default"] = _default;