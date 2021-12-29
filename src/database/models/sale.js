module.exports = (sequelize, DataTypes) => {
    const Sale = sequelize.define(
        "Sale",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            createdAt: {
                type: DataTypes.DATE,
                field: "created_at",
            },
            updatedAt: {
                type: DataTypes.DATE,
                field: "updated_at",
            },
        },
        {
            tableName: "sales",
            timestamps: true,
        }
    );

    Sale.associate = (models) => {
        Sale.belongsToMany(models.Class, {
            as: "classes",
            through: "classes_sales",
            foreignKey: "sale_id",
            otherKey: "class_id",
            timestamps: false,
            onDelete: "cascade",
        });
        Sale.belongsTo(models.User, {
            as: "users",
            foreignKey: "user_id",
        });
    };

    return Sale;
};
