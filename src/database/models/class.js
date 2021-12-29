module.exports = (sequelize, DataTypes) => {
    const Class = sequelize.define(
        "Class",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            subject_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            grade_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            teacher_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            price: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
            interactive_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            description_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            createdAt: {
                type: DataTypes.DATE,
                field: "created_at",
            },
            updatedAt: {
                type: DataTypes.DATE,
                field: "updated_at",
            },
        },
        {
            tableName: "classes",
            timestamps: true,
        }
    );

    Class.associate = (models) => {
        Class.belongsTo(models.Subject, {
            as: "subject",
            foreignKey: "subject_id",
        });
        Class.belongsTo(models.Grade, {
            as: "grades",
            foreignKey: "grade_id",
        });
        Class.belongsTo(models.Teacher, {
            as: "teacher",
            foreignKey: "teacher_id",
        });
        Class.belongsTo(models.Interactive, {
            as: "interactive",
            foreignKey: "interactive_id",
        });
        Class.belongsTo(models.Description, {
            as: "description",
            foreignKey: "description_id",
        });
        Class.belongsToMany(models.Sale, {
            as: "classes",
            through: "classes_sales",
            foreignKey: "class_id",
            otherKey: "sale_id",
            timestamps: false,
            onDelete: "cascade",
        });
    };

    return Class;
};
