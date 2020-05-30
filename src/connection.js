var mysql = require('mysql');
var mysqlconnect = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
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
