const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

// Schema design
const couponCodeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    courseId: {
        type: ObjectId,
        ref: "Course",
        required: true,
    },
    couponCode: {
        type: String,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ["pending", "active", "inactive"],
        default: "active",
    },
}, {
    timestamps: true,
});

const CouponCode = mongoose.model('CouponCode', couponCodeSchema);

module.exports = CouponCode;