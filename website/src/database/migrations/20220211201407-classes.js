'use strict';

module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.createTable('videos', {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            location: {
                type: DataTypes.STRING,
            },
            len: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
        });
        await queryInterface.createTable('previews', {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            location: {
                type: DataTypes.STRING,
            },
        });
        await queryInterface.createTable('bonuses', {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            location: {
                type: DataTypes.STRING,
            },
        });
        await queryInterface.createTable('interactives', {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            videoId: {
                type: DataTypes.UUID,
                references: {
                    model: 'videos',
                    key: 'id',
                },
                onUpdate: 'cascade',
                onDelete: 'cascade',
            },
            previewId: {
                type: DataTypes.UUID,
                references: {
                    model: 'previews',
                    key: 'id',
                },
                onUpdate: 'cascade',
                onDelete: 'cascade',
            },
            bonusId: {
                type: DataTypes.UUID,
                references: {
                    model: 'bonuses',
                    key: 'id',
                },
                onUpdate: 'cascade',
                onDelete: 'cascade',
            },
        });
        await queryInterface.createTable('descriptions', {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            descriptionShort: {
                type: DataTypes.STRING,
            },
            descriptionLong: {
                type: DataTypes.STRING,
            },
            contents: {
                type: DataTypes.STRING,
            },
        });
        await queryInterface.createTable('classes', {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            subjectId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'subjects',
                    key: 'id',
                },
                onUpdate: 'cascade',
                onDelete: 'cascade',
            },
            gradeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'grades',
                    key: 'id',
                },
                onUpdate: 'cascade',
                onDelete: 'cascade',
            },
            teacherId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'teachers',
                    key: 'id',
                },
                onUpdate: 'cascade',
                onDelete: 'cascade',
            },
            price: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
            interactiveId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                references: {
                    model: 'interactives',
                    key: 'id',
                },
                onUpdate: 'cascade',
                onDelete: 'cascade',
            },
            descriptionId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                references: {
                    model: 'descriptions',
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
    },

    down: async (queryInterface, DataTypes) => {
        await queryInterface.dropTable('classes');
        await queryInterface.dropTable('descriptions');
        await queryInterface.dropTable('interactives');
        await queryInterface.dropTable('bonuses');
        await queryInterface.dropTable('previews');
        await queryInterface.dropTable('videos');
    },
};
