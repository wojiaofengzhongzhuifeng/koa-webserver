const Router = require('koa-router');
const router = new Router();
const {Unauthorized} = require('../../../core/httpException');
const {PositiveIntegerValidator} = require('../../../app/validators/validator');

router.post('/:id/v1/book/list', async (ctx, next) => {
  // 校验参数
  const v = await new PositiveIntegerValidator().validate(ctx);
  console.log('所有请求数据', v);

  // 获取参数
  // 获取路径参数
  const pathId = v.get('path.id');
  // 获取查询参数
  const queryId = v.get('query.id1');
  // 获取 header 参数
  const headerId = v.get('header.test');
  // 获取 body 参数
  const bodyData = v.get('body.userName');


  ctx.body = {
    data: 'success get data'
  };
});

module.exports = router;