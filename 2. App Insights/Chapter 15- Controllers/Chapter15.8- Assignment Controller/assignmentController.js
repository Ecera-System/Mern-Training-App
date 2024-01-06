const Assignment = require("../models/Assignment");
const Course = require("../models/Course");

exports.addAssignment = async (req, res, next) => {
    try {
        const assignment = await Assignment.create(req.body);
        const result = await Course.updateOne(
            { _id: assignment.courseId },
            { $push: { assignments: assignment._id } }
        );
        res.status(200).json({ data: result, success: 'Assignment added successfully' });
    } catch (error) {
        next(error);
    }
};

exports.getAllAssignments = async (req, res, next) => {
    try {
        const result = await Assignment.find({}).populate('courseId');
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};