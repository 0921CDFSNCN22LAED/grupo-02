module.exports = (sequelize, DataTypes) => {
    const Grade = sequelize.define(
        'Grade',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                defaultValue: '1',
            },
        },
        {
            timestamps: false,
        }
    );

    Grade.associate = (models) => {
        Grade.hasMany(models.Profile, {
            as: 'profiles',
            foreignKey: 'gradeId',
        });
        Grade.hasMany(models.Class, {
            as: 'classes',
            foreignKey: 'gradeId',
        });
    };

    return Grade;
};
