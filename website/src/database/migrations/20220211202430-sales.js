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
            profileId: {
                type: DataTypes.UUID,
                references: {
                    model: 'profiles',
                    key: 'id',
                },
                onUpdate: 'cascade',
                onDelete: 'cascade',
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
        await queryInterface.dropTable('classesSales');
        await queryInterface.dropTable('sales');
    },
};
