class HttpException extends Error {
  constructor(message, httpCode, errorCode) {
    super();
    this.message = message || '服务器内部错误1';
    this.errorCode = errorCode || 10000;
    this.httpCode = httpCode || 400;
  }
}

class Unauthorized extends HttpException {
  constructor(message, httpCode, errorCode) {
    super();
    this.message = message || '用户无权限';
    this.errorCode = errorCode || 10000;
    this.httpCode = httpCode || 401;
  }
}

class ParameterException extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.httpCode = 400;
    this.message = msg || '参数错误';
    this.errorCode = errorCode || 10000;
  }
}

// 响应成功的类
class SuccessException extends HttpException {
  constructor(obj) {
    super();
    if (!obj) {
      this.httpCode = 200;
      this.message = '请求成功';
      this.errorCode = 0;
      this.data = null;
    } else {
      const {msg, errorCode, data} = obj;
      this.httpCode = 200;
      this.message = msg || '请求成功';
      this.errorCode = errorCode || 0;
      this.data = data;
    }
  }
}

// 登录过程中, 账号或者密码出错
class AuthFailed extends HttpException {
  constructor(msg, errorCode) {
    super();
    this.message = msg || '授权失败';
    this.errorCode = errorCode || 10004;
    this.httpCode = 401;
  }
}

module.exports = {
  Unauthorized,
  HttpException,
  ParameterException,
  SuccessException,
  AuthFailed,
};