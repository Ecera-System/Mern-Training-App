const Jimp = require("jimp");
const path = require("path");
const Profile = require("../models/Profile");
const User = require("../models/User");
const CourseEnroll = require("../models/CourseEnroll");
const Course = require("../models/Course");
const Certificate = require("../models/Certificate");

exports.getProfile = async (req, res, next) => {
    try {
        const { _id } = req.decoded;
        const result = await Profile.findOne({ userId: _id }).populate('userId');
        result && res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};


exports.updateProfileById = async (req, res, next) => {
    try {
        if (req.body.update === 'info') {
            const { name, contactNumber, birthday, avatar } = req.body;

            let imagePath;

            // <!-- Image processing -->
            if (avatar && avatar.startsWith('data:image')) {
                const buffer = Buffer.from(
                    avatar.replace(/^data:image\/(png|jpg|jpeg);base64,/, ""),
                    "base64"
                );

                imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;
                try {
                    const cachedJpegDecoder = Jimp.decoders['image/jpeg']
                    Jimp.decoders['image/jpeg'] = (data) => {
                        const userOpts = { maxMemoryUsageInMB: 1024 }
                        return cachedJpegDecoder(data, userOpts)
                    }
                    const jimpResp = await Jimp.read(buffer);
                    jimpResp.resize(300, Jimp.AUTO)
                        .write(
                            path.resolve(__dirname, `../public/images/profile/${imagePath}`)
                        );
                } catch (err) {
                    return res.status(500).json({ error: err.message });
                }
            };

            const result = await Profile.findByIdAndUpdate(
                { _id: req.params.id },
                {
                    $set: {
                        name,
                        birthday,
                        avatar: imagePath ? `/images/profile/${imagePath}` : avatar,
                    }
                }
            );

            if (!result) return res.status(404).json({ error: "Profile not found!" });

            await User.updateOne(
                { _id: req.decoded._id },
                { $set: { name: name, contactNumber: contactNumber } }
            );

            res.status(200).json({ success: "Profile update successfully!", data: result });
        };

        if (req.body.update === 'address') {
            const { country, city, address1, zip } = req.body;

            const result = await Profile.findByIdAndUpdate(
                { _id: req.params.id },
                {
                    $set: {
                        country,
                        city,
                        address1,
                        zip
                    }
                }
            );

            if (!result) return res.status(404).json({ error: "Profile not found!" });

            res.status(200).json({ success: "Address update successfully!", data: result });
        }
    } catch (error) {
        next(error);
    }
}


// <== == Admin Route Controller == ==>
// <!-- Get All Students -->
exports.getAllStudents = async (req, res, next) => {
    try {
        const { page = 1, size = 15, query } = req.query;

        // <!-- Get all queries student -->
        if (query) {
            const queriesStudent = await CourseEnroll.find({})
                .populate({
                    path: 'studentId', // Apply searchQuery to studentId population
                    match: {
                        $or: [
                            { name: { $regex: new RegExp(query, 'i') } }, //Case sensitive
                            { email: { $regex: new RegExp(query, 'i') } }, //Case sensitive
                        ],
                    },
                })
                .populate('profileId')
                .populate('courseId')

            const students = queriesStudent.filter(student =>
                student.studentId !== null
            );

            return res.status(200).json({ students, count: 0 });
        };


        // <!-- Get all student with skip and limit -->
        const skip = (page - 1) * parseInt(size);
        const limit = parseInt(size);

        const courseEnrollQuery = await CourseEnroll.find({})
            .populate('studentId')
            .populate('profileId')
            .populate('courseId')
            .skip(skip)
            .limit(limit);

        const count = await CourseEnroll.countDocuments();
        res.status(200).json({ students: courseEnrollQuery, count });
    } catch (error) {
        next(error)
    }
};

// <!-- Get All Users -->
exports.getAllUsers = async (req, res, next) => {
    try {
        const { page = 1, size = 15, query } = req.query;

        // <!-- Get all queries user -->
        if (query) {
            const profiles = await Profile.find({})
                .populate({
                    path: 'userId', // Apply searchQuery to userId population
                    match: {
                        $or: [
                            { name: { $regex: new RegExp(query, 'i') } }, //Case sensitive
                            { email: { $regex: new RegExp(query, 'i') } }, //Case sensitive
                        ],
                    },
                });

            const users = profiles.filter(user =>
                user.userId !== null
            );

            return res.status(200).json({ users, count: 0 });
        }

        // <!-- Get all user with skip and limit -->
        const skip = (page - 1) * parseInt(size);
        const limit = parseInt(size);

        const users = await Profile.find({})
            .populate('userId')
            .skip(skip)
            .limit(limit)

        const count = await Profile.countDocuments();

        res.status(200).json({ users, count });
    } catch (error) {
        next(error)
    }
};

// <!-- Update User Status By Id -->
exports.updateUserStatusById = async (req, res, next) => {
    try {
        const result = await User.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    status: req.body.status
                }
            },
            { runValidators: true }
        );

        if (!result) return res.status(404).json({ error: "No user founded with this id." });

        res.status(200).json({ success: 'User status changed successfully!', data: result });
    } catch (error) {
        next(error)
    }
};


// <!-- Delete User By Id -->
exports.deleteUserById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById({ _id: id });
        if (user.role === 'admin') return res.status(403).json({ error: "Admin can't be deleted!" });
        // <!-- Remove user id from Course -->
        await Course.updateMany(
            { students: id },
            {
                $pull: {
                    students: id
                }
            }
        );
        // <!-- Delete user profile -->
        await Profile.deleteOne({ userId: id });
        // <!-- Delete user from Course Enroll -->
        await CourseEnroll.deleteOne({ studentId: id });
        // <!-- Delete user Certificate -->
        await Certificate.deleteOne({ studentId: id });

        // <!-- Delete User -->
        const result = await User.findByIdAndDelete({ _id: id });

        if (!result) return res.status(404).json({ error: "No user founded with this id." });

        res.status(200).json({ success: 'User deleted successfully!', data: 'result' });
    } catch (error) {
        next(error)
    }
}
