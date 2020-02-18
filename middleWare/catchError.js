const {HttpException} = require('../core/httpException');
async function catchError(ctx, next) {
  console.log('catchError');
  try {
    await next();
  } catch (e) {
    // 主动抛出的错误, 属于已知错误
    if (e instanceof HttpException) {
      ctx.response.status = e.httpCode;
      ctx.body = {
        message: e.message,
        errorCode: e.errorCode,
        requestUrl: `${ctx.request.method}: ${ctx.request.url}`,
      };
    } else {
      // 未知错误
      console.log(e);
      ctx.response.status = 500;
      ctx.body = {
        message: '服务器内部错误',
        errorCode: 999,
        requestUrl: `${ctx.request.method}: ${ctx.request.url}`,
      };
    }
  }
}

module.exports = {catchError};