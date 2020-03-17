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

  // 将 config.js, httpException.js, validator.js 的对象配置到 global 中
  const configPath = path.join(process.cwd(), './config/config.js');
  const httpExceptionPath = path.join(process.cwd(), './core/httpException.js');
  const validatorPath = path.join(process.cwd(), './app/validators/validator.js');
  global.config = require(configPath);
  global.httpException = require(httpExceptionPath);
  global.validator = require(validatorPath);
}

module.exports = initCore;