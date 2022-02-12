module.exports = (sequelize, DataTypes) => {
    const Video = sequelize.define(
        'Video',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            location: {
                type: DataTypes.STRING,
            },
            len: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
        },
        {
            timestamps: false,
        }
    );

    Video.associate = (models) => {
        Video.hasOne(models.Interactive, {
            as: 'interactive',
            foreignKey: 'videoId',
        });
    };

    return Video;
};
