const Router = require('koa-router');
const router = new Router({
  prefix: '/v1/classic'
});
const {Unauthorized} = require('../../../core/httpException');
const {ClassicValidator} = require('../../../app/validators/validator');
const {Auth, auth} = require('../../../middleWare/auth');
const {CLASSIC_TYPE} = require('../../lib/enum');
const {Unhandle} = require('../../../core/httpException');
const {Movie, Music, Sentence} = require('../../model/classic');

// 新增一个或者多个 movie, music, sentence 数据
router.post('/', new Auth(7).method, async (ctx, next) => {
  // 校验参数
  const v = await new ClassicValidator().validate(ctx);

  const classicData = v.get('body.data');

  handleAddClassicData(classicData);
});

function handleAddClassicData(classicData) {
  classicData.forEach((postData) => {
    let type = Number(postData.type);
    let dbData = postData;

    switch (type) {
      case CLASSIC_TYPE.movie:
        addMovie(dbData);
        break;
      case CLASSIC_TYPE.music:
        addMusic(dbData);
        break;
      case CLASSIC_TYPE.sentence:
        addSentence(dbData);
        break;
      default:
        throw new Unhandle();
    }
  });
}

function addMovie(dbData) {
  Movie.addData({...dbData, test: 123321});
}

function addMusic(dbData) {
  Music.addData({...dbData, test: 123321});
}

function addSentence(dbData) {
  Sentence.addData({...dbData, test: 123321});
}

module.exports = router;