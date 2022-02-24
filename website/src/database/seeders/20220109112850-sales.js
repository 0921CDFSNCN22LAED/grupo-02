'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Sales', [
            {
                id: '47ec2a23-c91c-4374-abed-8fab9ffcdfa1',
                bought: true,
                profileId: '98717d0c-e37b-4881-8061-bc732b0de6fa',
                createdAt: Date.now(),
                updatedAt: Date.now(),
            },
            {
                id: '57213eb5-7665-4448-8474-3ad723867d84',
                bought: true,
                profileId: '98717d0c-e37b-4881-8061-bc732b0de6fa',
                createdAt: Date.now(),
                updatedAt: Date.now(),
            },
            {
                id: 'a16e849b-8ab2-4f72-b98c-09f558422a0b',
                bought: true,
                profileId: '17ceaf56-4e72-4af6-a328-5a3efcfcbe44',
                createdAt: Date.now(),
                updatedAt: Date.now(),
            },
            {
                id: 'e70299b8-ae28-4c3e-b2c3-8c1f074a88bc',
                bought: true,
                profileId: '4b8b544f-9a30-40a3-8dd1-87aa8d0fc17c',
                createdAt: Date.now(),
                updatedAt: Date.now(),
            },
        ]);
        await queryInterface.bulkInsert('ClassesSales', [
            {
                id: '1223b9de-d53a-4093-a461-052ebd963081',
                classId: 'bc3bbbcf-bb24-4ad0-b11c-63888f8218e2',
                saleId: '47ec2a23-c91c-4374-abed-8fab9ffcdfa1',
                historicPrice: 450.0,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            },
            {
                id: 'c429a495-28b7-483c-801d-4a7dc947dbe7',
                classId: 'bc3bbbcf-bb24-4ad0-b11c-63888f8218e2',
                saleId: '47ec2a23-c91c-4374-abed-8fab9ffcdfa1',
                historicPrice: 450.0,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            },
            {
                id: '2b08fb2e-a0e8-496a-84ba-73507bb0c490',
                classId: '984dd460-3013-49de-84af-42566f2cbc22',
                saleId: '47ec2a23-c91c-4374-abed-8fab9ffcdfa1',
                historicPrice: 450.0,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            },
            {
                id: 'a2af0c11-6a43-435e-a6b0-8a4a5da62602',
                classId: '34af5a89-acdb-4c44-86cc-fd27b7166e6f',
                saleId: 'a16e849b-8ab2-4f72-b98c-09f558422a0b',
                historicPrice: 450.0,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('ClassesSales', null, {});
        await queryInterface.bulkDelete('Sales', null, {});
    },
};
