const User = require('../models/User');
const EnvVariables = require('../models/EnvVariables.js');
const bcrypt = require('bcrypt');
const { getEnvVar } = require('../utils/getEnvVar.js');


// Update user password by admin
exports.updateUserPasswordByAdmin = async (req, res, next) => {

    try {
        const { userEmail, newPassword, confirmPassword } = req.body;

        const user = await User.findOne({ email: userEmail });

        if (!user) {
            // return next(new ErrorHandler("Invalid Old password", 400)) /*400*/
            return res.status(400).json({ error: "Invalid Email" });
        }

        const comparePassword = await bcrypt.compare(user.password, newPassword);

        if (comparePassword) {
            return res.status(400).json({ error: "New Password can't be same as Old Password" });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ error: "Password and confirm-password are different" });
        }

        user.password = await bcrypt.hash(newPassword, 12);

        await user.save();


        res.status(200).json({
            success: true,
            message: `Password updated successfully`,
        })
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

// controller function to store the environment variables
exports.storeEnvVariables = async (req, res) => {
    try {

        const isAlreadeyStored = await EnvVariables.find();

        if (isAlreadeyStored.length > 0) {
            return res.status(400).json({
                error: "You have already stored the environment variable, now you can only edit",
            })
        }

        const envVAr = {
            ...(req.body),
            editor: req.decoded._id,
        };

        const result = await EnvVariables.create(envVAr);

        await getEnvVar();

        res.status(200).json({ success: true, id: result._id, message: 'Environement Variables stored successfully!' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// API to fetch the environment variables
exports.getEnvVariables = async (req, res) => {
    try {
        const envVar = await EnvVariables.find();

        if (!envVar) {
            return res.status(404).json({ error: "Environment variables not found" })
        } else {
            await getEnvVar();
            res.status(200).json({ success: true, envVar: envVar[0] });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//controller function to update the environment variable
exports.updateEnvVariables = async (req, res) => {
    try {
        const updateFields = req.body; // Fields to be updated

        const updatedEnvVar = await EnvVariables.findOneAndUpdate(
            { editor: req.decoded._id },
            updateFields,
            { new: true } // Return the updated document
        );

        if (!updatedEnvVar) {
            return res.status(404).json({ success: false, error: 'Env. Variables not found!' });
        }

        await getEnvVar();

        res.status(200).json({ success: true, updatedEnvVar });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
