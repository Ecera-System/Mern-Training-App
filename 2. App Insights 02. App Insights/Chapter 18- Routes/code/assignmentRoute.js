const express = require('express');
const router = express.Router();
const adminAuthorize = require('../../middleware/adminAuthorize');
const instructorAuthorize = require('../../middleware/instructorAuthorize');
const userAuthorize = require('../../middleware/userAuthorize');
const { addAssignment, getAllAssignments } = require('../../controllers/assignmentController');


router.route('/')
    //<!-- Get all Assignment -->
    .get(userAuthorize, adminAuthorize, getAllAssignments)
    //<!-- Add Assignment -->
    .post(userAuthorize, instructorAuthorize, addAssignment);

module.exports = router;