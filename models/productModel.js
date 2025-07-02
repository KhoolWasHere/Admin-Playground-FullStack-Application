const { odbc, connectionString } = require('../db/mssql');
const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string().min(1).max(100).required(),
    desc: Joi.string().min(1).max(500).required(),
    catID: Joi.number().integer().min(1).max(999).required()
});

async function createProduct(name, desc, catID) {
    const { error } = productSchema.validate({ name, desc, catID });
    if (error) {
        throw new Error('Invalid product data: ' + error.details[0].message);
    }
    const connection = await odbc.connect(connectionString);
    await connection.query(
        'INSERT INTO products (name, description, category_id) VALUES (?, ?, ?)',
        [name, desc, catID]
    );
    await connection.close();
}

async function getAllProducts() {
    const connection = await odbc.connect(connectionString);
    const result = await connection.query('SELECT * FROM products');
    await connection.close();
    return result;
}

async function editProduct(id, name, desc, catID) {
    const { error } = productSchema.validate({ name, desc, catID });
    if (error) {
        throw new Error('Invalid product data: ' + error.details[0].message);
    }
    const connection = await odbc.connect(connectionString);
    await connection.query(
        'UPDATE products SET name = ?, description = ?, category_id = ? WHERE id = ?',
        [name, desc, catID, id]
    );
    await connection.close();
}

module.exports = {
    createProduct,
    getAllProducts,
    editProduct
};