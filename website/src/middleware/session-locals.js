// Todo la data pasa por este controlador

const util = require('util');

module.exports = (req, res, next) => {
    console.log(util.inspect(req.session, false, null, true));
    const user = req.session.user;
    delete user?.pass;
    res.locals.user = user;
    let profiles = req.session.profiles;
    profiles = profiles?.map((profile) => {
        delete profile.pass;
        return profile;
    });
    res.locals.profiles = profiles;
    res.locals.profile = req.session.profile;
    res.locals.childClasses = req.session.childClasses;
    res.locals.class = req.session.class;

    res.locals.userIsLoggedSecure = req.session.userIsLoggedSecure;

    res.locals.old = req.session.old;
    req.session.old = null;

    res.locals.errors = req.session.errors;
    req.session.errors = null;
    next();
};
