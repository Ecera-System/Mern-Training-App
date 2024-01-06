const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

// Schema design
const profileSchema = mongoose.Schema(
  {
    avatar: {
      type: String,
    },
    name: {
      type: String,
      required: [true, "Please provide your full name!"],
      trim: true,
    },
    birthday: {
      type: String,
    },
    country: {
      type: String,
    },
    address1: {
      type: String,
    },
    address2: {
      type: String,
    },
    city: {
      type: String,
    },
    zip: {
      type: String,
    },
    education: {
      type: String,
    },
    userId: {
      type: ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
