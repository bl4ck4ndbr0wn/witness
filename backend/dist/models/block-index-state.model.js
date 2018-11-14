"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  Schema
} = _mongoose.default;
let BlockIndexState = null;

try {
  const BlockIndexStateSchema = new Schema({
    blockNumber: Number,
    blockHash: String,
    isReplay: Boolean
  });
  BlockIndexState = _mongoose.default.model("BlockIndexState", BlockIndexStateSchema);
} catch (e) {
  BlockIndexState = _mongoose.default.model("BlockIndexState");
}

var _default = BlockIndexState;
exports.default = _default;
//# sourceMappingURL=block-index-state.model.js.map