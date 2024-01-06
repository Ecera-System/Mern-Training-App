const User = require('../models/User');
const bcrypt = require('bcrypt');

// Update user password by admin
exports.updateUserPasswordByAdmin = async(req, res, next)=>{

    try {
        const { userEmail, newPassword, confirmPassword} = req.body;

    const user = await User.findOne({email: userEmail});

    if(!user){
        // return next(new ErrorHandler("Invalid Old password", 400)) /*400*/
        return res.status(400).json({ error: "Invalid Email" });
    }

    const comparePassword = await bcrypt.compare(user.password, newPassword);

    if(comparePassword){
        return res.status(400).json({ error: "New Password can't be same as Old Password" });
    }

    if(newPassword !== confirmPassword){
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