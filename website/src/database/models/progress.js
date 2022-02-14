module.exports = (sequelize, DataTypes) => {
    const Progress = sequelize.define(
        'Progress',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            progress: {
                type: DataTypes.INTEGER(3).UNSIGNED,
            },
            classId: {
                type: DataTypes.UUID,
            },
            profileId: {
                type: DataTypes.UUID,
            },
        },
        {
            timestamps: true,
            tableName: 'progress',
        }
    );

    Progress.associate = (models) => {
        Progress.belongsTo(models.Class, {
            as: 'classes',
            foreignKey: 'classId',
        });
        Progress.belongsTo(models.Profile, {
            as: 'profiles',
            foreignKey: 'profileId',
        });
    };

    return Progress;
};
