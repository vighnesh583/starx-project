const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + "_" + file.originalname);
    },
});

const fileFilter = function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    if ([".pdf", ".jpg", ".jpeg", ".png"].includes(ext)) {
        cb(null, true);
    } else {
        cb(new Error("Only PDF, JPG, PNG allowed"), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
