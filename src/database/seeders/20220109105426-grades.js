'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Grades', [
            { id: 1, name: '1er año' },
            { id: 2, name: '2do año' },
            { id: 3, name: '3er año' },
            { id: 4, name: '4to año' },
            { id: 5, name: '5to año' },
            { id: 6, name: '6to año' },
            { id: 7, name: '7mo año' },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Grades', null);
    },
};
