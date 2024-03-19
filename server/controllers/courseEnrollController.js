const crypto = require("crypto");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEB_HOOK_SECRET;
const Razorpay = require("razorpay");
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});
const Course = require("../models/Course");
const CourseEnroll = require("../models/CourseEnroll");
const Profile = require("../models/Profile");
const User = require("../models/User");
const { log } = require("console");
//for reward
const {
  createOrUpdateRewardPoints,
  redeemRewardPointsDeduction,
} = require("../../server/utils/rewardFunctions");

const Reward = require("../models/Reward");
const RefundTerms = require("../models/RefundTerms");
//

// <!-- Get Student enrolled course -->
exports.getEnrolledCourse = async (req, res, next) => {
  try {
    const result = await CourseEnroll.find({
      studentId: req.decoded._id,
      // refundRequest: false,
    }).populate("courseId");

    // console.log("used getEnrolledCourse");
    //
    // console.log("getEnrolledCourse", result);
    //
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
// <!-- Get Student enrolled and not refunded course -->
exports.getEnrolledAndNotRefundCourse = async (req, res, next) => {
  try {
    const result = await CourseEnroll.find({
      studentId: req.decoded._id,
      refundRequest: false,
    }).populate("courseId");

    // console.log("used getEnrolledCourse");
    //
    // console.log("getEnrolledCourse", result);
    //
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// <!-- Get Student enrolled course -->
exports.getRecentOrders = async (req, res, next) => {
  try {
    const result = await CourseEnroll.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("courseId")
      .populate("studentId")
      .populate("profileId");

    // console.log("getRecentOrders", result);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
//

//

// <!-- Course Enroll with Stripe -->
exports.enrollCourseByUSD = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      contactNumber,
      address1,
      address2,
      country,
      city,
      zip,
      courseId,
      title,
      price,
    } = req.body;
    const { _id, email } = req.decoded;

    const session = await stripe.checkout.sessions.create({
      metadata: {
        firstName,
        lastName,
        email: email,
        studentId: _id.toString(),
        contactNumber,
        address1,
        address2,
        country,
        city,
        zip,
        courseId,
        title,
        price,
      },
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: { name: title },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      customer_email: email,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/stripe/checkout/course/${courseId}?success=true`,
      cancel_url: `${process.env.CLIENT_URL}/stripe/checkout/course/${courseId}?canceled=true`,
    });

    session.url
      ? res.status(200).json({ url: session.url })
      : res.status(500).json({ error: "Something went wrong!" });
  } catch (error) {
    next(error);
  }
};

// <!-- Course Enroll Verify with Stripe Web-Hook -->
exports.postStripeWebHook = async (req, res, next) => {
  try {
    const sig = req.headers["stripe-signature"];
    const event = await stripe.webhooks.constructEvent(
      req.body,
      sig,
      endpointSecret
    );

    if (event.type === "checkout.session.completed") {
      const {
        studentId,
        courseId,
        firstName,
        lastName,
        email,
        contactNumber,
        address1,
        address2,
        country,
        city,
        zip,
      } = event.data.object.metadata;

      const course = await Course.findById(courseId);
      const user = await User.findById(studentId);
      const profile = await Profile.findOne({ userId: studentId });
      await Profile.updateOne(
        { userId: studentId },
        {
          $set: {
            name: firstName + " " + lastName,
            userId: studentId,
            country: country,
            address1: address1,
            address2: address2,
            city: city,
            zip: zip,
          },
        }
      );

      // <!-- Create Course Enroll -->
      const courseEnroll = await CourseEnroll.create({
        courseId: courseId,
        studentId: studentId,
        profileId: profile._id,
        price: event.data.object.amount_total / 100, //divided 100 for converting cent to dollar
        paymentMethod: "Stripe",
        transactionId: event.data.object.payment_intent,
        paymentStatus: event.data.object.payment_status,
        currency: event.data.object.currency,
      });

      // <!-- Update Course sales and students -->
      if (courseEnroll._id) {
        await Course.findByIdAndUpdate(
          { _id: courseId },
          {
            $set: { sales: course.sales + 1 },
            $push: { students: courseEnroll._id },
          },
          { new: true }
        );
      }

      const role = user.role === "admin" ? "admin" : "student";
      await User.findByIdAndUpdate(
        { _id: studentId },
        {
          $set: {
            profile: profile._id,
            name: firstName + " " + lastName,
            contactNumber: contactNumber,
            role: role,
          },
          $push: { courses: courseEnroll._id },
        },
        { new: true }
      );

      res.status(200).json({ success: "Course enrolled successfully!" });
    } else {
      res.status(403).json({});
    }
  } catch (error) {
    next(error);
  }
};

// <!-- Course Enroll with Razorpay -->
exports.enrollCourseByINR = async (req, res, next) => {
  try {
    const { _id, email } = req.decoded;
    const order = await instance.orders.create({
      amount: req.body.price * 100,
      currency: "INR",
    });

    // console.log(order, "order from enrollCourseByINR");

    // console.log("enrollCourseByINR");

    order
      ? res.status(200).json({
          ...order,
          studentId: _id,
          email,
        })
      : res.status(500).json({ error: "Something went wrong!" });
  } catch (error) {
    next(error);
  }
};

// <!-- Course Enroll Verify with Razorpay api -->
exports.razorpayVerify = async (req, res, next) => {
  try {
    const body =
      req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
    //

    // console.log("razorpayVerify-body:", body);

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(body.toString())
      .digest("hex");

    //

    // console.log("expectedSignature:", expectedSignature);

    if (expectedSignature === req.body.razorpay_signature) {
      const {
        studentId,
        courseId,
        price,
        firstName,
        lastName,
        contactNumber,
        address1,
        address2,
        country,
        city,
        zip,
        razorpay_payment_id,
        currency,
      } = req.body;

      //

      //

      const course = await Course.findById(courseId);

      //

      const priceInUSD = parseFloat(req.body.price / 100);
      const courseBasePrice = parseFloat(course.price);

      console.log("courseBasePrice", courseBasePrice);
      console.log("priceInUSD", priceInUSD);
      console.log("Reward discount", req.body.rewardDiscount);

      // Calculate couponDiscount
      const couponDiscount =
        courseBasePrice - (priceInUSD + req.body.rewardDiscount);

      //
      console.log("couponDiscount", couponDiscount);
      //
      const user = await User.findById(studentId);
      const profileId = await Profile.findOne({ userId: studentId });
      await Profile.updateOne(
        { userId: studentId },
        {
          $set: {
            name: firstName + " " + lastName,
            userId: studentId,
            country: country,
            address1: address1,
            address2: address2,
            city: city,
            zip: zip,
          },
        }
      );

      // <!-- Create Course Enroll -->
      const courseEnroll = await CourseEnroll.create({
        courseId: courseId,
        studentId: studentId,
        profileId: profileId._id,
        price: price / 100, //divided 100 for converting cent to dollar
        paymentMethod: "Razorpay",
        transactionId: razorpay_payment_id,
        paymentStatus: "paid",
        currency: currency,
        rewardDiscount: req.body.rewardDiscount || null, //
        couponDiscount: couponDiscount || null, // Add couponDiscount
      });
      //

      //
      console.log("razorpayVerify controller courseEnroll", courseEnroll);
      //

      // <!-- Update Course sales and students -->
      if (courseEnroll._id) {
        await Course.findByIdAndUpdate(
          { _id: courseId },
          {
            $set: { sales: course.sales + 1 },
            $push: { students: courseEnroll._id },
          },
          { new: true }
        );
      }
      // adding for rewards

      if (courseEnroll._id) {
        const addingReward = await createOrUpdateRewardPoints(studentId, price);
      }

      //adding for rewards points deduction
      if (req.body.rewardDiscount > 0) {
        // Call the function to deduct reward points
        await redeemRewardPointsDeduction(studentId, req.body.rewardDiscount);

        // console.log("req.body.rewardDiscount:", req.body.rewardDiscount);
      }
      //

      const role = user.role === "admin" ? "admin" : "student";
      await User.findByIdAndUpdate(
        { _id: studentId },
        {
          $set: {
            profile: profileId._id,
            name: firstName + " " + lastName,
            contactNumber: contactNumber,
            role: role,
          },
          $push: { courses: courseEnroll._id },
        },
        { new: true }
      );

      //
      // console.log("razorpayVerify");
      //

      res.status(200).json({ success: "Course enrolled successfully!" });
    } else {
      res.status(403).json({ error: "Payment is not verified!" });
    }
  } catch (error) {
    next(error);
  }
};

// <!-- refund request -->

exports.updateRefundRequest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const courseEnroll = await CourseEnroll.findById(id);
    const refundTerms = await RefundTerms.findOne();

    if (!courseEnroll) {
      return res.status(404).json({ error: "Course enrollment not found" });
    }

    // Determine the threshold for the number of days
    const returnWindowDays = refundTerms?.returnWindow + 1 || 7; // Use 8 if refundTerms is undefined

    // Check if less than specified days have passed since enrollment
    const thresholdDate = new Date();
    thresholdDate.setDate(thresholdDate.getDate() - returnWindowDays);

    if (courseEnroll.createdAt < thresholdDate) {
      return res.status(400).json({
        error: `Refund request cannot be updated after ${returnWindowDays} days of enrollment`,
      });
    }

    // Toggle the value of refundRequest
    courseEnroll.refundRequest = !courseEnroll.refundRequest;

    await courseEnroll.save();

    return res
      .status(200)
      .json({ success: "Refund request updated successfully" });
  } catch (error) {
    console.error("Error updating refund request:", error);
    next(error);
  }
};

// exports.updateRefundRequest = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const courseEnroll = await CourseEnroll.findById(id);
//     const refundTerms = await RefundTerms.findOne();

//     if (!courseEnroll) {
//       return res.status(404).json({ error: "Course enrollment not found" });
//     }

//     // Determine the threshold for the number of days
//     const returnWindowDays = refundTerms.returnWindow + 1 || 8;

//     // console.log(returnWindowDays, "returnWindowDays");

//     // Check if less than specified days have passed since enrollment
//     const thresholdDate = new Date();
//     thresholdDate.setDate(thresholdDate.getDate() - returnWindowDays);

//     if (courseEnroll.createdAt < thresholdDate) {
//       return res.status(400).json({
//         error: `Refund request cannot be updated after ${returnWindowDays} days of enrollment`,
//       });
//     }

//     // Toggle the value of refundRequest
//     courseEnroll.refundRequest = !courseEnroll.refundRequest;

//     await courseEnroll.save();

//     return res
//       .status(200)
//       .json({ success: "Refund request updated successfully" });
//   } catch (error) {
//     console.error("Error updating refund request:", error);
//     next(error);
//   }
// };

//
// exports.razorpayVerify = async (req, res, next) => {
//   try {
//     const body =
//       req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
//     //

//     console.log("razorpayVerify-body:", body);

//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
//       .update(body.toString())
//       .digest("hex");

//     //

//     console.log("expectedSignature:", expectedSignature);

//     if (expectedSignature === req.body.razorpay_signature) {
//       const {
//         studentId,
//         courseId,
//         price,
//         firstName,
//         lastName,
//         contactNumber,
//         address1,
//         address2,
//         country,
//         city,
//         zip,
//         razorpay_payment_id,
//         currency,
//       } = req.body;

//       const course = await Course.findById(courseId);
//       const user = await User.findById(studentId);
//       const profileId = await Profile.findOne({ userId: studentId });
//       await Profile.updateOne(
//         { userId: studentId },
//         {
//           $set: {
//             name: firstName + " " + lastName,
//             userId: studentId,
//             country: country,
//             address1: address1,
//             address2: address2,
//             city: city,
//             zip: zip,
//           },
//         }
//       );

//       // <!-- Create Course Enroll -->
//       const courseEnroll = await CourseEnroll.create({
//         courseId: courseId,
//         studentId: studentId,
//         profileId: profileId._id,
//         price: price / 100, //divided 100 for converting cent to dollar
//         paymentMethod: "Razorpay",
//         transactionId: razorpay_payment_id,
//         paymentStatus: "paid",
//         currency: currency,
//       });

//       // <!-- Update Course sales and students -->
//       if (courseEnroll._id) {
//         await Course.findByIdAndUpdate(
//           { _id: courseId },
//           {
//             $set: { sales: course.sales + 1 },
//             $push: { students: courseEnroll._id },
//           },
//           { new: true }
//         );
//       }

//       const role = user.role === "admin" ? "admin" : "student";
//       await User.findByIdAndUpdate(
//         { _id: studentId },
//         {
//           $set: {
//             profile: profileId._id,
//             name: firstName + " " + lastName,
//             contactNumber: contactNumber,
//             role: role,
//           },
//           $push: { courses: courseEnroll._id },
//         },
//         { new: true }
//       );

//       res.status(200).json({ success: "Course enrolled successfully!" });
//     } else {
//       res.status(403).json({ error: "Payment is not verified!" });
//     }
//   } catch (error) {
//     next(error);
//   }
// };
