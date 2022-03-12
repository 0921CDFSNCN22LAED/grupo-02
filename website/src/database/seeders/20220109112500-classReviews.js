'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('ClassReviews', [
            {
                id: '34433766-b4ba-42bd-9d34-dfc7e68cf0c1',
                profileId: null,
                classId: '34af5a89-acdb-4c44-86cc-fd27b7166e6f',
                rating: 5,
                review: null,
            },
            {
                id: 'f2c62f77-6eb6-46b0-bc2d-a021295a5648',
                profileId: null,
                classId: '8c45cb7b-6a5b-4c55-9cf1-89d9c1c69817',
                rating: 5,
                review: null,
            },
            {
                id: '1d349fb4-3c64-42ec-86cf-d07126a4799e',
                profileId: null,
                classId: '984dd460-3013-49de-84af-42566f2cbc22',
                rating: 4,
                review: null,
            },
            {
                id: 'e71f4138-e6af-4d54-8b27-5c1fffb4c8ff',
                profileId: null,
                classId: '984dd460-3013-49de-84af-42566f2cbc22',
                rating: 5,
                review: null,
            },
            {
                id: 'd70290af-208d-4040-95cd-48fffdcee6e9',
                profileId: null,
                classId: 'bc3bbbcf-bb24-4ad0-b11c-63888f8218e2',
                rating: 4,
                review: null,
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('ClassReviews', null, {});
    },
};
