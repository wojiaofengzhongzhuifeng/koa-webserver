const koa = require('koa');
const initCore = require('./core/init');
const bodyParser = require('koa-bodyparser');


let app = new koa();
app.use(bodyParser());
initCore(app);

app.listen(3000);