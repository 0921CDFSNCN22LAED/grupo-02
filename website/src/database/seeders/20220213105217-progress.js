'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Progress', [
            {
                id: 'ec64f657-330b-4e77-aacb-eb67045d8adc',
                progress: 60,
                profileId: '98717d0c-e37b-4881-8061-bc732b0de6fa',
                classId: 'bc3bbbcf-bb24-4ad0-b11c-63888f8218e2',
                createdAt: Date.now(),
                updatedAt: Date.now(),
            },
            {
                id: '754fc3e3-edeb-47a9-a622-95af51828d06',
                progress: 40,
                profileId: '98717d0c-e37b-4881-8061-bc732b0de6fa',
                classId: 'bc3bbbcf-bb24-4ad0-b11c-63888f8218e2',
                createdAt: Date.now(),
                updatedAt: Date.now(),
            },
            {
                id: '6a51b3f8-5bd1-4034-a8a2-b35c77b1ac1a',
                progress: 100,
                profileId: '98717d0c-e37b-4881-8061-bc732b0de6fa',
                classId: 'bc3bbbcf-bb24-4ad0-b11c-63888f8218e2',
                createdAt: Date.now(),
                updatedAt: Date.now(),
            },
            {
                id: 'dd83dd24-403d-4648-a45a-f1aecf24b2d6',
                progress: 0,
                profileId: '17ceaf56-4e72-4af6-a328-5a3efcfcbe44',
                classId: '34af5a89-acdb-4c44-86cc-fd27b7166e6f',
                createdAt: Date.now(),
                updatedAt: Date.now(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Progress', null, {});
    },
};
