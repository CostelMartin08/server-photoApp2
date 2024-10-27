const multer = require("multer");
const fs = require('fs');

const customStorage = (details) => {
    return multer.diskStorage({
        destination: function (req, file, cb) {
            let destinationPath = `./public/uploads/${details.category}/${details.title}`;

            if (!fs.existsSync(destinationPath)) {
                fs.mkdirSync(destinationPath, { recursive: true });
            }

            cb(null, destinationPath);
        },
        filename: function (req, file, cb) {
            cb(null, `${file.originalname}`);
        },
    });
};

const uploadMiddleware = (details) => {
    return multer({
        storage: customStorage(details),
        limits: { fileSize: 1 * 1024 * 1024 }, //1MB PE FISIER
        fileFilter: function (req, file, cb) {

            if (file.mimetype === 'image/webp') {
                cb(null, true);
            } else {
                cb(new Error("Tipul de fișier nu este acceptat. Sunt acceptate doar fișiere WebP."), false);
            }
        }
    }).single('file');
};

module.exports = uploadMiddleware;
