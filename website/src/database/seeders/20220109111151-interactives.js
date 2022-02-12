'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Videos', [
            {
                id: '3fcca43d-7696-4bce-ae2e-aded9bfb4687',
                location: '',
            },
            {
                id: '53e6ce0f-44bc-4c55-9c4a-87969b4102d4',
                location: '',
            },
            {
                id: '91af2118-9782-49e0-b7bb-dac7268eba25',
                location: '',
            },
            {
                id: '9ab67f10-32ab-4ccc-8b76-e6427001c21b',
                location: '',
            },
            {
                id: 'ff9f4b59-f625-415f-a3db-54ea07f87132',
                location: '',
            },
        ]);
        await queryInterface.bulkInsert('Previews', [
            {
                id: '1030189b-a46d-4e23-9ca4-954f38b211c3',
                location: 'preview-1641153319554.png',
            },
            {
                id: '218fb593-02c4-4a2c-b83a-cec265d527dd',
                location: 'preview-1641153319554.png',
            },
            {
                id: '8ad4aca2-894c-4e23-bb0a-2511f0674c39',
                location: 'preview-1641153726709.png',
            },
            {
                id: 'd4728d88-741b-4b34-a287-3cdb94dcee2b',
                location: 'preview-1641153726709.png',
            },
            {
                id: 'f0da1abd-ecb6-4bd5-9b34-cdcc0bf1845f',
                location: 'preview-1641153738361.png',
            },
        ]);
        await queryInterface.bulkInsert('Bonuses', [
            {
                id: '35af3a40-a240-44d1-b907-89a4aa5dc172',
                location: '',
            },
            {
                id: '4e801d09-6135-4e96-8c0d-a4e3c94b5c7d',
                location: '',
            },
            {
                id: '6e0ebd10-0f6f-46b3-9176-792ada5f98ec',
                location: '',
            },
            {
                id: 'c25a077d-70e8-455d-be27-bfed321da315',
                location: '',
            },
            {
                id: 'd56267a7-19ed-4569-993c-85804bb09cd3',
                location: '',
            },
        ]);
        await queryInterface.bulkInsert('Interactives', [
            {
                id: '4f92bdf4-841d-42c2-9c91-51af3c73a967',
                videoId: '9ab67f10-32ab-4ccc-8b76-e6427001c21b',
                previewId: '8ad4aca2-894c-4e23-bb0a-2511f0674c39',
                bonusId: 'c25a077d-70e8-455d-be27-bfed321da315',
            },
            {
                id: '727337da-e1f5-49da-ae1c-5050cc5b2ab5',
                videoId: '91af2118-9782-49e0-b7bb-dac7268eba25',
                previewId: '218fb593-02c4-4a2c-b83a-cec265d527dd',
                bonusId: 'd56267a7-19ed-4569-993c-85804bb09cd3',
            },
            {
                id: '9b35a51c-2203-4487-8592-38868df6b82a',
                videoId: '53e6ce0f-44bc-4c55-9c4a-87969b4102d4',
                previewId: 'd4728d88-741b-4b34-a287-3cdb94dcee2b',
                bonusId: '4e801d09-6135-4e96-8c0d-a4e3c94b5c7d',
            },
            {
                id: 'a1bde8d1-bd23-42ba-a331-c4e07b1e6500',
                videoId: 'ff9f4b59-f625-415f-a3db-54ea07f87132',
                previewId: '1030189b-a46d-4e23-9ca4-954f38b211c3',
                bonusId: '35af3a40-a240-44d1-b907-89a4aa5dc172',
            },
            {
                id: 'f25ff3e0-f28b-4b0c-8620-ea5868cd5791',
                videoId: '3fcca43d-7696-4bce-ae2e-aded9bfb4687',
                previewId: 'f0da1abd-ecb6-4bd5-9b34-cdcc0bf1845f',
                bonusId: '6e0ebd10-0f6f-46b3-9176-792ada5f98ec',
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Interactives', null, {});
        await queryInterface.bulkDelete('Bonuses', null, {});
        await queryInterface.bulkDelete('Previews', null, {});
        await queryInterface.bulkDelete('Videos', null, {});
    },
};
