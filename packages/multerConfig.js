const multer = require("multer");
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const category = file.fieldname;
    const text = req.body.text;

    let destinationPath = "./public/uploads";

    switch (category) {
      case 'nunti':
        destinationPath = path.join(destinationPath, "nunti", text);
        break;
      case 'portrete':
        destinationPath = path.join(destinationPath, "portrete", text);
        break;
      case 'fotografii-de-familie':
        destinationPath = path.join(destinationPath, "fotografii-de-familie", text);
        break;
      case 'sedinte-foto':
        destinationPath = path.join(destinationPath, "sedinte-foto", text);
        break;
      case 'save-the-date':
        destinationPath = path.join(destinationPath, "save-the-date", text);
        break;
    }


    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath, { recursive: true });
    }

    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
module.exports = upload;
