import mongoose from "mongoose";

const { Schema } = mongoose;

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
  User = mongoose.model("User", UserSchema);
} catch (e) {
  User = mongoose.model("User");
}

export default User;
