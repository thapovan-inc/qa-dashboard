module.exports = {
    database: 'qa_dashboard',
    username: 'root',
    password: '******',
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    logging: false,
    sync: {force: false},
    pool: {
        max: 10,
        min: 2,
        acquire: 30000,
        idle: 10000
    }
};
