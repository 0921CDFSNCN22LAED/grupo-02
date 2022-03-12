'use strict';

const { Op } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Users', [
            {
                id: '17deb234-78d0-4de6-a0ff-683f14b94e35',
                email: 'luios@mail.com',
                pass: '$2a$10$/9JmQhDmfSpQ2h5jvTb.OOt3LwdUzYtyj42ZxJTJmhHVpvQXg4Xl6',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: '5820bf71-bf62-462d-90b7-233933ca7452',
                email: 'jacob@mail.com',
                pass: '$2a$10$/9JmQhDmfSpQ2h5jvTb.OOt3LwdUzYtyj42ZxJTJmhHVpvQXg4Xl6',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);

        await queryInterface.bulkInsert('Profiles', [
            {
                id: '780bfaa9-77ca-46e7-b96c-b4e11144bf64',
                userId: '17deb234-78d0-4de6-a0ff-683f14b94e35',
                isParent: true,
                name: 'Luios',
                avatar: 'avatar-1641152356809.png',
                gradeId: null,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            },
            {
                id: '1c0e8356-4f3f-47a5-93f1-d60b35ac8f63',
                userId: '5820bf71-bf62-462d-90b7-233933ca7452',
                isParent: true,
                name: 'Jacob',
                avatar: 'default-avatar.png',
                gradeId: null,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            },
            {
                id: '98717d0c-e37b-4881-8061-bc732b0de6fa',
                userId: '17deb234-78d0-4de6-a0ff-683f14b94e35',
                isParent: false,
                name: 'Josefina',
                avatar: 'default-avatar.png',
                gradeId: 4,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            },
            {
                id: '17ceaf56-4e72-4af6-a328-5a3efcfcbe44',
                userId: '17deb234-78d0-4de6-a0ff-683f14b94e35',
                isParent: false,
                name: 'Pedro',
                avatar: 'default-avatar.png',
                gradeId: 7,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            },
            {
                id: '4b8b544f-9a30-40a3-8dd1-87aa8d0fc17c',
                userId: '5820bf71-bf62-462d-90b7-233933ca7452',
                isParent: false,
                name: 'Anibal',
                avatar: 'default-avatar.png',
                gradeId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            },
        ]);
        await queryInterface.bulkInsert('PageComments', [
            {
                id: '03b4194b-9739-46b5-8927-955e3f90493c',
                profileId: '17ceaf56-4e72-4af6-a328-5a3efcfcbe44',
                comment:
                    'Muy linda la página, me gusta que cambien los fondos al pasar por el home',
            },
            {
                id: '4b8b544f-9a30-40a3-8dd1-87aa8d0fc17c',
                profileId: '1c0e8356-4f3f-47a5-93f1-d60b35ac8f63',
                comment: 'Va muy bien, a seguir trabajando!!!',
            },
            {
                id: '4b8b544f-9a30-40a3-8dd1-87aa8d0fc17c',
                profileId: '780bfaa9-77ca-46e7-b96c-b4e11144bf64',
                comment: 'Tercero!',
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('PageComments', {
            id: {
                [Op.in]: [
                    '03b4194b-9739-46b5-8927-955e3f90493c',
                    '0785b8d3-dd04-425d-90c0-c96320af6d06',
                ],
            },
        });
        await queryInterface.bulkDelete('Profiles', {
            id: {
                [Op.in]: [
                    '780bfaa9-77ca-46e7-b96c-b4e11144bf64',
                    '1c0e8356-4f3f-47a5-93f1-d60b35ac8f63',
                    '98717d0c-e37b-4881-8061-bc732b0de6fa',
                    '17ceaf56-4e72-4af6-a328-5a3efcfcbe44',
                    '4b8b544f-9a30-40a3-8dd1-87aa8d0fc17c',
                ],
            },
        });
        await queryInterface.bulkDelete('Users', {
            id: {
                [Op.in]: [
                    '17deb234-78d0-4de6-a0ff-683f14b94e35',
                    '5820bf71-bf62-462d-90b7-233933ca7452',
                ],
            },
        });
    },
};
