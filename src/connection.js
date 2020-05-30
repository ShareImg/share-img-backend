import mysql from 'mysql'
import dotenv from 'dotenv'

dotenv.config()

var mysqlconnect = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

mysqlconnect.connect(function (err) { 
    if (!err){
        console.log("Connected")
    }
    else{
        console.log("Connection Failed")
    }
});  

module.exports = mysqlconnect;
