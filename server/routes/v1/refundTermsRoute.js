const express = require("express");
const router = express.Router();
const userAuthorize = require("../../middleware/userAuthorize");
const adminAuthorize = require("../../middleware/adminAuthorize");

const {
  createRefundTerms,
  getRefundTerms,
  updateRegistrationFees,
  updateReturnWindow,
} = require("../../controllers/refundTermsController");

router
  .route("/")
  // Create new terms
  .post(userAuthorize, adminAuthorize, createRefundTerms)
  // Get terms
  .get(userAuthorize, getRefundTerms)
  // Update registration fees
  .put(userAuthorize, adminAuthorize, updateRegistrationFees)
  // Update return window
  .patch(userAuthorize, adminAuthorize, updateReturnWindow);

module.exports = router;
