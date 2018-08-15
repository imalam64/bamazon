USE bamazon;

CREATE TABLE products(
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(500) NOT NULL,
  department_name VARCHAR(500) NOT NULL,
  price FLOAT NOT NULL,
  stock_quantity INTEGER(255),
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Amazon Echo", "Tech", 99.99, 500), 
("Amazon Echo Dot", "Tech", 49.99, 500),
("Amazon Echo Plus", "Tech", 149.99, 500),
("Huggies Diapers", "Baby", 15.99, 250),
("Huggies Fresh Wipes", "Baby", 9.99, 250),
("Johnson Baby Powder", "Baby", 3.99, 250),
("Amazon Basics Mens Daily Multivitamin", "Health", 11.99, 300),
("Amazon Basics Womens Daily Multivitamin", "Health", 11.99, 300),
("Amazon Basics Kids Daily Multivitamin", "Health", 11.99, 300),
('Nintendo Switch', 'Video Games', 249.99, 150)