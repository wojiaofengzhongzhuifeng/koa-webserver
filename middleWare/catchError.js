async function catchError(ctx, next) {
  console.log('catchError');
  try {
    await next();
  } catch (e) {
    console.log(e);
    ctx.body = {
      message: '服务内部出错'
    };
  }
}

module.exports = {catchError};