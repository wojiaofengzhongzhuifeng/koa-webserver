const Router = require('koa-router');
const router = new Router({
  prefix: '/v1/flow'
});
const {Unauthorized, NoExist} = require('../../../core/httpException');
const {GetLatestFlowValidator, PostLatestFlowValidator} = require('../../../app/validators/validator');
const {Auth, auth} = require('../../../middleWare/auth');
const {CLASSIC_TYPE} = require('../../lib/enum');
const {Unhandle} = require('../../../core/httpException');
const {Flow} = require('../../model/flow');
const {throwSuccess} = require('../../lib/help');
const {Art} = require('../../model/art');

router.get('/latest', new Auth().method, async (ctx, next) => {
  const v = await new GetLatestFlowValidator().validate(ctx);
  const result = await Art.getLatestArt();
  if (result) {
    throwSuccess({
      message: '获取数据成功',
      data: result,
    });
  } else {
    throw new global.httpException.NoExist();
  }
});

router.post('/', new Auth().method, async (ctx, next) => {
  const v = await new PostLatestFlowValidator().validate(ctx);

  const type = v.get('body.type');
  const typeId = v.get('body.typeId');
  const index = v.get('body.index');

  const result = await Flow.postLatestFlow({type, typeId, index});
  throwSuccess({
    message: '新增数据成功',
    data: result
  });
});


module.exports = router;