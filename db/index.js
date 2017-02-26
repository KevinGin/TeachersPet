const Sequelize = require('sequelize');

const db = process.env.DATABASE_URL ? new Sequelize(process.env.DATABASE_URL) 
                                    : new Sequelize('computervision', 'root', 'password');

exports.db = db;