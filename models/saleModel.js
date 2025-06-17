const db = require('../db/db');
const Joi = require('joi');

// Sale validation schema
const saleSchema = Joi.object({
    product_id: Joi.number()
        .integer()
        .min(1)
        .max(9999)
        .required(),
    quantity: Joi.number()
        .integer()
        .min(1)
        .max(500)
        .required(),
    sold_at: Joi.date()
        .required()
});

// Record a new sale
function recordSale(product_id, quantity, sold_at) {
    const { error } = saleSchema.validate({ product_id, quantity, sold_at });
    if (error) {
        throw new Error('Invalid sale data: ' + error.details[0].message);
    }
    db.prepare('INSERT INTO sales (product_id, quantity, sold_at) VALUES (?, ?, ?)').run(product_id, quantity, sold_at);
}

// Get sales report (with joins)
function getSalesReport() {
    return db.prepare(`
        SELECT 
            sales.id AS sale_id,
            products.name AS product_name,
            categories.name AS category_name,
            sales.quantity,
            sales.sold_at
        FROM sales
        JOIN products ON sales.product_id = products.id
        JOIN categories ON products.category_id = categories.id
    `).all();
}

module.exports = {
    recordSale,
    getSalesReport
};
