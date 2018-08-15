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
  console.log("connected as id " + connection.threadId + "\n");
  customerScreen();
});

function customerScreen(){
    console.log("Here's what's for sale right now:");
connection.query("SELECT item_id, product_name, price FROM products", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
    console.log(
        " || Item ID: " +
        res[i].item_id +
        " || Product: " +
        res[i].product_name +
        " || Price: " +
        res[i].price);
    }
    purchase();
    });
};

function purchase(){
inquirer
    .prompt([{
        name: "item",
        type: "input",
        message: "What would you like to buy? Please provide Item ID.",
    },
    {
        name: "amount",
        type: "input",
        message: "How many do you want?"
    }])
    .then(function(answer) {
        var query = "SELECT item_id, product_name, stock_quantity FROM products WHERE ?"
        connection.query(query, [{item_id: answer.item}],
            function(err, res){
            if (answer.item > res[0].stock_quantity){
                console.log("Sorry, there's not enough of that product in our store.")
                console.log("Here's what's left: ")
                console.log(" || Item ID: " + res[0].item_id +
                " || Product: " + res[0].product_name +
                " || Current Stock: " + res[0].stock_quantity)
                customerScreen();
            }
            else {
            console.log('Thanks for your purchase!');
            var query = "UPDATE products SET stock_quantity = stock_quantity - ? WHERE ? AND stock_quantity > 0";
            connection.query(query, [answer.amount, {item_id: answer.item}], 
                function(err, res) {
                var query = "SELECT item_id, product_name, price FROM products WHERE ?";
                    connection.query(query, [{item_id: answer.item}],
                    function(err, res) {
                    if (err) throw err;
                    console.log(" || Item ID: " + res[0].item_id +
                    " || Product: " + res[0].product_name +
                    " || Price: " + res[0].price* parseFloat(answer.amount));
                connection.end()}
                )}
            )}
        })
    })
}