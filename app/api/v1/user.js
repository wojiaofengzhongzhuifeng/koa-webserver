const Router = require('koa-router');
const router = new Router({
  prefix: '/v1/user'
});
const {RegisterValidator} = require('../../../app/validators/validator');
const {User} = require('../../model/user');
router.post('/register', async (ctx, next) => {
  // 校验参数
  const v = await new RegisterValidator().validate(ctx);

  // 获取参数数据
  const registerData = {
    email: v.get('body.email'),
    nickName: v.get('body.nickName'),
    password: v.get('body.password'),
  };

  const registerResponse = await User.create(registerData);
  console.log('registerResponse', registerResponse);


  ctx.body = {
    httpCode: 200,
    message: '注册成功',
    error: 0,
  };
});

module.exports = router;