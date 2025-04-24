const Database = require('better-sqlite3');
const db = new Database('db/data.db');


db.prepare(`CREATE TABLE IF NOT EXISTS users (
  username TEXT PRIMARY KEY,
  password TEXT NOT NULL
)`).run();

module.exports = db;