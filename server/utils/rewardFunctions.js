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

module.exports = { createOrUpdateRewardPoints };
