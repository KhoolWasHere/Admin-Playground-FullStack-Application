const { odbc, connectionString } = require('../db/mssql');
const Joi = require('joi');

// Sale validation schema
const saleSchema = Joi.object({
    product_id: Joi.number().integer().required(),
    quantity: Joi.number().integer().min(1).max(500).required(),
    sold_at: Joi.date().required()
});

// Record a new sale
async function recordSale(product_id, quantity, sold_at) {
    const { error } = saleSchema.validate({ product_id, quantity, sold_at });
    if (error) {
        throw new Error('Invalid sale data: ' + error.details[0].message);
    }
    const connection = await odbc.connect(connectionString);
    const result = await connection.query(
        'INSERT INTO sales (product_id, quantity, sold_at) OUTPUT INSERTED.id VALUES (?, ?, ?)',
        [product_id, quantity, sold_at]
    );
    const sale_id = result[0]?.id;
    await connection.close();
    return { sale_id, sold_at };
}

// Get sales report (with joins)
async function getSalesReport() {
    const connection = await odbc.connect(connectionString);
    const result = await connection.query(`
        SELECT 
            sales.id AS sale_id,
            products.name AS product_name,
            categories.name AS category_name,
            sales.quantity,
            sales.sold_at
        FROM sales
        JOIN products ON sales.product_id = products.id
        JOIN categories ON products.category_id = categories.id
    `);
    await connection.close();
    return result;
}

module.exports = {
    recordSale,
    getSalesReport
};
