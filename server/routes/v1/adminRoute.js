const express = require('express');
const router = express.Router();
const adminAuthorize = require('../../middleware/adminAuthorize');
const { updateUserPasswordByAdmin, storeEnvVariables, updateEnvVariables, getEnvVariables } = require('../../controllers/adminController');
const userAuthorize = require('../../middleware/userAuthorize');

//admin auth
router.route('/update-password').post(userAuthorize, adminAuthorize, updateUserPasswordByAdmin)

// environment variables
router.route('/add-env-variables').post(userAuthorize, adminAuthorize, storeEnvVariables)
router.route('/edit-env-variables').put(userAuthorize, adminAuthorize, updateEnvVariables);
router.route('/get-env-variables').get(userAuthorize, adminAuthorize, getEnvVariables);

module.exports = router;
