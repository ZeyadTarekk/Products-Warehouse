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
}

export default Customer;
