'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Sales', [
            {
                id: '13c76b1b-d80f-4173-88bf-86edf9cf4196',
                created_at: '2022-01-03 16:18:58',
                updated_at: '2022-01-03 16:19:32',
                bought: 1,
                user_id: 'b4b44c03-226c-48e7-871f-fd33ff1fdb5c',
            },
            {
                id: '57213eb5-7665-4448-8474-3ad723867d84',
                created_at: '2022-01-02 17:03:43',
                updated_at: '2022-01-02 17:03:50',
                bought: 1,
                user_id: 'b47d2238-3563-42ff-9384-c906c8951831',
            },
            {
                id: 'a16e849b-8ab2-4f72-b98c-09f558422a0b',
                created_at: '2022-01-05 12:09:00',
                updated_at: '2022-01-05 12:35:46',
                bought: 1,
                user_id: 'b4b44c03-226c-48e7-871f-fd33ff1fdb5c',
            },
            {
                id: 'e70299b8-ae28-4c3e-b2c3-8c1f074a88bc',
                created_at: '2022-01-03 08:34:34',
                updated_at: '2022-01-03 08:35:55',
                bought: 1,
                user_id: 'b4b44c03-226c-48e7-871f-fd33ff1fdb5c',
            },
        ]);
        await queryInterface.bulkInsert('Classes_sales', [
            {
                id: '1223b9de-d53a-4093-a461-052ebd963081',
                class_id: '9dd3c12d-fd32-419e-8eab-7db74a5b92ed',
                sale_id: '57213eb5-7665-4448-8474-3ad723867d84',
            },
            {
                id: 'c429a495-28b7-483c-801d-4a7dc947dbe7',
                class_id: 'bc3bbbcf-bb24-4ad0-b11c-63888f8218e2',
                sale_id: 'e70299b8-ae28-4c3e-b2c3-8c1f074a88bc',
            },
            {
                id: '2b08fb2e-a0e8-496a-84ba-73507bb0c490',
                class_id: '9dd3c12d-fd32-419e-8eab-7db74a5b92ed',
                sale_id: '13c76b1b-d80f-4173-88bf-86edf9cf4196',
            },
            {
                id: '83116300-9b7a-49da-bb12-52b95dadc6ad',
                class_id: '8c45cb7b-6a5b-4c55-9cf1-89d9c1c69817',
                sale_id: '13c76b1b-d80f-4173-88bf-86edf9cf4196',
            },
            {
                id: 'a2af0c11-6a43-435e-a6b0-8a4a5da62602',
                class_id: '9dd3c12d-fd32-419e-8eab-7db74a5b92ed',
                sale_id: 'a16e849b-8ab2-4f72-b98c-09f558422a0b',
            },
            {
                id: 'ea5e6eae-1b54-42cd-9d79-5a15eb6d901d',
                class_id: '8c45cb7b-6a5b-4c55-9cf1-89d9c1c69817',
                sale_id: 'a16e849b-8ab2-4f72-b98c-09f558422a0b',
            },
            {
                id: 'f45ba955-2aac-4834-8833-5e5094145176',
                class_id: 'bc3bbbcf-bb24-4ad0-b11c-63888f8218e2',
                sale_id: 'a16e849b-8ab2-4f72-b98c-09f558422a0b',
            },
            {
                id: '5ae5a249-95a3-4c2f-9514-3345383b4f63',
                class_id: '984dd460-3013-49de-84af-42566f2cbc22',
                sale_id: 'a16e849b-8ab2-4f72-b98c-09f558422a0b',
            },
            {
                id: '1fc68dc0-980e-4b69-b1eb-4ea313de7cc3',
                class_id: '7b262cb8-20d4-47a1-b770-7cc3c9aeba97',
                sale_id: 'a16e849b-8ab2-4f72-b98c-09f558422a0b',
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Classes_sales', null, {});
        await queryInterface.bulkDelete('Classes', null, {});
    },
};
