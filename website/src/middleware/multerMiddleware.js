const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        switch (file.fieldname) {
            case "video":
                cb(null, "public/img/clases-video");
                break;
            case "bonus":
                cb(null, "public/img/clases-material-extra");
                break;
            case "preview":
                cb(null, "public/img/clases-preview");
                break;
            case "avatar":
                cb(null, "public/img/avatars");
        }
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

const uploadFile = multer({ storage });

module.exports = uploadFile;
