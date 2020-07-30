const mysql = require("mysql"); 
require('dotenv').config()


var connection
  if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL)
  } else {
    connection = mysql.createConnection({
        host: process.env.DB_HOST,
        port: '3306',
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DB
    });
      
  }
connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
  });


module.exports =connection 
