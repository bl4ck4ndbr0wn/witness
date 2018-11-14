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
let Claim = null;

try {
  const ClaimSchema = new Schema({
    _id: {
      timestamp: Number,
      user: String
    },
    user: String,
    category: String,
    content: String,
    ipfs_path: String,
    witnesses: [String],
    reviews: [{
      _id: {
        timestamp: Number,
        user: String
      },
      user: String,
      review: String,
      ipfs_path: String,
      reviewConfirmed: {
        type: Boolean,
        default: false
      }
    }],
    claimConfirmed: {
      type: Boolean,
      default: false
    }
  });
  Claim = _mongoose.default.model("Claim", ClaimSchema);
} catch (e) {
  Claim = _mongoose.default.model("Claim");
}

var _default = Claim;
exports.default = _default;
//# sourceMappingURL=claims.js.map