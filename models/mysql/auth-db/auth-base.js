/**
 * Created by raniys on 5/18/17.
 */

const Sequelize = require('sequelize');
const config = {
    host:     process.env.DB_HOST,
    port:     process.env.DB_PORT,
    user:     process.env.DB_USER,
    password: process.env.DB_PASSWORD
};

const sequelize = new Sequelize('auth_db', config.user, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

module.exports = sequelize;