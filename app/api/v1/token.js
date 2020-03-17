const jwt = require('jsonwebtoken');
const axios = require('axios');
const bcrypt = require('bcryptjs');
const Router = require('koa-router');
const router = new Router({
  prefix: '/v1/token'
});
const {throwSuccess} = require('../../lib/help');
const {TokenValidator, VerifyTokenValidator} = require('../../../app/validators/validator');
const {LOGIN_TYPE} = require('../../lib/enum');
const {User} = require('../../model/user');
const {AuthFailed, Unhandle} = require('../../../core/httpException');
const {generateToken} = require('../../../core/util');
const {AUTH_SCOPE} = require('../../../middleWare/auth');
const config = require('../../../config/config');

router.post('/', async (ctx, next) => {
  // 校验参数
  const v = await new TokenValidator().validate(ctx);

  const type = Number(v.get('body.type'));
  const account = v.get('body.email');
  const password = v.get('body.password');

  switch (type) {
    case LOGIN_TYPE.havePassword:
      await handleHavePassword(account, password, ctx);
      break;
    case LOGIN_TYPE.miniProgram:
      handleMiniProgram(account);
      break;
    default:
      throw new Unhandle();
  }

});

// 判断 token 是否合法
router.post('/verify', async (ctx, next) => {
  const v = await new VerifyTokenValidator().validate(ctx);
  const token = v.get('body.token');
  try {
    jwt.verify(token, config.secretKey);
    throwSuccess({
      message: '该 token 合法'
    });
  } catch (e) {
    throw new AuthFailed('token 不合法');
  }
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
  }
  if (!password) {
    throw new AuthFailed('密码未填');
  }
  const dbPassword = accountResponse.password;
  const passwordCompareResult = bcrypt.compareSync(String(password), dbPassword);
  if (passwordCompareResult) {
    // 登陆成功, 生成 jwt 返回给响应内容
    const token = generateToken(accountResponse.id, AUTH_SCOPE.USER);
    throwSuccess({data: token});
  } else {
    throw new AuthFailed('密码错误');
  }
}

// 处理微信小程序的登录函数
async function handleMiniProgram(account) {
  const wxCode2SessionUrl = `https://api.weixin.qq.com/sns/jscode2session?appid=${config.wx.appId}&secret=${config.wx.secretId}&js_code=${account}&grant_type=authorization_code`;
  const wxGetOpenId = await axios({
    url: wxCode2SessionUrl,
  });
  if (wxGetOpenIdResponse.data.errcode) {
    throw new AuthFailed(`微信校验失败: ${wxGetOpenIdResponse.data.errmsg}`);
  }

  const openId = wxGetOpenIdResponse.data.openid;
  // 数据库搜索 openid 对应数据
  const accountResponse = await User.findOne({
    where: {
      openId: openId,
    }
  });

  if (!accountResponse) {
    // 用户第一次进入小程序, 需要根据 openId 保存一条数据
    const userData = {
      openId: openId,
      email: openId,
      nickName: openId,
    };
    const addUserResponse = await User.create(userData);
    const token = generateToken(addUserResponse.id, AUTH_SCOPE.USER);
    if (addUserResponse) {
      throwSuccess({
        message: '注册用户成功',
        data: token,
      });
    }
  } else {
    // 用户第二次进入小程序
    console.log('用户第二次进入小程序');
    const token = generateToken(accountResponse.id, AUTH_SCOPE.USER);
    throwSuccess({
      message: '获取用户成功',
      data: token,
    });
  }
}

module.exports = router;