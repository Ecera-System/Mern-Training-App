const {
  createOrUpdateRewardPoints,
  redeemRewardPointsDeduction,
} = require("../../server/utils/rewardFunctions");

const Reward = require("../models/Reward");
const User = require("../models/User");

//<!-- Create Reward -->

exports.createReward = async (req, res, next) => {
  try {
    const { _id } = req.decoded;
    const dollarsSpent = parseFloat(req.body.dollarsSpent);

    // console.log(_id, "_id");
    // console.log(dollarsSpent, "dollarsSpent");
    //

    if (isNaN(dollarsSpent) || dollarsSpent <= 0) {
      return res.status(400).json({ error: "Invalid dollars spent value!" });
    }
    const existingReward = await createOrUpdateRewardPoints(_id, dollarsSpent);

    // console.log(existingReward, "existingReward");

    res.status(200).json({
      data: existingReward,
      success: "Reward updated/created successfully!",
    });
  } catch (error) {
    next(error);
  }
};

//<!-- Get All Rewards -->
exports.getAllRewards = async (req, res, next) => {
  try {
    const { _id } = req.decoded;
    // console.log(_id, "_id from getAllRewards");
    const result = await Reward.findOne({ userId: _id });

    // console.log(result, "result from getAllRewards");
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

//<!-- Redeem Reward Points -->
exports.reedemRewardPoints = async (req, res, next) => {
  try {
    const { _id } = req.decoded;
    const itemPrice = parseFloat(req.body.itemPrice);

    // Validate itemPrice to ensure it's a positive number
    if (isNaN(itemPrice) || itemPrice <= 0) {
      return res.status(400).json({ error: "Invalid item price!" });
    }

    // Fetch the user's total reward points
    const userReward = await Reward.findOne({ userId: _id });

    // console.log(userReward, "userReward");

    if (!userReward) {
      return res.status(404).json({ error: "User reward data not found!" });
    }

    // Calculate the discount based on reward points (1:1 conversion)
    const rewardDiscount = Math.min(userReward.points, itemPrice);

    // Update the user's reward points after redemption
    // userReward.points -= rewardDiscount;

    //
    const finalPrice = Math.max(itemPrice - rewardDiscount, 0);
    //
    // await userReward.save();

    // const output = await redeemRewardPointsDeduction(_id, rewardDiscount);

    // console.log(output, "output");
    // console.log(rewardDiscount, "rewardDiscount");

    res.status(200).json({
      success: "Reward points redeemed successfully!",
      rewardDiscount,
      finalPrice: finalPrice,
    });
  } catch (error) {
    next(error);
  }
};

//<!-- Delete Reward By Id -->
exports.deleteRewardById = async (req, res, next) => {
  try {
    const result = await Reward.findByIdAndDelete({ _id: req.params.id });
    res
      .status(200)
      .json({ data: result, success: "Reward deleted successfully!" });
  } catch (error) {
    next(error);
  }
};

//
exports.getAllUserRewardList = async (req, res, next) => {
  try {
    const result = await Reward.find().populate("userId");
    // console.log(result, "result");
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
//
exports.findByEmailAndAddPoint = async (req, res, next) => {
  try {
    const { email, points } = req.body;
    console.log(req.body);

    // Check if the email exists in the User collection
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(403)
        .json({ error: "User not found with the provided email." });
    }

    // Check if the userId has a reward entry in the Reward collection
    const existingReward = await Reward.findOne({ userId: user._id });

    if (existingReward) {
      existingReward.points = Math.max(
        0,
        existingReward.points + parseInt(points) || 0
      );
      await existingReward.save();

      return res.status(200).json({ success: "Reward updated successfully." });
    }

    // If no existing reward entry, create a new one
    const newReward = new Reward({
      userId: user._id,
      points: Math.max(0, parseInt(points) || 0), // Set points to the provided value or default to 0
    });

    await newReward.save();

    res.status(200).json({ success: "Reward added successfully." });
  } catch (error) {
    next(error);
  }
};

// module.exports = { createOrUpdateRewardPoints };
