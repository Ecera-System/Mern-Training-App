const express = require('express');
const router = express.Router();
const userAuthorize = require('../../middleware/userAuthorize');
const { signup, activateAccount, resendCode, signin, googleSignin, getSingleUser, forgotPassword, resetPassword, updateUserPassword, updateUserPasswordByAdmin } = require('../../controllers/userController');


// <!-- User Auth -->
router.route('/sign-up').post(signup);
router.route('/activate-account').post(activateAccount);
router.route('/resend-code').post(resendCode);
router.route('/sign-in').post(signin);
router.route('/google-sign-in').post(googleSignin);
router.route('/forgot-password').post(forgotPassword);
router.route('/reset-password/:token').post(resetPassword);

// <!-- Get single user -->
router.route('/single').get(userAuthorize, getSingleUser);
router.route('/update-password').post(userAuthorize, updateUserPassword);


module.exports = router;
