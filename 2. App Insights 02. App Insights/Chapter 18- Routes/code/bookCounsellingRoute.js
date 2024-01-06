const express = require('express');
const router = express.Router();
const adminAuthorize = require('../../middleware/adminAuthorize');
const userAuthorize = require('../../middleware/userAuthorize');
const { bookAFreeCounselling, getAllBookCounselling } = require('../../controllers/bookCounsellingController');

router.route('/')
    .get(userAuthorize, adminAuthorize, getAllBookCounselling)
    .post(bookAFreeCounselling)

module.exports = router;