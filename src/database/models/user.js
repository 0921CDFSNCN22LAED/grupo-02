module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
        },
        {
            tableName: "users",
            timestamps: false,
        }
    );

    User.associate = (models) => {
        User.hasOne(models.Parent, {
            as: "parents",
            foreignKey: "user_id",
        });
        User.hasOne(models.Child, {
            as: "children",
            foreignKey: "user_id",
        });
    };

    return User;
};
