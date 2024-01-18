require('dotenv').config();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { google } = require('googleapis');
const googleClient = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID);
const { verifyEmail, sendResetPasswordMail } = require('../middleware/emailSender');
const Profile = require('../models/Profile');
const User = require('../models/User');

exports.signup = async (req, res) => {
    try {
        const { name, contactNumber, email, password } = req.body;

        const findEmail = await User.findOne({ email });
        if (findEmail) return res.status(406).json({ error: "This email already exists!" });

        hashedPassword = await bcrypt.hash(password, 12);

        const code = Math.round(Math.random() * 90000) + 10000;
        const expirationTime = new Date(Date.now() + 2 * 60 * 1000);

        verifyEmail({ email, code });

        const user = {
            name,
            contactNumber,
            email,
            password: hashedPassword,
            status: 'inactive',
            verificationCode: {
                code,
                expirationTime,
            },
        };
        const result = await User.create(user);

        await Profile.create({
            userId: result._id,
            name: name
        });

        res.status(200).json({ id: result._id, email });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.resendCode = async (req, res) => {
    try {
        const { email } = req.body;
        const findUser = await User.findOne({ email: email });
        if (!findUser) return res.status(404).json({ error: "This email doesn't exists." });
        if (findUser.status === 'active') return res.status(406).json({ error: "This email already activated!." });

        const code = Math.round(Math.random() * 90000) + 10000;
        const expirationTime = new Date(Date.now() + 2 * 60 * 1000);
        const verificationCode = { code, expirationTime }

        verifyEmail({ email, code });

        const user = {
            ...findUser._doc,
            verificationCode: verificationCode,
        };

        const result = await User.updateOne(
            { _id: findUser._id },
            { $set: user },
            { runValidators: true }
        );

        res.status(200).json(result);

    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
}

exports.activateAccount = async (req, res) => {
    try {
        const { code, email } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) return res.status(404).json({ error: "This email doesn't exists." });

        const { code: dbCode, expirationTime } = user.verificationCode;
        const now = new Date();

        if (expirationTime < now) return res.status(408).json({ error: "Invalid verification code!" });
        if (Number(code) !== dbCode) return res.status(408).json({ error: "Wrong verification code!" });

        user.verificationCode = null;
        user.status = 'active';
        await user.save();
        res.status(200).json({ success: 'Your account verified successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong!' });
    }
};

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "This email does not exist!" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Incorrect password!" });

        if (user.status === 'inactive') return res.status(403).json({ error: "Your account is currently inactive" });
        if (user.status === 'blocked') return res.status(403).json({ error: "Your account is blocked!" });

        const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET);
        
        res.status(200).json({
            auth_token: 'Bearer ' + token,
            success: "Login success!",
            redirect: user.role === 'admin' ? '/admin' : '/profile/course',
        });

    } catch (err) {
        if (err) return res.status(500).json({ error: "Something went wrong!" })
    }
};

exports.googleSignin = async (req, res) => {
    try {
        const { id_token } = req.body;
        const verify = await googleClient.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const { email_verified, email, name, picture } = verify.payload;

        if (!email_verified) return res.status(401).send({ error: "Email isn't verified!" });

        const password = email + process.env.GOOGLE_CLIENT_SECRET;
        const passwordHash = await bcrypt.hash(password, 12);

        const user = await User.findOne({ email });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ error: "Incorrect password!" });

            if (user.status === 'inactive') return res.status(403).json({ error: "Your account is currently inactive" });
            if (user.status === 'blocked') return res.status(403).json({ error: "Your account is blocked!" });

            const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET);

            res.status(200).json({
                auth_token: 'Bearer ' + token,
                success: "Login success!",
                redirect: user.role === 'admin' ? '/admin' : '/profile/course',
            });
        }
        else {
            const user = {
                name,
                email,
                password: passwordHash,
                status: 'active',
                verificationCode: null,
            };
            const result = await User.create(user);

            await Profile.create({
                userId: result._id,
                name: name,
                avatar: picture,
            });

            const token = jwt.sign({ id: result._id }, process.env.ACCESS_TOKEN_SECRET);

            res.status(200).json({
                auth_token: 'Bearer ' + token,
                success: "Login success!",
                redirect: user.role === 'admin' ? '/admin' : '/profile',
            });
        };

    } catch (err) {
        if (err) return res.status(500).json({ error: "Something went wrong!" })
    }
};

exports.getSingleUser = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.decoded.id }).populate('profile').populate('courses');
        res.status(200).json(user);
    } catch (err) {
        next(err)
    }
};



//Forgot password

exports.forgotPassword = async(req, res, next)=>{
    const user = await User.findOne({ email: req.body.email })
    // console.log(user);

    if (!user){
        return res.status(403).json({ error: "User not found" });
    }

    // Get ResetPassword Token
    const resetToken = crypto.randomBytes(20).toString('hex');

    //hashing and adding resetPasswordingToken to userSchema
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;


    await user.save({ validateBeforeSave: false});
    // const resetPasswordUrl = `${req.protocol}://localhost:3000/password/reset/${resetToken}`;   /* ${req.get("host")} */

    // const message = `Your password reset ulr is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then ignore it`;


    try{
        sendResetPasswordMail({req, email: user.email, resetPasswordToken: resetToken})

        res.status(200).json({
            success: true,
            message: `Password reset mail sent to  ${user.email}`,
        })

    }catch(err){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save({ validateBeforeSave: false });
        // return next(new ErrorHandler(err.message, 500)); /*500*/
        return res.status(403).json({ error: err.message });
    }
}

// Reset Password
exports.resetPassword = async(req, res, next)=>{

    const {password, confirmPassword} = req.body;
    // creating token hash
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpires: { $gt: Date.now()},
    })

    if (!user){
        // return next(new ErrorHandler("Reset Password token is invalid or expired", 404)) /*400*/
        return res.status(404).json({ error: "Reset Password token is invalid or expired" });
    }

    if (password !== confirmPassword){
        return res.status(404).json({ error: "Password doest not match" });
    }

    user.password = await bcrypt.hash(password, 12);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    res.status(200).json({
        success: true,
        message: `Password reset successfully`,
    })
}


// Update user password
exports.updateUserPassword = async(req, res, next)=>{

    const { oldPassword, newPassword, confirmPassword} = req.body;

    const user = await User.findById(req.decoded.id).select("+password");

    // const user = await User.findOne({email});


    const isPasswordMatched = await bcrypt.compare(oldPassword, user.password);

    if(!isPasswordMatched){
        // return next(new ErrorHandler("Invalid Old password", 400)) /*400*/
        return res.status(400).json({ error: "Invalid Old password" });
    }

    if(oldPassword === newPassword){
        return res.status(400).json({ error: "Old Password and New password should be different" });
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
}
