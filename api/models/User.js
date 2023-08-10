const mongoose = require("mongoose");

const Userschema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    ProfilePic: {
      type: String,
      default: "1691692938351profile.png",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", Userschema);
