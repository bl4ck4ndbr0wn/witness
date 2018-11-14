import mongoose from "mongoose";

const { Schema } = mongoose;

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
    claim: [
      {
        category: String,
        timestamp: String,
        content: String,
        ipfs_path: String,
        witnesses: [String],
        reviews: [
          {
            reviewer: String,
            review: String,
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
      }
    ],
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
  Profile = mongoose.model("Profile", ProfileSchema);
} catch (e) {
  Profile = mongoose.model("Profile");
}

export default Profile;
