const express = require('express');
const router = express.Router();
const userAuthorize = require('../../middleware/userAuthorize');
const adminAuthorize = require('../../middleware/adminAuthorize');
const { getEnrolledCourse, getRecentOrders, enrollCourseByUSD, postStripeWebHook, enrollCourseByINR, razorpayVerify } = require('../../controllers/courseEnrollController');


router.route('/student').get(userAuthorize, getEnrolledCourse);

//<!-- Get recent enrolled orders for admin dashboard -->
router.route('/recent-orders').get(userAuthorize, adminAuthorize, getRecentOrders);

//<!-- Course Checkout -->
router.route('/enroll-in-usd').post(userAuthorize, enrollCourseByUSD);
router.route('/stripe/webhook').post(postStripeWebHook);
router.route('/enroll-in-inr').post(userAuthorize, enrollCourseByINR);
router.route('/razorpay-verify').post(userAuthorize, razorpayVerify);

module.exports = router;