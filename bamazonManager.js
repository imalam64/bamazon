var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  managerScreen();
});

function managerScreen(){
    inquirer
    .prompt([{
        name: "options",
        type: "list",
        message: "What would you like to do?",
        choices:["View Products For Sale",
        "View Low Inventory",
        "Add To Inventory",
        "Add New Product",
        "Exit Manager"]
    }])
    .then(function(answer){
        if (answer.options === "View Products For Sale"){
            viewProducts();
        }
        else if (answer.options === "View Low Inventory"){
            viewLowInventory();
        }
        else if (answer.options === "Add To Inventory"){
            updateInventory();
        }
        else if (answer.options === "Add New Product"){
            addProduct();
        }
        else if  (answer.options === "Exit Manager"){
            console.log("Goodbye!");
            connection.end();
        }
    })
}

function viewProducts(){
    console.log ("Here's what's in the store right now: ");
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
        console.log(
            " || Item ID: " +
            res[i].item_id +
            " || Product: " +
            res[i].product_name +
            " || Price: " +
            res[i].price +
            " || Inventory: " +
            res[i].stock_quantity);
        }
    managerScreen();
    })
}

function viewLowInventory(){
    console.log ("Here's what's in low stock right now: ");
    query = "SELECT item_id, product_name, stock_quantity FROM products WHERE stock_quantity <= 5"
    connection.query( query, 
    function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
        console.log(
            " || Item ID: " +
            res[i].item_id +
            " || Product: " +
            res[i].product_name +
            " || Inventory: " +
            res[i].stock_quantity);
        }
    managerScreen();
    })
}

function updateInventory(){
    console.log("Ok, let's update the current stock!");
    inquirer
    .prompt([
        {name: "item",
        type: "input",
        message: "Which item is being added to? Please provide item ID."},
        {name: "amount",
        type: "input",
        message: "What is the new amount?"}
    ])
    .then(function(answer){
        query = "UPDATE products SET ? WHERE ?";
        connection.query( query, [{stock_quantity: answer.amount}, {item_id: answer.item}], function(err, res){
            console.log("Great, we just updated that item and added " + answer.amount + " more!")
            managerScreen();
        })
    })
}

function addProduct(){
    console.log ("Ok, let's add a new product to the store!");
    inquirer
    .prompt([{
        name: "prodName",
        type: "input",
        message: "What is the product name?"
        },
        {
        name: "department",
        type: "input",
        message: "What department does it go to?"
        },
        {
        name: "price",
        type: "input",
        message: "How much does it cost per unit?"
        },
        {
        name: "inventory",
        type: "input",
        message: "How many units are being added to the inventory?"
        }])
    .then(function(answer) {
    query = "INSERT INTO products SET ?";
    connection.query( query, {product_name: answer.prodName, department_name: answer.department, 
        price: answer.price, stock_quantity: answer.inventory},
    function(err, res) {
        if (err) throw err;
        console.log("Great! We added " + answer.prodName + " to the store!");
        console.log("It was placed in " + answer.department + ".");
        console.log("The price is set at " + answer.price + ".");
        console.log("The current stock is at " + answer.inventory + ".");
        managerScreen();
        })
    })
}