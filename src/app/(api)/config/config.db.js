module.exports = {
  development: {
    host: 'ep-green-bird-a1loz69i-pooler.ap-southeast-1.aws.neon.tech',
    port: '5432',
    user: 'default',
    password: '1qsLStBwb8AP',
    database: 'verceldb',
  },
  production: {
    connectionString: process.env.POSTGRES_URL,
  },
  qc: {
    host: 'ep-green-bird-a1loz69i-pooler.ap-southeast-1.aws.neon.tech',
    port: '5432',
    user: 'default',
    password: '1qsLStBwb8AP',
    database: 'verceldb',
  },
};
