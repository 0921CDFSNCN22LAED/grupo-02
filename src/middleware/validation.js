const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
    const errors = validationResult(req);
    req.session.old = {
        title: req.body.title,
        price: req.body.price,
        "subject.id": req.body.subject,
        "grades.id": req.body.grade,
        "teacher.first_name": req.body.teacherFirstName,
        "teacher.last_name": req.body.teacherLastName,
        "teacher.email": req.body.teacherEmail,
        "teacher.cv": req.body.teacherCv,
        "interactive.video.location": req.files.video
            ? req.files.video[0].filename
            : "",
        "interactive.preview.location": req.files.preview
            ? req.files.preview[0].filename
            : "",
        "interactive.bonus.location": req.files.location
            ? req.files.location[0].filename
            : "",
        "description.description_short": req.body.description_short,
        "description.description_long": req.body.description_short,
        "description.contents": req.body.contents,
    };
    if (!errors.isEmpty()) {
        req.session.errors = errors.mapped();
        res.redirect("back");
    } else {
        next();
    }
};
