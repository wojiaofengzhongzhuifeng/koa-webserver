const Router = require('koa-router');
const router = new Router({
  prefix: '/v1/token'
});
const {throwSuccess} = require('../../lib/help');
const {TokenValidator} = require('../../../app/validators/validator');


router.post('/', async (ctx, next) => {
  // 校验参数
  const v = await new TokenValidator().validate(ctx);

  throwSuccess();
});

module.exports = router;