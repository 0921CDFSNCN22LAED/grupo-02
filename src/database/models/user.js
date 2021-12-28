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
        User.belongsToMany(models.Sale, {
            as: "sales",
            through: "sales_users",
            foreignKey: "user_id",
            otherKey: "sale_id",
            timestamps: false,
        });
    };

    return User;
};
