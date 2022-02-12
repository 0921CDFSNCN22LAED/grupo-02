'use strict';

module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.createTable('sales', {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            bought: {
                type: DataTypes.BOOLEAN,
            },
            userId: {
                type: DataTypes.UUID,
            },
            createdAt: {
                type: DataTypes.DATE,
            },
            updatedAt: {
                type: DataTypes.DATE,
            },
        });
        await queryInterface.createTable('classesSales', {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            classId: {
                type: DataTypes.UUID,
                references: {
                    model: 'classes',
                    key: 'id',
                },
                onUpdate: 'cascade',
                onDelete: 'cascade',
            },
            saleId: {
                type: DataTypes.UUID,
                references: {
                    model: 'sales',
                    key: 'id',
                },
                onUpdate: 'cascade',
                onDelete: 'cascade',
            },
            historicPrice: {
                type: DataTypes.DOUBLE,
            },
            createdAt: {
                type: DataTypes.DATE,
            },
            updatedAt: {
                type: DataTypes.DATE,
            },
        });
    },

    down: async (queryInterface, DataTypes) => {
        await queryInterface.dropTable('sales');
        await queryInterface.dropTable('classesSales');
    },
};
