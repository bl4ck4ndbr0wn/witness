const mongoose = require("mongoose");

const { Schema } = mongoose;

let Profile = null;

try {
  const ProfileSchema = new Schema({
    user: {
      type: String,
      required: true,
      max: 40
    },
    firstname: String,
    lastname: String,
    location: String,
    avatar: {
      type: String
    },
    bio: String,
    folowers: [],
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

module.exports = Profile;
