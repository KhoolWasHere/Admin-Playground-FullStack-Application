const { odbc, connectionString } = require('../db/mssql');
const bcrypt = require('bcrypt');

async function findUser(username) {
    const connection = await odbc.connect(connectionString);
    const result = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
    await connection.close();
    return result[0];
}

async function validateUser(username, password) {
    const user = await findUser(username);
    if (!user) return false;
    const valid = await bcrypt.compare(password, user.password_hash);
    return valid ? user : false;
}

module.exports = { findUser, validateUser };