const db = require('../db/db');
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
function createCategory(name, desc) {
    const { error } = categorySchema.validate({ name, desc });
    if (error) {
        throw new Error('Invalid category data: ' + error.details[0].message);
    }
    db.prepare('INSERT INTO categories (name, description) VALUES (?, ?)').run(name, desc);
}

// Get all categories
function getAllCategories() {
    return db.prepare('SELECT * FROM categories').all();
}

module.exports = {
    createCategory,
    getAllCategories
};
