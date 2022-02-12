module.exports = (sequelize, DataTypes) => {
    const Description = sequelize.define(
        'Description',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            descriptionShort: {
                type: DataTypes.STRING,
            },
            descriptionLong: {
                type: DataTypes.STRING,
            },
            contents: {
                type: DataTypes.STRING,
            },
        },
        {
            timestamps: false,
        }
    );

    Description.associate = (models) => {
        Description.hasOne(models.Class, {
            as: 'classes',
            foreignKey: 'descriptionId',
        });
    };

    return Description;
};
