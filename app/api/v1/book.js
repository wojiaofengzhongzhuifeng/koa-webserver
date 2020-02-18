const Router = require('koa-router');
const router = new Router();
const {Unauthorized} = require('../../../core/httpException');

router.post('/:id/v1/book/list', (ctx, next) => {
  console.log('请求参数 ctx.request.query', ctx.query.id);
  console.log('路径参数 ctx.params', ctx.params);
  console.log('post body 参数', ctx.request.body);
  console.log('header 参数', ctx.request.headers);
  const id = ctx.params.id;

  if (id === '1') {
    throw new Unauthorized();
  }

  ctx.body = {
    data: 'v1/book'
  };
});

module.exports = router;