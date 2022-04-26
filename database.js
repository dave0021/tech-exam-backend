var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  database: 'family',
  user: 'root',
  password: ''
})

module.exports = connection