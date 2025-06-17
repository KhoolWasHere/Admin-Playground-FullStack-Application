const prompt = require('prompt-sync')({ sigint: true });

const username = prompt('Enter your username: ');
const psword = prompt('Enter your password: ');

if (username !== 'name' || psword !== 'password') {
    console.log('Invalid username or password. Exiting...');
    process.exit(1);
}


/**
 * Display the main menu options.
 */
function showMenu() {
    console.log('\n=== Inventory Management Menu ===');
    console.log('1. View all products');
    console.log('2. View sales report');
    console.log('3. Create new product');
    console.log('4. Create new category');
    console.log('5. Make Sale');
    console.log('6. Exit');
}

/**
 * Prompt user for a menu choice.
 */
function promptForChoice() {
    return prompt('Enter your choice: ');
}

/**
 * Prompt for product details.
 */
function promptForProductName() {
    return prompt('Enter product name: ');
}
function promptForProductDescription() {
    return prompt('Enter product description: ');
}
function promptForCategoryId() {
    return parseInt(prompt('Enter category ID: '), 10);
}
function promptForProductId() {
    return parseInt(prompt('Enter product ID to sell: '), 10);
}
function promptForQuantity() {
    return parseInt(prompt('Enter quantity sold: '), 10);
}

/**
 * Prompt for category details.
 */
function promptForCategoryName() {
    return prompt('Enter category name: ');
}
function promptForCategoryDescription() {
    return prompt('Enter category description: ');
}

/**
 * Display lists and messages.
 */
function displayProducts(products) {
    console.log('\n--- Products ---');
    products.forEach(p => {
        console.log(`ID: ${p.id} | Name: ${p.name} | Desc: ${p.description} | Category ID: ${p.category_id}`);
    });
}
function displaySalesReport(sales) {
    console.log('\n--- Sales Report ---');
    sales.forEach(s => {
        console.log(`Sale ID: ${s.sale_id} | Product: ${s.product_name} | Category: ${s.category_name} | Qty: ${s.quantity} | Sold At: ${s.sold_at}`);
    });
}
function displayCategories(categories) {
    console.log('\n--- Categories ---');
    categories.forEach(c => {
        console.log(`ID: ${c.id} | Name: ${c.name} | Desc: ${c.description}`);
    });
}
function showSuccessMessage(msg) {
    console.log('\x1b[32m%s\x1b[0m', msg); // Green text
}
function showErrorMessage(msg) {
    console.log('\x1b[31m%s\x1b[0m', msg); // Red text
}
function showExitMessage() {
    console.log('Exiting... Goodbye!');
}
function promptToContinue() {
    prompt('Press enter to continue...');
}

module.exports = {
    showMenu,
    promptForChoice,
    promptForProductName,
    promptForProductDescription,
    promptForCategoryId,
    promptForProductId,
    promptForQuantity,
    promptForCategoryName,
    promptForCategoryDescription,
    displayProducts,
    displaySalesReport,
    displayCategories,
    showSuccessMessage,
    showErrorMessage,
    showExitMessage,
    promptToContinue
};