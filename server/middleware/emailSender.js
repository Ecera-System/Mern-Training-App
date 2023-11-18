const nodemailer = require('nodemailer');
require('dotenv').config();

const smtpTransport = nodemailer.createTransport({
    host: "mail.smtp2go.com",
    port: 2525, // 8025, 587 and 25 can also be used.
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

exports.verifyEmail = ({ email, code }) => {
    smtpTransport.sendMail({
        from: {
            name: 'Ecera System Training',
            address: process.env.SENDER_EMAIL
        },
        to: email,
        subject: `Email verification code`,
        html: `
        <div style="width: 100%; background-color: #F1F5F9; padding: 40px 0; font-family: 'Lato',sans-serif;">
        <style>
            @media (max-width: 600px) {
                #box {
                    width: 85% !important;
                    margin: 0 auto !important;
                }
            }
        </style>
        <div id="box" style='width: 500px; margin: 0 auto; border-radius: 8px; background-color: white; padding: 30px;'>
            <h2 style='text-align: center; margin: 10px 0; font-size: 30px; color: #1D4ED8;'>Ecera System
                Training
            </h2>
            <h1 style="margin: 0 0 15px 0; text-align: center; font-size: 20px; font-weight: 400; color: #6a6a6a;">Verify your email</h1>
            <hr />
            <h3 style="margin: 15px 0; text-align: center; font-size: 16px; font-weight: 500; color: #363636;">
                To help us confirm it’s you, Use this code below to activate your account.
            </h3>
            <p style="font-size: 40px; text-align: center; margin: 10px 0;">${code}</p>
            <p style="text-align: center; margin-bottom: 20px; font-size: 16px">
                This code will expire in 2 minutes.
            </p>
        </div>
        <p style="text-align: center; color: #363636;">&copy; Ecera System</p>
    </div>
        `
    }, function (error, response) { });
};
