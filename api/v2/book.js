const Router = require('koa-router');
const router = new Router();

router.get('/v2/book/list', (ctx, next) => {
  ctx.body = {
    data: "v2/book"
  }
});

module.exports = {router};