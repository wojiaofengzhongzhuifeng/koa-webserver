const bcrypt = require('bcryptjs');
const Router = require('koa-router');
const router = new Router({
  prefix: '/v1/token'
});
const {throwSuccess} = require('../../lib/help');
const {TokenValidator} = require('../../../app/validators/validator');
const {LOGIN_TYPE} = require('../../lib/enum');
const {User} = require('../../model/user');
const {AuthFailed} = require('../../../core/httpException');


router.post('/', async (ctx, next) => {
  // 校验参数
  const v = await new TokenValidator().validate(ctx);

  const type = v.get('body.type');
  const account = v.get('body.email');
  const password = v.get('body.password');

  switch (type) {
    case LOGIN_TYPE.havePassword:
      const response = await handleHavePassword(account, password);
      break;
    case LOGIN_TYPE.noPassword:
      handleNoPassword();
      break;
  }

  throwSuccess();
});

// 处理有密码的登录情况
/*
* 1. 判断账号是否存在
* 2.1. 如果账号存在, 取出账号对应加密后的密码;
* 2.2. 如果账号不存在, 抛出已知错误
* 3.1. 将未加密代码与加密代码比较,如果一致, 说明密码正确,抛出正确错误; 否则抛出已知错误
* */
async function handleHavePassword(account, password) {
  const accountResponse = await User.findOne({
    where: {
      email: account,
    }
  });
  if (!accountResponse) {
    throw new AuthFailed('账号错误');
  } else {
    const dbPassword = accountResponse.password;
    const passwordCompareResult = bcrypt.compareSync(password, dbPassword);

    if (passwordCompareResult) {
      throwSuccess();
    } else {
      throw new AuthFailed('密码错误');
    }
  }
}

// 处理没有密码登录情况
function handleNoPassword() {
}

module.exports = router;