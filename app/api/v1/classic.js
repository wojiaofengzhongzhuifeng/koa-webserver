const Router = require('koa-router');
const router = new Router({
  prefix: '/v1/classic'
});
const {Unauthorized} = require('../../../core/httpException');
const {ClassicValidator} = require('../../../app/validators/validator');
const {Auth, auth} = require('../../../middleWare/auth');

// 新增一个或者多个 movie, music, sentence 数据
router.post('/', new Auth(7).method, async (ctx, next) => {
  // 校验参数
  const v = await new ClassicValidator().validate(ctx);

  const classicData = v.get('body.data');

  ctx.body = {
    data: classicData
  };
});

module.exports = router;