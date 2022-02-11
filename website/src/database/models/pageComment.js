module.exports = (sequelize, DataTypes) => {
    const PageComment = sequelize.define(
        'PageComment',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            user_id: {
                type: DataTypes.UUID,
            },
            comment: {
                type: DataTypes.TEXT,
            },
        },
        {
            tableName: 'page_comments',
            timestamps: false,
        }
    );

    PageComment.associate = (models) => {
        PageComment.belongsTo(models.User, {
            as: 'users',
            foreignKey: 'user_id',
        });
    };

    return PageComment;
};
