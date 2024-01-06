const express = require('express');
const router = express.Router();
const { uploadCertificate, downloadCertificate } = require('../../controllers/certificateController');
const instructorAuthorize = require('../../middleware/instructorAuthorize');
const userAuthorize = require('../../middleware/userAuthorize');



router.route('/')
    //<!-- Upload Certificate -->
    .patch(userAuthorize, instructorAuthorize, uploadCertificate);

router.route('/:id')
    //<!-- Get all Assignment -->
    .get(userAuthorize, downloadCertificate);

module.exports = router;