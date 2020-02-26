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
  constructor(msg, errorCode) {
    super();
    this.httpCode = 200;
    this.message = msg || '请求成功';
    this.errorCode = errorCode || 0;
  }
}

module.exports = {
  Unauthorized,
  HttpException,
  ParameterException,
  SuccessException,
};