const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  college: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: '',
  },
  avatarUrl: {
    type: String,
    default: '',
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
  password: {
    type: String,
    required: true,
  },
  resetToken: { type: String },       // for password reset token
  resetTokenExpiry: { type: Date },   // for password reset token expiry
});

module.exports = model("User", userSchema, "users");
