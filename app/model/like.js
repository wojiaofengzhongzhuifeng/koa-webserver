const bcrypt = require('bcryptjs');

const {sequelize} = require('../../core/db');

const {Model, Sequelize} = require('sequelize');

class Like extends Model {

}

Like.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: Sequelize.INTEGER,
  typeId: Sequelize.INTEGER,
  uid: Sequelize.INTEGER,
}, {sequelize});

module.exports = {
  Like,
};