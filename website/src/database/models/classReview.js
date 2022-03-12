module.exports = (sequelize, DataTypes) => {
    const ClassReview = sequelize.define(
        'ClassReview',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            profileId: {
                type: DataTypes.UUID,
            },
            classId: {
                type: DataTypes.UUID,
            },
            rating: {
                type: DataTypes.INTEGER,
                defaultValue: 5,
            },
            review: {
                type: DataTypes.TEXT,
            },
        },
        {
            timestamps: false,
        }
    );

    ClassReview.associate = (models) => {
        ClassReview.belongsTo(models.Profile, {
            as: 'profileReviews',
            foreignKey: 'profileId',
        });
        ClassReview.belongsTo(models.Class, {
            as: 'classReviews',
            foreignKey: 'classId',
        });
    };

    return ClassReview;
};
