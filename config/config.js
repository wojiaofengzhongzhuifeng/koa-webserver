module.exports = {
  // prod / dev
  env: 'prod',
  dbData: {
    host: 'localhost',
    port: '3306',
    userName: 'root',
    password: 'sj15702097950',
    dbName: 'test123321',
  },
  // 用于生成 jwt 令牌
  secretKey: 'rjjtest123321',
  // 配置 jwt 的过期时间
  expiresIn: 86400,
  wx: {
    appId: 'wx95d155029fb7716b',
    secretId: 'a28eebd0d5fd6241d6fdf600fd0b21e4',
  }
};