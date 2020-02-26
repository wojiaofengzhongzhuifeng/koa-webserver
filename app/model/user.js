const bcrypt = require('bcryptjs');

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
  password: {
    type: Sequelize.STRING,
    set(password) {
      const salt = bcrypt.genSaltSync(10);
      const encryptPassword = bcrypt.hashSync(password, salt);
      this.setDataValue('password', encryptPassword);
    }
  },
}, {sequelize});

module.exports = {
  User,
};