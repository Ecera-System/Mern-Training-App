const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const rewardSchema = mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    points: {
      type: Number,
      default: 0,
    },
    // You can add more fields here as needed
  },
  {
    timestamps: true,
  }
);

const Reward = mongoose.model("Reward", rewardSchema);

module.exports = Reward;
