const koa = require('koa');
const requireDirectory = require('require-directory');
const Router = require('koa-router');

let app = new koa();

// bug: 未兼容 module.exports = {router] 情况
requireDirectory(module, './api', {
  visit: (obj)=>{
    if(obj instanceof Router){
      app.use(obj.routes());
    }
  }
});

app.listen( 3000);