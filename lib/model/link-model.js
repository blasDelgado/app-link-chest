"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var Link = new _mongoose["default"].Schema({
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  user_id: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    required: true
  },
  user_name: {
    type: String,
    required: true
  },
  share: {
    type: Boolean,
    require: true,
    "default": false
  }
});

var _default = _mongoose["default"].model('Link', Link);

exports["default"] = _default;