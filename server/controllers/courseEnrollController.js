const crypto = require('crypto');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEB_HOOK_SECRET;
const Razorpay = require("razorpay");
const instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_SECRET_KEY, });
const Course = require("../models/Course");
const CourseEnroll = require("../models/CourseEnroll");
const Profile = require("../models/Profile");
const User = require("../models/User");


// <!-- Get Student enrolled course -->
exports.getEnrolledCourse = async (req, res, next) => {
    try {
        const result = await CourseEnroll.find({ studentId: req.decoded._id }).populate('courseId');
        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}

// <!-- Get Student enrolled course -->
exports.getRecentOrders = async (req, res, next) => {
    try {
        const result = await CourseEnroll.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .populate('courseId')
            .populate('studentId')
            .populate('profileId');

        res.status(200).json(result);
    } catch (error) {
        next(error)
    }
}


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
                }
            ],
            customer_email: email,
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/stripe/checkout/course/${courseId}?success=true`,
            cancel_url: `${process.env.CLIENT_URL}/stripe/checkout/course/${courseId}?canceled=true`,
        });

        session.url ?
            res.status(200).json({ url: session.url })
            :
            res.status(500).json({ error: 'Something went wrong!' });
    } catch (error) {
        next(error)
    }
};

// <!-- Course Enroll Verify with Stripe Web-Hook -->
exports.postStripeWebHook = async (req, res, next) => {
    try {
        const sig = req.headers['stripe-signature'];
        const event = await stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

        if (event.type === 'checkout.session.completed') {
            const { studentId, courseId, firstName, lastName, email, contactNumber, address1, address2, country, city, zip, } = event.data.object.metadata;

            const course = await Course.findById(courseId);
            const user = await User.findById(studentId);
            const profile = await Profile.findOne({ userId: studentId });
            await Profile.updateOne(
                { userId: studentId },
                {
                    $set: {
                        name: firstName + ' ' + lastName,
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
                        $push: { students: courseEnroll._id }
                    },
                    { new: true }
                )
            };

            const role = user.role === 'admin' ? 'admin' : 'student';
            await User.findByIdAndUpdate(
                { _id: studentId },
                {
                    $set: {
                        profile: profile._id,
                        name: firstName + ' ' + lastName,
                        contactNumber: contactNumber,
                        role: role,
                    },
                    $push: { courses: courseEnroll._id },
                },
                { new: true }
            );

            res.status(200).json({ success: 'Course enrolled successfully!' });
        }
        else {
            res.status(403).json({})
        };
    } catch (error) {
        next(error)
    }
};

// <!-- Course Enroll with Razorpay -->
exports.enrollCourseByINR = async (req, res, next) => {
    try {
        const { _id, email } = req.decoded;
        const order = await instance.orders.create({
            amount: req.body.price * 100,
            currency: "USD",
        });

        order ?
            res.status(200).json({
                ...order,
                studentId: _id,
                email
            })
            :
            res.status(500).json({ error: 'Something went wrong!' });

    } catch (error) {
        next(error)
    }
};

// <!-- Course Enroll Verify with Razorpay api -->
exports.razorpayVerify = async (req, res, next) => {
    try {
        const body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET_KEY)
            .update(body.toString())
            .digest('hex');

        if (expectedSignature === req.body.razorpay_signature) {
            const { studentId, courseId, price, firstName, lastName, contactNumber, address1, address2, country, city, zip, razorpay_payment_id, currency } = req.body;


            const course = await Course.findById(courseId);
            const user = await User.findById(studentId);
            const profileId = await Profile.findOne({ userId: studentId });
            await Profile.updateOne(
                { userId: studentId },
                {
                    $set: {
                        name: firstName + ' ' + lastName,
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
                paymentStatus: 'paid',
                currency: currency,
            });

            // <!-- Update Course sales and students -->
            if (courseEnroll._id) {
                await Course.findByIdAndUpdate(
                    { _id: courseId },
                    {
                        $set: { sales: course.sales + 1 },
                        $push: { students: courseEnroll._id }
                    },
                    { new: true }
                )
            };

            const role = user.role === 'admin' ? 'admin' : 'student';
            await User.findByIdAndUpdate(
                { _id: studentId },
                {
                    $set: {
                        profile: profileId._id,
                        name: firstName + ' ' + lastName,
                        contactNumber: contactNumber,
                        role: role
                    },
                    $push: { courses: courseEnroll._id }
                },
                { new: true }
            );

            res.status(200).json({ success: 'Course enrolled successfully!' });

        } else {
            res.status(403).json({ error: 'Payment is not verified!' })
        };
    } catch (error) {
        next(error);
    }
}