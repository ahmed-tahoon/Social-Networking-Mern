const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  about: {
    type: String,
  },
  updated: Date,
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  image: {
    type: String,
    default:"https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-541.jpg"
  },
  following: [{type: mongoose.Schema.ObjectId, ref: 'users'}],
  followers: [{type: mongoose.Schema.ObjectId, ref: 'users'}]
});

const User = mongoose.model("users", userSchema);

module.exports =User;
