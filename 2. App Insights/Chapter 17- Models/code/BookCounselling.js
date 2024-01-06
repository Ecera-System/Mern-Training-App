const mongoose = require('mongoose');
const validator = require('validator');
// const { ObjectId } = mongoose.Schema.Types;
// Schema design
const bookCounsellingSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Name is required!"],
    },
    email: {
        type: String,
        required: [true, "Email address is required!"],
        validate: [validator.isEmail, "Provide a valid email address!"],
        trim: true,
    },
    contactNumber: {
        type: String,
        required: true,
        validate: [validator.isMobilePhone, "Please provide a valid contact number."],
    },
    slots: [{ date: String, time: String }],
    // resume: {
    //     type: String,
    //     required: [true, 'Resume is required!']
    // }
}, {
    timestamps: true,
});
const BookCounselling = mongoose.model('BookCounselling', bookCounsellingSchema);
module.exports = BookCounselling;

