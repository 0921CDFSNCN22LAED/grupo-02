module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
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

    User.associate = (models) => {
        User.hasMany(models.Profile, {
            as: 'profiles',
            foreignKey: 'userId',
        });
        User.hasMany(models.Sale, {
            as: 'sales',
            foreignKey: 'userId',
        });
    };

    return User;
};
