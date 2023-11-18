const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

// Schema design
const courseEnrollSchema = mongoose.Schema({
    courseId: {
        type: ObjectId,
        ref: "Course",
        required: true,
    },
    studentId: {
        type: ObjectId,
        ref: "User",
        required: true,
    },
    profileId: {
        type: ObjectId,
        ref: "Profile",
        required: true,
    },
    paymentMethod: {
        type: String,
    },
    transactionId: {
        type: String,
    },
    paymentStatus: {
        type: String,
    },
    price: {
        type: String,
    },
    currency: {
        type: String,
    }
}, {
    timestamps: true,
});


const CourseEnroll = mongoose.model('CourseEnroll', courseEnrollSchema);

module.exports = CourseEnroll;
