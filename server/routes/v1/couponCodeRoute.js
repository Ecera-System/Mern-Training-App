const express = require('express');
const router = express.Router();
const adminAuthorize = require('../../middleware/adminAuthorize');
const userAuthorize = require('../../middleware/userAuthorize');
const { createCouponCode, getAllCouponCode, updateCouponStatus, applyCouponCode, deleteCouponCodeById } = require('../../controllers/couponCodeController');

router.route('/')
    //<!-- Get all Coupon Code -->
    .get(userAuthorize, getAllCouponCode)
    //<!-- Admin can Create Coupon Code -->
    .post(userAuthorize, adminAuthorize, createCouponCode);

    //<!-- Apply Coupon Code -->
router.route('/apply').post(userAuthorize, applyCouponCode);

router.route('/:id')
    //<!-- Change Coupon Code Status -->
    .patch(userAuthorize, adminAuthorize, updateCouponStatus)
    .delete(userAuthorize, adminAuthorize, deleteCouponCodeById);

module.exports = router;