const express = require("express");
const router = express.Router();
const userAuthorize = require("../../middleware/userAuthorize");
const {
  createReward,
  getAllRewards,
  reedemRewardPoints,
  deleteRewardById,
} = require("../../controllers/rewardController");

router
  .route("/")
  //<!-- Get all Rewards -->
  .get(userAuthorize, getAllRewards)
  //<!-- Create Reward -->
  .post(userAuthorize, createReward);

//<!-- Redeem Reward Points -->
router.route("/redeem").post(userAuthorize, reedemRewardPoints);

router
  .route("/:id")
  //<!-- Delete Reward By Id -->
  .delete(userAuthorize, deleteRewardById);

module.exports = router;
