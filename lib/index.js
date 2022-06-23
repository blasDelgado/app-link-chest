"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _app = _interopRequireDefault(require("./app"));

var _database = _interopRequireDefault(require("./database"));

var port = process.env.PORT || 3000;

_app["default"].listen(port, function () {
  console.log("Server is listening on port ".concat(port));
});