module.exports = (sequelize, DataTypes) => {
    const envMaster = sequelize.define('automationEnvMaster', {
        id: {
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER
        },
        env_name: {
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
        tableName: 'automation_env_master'
    });

    return envMaster;
};
