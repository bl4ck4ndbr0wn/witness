"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _claim = _interopRequireDefault(require("./claim"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const account = process.env.EOSIO_CONTRACT_ACCOUNT;
var _default = [{
  actionType: `${account}::claim`,
  // account::action name
  effect: _claim.default
}];
exports.default = _default;
//# sourceMappingURL=index.js.map