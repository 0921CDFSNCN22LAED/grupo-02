module.exports = (sequelize, DataTypes) => {
    const Parent = sequelize.define(
        "Parent",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            pass: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            avatar: {
                type: DataTypes.STRING,
            },
            createdAt: {
                type: DataTypes.DATE,
                field: "created_at",
            },
            updatedAt: {
                type: DataTypes.DATE,
                field: "updated_at",
            },
            user_id: {
                type: DataTypes.UUID,
            },
        },
        {
            tableName: "parents",
            timestamps: true,
        }
    );

    Parent.associate = (models) => {
        Parent.hasMany(models.Child, {
            as: "children",
            foreignKey: "parent_id",
        });
        Parent.belongsTo(models.User, {
            as: "users",
            foreignKey: "user_id",
        });
    };

    return Parent;
};
