const koa = require('koa');
const initCore = require('./core/init');
const bodyParser = require('koa-bodyparser');
const {catchError} = require('./middleWare/catchError');

let app = new koa();
app.use(catchError);
app.use(bodyParser());
initCore(app);

app.listen(3000);