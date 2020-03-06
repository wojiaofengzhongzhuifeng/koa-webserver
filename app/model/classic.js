// 初始化 movie, sentence, music
const {sequelize} = require('../../core/db');

const {Model, Sequelize} = require('sequelize');

const baseField = {
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
};

class Movie extends Model {
  static addData(postData) {
    Movie.create(postData);
  }
}

class Music extends Model {
  static addData(postData) {
    console.log('postData', postData);
    Music.create(postData);
  }
}

class Sentence extends Model {
  static addData(postData) {
    Sentence.create(postData);
  }
}

Movie.init(baseField, {sequelize, tableName: 'Movie'});

Sentence.init(baseField, {sequelize, tableName: 'Sentence'});

Music.init({...baseField, playUrl: Sequelize.STRING}, {sequelize, tableName: 'Music'});

module.exports = {
  Movie,
  Music,
  Sentence,
};