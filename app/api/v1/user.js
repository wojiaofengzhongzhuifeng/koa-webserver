const Router = require('koa-router');
const bcrypt = require('bcryptjs');

const router = new Router({
  prefix: '/v1/user'
});
const {RegisterValidator} = require('../../../app/validators/validator');
const {User} = require('../../model/user');
const {throwSuccess} = require('../../lib/help');
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

  throwSuccess();
});

module.exports = router;