const Jimp = require("jimp");
const path = require("path");
const Course = require("../models/Course");
const User = require("../models/User");
const CouponCode = require("../models/CouponCode");
const Certificate = require("../models/Certificate");
const Assignment = require("../models/Assignment");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
// <!-- Get a course -->
exports.getCourseById = async (req, res, next) => {
  try {
    const result = await Course.findById({ _id: req.params.id });

    if (!result)
      return res
        .status(404)
        .json({ error: "No course was found with this id." });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// <!-- Delete Course By Id -->
exports.deleteCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    // <!-- Remove course id from Users -->
    await User.updateMany(
      { courses: id },
      {
        $pull: {
          courses: id,
        },
      }
    );
    // <!-- Delete Course Coupon Code -->
    await CouponCode.deleteMany({ courseId: id });
    // <!-- Delete Course Certificate -->
    await Certificate.deleteMany({ courseId: id });
    // <!-- Delete Course Assignment -->
    await Assignment.deleteMany({ courseId: id });

    // <!-- Delete Course -->
    const result = await Course.findByIdAndDelete({ _id: id });

    if (!result)
      return res.status(404).json({ error: "No course founded with this id." });

    res
      .status(200)
      .json({ success: "Course delete successfully!", data: result });
  } catch (error) {
    next(error);
  }
};

// <!-- Add a new course -->
exports.addCourseTitle = async (req, res, next) => {
  try {
    const { title, price, src_path, cover_photo } = req.body;
    let photoPath;

    // <!-- Image processing -->
    if (cover_photo) {
      const buffer = Buffer.from(
        cover_photo.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
        "base64"
      );

      photoPath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;
      try {
        const jimpResp = await Jimp.read(buffer);
        jimpResp
          .resize(300, Jimp.AUTO)
          .write(
            path.resolve(__dirname, `../public/images/course/${photoPath}`)
          );
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }
    }
    if (!photoPath)
      return res
        .status(406)
        .json({ error: "Please provide a valid cover photo!" });

    const result = await Course.create({
      title,
      price,
      src_path,
      cover_photo: `/images/course/${photoPath}`,
    });
    res
      .status(200)
      .json({ data: result, success: "Course added successfully!" });
  } catch (error) {
    next(error);
  }
};

// <!-- Upload video -->
exports.uploadCourseVideo = async (req, res, next) => {
  try {
    const { course: courseId, module, title, description, video } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: "Course not found" });

    // Find the module
    const existModule = await course.modules.find((f) => f.title === module);

    if (existModule) {
      existModule.videos.push({
        title,
        description,
        video,
      });
    }
    // If the module doesn't exist, create a new module and add the video
    else {
      course.modules.push({
        title: module,
        videos: [
          {
            title,
            description,
            video,
          },
        ],
      });
    }

    // Save the updated course
    await course.save();
    res.status(200).json({ success: "Video uploaded successfully" });
  } catch (error) {
    next(error);
  }
};
//
cloudinary.config({
  cloud_name: "dtmewd80h",
  api_key: "296223717733129",
  api_secret: "LVD3OifJ294_vkmKVF6VWTfxVMc",
});

//
exports.uploadCourseFile = async (req, res, next) => {
  try {
    console.log(req.body, "req.body");

    // Destructure the request body
    const { courseId, module, title, description } = req.body;

    // Assuming the file is uploaded using multer or similar middleware
    const file = req.file;

    // Find the course by courseId
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ error: "Course not found" });

    // Upload file to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(file.path, {
      resource_type: "raw",
      // Add any other Cloudinary upload options as needed
    });

    // Delete the file from the local upload folder
    fs.unlinkSync(file.path);

    // Find the module
    const existingModule = course.modules.find((f) => f.title === module);

    if (existingModule) {
      existingModule.videos.push({
        title,
        description,
        video: cloudinaryResponse.secure_url, // Save Cloudinary URL to the database
      });
    } else {
      // If the module doesn't exist, create a new module and add the video
      course.modules.push({
        title: module,
        videos: [
          {
            title,
            description,
            video: cloudinaryResponse.secure_url, // Save Cloudinary URL to the database
          },
        ],
      });
    }

    // Save the updated course
    await course.save();
    res.status(200).json({ success: "File uploaded successfully" });
  } catch (error) {
    next(error);
  }
};
//

// <!-- Get all courses -->
exports.getAllCourses = async (req, res, next) => {
  try {
    const course = await Course.find({});
    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

// <!-- Get top selling courses -->
exports.getTopSalesCourse = async (req, res, next) => {
  try {
    const course = await Course.find().sort({ sales: -1 }).limit(10);

    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};
