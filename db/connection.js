// const mysql = require('mysql2');
// const util = require('util');

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'employees_db'
// });

// const query = util.promisify(db.query).bind(db);
// const end = util.promisify(db.end).bind(db);

// // async function main() {
// //   try {
// //     await db.connect();

// //     const results = await query(`SELECT * FROM employee`);
// //     console.log('Query results:', results);

// //     await end();
// //     console.log('Connection closed.');
// //   } catch (err) {
// //     console.error('Error:', err);
// //   }
// // }

// // main();

// module.exports = db;