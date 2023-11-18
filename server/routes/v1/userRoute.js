const express = require('express');
const router = express.Router();
const adminAuthorize = require('../../middleware/adminAuthorize');
const userAuthorize = require('../../middleware/userAuthorize');
const { signup, activateAccount, resendCode, signin, googleSignin, getSingleUser } = require('../../controllers/userController');


// <!-- User Auth -->
router.route('/sign-up').post(signup);
router.route('/activate-account').post(activateAccount);
router.route('/resend-code').post(resendCode);
router.route('/sign-in').post(signin);
router.route('/google-sign-in').post(googleSignin);

// <!-- Get single user -->
router.route('/single').get(userAuthorize, getSingleUser);


module.exports = router;
