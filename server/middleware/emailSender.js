const nodemailer = require("nodemailer");
const { envVar } = require("../utils/getEnvVar");
require("dotenv").config();

const smtpTransportFun = (smtpUser, smtpPassword) => {
  const smtpTransport = nodemailer.createTransport({
    host: "mail.smtp2go.com",
    port: 2525, // 8025, 587 and 25 can also be used.
    auth: {
      // user: process.env.SMTP_USER,
      // pass: process.env.SMTP_PASS,
      user: smtpUser,
      pass: smtpPassword,
    },
  });

  return smtpTransport;
};

exports.verifyEmail = ({ email, code }) => {
  smtpTransportFun(envVar.smtpUser, envVar.smtpPassword).sendMail(
    {
      from: {
        name: "Ecera System Training",
        // address: process.env.SENDER_EMAIL,
        address: envVar.senderEmail,
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
        `,
    },
    function (error, response) {
      if (error) {
        console.error(`Error sending email to ${email}: ${error}`);
      } else {
        console.log(`Email sent successfully to ${email}`);
      }
    }
  );
};

exports.sendResetPasswordMail = ({ req, email, resetPasswordToken }) => {
  smtpTransportFun(envVar.smtpUser, envVar.smtpPassword).sendMail(
    {
      from: {
        name: "Ecera System Training",
        // address: process.env.SENDER_EMAIL,
        address: envVar.senderEmail,
      },
      to: email,
      subject: `Ecera System Training Reset Password`,
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
        <div id="box" style='width: 500px; margin: 0 auto; border-radius: 8px; background-color: white; padding: 30px;>
        <h2 style='text-align: center; margin: 10px 0; font-size: 30px; color: #1D4ED8;'>Ecera System
        Training
         </h2>
            <h1 style="margin: 0 0 15px 0; text-align: center; font-size: 20px; font-weight: 400; color: #6a6a6a;">Reset Your Password</h1>
            <hr />
            <h3 style="margin: 15px 0; text-align: center; font-size: 16px; font-weight: 500; color: #363636;">
                To Reset your password click on the below link/button. I you didn't requested this email then inform to admin
            </h3>
            <a href='${req.protocol}://${req.get(
        "host"
      )}/reset-password/${resetPasswordToken}' 
            style="text-decoration: none; margin: 0 40%; font-size: 18px; padding: 5px 10px; background-color: blue; color: #fff; text-align: center;">
            Reset Password
            </a>
            <p style="text-align: center; margin-bottom: 20px; font-size: 16px">
                This link will expire in 2 minutes.
            </p>
        </div>
        <p style="text-align: center; color: #363636;">&copy; Ecera System</p>
    </div>
        `,
    },
    function (error, response) {}
  );
};
