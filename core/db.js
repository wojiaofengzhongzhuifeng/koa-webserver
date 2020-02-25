const {Sequelize} = require('sequelize');
const {
  dbData
} = require('../config/config');


const sequelize = new Sequelize(dbData.dbName, dbData.userName, dbData.password, {
  host: dbData.host,
  dialect: 'mysql',
  port: dbData.port,
  logging: true,
  define: {
    timestamps: true,
  }
});

sequelize.sync({
  force: true
});

module.exports = {
  sequelize,
};
