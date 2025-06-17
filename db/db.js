const Database = require('better-sqlite3');
const db = new Database(':memory:');

// Create tables if they don't exist
db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        category_id INTEGER NOT NULL,
        FOREIGN KEY (category_id) REFERENCES categories(id)
    );
    CREATE TABLE IF NOT EXISTS sales (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        sold_at TEXT NOT NULL,
        FOREIGN KEY (product_id) REFERENCES products(id)
    );
`);

db.prepare('INSERT INTO categories (name, description) VALUES (?, ?)').run('benches', 'for bench press exercises');
db.prepare('INSERT INTO categories (name, description) VALUES (?, ?)').run('dumbbells', 'for free weight exercises');
db.prepare('INSERT INTO categories (name, description) VALUES (?, ?)').run('barbells', 'for barbell exercises');

// Insert sample products
db.prepare('INSERT INTO products (name, description, category_id) VALUES (?, ?, ?)').run('Rouge Adjustable Bench', 'Strongman worthy bench that can handle emmence poundages', 1);
db.prepare('INSERT INTO products (name, description, category_id) VALUES (?, ?, ?)').run('Rouge Adjustable Dumbbell', 'Strongman worthy dumbell that can go from 10lb-150lb', 2);
db.prepare('INSERT INTO products (name, description, category_id) VALUES (?, ?, ?)').run('Rouge 45lb Barbell', 'Strongman worthy barbell that weights 45lbs and can handle 1100lbs', 3);

// Insert sales records for each product
db.prepare('INSERT INTO sales (product_id, quantity, sold_at) VALUES (?, ?, ?)').run(1, 1, new Date().toISOString());
db.prepare('INSERT INTO sales (product_id, quantity, sold_at) VALUES (?, ?, ?)').run(2, 1, new Date().toISOString());
db.prepare('INSERT INTO sales (product_id, quantity, sold_at) VALUES (?, ?, ?)').run(3, 1, new Date().toISOString());


module.exports = db;