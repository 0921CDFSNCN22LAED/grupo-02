'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Classes', [
            {
                id: '34af5a89-acdb-4c44-86cc-fd27b7166e6f',
                title: 'Fracciones V',
                subjectId: 7,
                gradeId: 5,
                teacherId: '544aa1a4-73e9-421d-bf96-4f5762492e14',
                price: 450.0,
                interactiveId: '9b35a51c-2203-4487-8592-38868df6b82a',
                descriptionId: 'aa43927c-5af8-40f0-bb57-f62e4555132e',
                createdAt: Date.now(),
                updatedAt: Date.now(),
            },
            {
                id: '8c45cb7b-6a5b-4c55-9cf1-89d9c1c69817',
                title: 'Fracciones II',
                subjectId: 7,
                gradeId: 5,
                teacherId: '544aa1a4-73e9-421d-bf96-4f5762492e14',
                price: 450.0,
                interactiveId: 'f25ff3e0-f28b-4b0c-8620-ea5868cd5791',
                descriptionId: '1280c1ed-9394-437b-bc7e-1f4f4bbf290a',
                createdAt: Date.now(),
                updatedAt: Date.now(),
            },
            {
                id: '984dd460-3013-49de-84af-42566f2cbc22',
                title: 'Fracciones IV',
                subjectId: 7,
                gradeId: 5,
                teacherId: '544aa1a4-73e9-421d-bf96-4f5762492e14',
                price: 450.0,
                interactiveId: '727337da-e1f5-49da-ae1c-5050cc5b2ab5',
                descriptionId: '9e40d914-7451-4822-a71a-371d8cb8f90e',
                createdAt: Date.now(),
                updatedAt: Date.now(),
            },
            {
                id: '9dd3c12d-fd32-419e-8eab-7db74a5b92ed',
                title: 'Fracciones I',
                subjectId: 7,
                gradeId: 5,
                teacherId: '544aa1a4-73e9-421d-bf96-4f5762492e14',
                price: 450.0,
                interactiveId: 'a1bde8d1-bd23-42ba-a331-c4e07b1e6500',
                descriptionId: '6e9a4f5b-52ef-4dbf-b5cf-2990c5e4fc02',
                createdAt: Date.now(),
                updatedAt: Date.now(),
            },
            {
                id: 'bc3bbbcf-bb24-4ad0-b11c-63888f8218e2',
                title: 'Fracciones III',
                subjectId: 7,
                gradeId: 5,
                teacherId: '544aa1a4-73e9-421d-bf96-4f5762492e14',
                price: 450.0,
                interactiveId: '4f92bdf4-841d-42c2-9c91-51af3c73a967',
                descriptionId: '336ef1e4-234b-4da5-b0dd-ecfac151063f',
                createdAt: Date.now(),
                updatedAt: Date.now(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Classes', null, {});
    },
};
