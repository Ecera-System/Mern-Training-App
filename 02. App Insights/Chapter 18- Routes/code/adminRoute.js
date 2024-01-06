const express = require('express');
const router = express.Router();
const adminAuthorize = require('../../middleware/adminAuthorize');
const { updateUserPasswordByAdmin } = require('../../controllers/adminController');
const userAuthorize = require('../../middleware/userAuthorize');

//admin auth
router.route('/update-password').post(userAuthorize, adminAuthorize, updateUserPasswordByAdmin)

module.exports = router;
