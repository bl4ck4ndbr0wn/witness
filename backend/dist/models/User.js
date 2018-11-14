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
let User = null;

try {
  const UserSchema = new Schema({
    account: {
      type: String,
      required: true
    },
    created_at: {
      type: Date,
      default: Date.now
    },
    userConfirmed: {
      type: Boolean,
      default: false
    }
  });
  User = _mongoose.default.model("User", UserSchema);
} catch (e) {
  User = _mongoose.default.model("User");
}

var _default = User;
exports.default = _default;
//# sourceMappingURL=User.js.map