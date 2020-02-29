const jwt = require('jsonwebtoken');
const {TokenExpiredError, SuccessException} = require('jsonwebtoken');
const {secretKey, expiresIn} = require('../config/config');
const {Forbidden} = require('../core/httpException');
/***
 *
 */
const findMembers = function (instance, {
  prefix,
  specifiedType,
  filter
}) {
  // 递归函数
  function _find(instance) {
    //基线条件（跳出递归）
    if (instance.__proto__ === null)
      return [];

    let names = Reflect.ownKeys(instance);
    names = names.filter((name) => {
      // 过滤掉不满足条件的属性或方法名
      return _shouldKeep(name);
    });

    return [...names, ..._find(instance.__proto__)];
  }

  function _shouldKeep(value) {
    if (filter) {
      if (filter(value)) {
        return true;
      }
    }
    if (prefix)
      if (value.startsWith(prefix))
        return true;
    if (specifiedType)
      if (instance[value] instanceof specifiedType)
        return true;
  }

  return _find(instance);
};

const generateToken = function (uid, scope) {
  return jwt.sign({
    uid,
    scope
  }, secretKey, {
    expiresIn
  });
};

const verifyToken = function (token) {
  try {
    const result = jwt.verify(token, secretKey);
    console.log('result', result);
    return result;
    // throw new SuccessException();
  } catch (e) {
    console.log('e', e);
    if (e instanceof TokenExpiredError) {
      throw new Forbidden({
        message: 'token 过期'
      });
    }
  }
};


module.exports = {
  findMembers,
  generateToken,
  verifyToken,
};