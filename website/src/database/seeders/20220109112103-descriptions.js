'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Descriptions', [
            {
                id: '1280c1ed-9394-437b-bc7e-1f4f4bbf290a',
                descriptionShort: 'Intro a fracciones',
                descriptionLong: 'Intro a fracciones',
                contents: 'Denominador, Numerador',
            },
            {
                id: '336ef1e4-234b-4da5-b0dd-ecfac151063f',
                descriptionShort: 'Intro a fracciones',
                descriptionLong: 'Intro a fracciones',
                contents: 'Denominador, Numerador',
            },
            {
                id: '6e9a4f5b-52ef-4dbf-b5cf-2990c5e4fc02',
                descriptionShort: 'Intro a fracciones',
                descriptionLong: '',
                contents: 'Denominador, Numerador',
            },
            {
                id: '9e40d914-7451-4822-a71a-371d8cb8f90e',
                descriptionShort: 'Intro a fracciones',
                descriptionLong: 'Intro a fracciones',
                contents: 'Denominador, Numerador',
            },
            {
                id: 'aa43927c-5af8-40f0-bb57-f62e4555132e',
                descriptionShort: 'Intro a fracciones',
                descriptionLong: 'Intro a fracciones',
                contents: 'Denominador, Numerador',
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Descriptions', null, {});
    },
};
