module.exports = (sequelize, DataTypes) => {
    const Interactive = sequelize.define(
        "Interactive",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            video_id: {
                type: DataTypes.UUID,
            },
            preview_id: {
                type: DataTypes.UUID,
            },
            bonus_id: {
                type: DataTypes.UUID,
            },
        },
        {
            tableName: "interactives",
            timestamps: false,
        }
    );

    Interactive.associate = (models) => {
        Interactive.hasOne(models.Class, {
            as: "class",
            foreignKey: "interactive_id",
        });
        Interactive.belongsTo(models.Video, {
            as: "video",
            foreignKey: "video_id",
        });
        Interactive.belongsTo(models.Preview, {
            as: "preview",
            foreignKey: "preview_id",
        });
        Interactive.belongsTo(models.Bonus, {
            as: "bonus",
            foreignKey: "bonus_id",
        });
    };

    return Interactive;
};
