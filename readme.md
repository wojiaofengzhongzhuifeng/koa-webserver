## 后端连接服务器数据库流程

  - 服务器开启数据库服务(命令行)
        
  - 获取连接数据库所需 host = localhost, port = 3306, username = root, password = sj15702097950

  - 在服务器新建一个数据库(命令行), 获取数据库名称dbName = test123321,  character Set = utf8mb4; collation = utf8mb4_0900_ai_ci
  
  - 总结下, 要用代码连接服务器的数据库, 必须有五个数据: host, port, userName, password, dbName
  
  
## 第五章总结

  - 未知异常的一般处理方式

  - 写接口的流程: ①校验传入参数(通过创建 validator)②使用 validator 获取参数
  
  - sequelize 连接服务器需要五个数据: host, port, username, password, dbName

  - sequelize 可以生成表名(model), 列名(filed)

  - koa-router prefix
  
## 第六章重点
  
  - 需求: 完成用户的注册与登录
  
  - 在哪里保证了 email 的唯一性?
  
  - 在哪里对密码进行加密操作比较好? 使用了观察者模式
  
  - 如果正常返回数据, 返回一个成功错误