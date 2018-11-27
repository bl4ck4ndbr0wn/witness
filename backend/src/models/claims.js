const mongoose = require("mongoose");

const { Schema } = mongoose;

let Claim = null;

try {
  const ClaimSchema = new Schema({
    _id: {
      timestamp: Number,
      user: String
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "Profile"
    },
    category: String,
    content: String,
    ipfs_path: String,
    witnesses: [String],
    reviews: [
      {
        _id: {
          timestamp: Number,
          user: String
        },
        user: String,
        avatar: {
          type: String
        },
        review: String,
        rating: Number,
        ipfs_path: String,
        created_on: {
          type: Date,
          default: Date.now
        },
        reviewConfirmed: {
          type: Boolean,
          default: false
        }
      }
    ],
    created_on: {
      type: Date,
      default: Date.now
    },
    claimConfirmed: {
      type: Boolean,
      default: false
    }
  });
  Claim = mongoose.model("Claim", ClaimSchema);
} catch (e) {
  Claim = mongoose.model("Claim");
}

module.exports = Claim;
