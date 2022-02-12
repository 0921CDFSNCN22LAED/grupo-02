'use strict';

module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.createTable('pageComments', {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
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
            comment: {
                type: DataTypes.TEXT,
            },
        });
        await queryInterface.createTable('classReviews', {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
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
            classId: {
                type: DataTypes.UUID,
                references: {
                    model: 'classes',
                    key: 'id',
                },
                onUpdate: 'cascade',
                onDelete: 'cascade',
            },
            ranking: {
                type: DataTypes.DECIMAL(2, 1),
            },
            review: {
                type: DataTypes.TEXT,
            },
        });
        await queryInterface.createTable('progress', {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
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
            classId: {
                type: DataTypes.UUID,
                references: {
                    model: 'classes',
                    key: 'id',
                },
                onUpdate: 'cascade',
                onDelete: 'cascade',
            },
            progress: {
                type: DataTypes.INTEGER,
            },
            review: {
                type: DataTypes.TEXT,
            },
        });
    },

    down: async (queryInterface, DataTypes) => {
        await queryInterface.dropTable('pageComments');
        await queryInterface.dropTable('classReviews');
        await queryInterface.dropTable('progress');
    },
};
