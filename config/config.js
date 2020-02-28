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
  expiresIn: 60
};