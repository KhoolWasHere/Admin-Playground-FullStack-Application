// filepath: db/mssql.js
const odbc = require('odbc');

const connectionString = `Driver={ODBC Driver 17 for SQL Server};Server=(localdb)\\MSSQLLocalDB;Database=ProductDB;Trusted_Connection=Yes;`;

module.exports = { odbc, connectionString };

