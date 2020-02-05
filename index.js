const koa = require('koa');
const {router: v1BookRouter} = require('./api/v1/book');
const {router: v2BookRouter} = require('./api/v2/book');

let app = new koa();

app.use(v1BookRouter.routes());
app.use(v2BookRouter.routes());

app.listen(3000);