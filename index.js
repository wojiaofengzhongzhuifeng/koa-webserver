const koa = require('koa');
const initCore = require('./core/init');
const bodyParser = require('koa-bodyparser');
const {catchError} = require('./middleWare/catchError');

let app = new koa();

// 加载 user model
require('./app/model/user');

// 使用 sequelize 定义 tabName 与 field
// require('./app/model/user');
require('./app/model/classic');
require('./app/model/flow');
require('./app/model/like');

app.use(catchError);
app.use(bodyParser());
initCore(app);

app.listen(3000);