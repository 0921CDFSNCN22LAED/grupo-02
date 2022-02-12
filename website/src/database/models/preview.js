module.exports = (sequelize, DataTypes) => {
    const Preview = sequelize.define(
        'Preview',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            location: {
                type: DataTypes.STRING,
            },
        },
        {
            timestamps: false,
        }
    );

    Preview.associate = (models) => {
        Preview.hasOne(models.Interactive, {
            as: 'interactive',
            foreignKey: 'previewId',
        });
    };

    return Preview;
};
