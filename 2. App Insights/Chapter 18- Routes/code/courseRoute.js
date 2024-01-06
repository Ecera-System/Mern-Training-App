const express = require('express');
const router = express.Router();
const userAuthorize = require('../../middleware/userAuthorize');
const adminAuthorize = require('../../middleware/adminAuthorize');
const { getCourseById, getAllCourses, deleteCourseById, getTopSalesCourse, addCourseTitle, uploadCourseVideo } = require('../../controllers/courseController');


//<!-- Get Top Sales Course -->
router.route('/top-sale').get(userAuthorize, adminAuthorize, getTopSalesCourse);

router.route('/')
    //<!-- Get All Courses -->
    .get(getAllCourses)
    //<!-- Add Course -->
    .post(userAuthorize, adminAuthorize, addCourseTitle);
    
router.route('/upload-video').post(userAuthorize, adminAuthorize, uploadCourseVideo);

router.route('/:id')
    .get(getCourseById)
    .delete(userAuthorize, adminAuthorize, deleteCourseById);


module.exports = router;