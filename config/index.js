require('dotenv').config();
let mySqlConfig = {
    host: process.env.MYSQL_HOST || 'sq65ur5a5bj7flas.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: process.env.MYSQL_USER || 'jer0hoim1hqkhz9d',
    password: process.env.MYSQL_PW || 'l3kmp7yrchnd63ud',
    port: process.env.MYSQL_PORT || '3306',
    database: process.env.MYSQL_DATABASE || 'sdqom6cfmg2fmniz'
}
const env = process.env.NODE_ENV || 'development';
if (env === 'test') {
    mySqlConfig.database = process.env.MYSQL_DB_TEST
    mySqlConfig.multipleStatements = true;
} else if (env === 'production') {
    mySqlConfig = {
        database: process.env.MYSQL_DB_PRODUCTION,
        host: process.env.MYSQL_HOST_PRODUCTION,
        user: process.env.MYSQL_USER_PRODUCTION,
        password: process.env.MYSQL_PW_PRODUCTION,
        multipleStatements: true
    }
} else {
    mySqlConfig.database = process.env.MYSQL_DB
    mySqlConfig.multipleStatements = true;
}

module.exports = mySqlConfig 