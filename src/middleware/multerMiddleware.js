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
            case "avatar":
            case "childAvatar1":
            case "childAvatar2":
            case "childAvatar3":
            case "childAvatar4":
            case "childAvatar5":
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
