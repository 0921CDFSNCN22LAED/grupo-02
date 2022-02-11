module.exports = (sequelize, DataTypes) => {
    const Bonus = sequelize.define(
        "Bonus",
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
            tableName: "bonus",
            timestamps: false,
        }
    );

    Bonus.associate = (models) => {
        Bonus.hasOne(models.Interactive, {
            as: "interactive",
            foreignKey: "bonus_id",
        });
    };

    return Bonus;
};
