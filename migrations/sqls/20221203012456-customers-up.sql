/* Replace with your SQL commands */

CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(15),
    city VARCHAR(50),
    lat VARCHAR(50),
    long VARCHAR(50),
    location POINT
);