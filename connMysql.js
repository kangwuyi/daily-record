(function () {
  var connMysql;
  connMysql = {
    db_test: {
      host: '192.168.1.106',     //本地数据库
      port: '3306',	//数据库端口
      user: 'root',          //数据库用户名
      password: '000000',          //数据库密码
      database: 'daily_report'  //数据库名称
    }
  };
  module.exports = connMysql;
}).call(this);