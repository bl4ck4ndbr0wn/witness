import mongoose from "mongoose";

const { Schema } = mongoose;

let Profile = null;

try {
  const ProfileSchema = new Schema({
    handle: {
      type: String,
      required: true,
      max: 40
    },
    avatar: {
      type: String
    },
    skills: [
      {
        claimant: String,
        content: String,
        witnesses: [String],
        claimConfirmed: {
          type: Boolean,
          default: false
        }
      }
    ],
    bio: String,
    experience: [
      {
        claimant: String,
        content: String,
        witnesses: [String],
        claimConfirmed: {
          type: Boolean,
          default: false
        }
      }
    ],
    education: [
      {
        claimant: String,
        content: String,
        witnesses: [String],
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
    },
    profileConfirmed: {
      type: Boolean,
      default: false
    }
  });
  Profile = mongoose.model("Profile", ProfileSchema);
} catch (e) {
  Profile = mongoose.model("Profile");
}

export default Profile;
