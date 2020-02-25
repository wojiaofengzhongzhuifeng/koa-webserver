const koa = require('koa');
const initCore = require('./core/init');
const bodyParser = require('koa-bodyparser');
const {catchError} = require('./middleWare/catchError');

let app = new koa();

// 加载 user model
require('./app/model/user');

app.use(catchError);
app.use(bodyParser());
initCore(app);

app.listen(3000);