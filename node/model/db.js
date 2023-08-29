const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "11042000",
  host: "localhost",
  port: 5432,
  database: "pfa",
});

module.exports = pool;
