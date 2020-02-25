const Router = require('koa-router');
const router = new Router({
  prefix: '/v1/user'
});
const {RegisterValidator} = require('../../../app/validators/validator');
router.post('/register', async (ctx, next) => {
  // 校验参数
  const v = await new RegisterValidator().validate(ctx);
  console.log('所有请求用户数据', v);

  ctx.body = {
    data: 'success get data'
  };
});

module.exports = router;