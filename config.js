require('dotenv').config();

const config ={
    database: process.env.DATABASE,
    host: "localhost",
    user: process.env.USERMYSQL,
    password: process.env.PASSWORD,
    multipleStatements: true
}
module.exports = config;
