import Client from "../database.js";

class Customer {
  name;
  email;
  phone;
  city;
  lat;
  long;
  constructor(name, email, phone, city, lat, long) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.city = city;
    this.lat = lat;
    this.long = long;
  }

  async save() {
    try {
      const sql =
        "INSERT INTO customers(name,email,phone,city,lat,long,location) VALUES (($1),($2),($3),($4),($5),($6),point(($7),($8))) RETURNING *;";
      const connection = await Client.connect();
      const result = await connection.query(sql, [
        this.name,
        this.email,
        this.phone,
        this.city,
        this.lat,
        this.long,
        this.lat,
        this.long,
      ]);

      const createdUser = result.rows[0];
      connection.release();

      return createdUser;
    } catch (err) {
      console.log(err);
      err.statusCode = 500;
      throw err;
    }
  }

  static async getCustomerById(customerId) {
    const sql = "SELECT * FROM customers WHERE id = ($1);";
    const connection = await Client.connect();
    const result = await connection.query(sql, [customerId]);
    if (result.rowCount === 0) {
      const error = new Error("Customer not found");
      error.statusCode = 404;
      throw error;
    }
    connection.release();
    return result.rows[0];
  }

  static async deleteCustomer(customerId) {
    const sql = "DELETE FROM customers WHERE id = ($1);";
    const connection = await Client.connect();
    const result = await connection.query(sql, [customerId]);
    console.log(result);
    if (result.rowCount === 0) {
      const error = new Error("Customer not found");
      error.statusCode = 404;
      throw error;
    }
    connection.release();
    return result.rows[0];
  }

  static async getCustomers() {
    const sql = "SELECT * FROM customers;";
    const connection = await Client.connect();
    const result = await connection.query(sql);
    connection.release();
    return result.rows;
  }

  static async updateCustomer(id, name, email, phone, city, lat, long) {
    try {
      const sql =
        "UPDATE customers SET name = ($1), email = ($2), phone = ($3), city = ($4), lat = ($5), long = ($6), location = point(($7),($8)) WHERE id = ($9) RETURNING *;";
      const connection = await Client.connect();
      const result = await connection.query(sql, [
        name,
        email,
        phone,
        city,
        lat,
        long,
        lat,
        long,
        id,
      ]);
      const updatedUser = result.rows[0];
      connection.release();

      return updatedUser;
    } catch (err) {
      console.log(err);
      err.statusCode = 500;
      throw err;
    }
  }
}

export default Customer;
