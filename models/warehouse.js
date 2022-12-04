import Client from "../database.js";

class Warehouse {
  name;
  description;
  city;
  lat;
  long;
  constructor(name, description, city, lat, long) {
    this.name = name;
    this.description = description;
    this.city = city;
    this.lat = lat;
    this.long = long;
  }

  async save() {
    try {
      const sql =
        "INSERT INTO warehouses(name,description,city,lat,long,location) VALUES (($1),($2),($3),($4),($5),point(($6),($7))) RETURNING *;";
      const connection = await Client.connect();
      const result = await connection.query(sql, [
        this.name,
        this.description,
        this.city,
        this.lat,
        this.long,
        this.lat,
        this.long,
      ]);

      const createdWarehouses = result.rows[0];
      connection.release();

      return createdWarehouses;
    } catch (err) {
      console.log(err);
      err.statusCode = 500;
      throw err;
    }
  }

  static async getWarehouseById(warehouseId) {
    const sql = "SELECT * FROM warehouses WHERE id = ($1);";
    const connection = await Client.connect();
    const result = await connection.query(sql, [warehouseId]);
    if (result.rowCount === 0) {
      const error = new Error("Warehouse not found");
      error.statusCode = 404;
      throw error;
    }
    connection.release();
    return result.rows[0];
  }

  static async deleteWarehouse(warehouseId) {
    const sql = "DELETE FROM warehouses WHERE id = ($1);";
    const connection = await Client.connect();
    const result = await connection.query(sql, [warehouseId]);
    console.log(result);
    if (result.rowCount === 0) {
      const error = new Error("Warehouse not found");
      error.statusCode = 404;
      throw error;
    }
    connection.release();
    return result.rows[0];
  }

  static async getWarehouses() {
    const sql = "SELECT * FROM warehouses;";
    const connection = await Client.connect();
    const result = await connection.query(sql);
    connection.release();
    return result.rows;
  }

  static async updateWarehouse(id, name, description, city, lat, long) {
    try {
      const sql =
        "UPDATE warehouses SET name = ($1), description = ($2),  city = ($3), lat = ($4), long = ($5), location = point(($6),($7)) WHERE id = ($8) RETURNING *;";
      const connection = await Client.connect();
      const result = await connection.query(sql, [
        name,
        description,
        city,
        lat,
        long,
        lat,
        long,
        id,
      ]);
      if (result.rowCount === 0) {
        const error = new Error("Warehouse not found");
        error.statusCode = 404;
        throw error;
      }
      const updatedWarehouse = result.rows[0];
      connection.release();

      return updatedWarehouse;
    } catch (err) {
      console.log(err);
      err.statusCode = 500;
      throw err;
    }
  }
}

export default Warehouse;
