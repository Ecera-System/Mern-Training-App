require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { google } = require('googleapis');
const googleClient = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID);
const { verifyEmail } = require('../middleware/emailSender');
const Profile = require('../models/Profile');
const User = require('../models/User');

exports.signup = async (req, res) => {
    try {
        const { name, contactNumber, email, password } = req.body;

        const findEmail = await User.findOne({ email });
        if (findEmail) return res.status(406).json({ error: "This email already exists!" });

        const passwordHash = await bcrypt.hash(password, 12);

        const code = Math.round(Math.random() * 90000) + 10000;
        const expirationTime = new Date(Date.now() + 2 * 60 * 1000);

        verifyEmail({ email, code });

        const user = {
            name,
            contactNumber,
            email,
            password: passwordHash,
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
        res.status(500).json({ error: 'Something went wrong!' });
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
