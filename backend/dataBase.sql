/*
CREATE LOGIN [beefshopapi] WITH PASSWORD = N'Senha2025', DEFAULT_DATABASE = [db_beefshop];
CREATE USER [beefshopapi] FOR LOGIN [beefshopapi];
GRANT SELECT, INSERT, DELETE, UPDATE TO [beefshopapi];

CREATE DATABASE db_beefshop;
use db_beefshop;

DROP TABLE Meats;
CREATE TABLE Meats(
	id INT PRIMARY KEY IDENTITY,
	description VARCHAR(100),
	meatType VARCHAR(50)
)

SELECT * FROM Meats;

DROP TABLE Buyers;
CREATE TABLE Buyers (
	id INT PRIMARY KEY IDENTITY,
	name VARCHAR(50),
	document VARCHAR(50),
	city VARCHAR(50),
	state VARCHAR(50)
)

DROP TABLE Orders
CREATE TABLE Orders (
	id INT PRIMARY KEY IDENTITY,
	orderDate DATE,
	totalValue FLOAT,
	buyerId INT,
	
	FOREIGN KEY (buyerId) REFERENCES Buyers (id)
)


DROP TABLE OrderItems
CREATE TABLE OrderItems (
	orderId INT,
	meatId INT,
	price FLOAT,
	coin VARCHAR(10),

	FOREIGN KEY (orderId) REFERENCES Orders (id),
	FOREIGN KEY (meatId) REFERENCES Meats (id),
)


SELECT * FROM Orders;
SELECT * FROM OrderItems;


*/