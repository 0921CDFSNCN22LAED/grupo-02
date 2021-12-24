module.exports = (sequelize, DataTypes) => {
    const alias = "Child";
    const cols = {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
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
        parent_id: {
            type: DataTypes.UUID,
        },
        grade_id: {
            type: DataTypes.UUID,
        },
    };
    const config = {
        tableName: "children",
        timestamps: true,
    };

    const Child = sequelize.define(alias, cols, config);

    Child.associate = (models) => {
        Child.belongsTo(models.Parent, {
            as: "parent",
            foreignKey: "parent_id",
        });
        Child.belongsTo(models.User, {
            as: "users",
            foreignKey: "user_id",
        });
        Child.belongsTo(models.Grade, {
            as: "grades",
            foreignKey: "grade_id",
        });
    };

    return Child;
};
