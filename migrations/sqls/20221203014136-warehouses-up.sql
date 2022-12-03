/* Replace with your SQL commands */

CREATE TABLE warehouses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200),
    description VARCHAR(200),
    city VARCHAR(200),
    lat VARCHAR(50),
    long VARCHAR(50),
    location POINT
);