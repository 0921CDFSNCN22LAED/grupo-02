module.exports = (sequelize, DataTypes) => {
    const Subject = sequelize.define(
        "Subject",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: "subjects",
            timestamps: false,
        }
    );

    Subject.associate = (models) => {
        Subject.hasMany(models.Class, {
            as: "classes",
            foreignKey: "subject_id",
        });
    };

    return Subject;
};
