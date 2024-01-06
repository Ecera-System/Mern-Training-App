const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

// Schema design
const certificateSchema = mongoose.Schema({
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
    studentName: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
    },
}, {
    timestamps: true,
});

const Certificate = mongoose.model('Certificate', certificateSchema);

module.exports = Certificate;