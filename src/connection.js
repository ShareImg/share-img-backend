var mysql = require('mysql');
var mysqlconnect = mysql.createConnection({
    host: 'share-img-database-instance.c0jlpqx0hp9y.us-east-1.rds.amazonaws.com',
    user: 'root',
    password: 'shareimg',
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
