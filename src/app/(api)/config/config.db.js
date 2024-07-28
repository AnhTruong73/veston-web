module.exports = {
  "development": {
    host: "26.221.253.2",
    port: "5432",
    user: "postgres",
    password: "JAYTRUONG2024!",
    database: "postgres"
  },
  "production": {
    connectionString: process.env.POSTGRES_URL,
  },
  "qc": {
    host: "26.221.253.2",
    port: "5432",
    user: "postgres",
    password: "JAYTRUONG2024!",
    database: "postgres"
  }
}
