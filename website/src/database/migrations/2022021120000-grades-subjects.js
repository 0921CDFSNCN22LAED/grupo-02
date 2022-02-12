'use strict';

module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.createTable('grades', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
            },
        });
        await queryInterface.createTable('subjects', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        });
    },

    down: async (queryInterface, DataTypes) => {
        await queryInterface.dropTable('grades');
        await queryInterface.dropTable('subjects');
    },
};
