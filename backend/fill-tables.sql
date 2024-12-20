INSERT INTO "User" (username, email, password_hash, role) VALUES
('john_doe', 'john.doe@example.com', 'hashedpassword1', 'customer'),
('jane_smith', 'jane.smith@example.com', 'hashedpassword2', 'admin'),
('mike_123', 'mike123@example.com', 'hashedpassword3', 'customer'),
('alice_williams', 'alice.williams@example.com', 'hashedpassword4', 'admin');

INSERT INTO Location (name, address, contact_info) VALUES
('Warehouse A', '123 Main St, City, Country', '123-456-7890'),
('Warehouse B', '456 Oak St, City, Country', '987-654-3210'),
('Warehouse C', '789 Pine St, City, Country', '555-555-5555'),
('Store D', '101 Maple St, City, Country', '222-333-4444');

INSERT INTO Product (name, description, quantity, price, location_id) VALUES
('Laptop', 'A high-performance laptop', 50, 999.99, 1),
('Smartphone', 'Latest model smartphone', 100, 799.99, 2),
('Headphones', 'Noise-cancelling headphones', 200, 199.99, 3),
('Smartwatch', 'A feature-packed smartwatch', 150, 249.99, 4);

INSERT INTO Orders (user_id, product_id, quantity, status) VALUES
(1, 1, 2, 'shipped'),
(2, 3, 5, 'pending'),
(3, 2, 3, 'shipped'),
(4, 4, 1, 'delivered');

INSERT INTO Supplier (name, contact_info) VALUES
('Tech Supplies Co.', 'contact@techsupplies.com'),
('Gadgets R Us', 'info@gadgetsrus.com'),
('AudioTech', 'support@audiotech.com'),
('Wearable Innovations', 'contact@wearableinnovations.com');

INSERT INTO InventoryLog (product_id, change, reason) VALUES
(1, 10, 'Restock'),
(2, -5, 'Sold'),
(3, 20, 'Restock'),
(4, -3, 'Returned');

INSERT INTO SalesReport (product_id, quantity_sold, total_revenue) VALUES
(1, 20, 19999.80),
(2, 30, 23999.70),
(3, 50, 9999.50),
(4, 15, 3749.85);

INSERT INTO Alert (product_id, alert_type, message) VALUES
(1, 'stock low', 'Laptop stock is low, consider restocking soon.'),
(2, 'stock low', 'Smartphone stock is running out quickly.'),
(3, 'stock high', 'Headphones stock is abundant.'),
(4, 'stock low', 'Smartwatch stock is running low.');

INSERT INTO Category (name, description) VALUES
('Electronics', 'All kinds of electronic devices'),
('Wearables', 'Wearable technology products'),
('Accessories', 'Additional gadgets and accessories'),
('Audio', 'Audio devices and headphones');

INSERT INTO ProductCategory (product_id, category_id) VALUES
(1, 1),
(2, 1),
(3, 4),
(4, 2);
