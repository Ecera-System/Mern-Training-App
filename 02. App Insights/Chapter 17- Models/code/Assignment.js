const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

// Schema design
const assignmentSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Assignment name is required!"],
    },
    courseId: {
        type: ObjectId,
        ref: "Course",
        required: true,
    },
    mark: {
        type: Number,
        required: [true, "Mark is required!"],
    },
    deadline: {
        type: String,
        required: [true, "Deadline is required!"],
    },
    hints: {
        type: String,
    },
    brief: {
        type: String,
        required: [true, "Brief is required!"],
    },
    submitAssignments: {
        type: [ObjectId],
        ref: "SubmitAssignment",
    }
}, {
    timestamps: true,
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;