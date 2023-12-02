const Reward = require("../models/Reward");

//<!-- Create Reward -->
exports.createReward = async (req, res, next) => {
  try {
    const result = await Reward.create(req.body);
    res
      .status(200)
      .json({ data: result, success: "Reward created successfully!" });
  } catch (error) {
    next(error);
  }
};

//<!-- Get All Rewards -->
exports.getAllRewards = async (req, res, next) => {
  try {
    const result = await Reward.find({}).populate("user");
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

//<!-- Redeem Reward Points -->
exports.redeemRewardPoints = async (req, res, next) => {
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
