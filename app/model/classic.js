// 初始化 movie, sentence, music
const {sequelize} = require('../../core/db');

const {Model, Sequelize} = require('sequelize');

class Movie extends Model {
}

Movie.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  content: Sequelize.STRING,
  title: Sequelize.STRING,
  liked: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  picUrl: Sequelize.STRING,
  publishDate: Sequelize.DATEONLY,
}, {sequelize, tableName: 'Movie'});

module.exports = {
  Movie,
};