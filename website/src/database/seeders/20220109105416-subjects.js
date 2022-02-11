'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Subjects', [
            { id: 1, name: 'Música' },
            { id: 2, name: 'Plástica' },
            { id: 3, name: 'Teatro' },
            { id: 4, name: 'Conocimiento del mundo' },
            { id: 5, name: 'Educación Física' },
            { id: 6, name: 'Informática' },
            { id: 7, name: 'Matemática' },
            { id: 8, name: 'Prácticas del lenguaje' },
            { id: 9, name: 'Ciencias Naturales' },
            { id: 10, name: 'Ciencias Sociales' },
            { id: 11, name: 'Educación Tecnológica' },
            { id: 12, name: 'Formación Ética y Ciudadana' },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Subjects', null);
    },
};
