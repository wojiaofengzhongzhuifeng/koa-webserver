const {sequelize} = require('../../core/db');

const {Model, Sequelize} = require('sequelize');

class User extends Model {

}

console.log(1);
User.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  nickName: Sequelize.STRING,
  password: Sequelize.STRING,
}, {sequelize});

module.exports = {
  User,
};