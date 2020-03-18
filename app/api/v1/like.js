const Router = require('koa-router');
const router = new Router({
  prefix: '/v1/liked'
});
const {Auth} = require('../../../middleWare/auth');

router.post('/', new Auth().method, async (ctx, next) => {
  // 校验参数
  const v = await new global.validator.PostLikedValidator().validate(ctx);

  // 获取参数
  const type = v.get('body.type');
  const typeId = v.get('body.typeId');
  const uid = ctx.auth.uid;

  console.log(uid);
  // const uid = ctx.auth


  ctx.body = {
    data: 'success g123321et data'
  };
});

module.exports = router;