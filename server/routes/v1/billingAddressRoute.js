const express = require('express');
const router = express.Router();
const adminAuthorize = require('../../middleware/adminAuthorize');
const userAuthorize = require('../../middleware/userAuthorize');
const { storeBillingAddress, getBillingAddress } = require('../../controllers/billingAddress');




// <!-- Store billing address -->
router.route('/store').post(userAuthorize, storeBillingAddress);
router.route('/fetch').get(userAuthorize, getBillingAddress);


module.exports = router;
