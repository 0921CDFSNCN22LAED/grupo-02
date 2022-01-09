'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Classes', [
            {
                id: '7b262cb8-20d4-47a1-b770-7cc3c9aeba97',
                title: 'Fracciones V',
                subject_id: 7,
                grade_id: 5,
                teacher_id: '544aa1a4-73e9-421d-bf96-4f5762492e14',
                price: 450.0,
                interactive_id: '9b35a51c-2203-4487-8592-38868df6b82a',
                description_id: 'aa43927c-5af8-40f0-bb57-f62e4555132e',
                created_at: Date.now(),
                updated_at: Date.now(),
            },
            {
                id: '8c45cb7b-6a5b-4c55-9cf1-89d9c1c69817',
                title: 'Fracciones II',
                subject_id: 7,
                grade_id: 5,
                teacher_id: '544aa1a4-73e9-421d-bf96-4f5762492e14',
                price: 450.0,
                interactive_id: 'f25ff3e0-f28b-4b0c-8620-ea5868cd5791',
                description_id: '1280c1ed-9394-437b-bc7e-1f4f4bbf290a',
                created_at: Date.now(),
                updated_at: Date.now(),
            },
            {
                id: '984dd460-3013-49de-84af-42566f2cbc22',
                title: 'Fracciones IV',
                subject_id: 7,
                grade_id: 5,
                teacher_id: '544aa1a4-73e9-421d-bf96-4f5762492e14',
                price: 450.0,
                interactive_id: '727337da-e1f5-49da-ae1c-5050cc5b2ab5',
                description_id: '9e40d914-7451-4822-a71a-371d8cb8f90e',
                created_at: Date.now(),
                updated_at: Date.now(),
            },
            {
                id: '9dd3c12d-fd32-419e-8eab-7db74a5b92ed',
                title: 'Fracciones I',
                subject_id: 7,
                grade_id: 5,
                teacher_id: '544aa1a4-73e9-421d-bf96-4f5762492e14',
                price: 450.0,
                interactive_id: 'a1bde8d1-bd23-42ba-a331-c4e07b1e6500',
                description_id: '6e9a4f5b-52ef-4dbf-b5cf-2990c5e4fc02',
                created_at: Date.now(),
                updated_at: Date.now(),
            },
            {
                id: 'bc3bbbcf-bb24-4ad0-b11c-63888f8218e2',
                title: 'Fracciones III',
                subject_id: 7,
                grade_id: 5,
                teacher_id: '544aa1a4-73e9-421d-bf96-4f5762492e14',
                price: 450.0,
                interactive_id: '4f92bdf4-841d-42c2-9c91-51af3c73a967',
                description_id: '336ef1e4-234b-4da5-b0dd-ecfac151063f',
                created_at: Date.now(),
                updated_at: Date.now(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Classes', null, {});
    },
};
