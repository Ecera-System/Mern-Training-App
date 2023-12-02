const Reward = require("../models/Reward");

// function to create or update reward points
const createOrUpdateRewardPoints = async (userId, points) => {
  try {
    let existingReward = await Reward.findOne({ userId: userId });

    if (existingReward) {
      existingReward.points += points;
      await existingReward.save();
    } else {
      existingReward = await Reward.create({ userId: userId, points });
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
    const points = parseInt(req.body.points);

    console.log(_id, "_id");
    console.log(points, "points");
    //

    if (!points || !Number.isInteger(points) || points <= 0) {
      return res.status(400).json({ error: "Invalid points value!" });
    }

    const existingReward = await createOrUpdateRewardPoints(_id, points);

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
    const result = await Reward.findOne({ userId: _id });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

//<!-- Redeem Reward Points -->
exports.reedemRewardPoints = async (req, res, next) => {
  try {
    // Add your logic to redeem reward points here based on the PRD
    // ...
    res.status(200).json({ success: "Reward points redeemed successfully!" });
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
