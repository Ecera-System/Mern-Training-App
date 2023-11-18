// const fs = require('fs-extra');
// const path = require('path');
const BookCounselling = require('../models/BookCounselling');

exports.getAllBookCounselling = async (req, res, next) => {
    try {
        const result = await BookCounselling.find({});
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}
exports.bookAFreeCounselling = async (req, res, next) => {
    try {
        const { name, email, contactNumber,slots } = req.body;
        console.log(req.body)

        if (!(name && email && contactNumber))
            return res.status(403).json({ error: "Name, Email & Contact Number must be needed" });

        //validator file type
        // if (![
        //     'application/pdf',
        //     'application/msword',
        // ].includes(resume.type)) {
        //     return res.status(406).json({ error: 'Only PDF and DOC files are supported!' });
        // };

        // validate file size. max 5 MB
        // if (resume.size > 5000000) {
        //     return res.status(413).json({ error: 'File size should not exceed 5 MB' });
        // }

        // if (resume.data) {
        //     const buffer = Buffer.from(
        //         resume.data.replace(/^data:\w+\/\w+;base64,/, ""),
        //         "base64"
        //     );

            // save file to disk
            // const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${resume.type.split('/')[1]}`;
            // const directory = path.join(__dirname, `../public/images/bookCounsellingResume`);
            // await fs.ensureDir(directory);
            // const newPath = path.join(directory, fileName);
            // await fs.writeFile(newPath, buffer);

            const result = await BookCounselling.create({
                name,
                email,
                contactNumber,
                slots,
                // resume: `/images/bookCounsellingResume/${fileName}`
            });

            res.status(200).json({
                data: result,
                success: "The request has been submitted. Someone from the team will contact you shortly."
            });
        // }
        // else {
        //     return res.status(500).json({ error: "Something went wrong!" });
        // }

    } catch (error) {
        next(error);
    }
}