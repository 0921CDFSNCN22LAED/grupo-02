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
            through: "classes_sales",
            foreignKey: "sale_id",
            otherKey: "class_id",
            timestamps: false,
        });
    };

    return Sale;
};
