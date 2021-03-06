'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Teachers', [
            {
                id: '536dc7a5-348a-4f86-8aac-580ee210d82e',
                firstName: 'José',
                lastName: 'Perez',
                email: 'jperez@mail.com',
            },
        ]);

        await queryInterface.bulkInsert('Classes', [
            {
                id: '7b262cb8-20d4-47a1-b770-7cc3c9aeba97',
                title: 'Fracciones VI',
                subjectId: 7,
                gradeId: 5,
                teacherId: '544aa1a4-73e9-421d-bf96-4f5762492e14',
                price: 450.0,
                interactiveId: '9b35a51c-2203-4487-8592-38868df6b82a',
                descriptionId: 'aa43927c-5af8-40f0-bb57-f62e4555132e',
                createdAt: Date.now(),
                updatedAt: Date.now(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Classes', null, {});
    },
};
