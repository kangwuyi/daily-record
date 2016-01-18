(function () {
  var conn = null,		//定义conn用于连接mysql数据库
    mysql = require('mysql'),	//加载node-mysql模块
    connMysql = require('./connMysql'),	//加载connMysql.js文件（自定义的connMysql模块）
    express = require('express'),		//加载express模块等待扩展
    http = require('http');		//加载http模块等待扩展
  exports.getMysqlConn = function () {
    var err;
    try {
      if (conn) {
        conn = mysql.createConnection(connMysql.db_test);
        conn.connect();
      } else {
        conn = new mysql.createConnection(connMysql.db_test);
        //conn = mysql.createConnection(connMysql.db);
        conn.connect();
      }
    } catch (_error) {
      err = _error;
      throw err;
    }
    return conn;
  };
}).call(this);
