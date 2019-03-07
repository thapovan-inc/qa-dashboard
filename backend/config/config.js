module.exports = {
    database: process.env.DATABASE_NAME || 'qa_dashboard',
    username: process.env.DATABASE_USER || 'qa_user',
    password: process.env.DATABASE_PASS || 'pass123',
    host: process.env.DATABASE_HOST || 'localhost',
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
