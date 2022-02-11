const { User } = require('../../database/models');

module.exports = {
    allUsers: async (req, res) => {
        const users = await User.findAll();
        res.json(users);
    },
};
