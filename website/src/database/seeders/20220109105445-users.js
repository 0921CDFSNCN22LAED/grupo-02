'use strict';

const { Op } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Users', [
            {
                id: '17deb234-78d0-4de6-a0ff-683f14b94e35',
            },
            {
                id: '5820bf71-bf62-462d-90b7-233933ca7452',
            },
            {
                id: 'b4bae98a-2585-4c88-ba49-be5bdf5ddf78',
            },
            {
                id: '11a714ac-9d03-4eed-bc27-442573a15166',
            },
            {
                id: '49cec554-bfff-44b3-951b-5a4b5b07a69f',
            },
        ]);

        await queryInterface.bulkInsert('Parents', [
            {
                id: '780bfaa9-77ca-46e7-b96c-b4e11144bf64',
                name: 'Luios',
                email: 'luios@mail.com',
                pass: '$2a$10$/9JmQhDmfSpQ2h5jvTb.OOt3LwdUzYtyj42ZxJTJmhHVpvQXg4Xl6',
                avatar: 'avatar-1641152356809.png',
                created_at: new Date(),
                updated_at: new Date(),
                user_id: '17deb234-78d0-4de6-a0ff-683f14b94e35',
            },
            {
                id: '1c0e8356-4f3f-47a5-93f1-d60b35ac8f63',
                name: 'Jacob',
                email: 'jacob@mail.com',
                pass: '$2a$10$/9JmQhDmfSpQ2h5jvTb.OOt3LwdUzYtyj42ZxJTJmhHVpvQXg4Xl6',
                avatar: 'default-avatar.png',
                created_at: new Date(),
                updated_at: new Date(),
                user_id: '5820bf71-bf62-462d-90b7-233933ca7452',
            },
        ]);

        await queryInterface.bulkInsert('Children', [
            {
                id: '98717d0c-e37b-4881-8061-bc732b0de6fa',
                name: 'Josefina',
                avatar: 'default-avatar.png',
                user_id: 'b4bae98a-2585-4c88-ba49-be5bdf5ddf78',
                parent_id: '780bfaa9-77ca-46e7-b96c-b4e11144bf64',
                created_at: new Date(),
                updated_at: new Date(),
                grade_id: 4,
            },
            {
                id: '17ceaf56-4e72-4af6-a328-5a3efcfcbe44',
                name: 'Pedro',
                avatar: 'default-avatar.png',
                user_id: '11a714ac-9d03-4eed-bc27-442573a15166',
                parent_id: '780bfaa9-77ca-46e7-b96c-b4e11144bf64',
                created_at: new Date(),
                updated_at: new Date(),
                grade_id: 7,
            },
            {
                id: '4b8b544f-9a30-40a3-8dd1-87aa8d0fc17c',
                name: 'Anibal',
                avatar: 'default-avatar.png',
                user_id: '49cec554-bfff-44b3-951b-5a4b5b07a69f',
                parent_id: '1c0e8356-4f3f-47a5-93f1-d60b35ac8f63',
                created_at: new Date(),
                updated_at: new Date(),
                grade_id: 2,
            },
        ]);
        await queryInterface.bulkInsert('Page_comments', [
            {
                id: '03b4194b-9739-46b5-8927-955e3f90493c',
                user_id: '5820bf71-bf62-462d-90b7-233933ca7452',
                comment:
                    'Muy linda la página, me gusta que cambien los fondos al pasar por el home',
            },
            {
                id: '0785b8d3-dd04-425d-90c0-c96320af6d06',
                user_id: '11a714ac-9d03-4eed-bc27-442573a15166',
                comment: 'Va muy bien, a seguir trabajando!!! ',
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Page_comments', {
            id: {
                [Op.in]: [
                    '03b4194b-9739-46b5-8927-955e3f90493c',
                    '0785b8d3-dd04-425d-90c0-c96320af6d06',
                ],
            },
        });
        await queryInterface.bulkDelete('Children', {
            id: {
                [Op.in]: [
                    '98717d0c-e37b-4881-8061-bc732b0de6fa',
                    '17ceaf56-4e72-4af6-a328-5a3efcfcbe44',
                    '4b8b544f-9a30-40a3-8dd1-87aa8d0fc17c',
                ],
            },
        });

        await queryInterface.bulkDelete('Parents', {
            id: {
                [Op.in]: [
                    '780bfaa9-77ca-46e7-b96c-b4e11144bf64',
                    '1c0e8356-4f3f-47a5-93f1-d60b35ac8f63',
                ],
            },
        });
        await queryInterface.bulkDelete('Users', {
            id: {
                [Op.in]: [
                    '17deb234-78d0-4de6-a0ff-683f14b94e35',
                    '5820bf71-bf62-462d-90b7-233933ca7452',
                    'b4bae98a-2585-4c88-ba49-be5bdf5ddf78',
                    '11a714ac-9d03-4eed-bc27-442573a15166',
                    '49cec554-bfff-44b3-951b-5a4b5b07a69f',
                ],
            },
        });
    },
};
