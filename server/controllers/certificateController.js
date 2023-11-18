const Jimp = require("jimp");
const path = require("path");
const { createCanvas, loadImage } = require('canvas');
const Course = require("../models/Course");


exports.downloadCertificate = async (req, res, next) => {
    try {
        const { id } = req.params;
        const name = "Mostafij M F";
        const result = "4.50";
        const course = await Course.findById({ _id: id });

        const certificate = path.join(
            __dirname,
            `../public${course.certificate}`
        );

        // const templateImage = await Jimp.read(certificate);

        const templateImage = await loadImage(certificate);

        const canvas = createCanvas(templateImage.width, templateImage.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(templateImage, 0, 0, templateImage.width, templateImage.height);

        // Set the font and text color
        ctx.font = 'bold 50px Arial';
        ctx.fillStyle = 'black';

        // Calculate the position of the name text on the canvas
        const nameTextWidth = ctx.measureText(name).width;
        // const nameX = (canvas.width - nameTextWidth) / 2;
        const nameX = 250;
        const nameY = 780;

        // Draw the name text on the canvas
        ctx.fillText(name, nameX, nameY);

        // Calculate the position of the result text on the canvas
        const resultTextWidth = ctx.measureText(result).width;
        // const resultX = (canvas.width - resultTextWidth) / 2;
        const resultX = 1165;
        const resultY = 780;

        // Draw the result text on the canvas
        ctx.fillText(result, resultX, resultY);

        // Convert the canvas to a buffer
        const buffer = canvas.toBuffer();

        // Send the buffer as a response with content type 'image/png'
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': buffer.length
        });
        res.end(buffer);

    } catch (error) {
        next(error);
    }
};


exports.uploadCertificate = async (req, res, next) => {
    try {
        const { courseId, certificate } = req.body;

        if (!certificate) return res.status(404).json({ error: "Certificate is required!" });

        let imagePath = null;

        // upload image
        const buffer = Buffer.from(
            certificate.replace(/^data:image\/(png|jpg|jpeg|webp);base64,/, ""),
            "base64"
        );

        imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.png`;
        const jimpResp = await Jimp.read(buffer);

        jimpResp
            .resize(1600, Jimp.AUTO)
            .write(
                path.resolve(__dirname, `../public/images/certificate/${imagePath}`)
            );

        const result = await Course.findByIdAndUpdate(
            { _id: courseId },
            { $set: { certificate: `/images/certificate/${imagePath}` } },
            { new: true }
        );

        res.status(200).json({ data: result, success: "Certificate uploaded successfully!" })
    } catch (error) {
        next(error);
    }
};