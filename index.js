const koa = require('koa');
const Router = require('koa-router');

const router = new Router();

router.get('/', (ctx, next) => {
  // ctx.router available
  console.log(1);
});

let app = new koa();

app.use(router.routes());

app.listen(3000);