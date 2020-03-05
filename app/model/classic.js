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
}

class Music extends Model {
}

class Sentence extends Model {

}

Movie.init(baseField, {sequelize, tableName: 'Movie'});

Sentence.init(baseField, {sequelize, tableName: 'Sentence'});

Music.init({...baseField, playUrl: Sequelize.STRING}, {sequelize, tableName: 'Music'});

module.exports = {
  Movie,
  Music,
  Sentence,
};