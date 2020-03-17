const Router = require('koa-router');
const router = new Router({
  prefix: '/v1/flow'
});
const {Unauthorized, NoExist} = require('../../../core/httpException');
const {GetLatestFlowValidator} = require('../../../app/validators/validator');
const {Auth, auth} = require('../../../middleWare/auth');
const {CLASSIC_TYPE} = require('../../lib/enum');
const {Unhandle} = require('../../../core/httpException');
const {Flow} = require('../../model/flow');
const {throwSuccess} = require('../../lib/help');

router.get('/latest', new Auth().method, async (ctx, next) => {
  const v = await new GetLatestFlowValidator().validate(ctx);
  const result = await Flow.getLatestFlow();
  console.log('result', result);
  ctx.body = {
    data: 'success get data'
  };
});


module.exports = router;