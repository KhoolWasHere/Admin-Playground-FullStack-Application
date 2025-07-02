const { odbc, connectionString } = require('../db/mssql');
const Joi = require('joi');

// Category validation schema
const categorySchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(60)
        .pattern(/^[a-zA-Z0-9 .,'\-#+]+$/)
        .disallow('null', 'undefined')
        .required(),
    desc: Joi.string()
        .trim()
        .min(10)
        .max(150)
        .pattern(/^[a-zA-Z0-9 .,'\-#+]+$/)
        .disallow('null', 'undefined')
        .required()
});

// Create a new category
async function createCategory(name, desc) {
    const { error } = categorySchema.validate({ name, desc });
    if (error) {
        throw new Error('Invalid category data: ' + error.details[0].message);
    }
    const connection = await odbc.connect(connectionString);
    await connection.query(
        'INSERT INTO categories (name, description) VALUES (?, ?)',
        [name, desc]
    );
    await connection.close();
}

async function editCategory(id, name, desc) {
    const { error } = categorySchema.validate({ name, desc });
    if (error) {
        throw new Error('Invalid category data:' + error.details[0].message);
    }
    const connection = await odbc.connect(connectionString);
    await connection.query(
        'UPDATE categories SET name = ?, description = ? WHERE id = ?',
        [name, desc, id]
    );
    await connection.close();
}

// Get all categories
async function getAllCategories() {
    const connection = await odbc.connect(connectionString);
    const result = await connection.query('SELECT * FROM categories');
    await connection.close();
    return result;
}

module.exports = {
    createCategory,
    getAllCategories,
    editCategory
};
