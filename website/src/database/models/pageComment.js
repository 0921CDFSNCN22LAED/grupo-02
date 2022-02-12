module.exports = (sequelize, DataTypes) => {
    const PageComment = sequelize.define(
        'PageComment',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            profileId: {
                type: DataTypes.UUID,
            },
            comment: {
                type: DataTypes.TEXT,
            },
        },
        {
            timestamps: false,
        }
    );

    PageComment.associate = (models) => {
        PageComment.belongsTo(models.Profile, {
            as: 'profiles',
            foreignKey: 'profileId',
        });
    };

    return PageComment;
};
