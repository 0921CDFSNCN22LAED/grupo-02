const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "/img/clases-preview");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now());
    },
});

const uploadFile = multer({ storage });

module.exports = uploadFile;
