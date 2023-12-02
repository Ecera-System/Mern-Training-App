const Reward = require("../models/Reward");

// function to create or update reward points
const createOrUpdateRewardPoints = async (userId, dollarsSpent) => {
  try {
    //
    const pointsEarned = Math.floor(dollarsSpent / 10);
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

    console.log(result, "result from getAllRewards");
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

//<!-- Redeem Reward Points -->
exports.reedemRewardPoints = async (req, res, next) => {
  try {
    const { _id } = req.decoded; // Change from _id to userId
    const itemPrice = parseFloat(req.body.itemPrice);

    // Validate itemPrice to ensure it's a positive number
    if (isNaN(itemPrice) || itemPrice <= 0) {
      return res.status(400).json({ error: "Invalid item price!" });
    }

    // Fetch the user's total reward points
    const userReward = await Reward.findOne({ userId: _id }); // Change from _id to userId

    if (!userReward) {
      return res.status(404).json({ error: "User reward data not found!" });
    }

    // Calculate the discount based on reward points
    const discountAmount = Math.floor(userReward.points / 10);
    //
    console.log(discountAmount, "discountAmount");
    const discountedPrice = itemPrice - discountAmount;

    // Ensure the discounted price doesn't go below zero
    const finalPrice = Math.max(discountedPrice, 0);

    // Update the user's reward points after redemption
    if (discountAmount >= itemPrice) {
      userReward.points -= itemPrice * 10;
    } else {
      userReward.points -= userReward.points;
    }

    await userReward.save();

    res.status(200).json({
      success: "Reward points redeemed successfully!",
      discountAmount,
      finalPrice,
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
