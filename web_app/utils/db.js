// db.js - Contains the database connection setup and configuration.
const mysql = require('mysql');

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER_NAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

db.connect((err) => {
  if (err) throw err;
  console.log('Database connected!');
});

module.exports = db;
