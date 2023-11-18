const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;


// Schema design
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your full name!"],
        trim: true,
    },
    contactNumber: {
        type: String,
        validate: [validator.isMobilePhone, "Please provide a valid contact number."],
    },
    email: {
        type: String,
        required: [true, "Email address is required!"],
        validate: [validator.isEmail, "Provide a valid email address!"],
        trim: true,
        unique: [true, "This email already exists!"],
    },
    password: {
        type: String,
        required: [true, "Please provide a valid password!"],
        validate: {
            validator: (value) =>
                validator.isStrongPassword(value, {
                    minLength: 6,
                    minNumber: 1,
                    minUppercase: 1,
                    minSymbols: 1,
                }),
            message: "Password {VALUE} is not strong enough!",
        },
    },
    verificationCode: {
        type: Object,
    },
    role: {
        type: String,
        enum: ['student', 'user', 'admin'],
        default: 'user'
    },
    status: {
        type: String,
        enum: ["active", "inactive", "blocked"],
        default: "inactive",
    },
    profile: {
        type: ObjectId,
        ref: "Profile",
    },
    courses: [
        {
            type: ObjectId,
            ref: 'Course'
        }
    ],
    referralUser: {
        type: [ObjectId],
        ref: "User",
    },
}, {
    timestamps: true,
});


const User = mongoose.model('User', userSchema);

module.exports = User;
