const {Forbidden, SuccessException} = require('../core/httpException');
const {verifyToken} = require('../core/util');
const auth = (ctx, next) => {
  let token = ctx.header.token || ctx.request.body.token || '';
  if (!token) {
    throw new Forbidden();
  }
  // 将 token 传入 verifyToken, 如果 token 出现错误, 抛出相应的错误, 如果没有错误,那么执行下面的代码
  verifyToken(token);
  next();
};

const AUTH_SCOPE = {
  USER: 8,
};


class Auth {
  constructor(level) {
    // 接口权限数据
    this.level = level || 1;
  }

  get method() {
    return (ctx, next) => {
      let token = ctx.header.token || ctx.request.body.token || '';
      if (!token) {
        throw new Forbidden();
      }
      // 将 token 传入 verifyToken, 如果 token 出现错误, 抛出相应的错误, 如果没有错误,那么执行下面的代码
      const scopeData = verifyToken(token).scope;

      // 判断接口权限
      if (Number(scopeData) < Number(this.level)) {
        throw new Forbidden({
          message: '身份权限不足'
        });
      }

      next();
    };
  }
}

module.exports = {
  Auth,
  auth,
  AUTH_SCOPE,
};