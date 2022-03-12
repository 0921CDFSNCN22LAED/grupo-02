module.exports = (sequelize, DataTypes) => {
    const Class = sequelize.define(
        'Class',
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
            subjectId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            gradeId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            teacherId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            price: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
            interactiveId: {
                type: DataTypes.UUID,
            },
            descriptionId: {
                type: DataTypes.UUID,
            },
            createdAt: {
                type: DataTypes.DATE,
            },
            updatedAt: {
                type: DataTypes.DATE,
            },
        },
        {
            timestamps: true,
        }
    );

    Class.associate = (models) => {
        Class.belongsTo(models.Subject, {
            as: 'subject',
            foreignKey: 'subjectId',
        });
        Class.belongsTo(models.Grade, {
            as: 'grades',
            foreignKey: 'gradeId',
        });
        Class.belongsTo(models.Teacher, {
            as: 'teacher',
            foreignKey: 'teacherId',
        });
        Class.belongsTo(models.Interactive, {
            as: 'interactive',
            foreignKey: 'interactiveId',
        });
        Class.belongsTo(models.Description, {
            as: 'description',
            foreignKey: 'descriptionId',
        });
        Class.hasMany(models.ClassSale, {
            as: 'classesSales',
            foreignKey: 'saleId',
        });
        Class.hasMany(models.Progress, {
            as: 'progresses',
            foreignKey: 'classId',
        });
        Class.hasMany(models.ClassReview, {
            as: 'classReviews',
            foreignKey: 'classId',
        });
    };

    return Class;
};
