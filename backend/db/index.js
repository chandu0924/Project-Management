const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "clone",
  password: "password",
  port: 5432,
});

module.exports = pool;
