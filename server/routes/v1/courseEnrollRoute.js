const express = require("express");
const router = express.Router();
const userAuthorize = require("../../middleware/userAuthorize");
const adminAuthorize = require("../../middleware/adminAuthorize");
const {
  getEnrolledCourse,
  //
  getEnrolledAndNotRefundCourse,
  getRecentOrders,
  enrollCourseByUSD,
  postStripeWebHook,
  enrollCourseByINR,
  razorpayVerify,
  updateRefundRequest,
} = require("../../controllers/courseEnrollController");

router.route("/student").get(userAuthorize, getEnrolledCourse);
//
router
  .route("/student-not-refund")
  .get(userAuthorize, getEnrolledAndNotRefundCourse);

//<!-- Get recent enrolled orders for admin dashboard -->
router
  .route("/recent-orders")
  .get(userAuthorize, adminAuthorize, getRecentOrders);

//<!-- Course Checkout -->
router.route("/enroll-in-usd").post(userAuthorize, enrollCourseByUSD);
router.route("/stripe/webhook").post(postStripeWebHook);
router.route("/enroll-in-inr").post(userAuthorize, enrollCourseByINR);
router.route("/razorpay-verify").post(userAuthorize, razorpayVerify);

// <!-- refund request -->
router.patch("/update-refund-request/:id", userAuthorize, updateRefundRequest);

module.exports = router;
