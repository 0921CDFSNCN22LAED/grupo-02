module.exports = (sequelize, DataTypes) => {
    const Preview = sequelize.define(
        "Preview",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            location: {
                type: DataTypes.STRING,
            },
        },
        {
            tableName: "previews",
            timestamps: false,
        }
    );

    Preview.associate = (models) => {
        Preview.hasOne(models.Interactive, {
            as: "interactive",
            foreignKey: "preview_id",
        });
    };

    return Preview;
};
