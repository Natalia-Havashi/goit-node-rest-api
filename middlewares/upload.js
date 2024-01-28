const multer = require("multer");
const path = require("path");

const destination = path.join(__dirname, "../tmp");

const storage = multer.diskStorage({
  destination,
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = `${uniqueSuffix}_${file.originalname}`;
    callback(null, filename);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 5,
};

const upload = multer({
  storage,
  limits,
});

module.exports = {
  upload,
};
