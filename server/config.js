module.exports = {
  development: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'avocado',
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
  },
  production: {
    username: 'admin',
  },
};
