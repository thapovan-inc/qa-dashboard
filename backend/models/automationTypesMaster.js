module.exports = (sequelize, DataTypes) => {
    const Types = sequelize.define('automationTypesMaster', {
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER
        },
        type: {
            allowNull: false,
            type: DataTypes.STRING
        },
        created_by: {
            allowNull: false,
            type: DataTypes.STRING
        },
        created_at: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updated_at: {
            allowNull: false,
            type: DataTypes.DATE
        }
    }, {
        timestamps: false,
        tableName: 'automation_types_master'
    });

    return Types;
};
