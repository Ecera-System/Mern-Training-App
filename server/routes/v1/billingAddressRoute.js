const express = require('express');
const router = express.Router();
const adminAuthorize = require('../../middleware/adminAuthorize');
const userAuthorize = require('../../middleware/userAuthorize');
const { storeBillingAddress, getBillingAddress, updateBillingAddress } = require('../../controllers/billingAddressController');




// <!-- Store billing address -->
router.route('/store').post(userAuthorize, storeBillingAddress);
router.route('/fetch').get(userAuthorize, getBillingAddress);
router.route('/update').put(userAuthorize, updateBillingAddress);


module.exports = router;
