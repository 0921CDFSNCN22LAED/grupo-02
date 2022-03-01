const { Teacher } = require('../../database/models');

module.exports = {
    count: async (req, res) => {
        const count = await Teacher.count();
        res.json({
            status: 200,
            title: 'maestros',
            count,
        });
    },
};
