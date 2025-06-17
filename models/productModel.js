const db = require('../db/db');
const Joi = require('joi');

// Product validation schema
const productSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(80)
        .pattern(/^[a-zA-Z0-9 .,']+$/)
        .disallow('null', 'undefined')
        .required(),
    desc: Joi.string()
        .trim()
        .min(10)
        .max(200)
        .pattern(/^[a-zA-Z0-9 .,'\-#+]+$/)
        .disallow('null', 'undefined')
        .required(),
    catID: Joi.number()
        .integer()
        .min(1)
        .max(9999)
        .required()
});

// Create a new product
function createProduct(name, desc, catID) {
    const { error } = productSchema.validate({ name, desc, catID });
    if (error) {
        throw new Error('Invalid product data: ' + error.details[0].message);
    }
    db.prepare('INSERT INTO products (name, description, category_id) VALUES (?, ?, ?)').run(name, desc, catID);
}

// Get all products
function getAllProducts() {
    return db.prepare('SELECT * FROM products').all();
}

module.exports = {
    createProduct,
    getAllProducts
};
