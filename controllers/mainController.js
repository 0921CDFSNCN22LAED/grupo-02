const controller = {
    home: (req, res) => {
        return res.render("home");
    },
    register: (req, res) => {
        return res.render("register");
    },
};

module.exports = controller;
