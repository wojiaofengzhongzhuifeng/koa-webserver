const Router = require('koa-router');
const router = new Router({
  prefix: '/v1/classic'
});
const {Unauthorized, NoExist} = require('../../../core/httpException');
const {ClassicValidator, ClassicGetValidator} = require('../../../app/validators/validator');
const {Auth, auth} = require('../../../middleWare/auth');
const {CLASSIC_TYPE} = require('../../lib/enum');
const {Unhandle} = require('../../../core/httpException');
const {Movie, Music, Sentence} = require('../../model/classic');
const {throwSuccess} = require('../../lib/help');

// 新增一个或者多个 movie, music, sentence 数据
router.post('/', new Auth(7).method, async (ctx, next) => {
  // 校验参数
  const v = await new ClassicValidator().validate(ctx);

  const classicData = v.get('body');

  handleAddClassicData(classicData);
  throwSuccess({
    message: '写入数据正常'
  });
});

router.get('/:type/:id', new Auth(7).method, async (ctx, next) => {
  const v = await new ClassicGetValidator().validate(ctx);

  const type = v.get('path.type');
  const id = v.get('path.id');

  await handleGetTypeData(type, id);
});

function handleAddClassicData(classicData) {
  const type = Number(classicData.type);
  console.log(type);
  switch (type) {
    case CLASSIC_TYPE.movie:
      addMovie(classicData);
      break;
    case CLASSIC_TYPE.music:
      addMusic(classicData);
      break;
    case CLASSIC_TYPE.sentence:
      addSentence(classicData);
      break;
    default:
      throw new Unhandle();
  }
}

async function handleGetTypeData(type, id) {
  let result;
  switch (Number(type)) {
    case CLASSIC_TYPE.music:
      result = await Music.getData(id);
      if (result) {
        throwSuccess({
          message: '获取成功',
          data: result
        });
      } else {
        throw new NoExist();
      }
      break;
    case CLASSIC_TYPE.movie:
      result = await Movie.getData(id);
      if (result) {
        throwSuccess({
          message: '获取成功',
          data: result
        });
      } else {
        throw new NoExist();
      }
      break;
    case CLASSIC_TYPE.sentence:
      result = await Sentence.getData(id);
      if (result) {
        throwSuccess({
          message: '获取成功',
          data: result
        });
      } else {
        throw new NoExist();
      }
      break;
    default:
      throw new Unhandle();
  }
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