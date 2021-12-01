const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        switch (file.fieldname) {
            case "video":
                cb(null, "public/img/clases-video");
                break;
            case "materialExtra":
                cb(null, "public/img/clases-material-extra");
                break;
            case "preview":
                cb(null, "public/img/clases-preview");
                break;
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
