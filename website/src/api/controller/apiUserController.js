const { User } = require('../../database/models');
const Users = require('../../services/Users');

module.exports = {
    allUsers: async (req, res) => {
        const users = await User.findAll({
            raw: true,
            nest: true,
            include: [{ association: 'profiles' }],
        });
        console.log('users', users);
        const mappedUsers = users.map((user) => {
            return {
                id: user.id,
                name: user.profiles.name,
                email: user.email,
                isParent: user.profiles.isParent,
                avatar: user.profiles.avatar,
                detail: `/api/users/${user.profiles.id}`,
            };
        });
        const jsonUsers = {
            count: users.length,
            users: mappedUsers,
        };

        res.json(jsonUsers);
    },
    selProfile: async (req, res) => {
        const id = req.params.id;
        const profile = await Users.findOneProfile(id);
        res.json(profile);
    },
    currUser: async (req, res) => {
        const users = await Users.findCurrentProfiles(req);
        res.json(users);
    },
};
