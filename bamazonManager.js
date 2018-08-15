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
        "Add New Product"]
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
    })
}

function viewProducts(){
    console.log ("Here's what's in stock right now: ");
    connection.end();
}

function viewLowInventory(){
    console.log ("Here's what's in low stock right now: ");
    connection.end();

}

function updateInventory(){
    console.log("Ok, let's add more to the current stock!");
    connection.end();
}

function addProduct(){
    console.log ("Ok, let's add a new product to the store!");
    connection.end();
}