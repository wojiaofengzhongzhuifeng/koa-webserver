## 后端连接服务器数据库流程

  - 服务器开启数据库服务(命令行)
        
  - 获取连接数据库所需 host = localhost, port = 3306, username = root, password = sj15702097950

  - 在服务器新建一个数据库(命令行), 获取数据库名称dbName = test123321,  character Set = utf8mb4; collation = utf8mb4_0900_ai_ci
  
  - 总结下, 要用代码连接服务器的数据库, 必须有五个数据: host, port, userName, password, dbName