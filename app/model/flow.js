// 期刊数据
const {sequelize} = require('../../core/db');

const {Model, Sequelize} = require('sequelize');

const field = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  // 区分是什么
  type: Sequelize.INTEGER,
  typeId: Sequelize.INTEGER,
  index: {
    type: Sequelize.INTEGER,
    default: 0,
  }
};

class Flow extends Model {
}

Flow.init(field, {sequelize, tableName: 'Flow'});

module.exports = {
  Flow,
};