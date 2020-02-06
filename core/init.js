const requireDirectory = require('require-directory');
const Router = require('koa-router');
const path = require('path');
function initCore(app){
  initLoadRouters(app);
}

function initLoadRouters(app){
  const routerPath = path.join(process.cwd(), './app/api');
  // bug: 未兼容 module.exports = {router] 情况
  requireDirectory(module, routerPath, {
    visit: (obj)=>{
      if(obj instanceof Router){
        app.use(obj.routes());
      }
    }
  });
}

module.exports = initCore;