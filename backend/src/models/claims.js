import mongoose from "mongoose";

const { Schema } = mongoose;

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
    reviews: [
      {
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
      }
    ],
    claimConfirmed: {
      type: Boolean,
      default: false
    }
  });
  Claim = mongoose.model("Claim", ClaimSchema);
} catch (e) {
  Claim = mongoose.model("Claim");
}

export default Claim;
