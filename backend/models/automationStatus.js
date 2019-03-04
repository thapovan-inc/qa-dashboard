module.exports = (sequelize, DataTypes) => {
    const statusMaster = sequelize.define('automationStatusMaster', {
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER
        },
        status: {
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
        tableName: 'automation_status_master'
    });

    return statusMaster;
};
