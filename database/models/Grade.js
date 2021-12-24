module.exports = (sequelize, DataTypes) => {
    const alias = "Grade";
    const cols = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    };
    const config = {
        tableName: "grades",
        timestamps: false,
    };

    const Grade = sequelize.define(alias, cols, config);

    Grade.associate = (models) => {
        Grade.hasMany(models.Child, {
            as: "children",
            foreignKey: "grade_id",
        });
    };

    return Grade;
};
