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
let Profile = null;

try {
  const ProfileSchema = new Schema({
    user: {
      type: String,
      required: true,
      max: 40
    },
    avatar: {
      type: String
    },
    bio: String,
    claim: [{
      category: String,
      timestamp: String,
      content: String,
      ipfs_path: String,
      witnesses: [String],
      reviews: [{
        reviewer: String,
        review: String,
        reviewConfirmed: {
          type: Boolean,
          default: false
        }
      }],
      claimConfirmed: {
        type: Boolean,
        default: false
      }
    }],
    social: {
      youtube: {
        type: String
      },
      twitter: {
        type: String
      },
      facebook: {
        type: String
      },
      linkedin: {
        type: String
      },
      instagram: {
        type: String
      }
    },
    created_at: {
      type: Date,
      default: Date.now
    }
  });
  Profile = _mongoose.default.model("Profile", ProfileSchema);
} catch (e) {
  Profile = _mongoose.default.model("Profile");
}

var _default = Profile;
exports.default = _default;
//# sourceMappingURL=Profile.js.map