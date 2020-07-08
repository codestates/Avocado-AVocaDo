const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

module.exports = {
  development: {
    username: 'root',
    password: process.env.DATABASE_DEVELOPMENT_PASSWORD,
    database: 'dev',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: '0000',
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: process.env.DATABASE_PRODUCTION_USERNAME,
    password: process.env.DATABASE_PRODUCTION_PASSWORD,
    database: 'avocado',
    host: process.env.DATABASE_PRODUCTION_HOST,
    dialect: 'mysql',
  },
};
