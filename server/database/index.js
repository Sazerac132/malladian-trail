const mysql = require('mysql2');

class Database {
  constructor() {
    this.config = {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME
    };

    this.connection = mysql.createConnection(this.config);
    this.connection.config.namedPlaceholders = true;
  }

  query(sql, parameters = {}) {
    return new Promise((resolve, reject) => {
      this.connection.execute(sql, parameters, (err, results, fields) => {
        if (err) {
          reject(err);
          return;
        }

        resolve({
          results,
          fields
        });
      });
    });
  }
}

module.exports = new Database();
