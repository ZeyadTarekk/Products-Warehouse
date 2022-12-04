import Client from "../database.js";

class Product {
  name;
  description;
  price;

  constructor(name, description, price) {
    this.name = name;
    this.description = description;
    this.price = price;
  }

  async save(images) {
    try {
      const sql =
        "INSERT INTO products(name,description,price) VALUES (($1),($2),($3)) RETURNING *;";
      const connection = await Client.connect();
      const result = await connection.query(sql, [
        this.name,
        this.description,
        this.price,
      ]);

      const createdProduct = result.rows[0];
      if (images) {
        let imagesQuery = "";
        images.forEach((image) => {
          imagesQuery += `INSERT INTO products_image(product_id,url,is_default) VALUES (${createdProduct.id}, '${image.path}',false);`;
        });
        console.log(imagesQuery);
        const imagesResult = await connection.query(imagesQuery);
        console.log(imagesQuery);
      }
      connection.release();

      return createdProduct;
    } catch (err) {
      console.log(err);
      err.statusCode = 500;
      throw err;
    }
  }

  static async getProductById(productId) {
    const sql = "SELECT * FROM products WHERE id = ($1);";
    const connection = await Client.connect();
    const result = await connection.query(sql, [productId]);
    if (result.rowCount === 0) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }
    connection.release();
    return result.rows[0];
  }

  static async deleteProduct(productId) {
    const sql = "DELETE FROM products WHERE id = ($1);";
    const connection = await Client.connect();
    const result = await connection.query(sql, [productId]);
    console.log(result);
    if (result.rowCount === 0) {
      const error = new Error("Product not found");
      error.statusCode = 404;
      throw error;
    }
    connection.release();
    return result.rows[0];
  }

  static async getProducts() {
    const sql = "SELECT * FROM products;";
    const connection = await Client.connect();
    const result = await connection.query(sql);
    connection.release();
    return result.rows;
  }

  static async updateProduct(id, name, description, price) {
    console.log("entered");
    try {
      const sql =
        "UPDATE products SET name = ($1), description = ($2), price = ($3) WHERE id = ($4) RETURNING *;";
      const connection = await Client.connect();
      const result = await connection.query(sql, [
        name,
        description,
        price,
        id,
      ]);
      console.log(result);
      const updatedUser = result.rows[0];
      if (result.rowCount === 0) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
      }
      connection.release();

      return updatedUser;
    } catch (err) {
      console.log(err);
      err.statusCode = 500;
      throw err;
    }
  }
}

export default Product;
