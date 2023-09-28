const mysql = require('mysql2');

// Create the connection to the database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'employees_db'
});

// Export database
module.exports = db;