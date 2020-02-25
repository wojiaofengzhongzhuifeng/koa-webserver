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
    visit: (obj) => {
      if (obj instanceof Router) {
        app.use(obj.routes());
      }
    }
  });

  // 将 config/config.js 的对象配置到 global 中
  const configPath = path.join(process.cwd(), './config/config.js');
  global.config = require(configPath);
}

module.exports = initCore;