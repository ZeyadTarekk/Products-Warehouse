/* Replace with your SQL commands */

CREATE TABLE products_warehouse (
    id SERIAL PRIMARY KEY,
    product_id bigint REFERENCES products(id),
    warehouse_id bigint REFERENCES warehouses(id),
    qty INTEGER
);