// 通过 flow + classic 数据, 返回最新期刊数据
const {Model} = require('sequelize');
const {Flow} = require('./flow');
const {CLASSIC_TYPE} = require('../lib/enum');
const {Movie, Music, Sentence} = require('./classic');
const {Unhandle} = require('../../core/httpException');


class Art extends Model {
  static async getLatestArt() {
    let getArtResult;
    const result = await Flow.getLatestFlow();
    const {type, typeId, index} = result;
    switch (type) {
      case CLASSIC_TYPE.movie:
        const movieResult = await Movie.getData(typeId);
        movieResult.setDataValue('index', index);
        getArtResult = movieResult;
        break;
      case CLASSIC_TYPE.music:
        const musicResult = await Music.getData(typeId);
        musicResult.setDataValue('index', index);
        getArtResult = musicResult;
        break;
      case CLASSIC_TYPE.sentence:
        const sentenceResult = await Sentence.getData(typeId);
        sentenceResult.setDataValue('index', index);
        getArtResult = sentenceResult;
        break;
      default:
        throw new Unhandle();
    }
    return getArtResult;
  }
}


module.exports = {
  Art,
};