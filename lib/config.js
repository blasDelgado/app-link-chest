"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.token_crypt = exports.mongodb_uri = void 0;

var _dotenv = require("dotenv");

(0, _dotenv.config)();
var mongodb_uri = process.env.mongodb_uri;
exports.mongodb_uri = mongodb_uri;
var token_crypt = process.env.token;
exports.token_crypt = token_crypt;