const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

// Video schema design 
const videoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    video: {
        type: String,
        required: true,
    },
});

// Module schema design 
const moduleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    videos: [videoSchema],
});

// Course schema design 
const courseSchema = mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "Please provide a course title!"],
    },
    price: {
        type: String,
        required: true,
    },
    src_path: {
        type: String,
        required: [true, "Please provide a path name of course page!"],
    },
    cover_photo: {
        type: String,
        required: [true, "Please provide a cover photo!"],
    },
    modules: [moduleSchema],
    sales: {
        type: Number,
        default: 0
    },
    students: {
        type: [ObjectId],
        ref: 'User'
    },
    assignments: {
        type: [ObjectId],
        ref: 'Assignment'
    },
    certificate: {
        type: String,
    },
}, {
    timestamps: true,
});


const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
