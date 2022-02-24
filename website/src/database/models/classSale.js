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
            tableName: 'classesSales',
            timestamps: true,
        }
    );

    ClassSale.associate = (models) => {
        ClassSale.belongsTo(models.Class, {
            as: 'classes',
            foreignKey: 'classId',
        });
        ClassSale.belongsTo(models.Sale, {
            as: 'sales',
            foreignKey: 'saleId',
        });
    };

    return ClassSale;
};
