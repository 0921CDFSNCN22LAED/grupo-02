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
                type: DataTypes.INTEGER(3).UNSIGNED,
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
        await queryInterface.dropTable('progress');
        await queryInterface.dropTable('classReviews');
        await queryInterface.dropTable('pageComments');
    },
};
