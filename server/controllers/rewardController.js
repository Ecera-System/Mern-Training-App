const {
  createOrUpdateRewardPoints,
  redeemRewardPointsDeduction,
} = require("../../server/utils/rewardFunctions");

const Reward = require("../models/Reward");

// function to create or update reward points
// const createOrUpdateRewardPoints = async (userId, dollarsSpent) => {
//   try {
//     //
//     const pointsEarned = Math.floor(dollarsSpent / 10);
//     //
//     let existingReward = await Reward.findOne({ userId: userId });

//     if (existingReward) {
//       existingReward.points += pointsEarned;
//       await existingReward.save();
//     } else {
//       existingReward = await Reward.create({
//         userId: userId,
//         points: pointsEarned,
//       });
//     }

//     return existingReward;
//   } catch (error) {
//     throw error;
//   }
// };
//
//
// const redeemRewardPoints = async (userId, rewardDiscount) => {
//   try {
//     // Fetch the user's total reward points
//     const userReward = await Reward.findOne({ userId });

//     if (!userReward) {
//       throw new Error("User reward data not found!");
//     }

//     // Ensure rewardDiscount is a positive number
//     rewardDiscount = Math.max(0, rewardDiscount);

//     // Reduce the user's reward points after redemption
//     userReward.points -= rewardDiscount;

//     // Save the updated user reward data
//     await userReward.save();

//     return { success: "Reward points redeemed successfully!", rewardDiscount };
//   } catch (error) {
//     throw error;
//   }
// };

//<!-- Create Reward -->

exports.createReward = async (req, res, next) => {
  try {
    const { _id } = req.decoded;
    const dollarsSpent = parseFloat(req.body.dollarsSpent);

    console.log(_id, "_id");
    console.log(dollarsSpent, "dollarsSpent");
    //

    if (isNaN(dollarsSpent) || dollarsSpent <= 0) {
      return res.status(400).json({ error: "Invalid dollars spent value!" });
    }
    const existingReward = await createOrUpdateRewardPoints(_id, dollarsSpent);

    console.log(existingReward, "existingReward");

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
    console.log(_id, "_id from getAllRewards");
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

    console.log(userReward, "userReward");

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
// module.exports = { createOrUpdateRewardPoints };
