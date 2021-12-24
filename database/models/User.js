module.exports = (sequelize, DataTypes) => {
    const alias = "User";
    const cols = {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            autoIncrement: true,
        },
    };
    const config = {
        tableName: "users",
        timestamps: false,
    };

    const User = sequelize.define(alias, cols, config);

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
