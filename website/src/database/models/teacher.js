module.exports = (sequelize, DataTypes) => {
    const Teacher = sequelize.define(
        "Teacher",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            first_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            cv: {
                type: DataTypes.TEXT,
            },
        },
        {
            tableName: "teachers",
            timestamps: false,
        }
    );

    Teacher.associate = (models) => {
        Teacher.hasMany(models.Class, {
            as: "classes",
            foreignKey: "teacher_id",
        });
    };

    return Teacher;
};
