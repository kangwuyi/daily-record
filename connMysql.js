(function () {
  var connMysql;
  connMysql = {
    db: {
      host: 'reborndb.mysql.rds.aliyuncs.com',     //本地数据库
      port: '3306',	//数据库端口
      user: 'reborn',          //数据库用户名
      password: 'taiyi2015',          //数据库密码
      database: 'daily_report'  //数据库名称
    },
    db_test: {
      host: 'localhost',     //本地数据库
      port: '3306',	//数据库端口
      user: 'root',          //数据库用户名
      password: '',          //数据库密码
      database: 'daily_report'  //数据库名称
    }
  };
  module.exports = connMysql;
}).call(this);