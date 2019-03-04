module.exports = (sequelize, DataTypes) => {
    const statusMaster = sequelize.define('automationResults', {
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER
        },
        types: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        env: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        status: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        sprint_name: {
            allowNull: true,
            type: DataTypes.STRING
        },
        ticket_name: {
            allowNull: true,
            type: DataTypes.STRING
        },
        description: {
            allowNull: false,
            type: DataTypes.STRING
        },
        report_url: {
            allowNull: false,
            type: DataTypes.STRING
        },
        inserted_by: {
            allowNull: false,
            type: DataTypes.STRING
        },
        inserted_at: {
            allowNull: false,
            type: DataTypes.DATE
        },
        updated_at: {
            allowNull: false,
            type: DataTypes.DATE
        }
    }, {
        timestamps: false,
        tableName: 'automation_results'
    });

    return statusMaster;
};
