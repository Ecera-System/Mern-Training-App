const express = require("express");
const router = express.Router();
const userAuthorize = require("../../middleware/userAuthorize");
const adminAuthorize = require("../../middleware/adminAuthorize");
const {
  getCourseById,
  getAllCourses,
  deleteCourseById,
  getTopSalesCourse,
  addCourseTitle,
  uploadCourseVideo,
  uploadCourseFile,
} = require("../../controllers/courseController");
//
const multer = require("multer");
//
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads"); // Define the destination folder where files will be saved
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Define the filename of the uploaded file
  },
});

const upload = multer({ storage: storage });

//
router.route("/upload-document").post(
  userAuthorize,
  adminAuthorize,
  upload.single("file"), // Specify the field name for the file upload
  uploadCourseFile
);
// router
//   .route("/upload-document-try")
//   .post(userAuthorize, adminAuthorize, uploadCourseFile);

//

//<!-- Get Top Sales Course -->
router.route("/top-sale").get(userAuthorize, adminAuthorize, getTopSalesCourse);

router
  .route("/")
  //<!-- Get All Courses -->
  .get(getAllCourses)
  //<!-- Add Course -->
  .post(userAuthorize, adminAuthorize, addCourseTitle);

router
  .route("/upload-video")
  .post(userAuthorize, adminAuthorize, uploadCourseVideo);

router
  .route("/:id")
  .get(getCourseById)
  .delete(userAuthorize, adminAuthorize, deleteCourseById);

module.exports = router;
