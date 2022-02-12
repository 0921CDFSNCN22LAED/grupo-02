'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Teachers', [
            {
                id: '544aa1a4-73e9-421d-bf96-4f5762492e14',
                firstName: 'Ramón',
                lastName: 'Castillo',
                email: 'rcastillo@mail.com',
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Teachers', null, {});
    },
};
