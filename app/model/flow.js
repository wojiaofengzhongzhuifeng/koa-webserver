// 期刊数据
const {sequelize} = require('../../core/db');

const {Model, Sequelize} = require('sequelize');

const {HttpException} = require('../../core/httpException');

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
  static async getLatestFlow() {
    const result = await Flow.findOne({
      order: [['index', 'DESC']]
    });
    return result;
  }

  static async postLatestFlow(postData) {
    try {
      const result = await Flow.create(postData);
      return result;
    } catch (e) {
      throw new HttpException();
    }
  }
}

Flow.init(field, {sequelize, tableName: 'Flow'});

module.exports = {
  Flow,
};