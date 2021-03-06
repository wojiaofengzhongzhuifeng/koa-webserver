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
      const {message, errorCode, data} = obj;
      this.httpCode = 200;
      this.message = message || '请求成功';
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

// token 不匹配的错误类
class Forbidden extends HttpException {
  constructor(obj) {
    super();
    if (!obj) {
      this.httpCode = 403;
      this.message = '权限不足';
      this.errorCode = 10006;
      this.data = null;
    } else {
      const {message, errorCode, data} = obj;
      this.httpCode = 403;
      this.message = message || '权限不足';
      this.errorCode = errorCode || 10006;
      this.data = data;
    }
  }
}

// 抛出函数中未处理
class Unhandle extends HttpException {
  constructor(obj) {
    super();
    if (!obj) {
      this.httpCode = 501;
      this.message = '程序内部未处理';
      this.errorCode = 10007;
      this.data = null;
    } else {
      const {message, errorCode, data} = obj;
      this.httpCode = 501;
      this.message = message || '程序内部未处理';
      this.errorCode = errorCode || 10007;
      this.data = data;
    }
  }
}

// 数据库没有这个数据
class NoExist extends HttpException {
  constructor(obj) {
    super();
    if (!obj) {
      this.httpCode = 200;
      this.message = '数据库未保存此数据';
      this.errorCode = 10008;
      this.data = null;
    } else {
      const {message, errorCode, data} = obj;
      this.httpCode = 200;
      this.message = message || '数据库未保存此数据';
      this.errorCode = errorCode || 10008;
      this.data = data;
    }
  }
}

class NoFound extends HttpException {
  constructor(obj) {
    super();
    if (!obj) {
      this.httpCode = 404;
      this.message = '请求路径错误';
      this.errorCode = -1;
      this.data = null;
    } else {
      const {message, errorCode, data} = obj;
      this.httpCode = 404;
      this.message = message || '请求路径错误';
      this.errorCode = errorCode || -1;
      this.data = data;
    }
  }

}

module.exports = {
  Unauthorized,
  HttpException,
  ParameterException,
  SuccessException,
  AuthFailed,
  Forbidden,
  Unhandle,
  NoExist,
  NoFound,
};