module.exports = (sequelize, DataTypes) => {
    const Description = sequelize.define(
        "Description",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            description_short: {
                type: DataTypes.STRING,
            },
            description_long: {
                type: DataTypes.STRING,
            },
            contents: {
                type: DataTypes.STRING,
            },
        },
        {
            tableName: "descriptions",
            timestamps: false,
        }
    );

    Description.associate = (models) => {
        Description.hasOne(models.Class, {
            as: "classes",
            foreignKey: "description_id",
        });
    };

    return Description;
};
