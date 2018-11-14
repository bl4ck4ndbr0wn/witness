"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _socket = _interopRequireDefault(require("socket.io"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let io = null;

const connect = server => {
  io = (0, _socket.default)(server);
};

const getSocket = () => io;

var _default = {
  connect,
  getSocket
};
exports.default = _default;
//# sourceMappingURL=io.js.map