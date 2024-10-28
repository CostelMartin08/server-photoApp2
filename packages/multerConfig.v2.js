const multer = require("multer");
const fs = require('fs');
const path = require("path");

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
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const fileExtension = path.extname(file.originalname);
            const baseName = path.basename(file.originalname, fileExtension);

            const newFileName = `${baseName}-${uniqueSuffix}${fileExtension}`;
            file.generatedName = newFileName; 

            cb(null, newFileName);
        },
    });
};

const uploadMiddleware = (details) => {
    return multer({
        storage: customStorage(details),
        limits: { fileSize: 1 * 1024 * 1024 }, //1MB pe fișier
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
