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


class Auth {
  constructor() {
  }

  get method() {
    return (ctx, next) => {
      let token = ctx.header.token || ctx.request.body.token || '';
      if (!token) {
        throw new Forbidden();
      }
      // 将 token 传入 verifyToken, 如果 token 出现错误, 抛出相应的错误, 如果没有错误,那么执行下面的代码
      verifyToken(token);
      next();
    };
  }
}

module.exports = {
  Auth,
  auth,
};