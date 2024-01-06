const Reward = require("../models/Reward");

const createOrUpdateRewardPoints = async (userId, dollarsSpent) => {
  try {
    //
    // const pointsEarned = Math.floor(dollarsSpent / 10);
    const pointsEarned = Math.floor(dollarsSpent / 1000);

    //
    let existingReward = await Reward.findOne({ userId: userId });

    if (existingReward) {
      existingReward.points += pointsEarned;
      await existingReward.save();
    } else {
      existingReward = await Reward.create({
        userId: userId,
        points: pointsEarned,
      });
    }

    return existingReward;
  } catch (error) {
    throw error;
  }
};

//
const redeemRewardPointsDeduction = async (userId, rewardDiscount) => {
  try {
    // Fetch the user's total reward points
    const userReward = await Reward.findOne({ userId });

    if (!userReward) {
      throw new Error("User reward data not found!");
    }

    // Ensure rewardDiscount is a positive number
    rewardDiscount = Math.max(0, rewardDiscount);

    // Reduce the user's reward points after redemption
    userReward.points -= rewardDiscount;

    // Save the updated user reward data
    await userReward.save();

    return { success: "Reward points redeemed successfully!", rewardDiscount };
  } catch (error) {
    throw error;
  }
};

module.exports = { createOrUpdateRewardPoints, redeemRewardPointsDeduction };
