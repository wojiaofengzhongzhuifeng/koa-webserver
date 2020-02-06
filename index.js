const koa = require('koa');
const initCore = require('./core/init');

let app = new koa();
initCore(app);

app.listen( 3000);