const mysql = require('mysql2');
const dbConfig = require('../../config/dbConfig');

const connection = mysql.createConnection(dbConfig);

module.exports = connection.promise(); //"upgrade" the connection to promise
