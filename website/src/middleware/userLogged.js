const { User } = require('../database/models');
const Users = require('../services/Users');

async function userLogged(req, res, next) {
    console.log('req.cookies', req.cookies);
    let emailInCookie = req.cookies.email;
    console.log('emailInCookie', emailInCookie);
    if (emailInCookie) {
        const userFromCookie = await User.findOne({
            where: { email: emailInCookie },
            raw: true,
            nest: true,
        });
        if (userFromCookie) {
            req.session.user = userFromCookie;
            req.session.profiles = await Users.findCurrentProfiles(
                req,
                userFromCookie.id
            );
        }
    }

    next();
}

module.exports = userLogged;
