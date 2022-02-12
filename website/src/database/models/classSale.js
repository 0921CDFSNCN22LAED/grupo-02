module.exports = (sequelize, DataTypes) => {
    const ClassSale = sequelize.define(
        'ClassSale',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            classId: {
                type: DataTypes.UUID,
                onDelete: 'cascade',
            },
            saleId: {
                type: DataTypes.UUID,
            },
            historicPrice: {
                type: DataTypes.DOUBLE,
            },
            createdAt: {
                type: DataTypes.DATE,
            },
            updatedAt: {
                type: DataTypes.DATE,
            },
        },
        {
            timestamps: true,
        }
    );

    ClassSale.associate = (models) => {
        ClassSale.belongsTo(models.Class, {
            as: 'classes',
            foreignKey: 'classId',
        });
        ClassSale.belongsTo(models.User, {
            as: 'users',
            foreignKey: 'userId',
        });
    };

    return ClassSale;
};
