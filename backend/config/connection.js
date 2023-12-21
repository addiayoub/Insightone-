const sql = require("mssql");

async function connection() {
  const config = {
    user: "testuser",
    password: "123456789",
    server: "192.168.11.108",
    database: "Staging_DB",
    requestTimeout: 130000,
    options: {
      trustServerCertificate: true,
    },
  };

  try {
    const pool = await sql.connect(config);
    console.log("You are connected to sql");
    return pool;
  } catch (error) {
    console.error("Error connecting to SQL:", error.message);
  }
}
module.exports = connection;
