const { User, Profile } = require('../../database/models');
const Users = require('../../services/Users');

function flattenObject(ob) {
    const toReturn = {};

    for (let i in ob) {
        if (!ob.hasOwnProperty(i)) continue;

        if (typeof ob[i] == 'object' && ob[i] !== null) {
            const flatObject = flattenObject(ob[i]);
            for (let x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) continue;

                toReturn[i + '.' + x] = flatObject[x];
            }
        } else {
            toReturn[i] = ob[i];
        }
    }
    return toReturn;
}

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
    flattenedList: async (req, res) => {
        const users = await User.findAll({
            raw: true,
            nest: true,
            include: [
                {
                    model: Profile,
                    as: 'profiles',
                    include: [{ association: 'grade' }],
                },
            ],
        });
        const flattenedUsers = users.map((user) => flattenObject(user));
        flattenedUsers.forEach((user) => delete user.pass);
        res.json({
            meta: {
                status: 200,
                total: users.length,
                url: '/api/users/flattened',
            },
            data: flattenedUsers,
        });
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
