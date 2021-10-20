const mysql =require('mysql');
const config = require('../config');
const conn =mysql.createConnection(config);

conn.connect((err)=>{
    if(err) throw err;
    console.log("Database connect success!");
})
module.exports =conn;
