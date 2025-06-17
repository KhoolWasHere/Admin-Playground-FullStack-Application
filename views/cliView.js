const prompt = require('prompt-sync')({ sigint: true });

function promptForChoice() {
    return prompt("Enter your choice: ");
}

function promptForProduct() {
    const name = prompt("Enter product name: ");
    const desc = prompt("Enter product description: ");
    const catID = parseInt(prompt("Enter category ID: "));
    return { name, desc, catID };
}

function promptForCategory() {
    const name = prompt("Enter category name: ");
    const desc = prompt("Enter category description: ");
    return { name, desc };
}

function promptForSale() {
    const productId = parseInt(prompt("Enter product ID to sell: "));
    const quantity = parseInt(prompt("Enter quantity sold: "));
    return { productId, quantity };
}

function displayProducts(products) {
    console.log("Products:", products);
}

function displaySalesReport(sales) {
    console.log("Sales Report:", sales);
}

function displayCategories(categories) {
    console.log("Categories:", categories);
}

function displayMessage(message) {
    console.log(message);
}

function waitForEnter() {
    prompt("Press enter to continue...");
}

module.exports = {
    showMenu,
    promptForChoice,
    promptForProduct,
    promptForCategory,
    promptForSale,
    displayProducts,
    displaySalesReport,
    displayCategories,
    displayMessage,
    waitForEnter
};