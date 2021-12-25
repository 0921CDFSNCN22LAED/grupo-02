module.exports = (sequelize, DataTypes) => {
    const Grade = sequelize.define(
        "Grade",
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
            tableName: "grades",
            timestamps: false,
        }
    );

    Grade.associate = (models) => {
        Grade.hasMany(models.Child, {
            as: "children",
            foreignKey: "grade_id",
        });
        Grade.hasMany(models.Class, {
            as: "classes",
            foreignKey: "grade_id",
        });
    };

    return Grade;
};
