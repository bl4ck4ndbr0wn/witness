"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _demux = require("demux");

var _demuxEos = require("demux-eos");

var _ActionHandler = _interopRequireDefault(require("./ActionHandler"));

var _updaters = _interopRequireDefault(require("./updaters"));

var _effects = _interopRequireDefault(require("./effects"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const actionHandler = new _ActionHandler.default(_updaters.default, _effects.default, process.env.MONGODB_URL);
const actionReader = new _demuxEos.NodeosActionReader(process.env.EOSIO_HTTP_URL, parseInt(process.env.EOSIO_STARTING_BLOCK, 10) // First actions relevant to this dapp happen at this block
);
const actionWatcher = new _demux.BaseActionWatcher(actionReader, actionHandler, 250 // Poll at twice the block interval for less latency
);
var _default = actionWatcher;
exports.default = _default;
//# sourceMappingURL=index.js.map