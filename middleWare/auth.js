const auth = (ctx, next) => {
  console.log(ctx.header.token);
  console.log(ctx.request.body.token);
};
module.exports = auth;