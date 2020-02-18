async function catchError(ctx, next) {
  console.log('catchError');
  try {
    await next();
  } catch (e) {
    if (e.errorCode) {
      ctx.body = {
        message: e.message,
        errorCode: e.errorCode,
        requestUrl: `${ctx.request.method}: ${ctx.request.url}`,
      };
    }
  }
}

module.exports = {catchError};