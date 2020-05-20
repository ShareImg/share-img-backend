var mysql = require('mysql');
var mysqlconnect = mysql.createConnection({
    host: "database-shareimg.cpefds2e0ni6.us-east-1.rds.amazonaws.com",
    user: "root",
    password: "shareimg",
    database: "shareimg"
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