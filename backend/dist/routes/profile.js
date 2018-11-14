"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _profile = require("../controller/profile");

var _default = () => {
  let api = (0, _express.Router)();
  api.get("/all", _profile.getAll);
  api.get("/handle/:handle", _profile.getByHandle);
  api.post("/", _profile.createProfile);
  return api;
};

exports.default = _default;
//# sourceMappingURL=profile.js.map