/* Replace with your SQL commands */

CREATE TABLE products_image (
    id SERIAL PRIMARY KEY,
    product_id bigint REFERENCES products(id),
    url VARCHAR(200),
    is_default boolean
);