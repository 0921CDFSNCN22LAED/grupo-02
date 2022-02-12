module.exports = (sequelize, DataTypes) => {
    const Interactive = sequelize.define(
        'Interactive',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            videoId: {
                type: DataTypes.UUID,
            },
            previewId: {
                type: DataTypes.UUID,
            },
            bonusId: {
                type: DataTypes.UUID,
            },
        },
        {
            timestamps: false,
        }
    );

    Interactive.associate = (models) => {
        Interactive.hasOne(models.Class, {
            as: 'interactive',
            foreignKey: 'interactiveId',
        });
        Interactive.belongsTo(models.Video, {
            as: 'video',
            foreignKey: 'videoId',
        });
        Interactive.belongsTo(models.Preview, {
            as: 'preview',
            foreignKey: 'previewId',
        });
        Interactive.belongsTo(models.Bonus, {
            as: 'bonus',
            foreignKey: 'bonusId',
        });
    };

    return Interactive;
};
