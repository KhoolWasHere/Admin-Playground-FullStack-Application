const db = require('../db/db');
const bcrypt = require('bcrypt');
const salt = 12;

//create useres table
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL
  );
`);

const hash = bcrypt.hashSync("Th1s1sG000dPword#W@luigi1NSSBc0pp'nDr1pFRfR", salt);
db.prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)').run('admin', hash);

const hashseller = bcrypt.hashSync("Wh@ttyp3O'p3rs0nBuyzTrvsSc0txBrcl00naShrt?1991Chcg0Blls", salt);
db.prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)').run('seller', hashseller);

const hashcreator = bcrypt.hashSync("1l1k3myJ'sfr33shfrfrAin'tN0W@yD1dbya1nTL1f3Prs0n", salt);
db.prepare('INSERT INTO users (username, password_hash) VALUES (?, ?)').run('creator', hashcreator);

function findUser(username) {
  return db.prepare('SELECT * FROM users WHERE username = ?').get(username);
}

async function validateUser(username, password) {
  const user = findUser(username);
  if (!user) return false;
  const valid = await bcrypt.compare(password, user.password_hash);
  return valid ? user : false;
}

module.exports = { findUser, validateUser };