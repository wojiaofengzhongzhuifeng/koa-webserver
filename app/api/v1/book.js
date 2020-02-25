const Router = require('koa-router');
const router = new Router();
const {Unauthorized} = require('../../../core/httpException');
const {PositiveIntegerValidator} = require('../../../app/validators/validator');

router.post('/:id/v1/book/list', async (ctx, next) => {
  // 获取参数
  console.log('请求参数 ctx.request.query', ctx.query.id);
  console.log('路径参数 ctx.params', ctx.params);
  console.log('post body 参数', ctx.request.body);
  console.log('header 参数', ctx.request.headers);
  const id = ctx.params.id;

  // 校验参数
  const v = await new PositiveIntegerValidator().validate(ctx);


  ctx.body = {
    data: 'success get data'
  };
});

module.exports = router;