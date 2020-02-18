class HttpException extends Error {
  constructor(message, httpCode, errorCode) {
    super();
    this.message = message || '服务器内部错误';
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

module.exports = {
  Unauthorized,
  HttpException,
};