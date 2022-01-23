'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Teachers', [
            {
                id: '536dc7a5-348a-4f86-8aac-580ee210d82e',
                first_name: 'José',
                last_name: 'Perez',
                email: 'jperez@mail.com',
            },
        ]);

        await queryInterface.bulkInsert('Classes', [
            {
                id: '7b262cb8-20d4-47a1-b770-7cc3c9aeba97',
                title: 'Fracciones VI',
                subject_id: 7,
                grade_id: 5,
                teacher_id: '544aa1a4-73e9-421d-bf96-4f5762492e14',
                price: 450.0,
                interactive_id: '9b35a51c-2203-4487-8592-38868df6b82a',
                description_id: 'aa43927c-5af8-40f0-bb57-f62e4555132e',
                created_at: Date.now(),
                updated_at: Date.now(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Classes', null, {});
    },
};
