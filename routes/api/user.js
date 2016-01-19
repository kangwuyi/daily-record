var User                = require ( '../../models/user' )
  , object              = require ( '../../models/api/object' )
  , pagination          = require ( 'pagination-api' )
  , express             = require ( 'express' )
  , http                = require ( "http" )           //提供web服务
  , url                 = require ( "url" )           //解析GET请求
  , query               = require ( "querystring" )  //解析POST请求
  , crypto              = require ( 'crypto' )
  , async               = require ( 'async' )
  , loadTagJsFn         = require ( './module/public/loadTagJs.js' )
  , fs                  = require ( 'fs' )
  , pem                 = fs.readFileSync ( 'server.pem' )
  , key                 = pem.toString ( 'ascii' );
/**
 * 开始登陆
 * @param req
 * @param res
 */
exports.login           = function ( req, res ) {
  var user_account  = req.body.username || ''
    , user_password = req.body.password || '';
  if ( (user_account === '') || (user_account === null) || (user_account === undefined) ) {
    req.flash ( 'error', '没有输入账号!' );
    return res.redirect ( 'back' );
  } else {
    var md5_user_account = crypto.createHash ( 'md5' );
    user_account         = md5_user_account.update ( user_account ).digest ( 'hex' );
  }
  if ( (user_password !== '') || (user_password !== null) || (user_password !== undefined) ) {
    var md5_user_password = crypto.createHash ( 'md5' );
    user_password         = md5_user_password.update ( user_password ).digest ( 'hex' );
  } else {
    req.flash ( 'error', '没有输入密码!' );
    return res.redirect ( 'back' );
  }
  async.auto ( {
    cheackByAccount   : function ( callback ) {
      User.cheackByAccount ( user_account, function ( err, data ) {
        if ( data.length < 1 ) {
          req.flash ( 'error', '账户不存在!' );
          return res.redirect ( 'back' );
        } else {
          if ( data[ 0 ].rb_user_pw != user_password ) {
            req.flash ( 'error', '密码错误!' );
            return res.redirect ( 'back' );//返回之前的页面
          }
          callback ( err, data );
        }
      } );
    },
    cheackByState     : [ 'cheackByAccount', function ( callback, result ) {
      User.cheackByState ( user_account, function ( err, data ) {
        if ( data.length < 1 ) {
          res.render ( 'client/waitState', { title : '瑞博科技｜日报', loadTagOjNew : null } );
        } else {
          callback ( err, data );
        }
      } );
    } ],
    updateUserIdCache : [ 'cheackByAccount', 'cheackByState', function ( callback, result ) {
      var user_id = result.cheackByAccount[ 0 ].rb_user_id
        , hmac    = crypto.createHmac ( 'sha1', key );
      hmac.update ( result.cheackByAccount[ 0 ].rb_user_id.toString () );
      var hmacHex = hmac.digest ( 'hex' );
      res.cookie ( 'userid', hmacHex );
      User.updateUserIdCache ( user_id, hmacHex, function ( err, data ) {
        callback ( err, data );
      } );
    } ],
    loadTagJsFn       : [ 'cheackByAccount', 'cheackByState', 'updateUserIdCache', function ( callback, result ) {
      loadTagJsFn ( function ( err, data ) {
        if ( data.length < 1 ) {
          req.flash ( 'error', 'loadTagJsFn程序出错，请联系小康同学!' );
          return res.redirect ( 'back' );
        } else {
          callback ( err, data );
        }
      } );
    } ]
  }, function ( err, results ) {
    req.session = {
      publicUserId  : results.cheackByAccount[ 0 ].rb_user_id,
      publicUserKpi : results.cheackByAccount[ 0 ].rb_user_type
    };
    req.flash ( 'success', '登陆成功!' );
    res.render ( 'client/in/index', { title : '瑞博科技｜日报', loadTagOjNew : results.loadTagJsFn } );
  } );
};
/**
 * 开始注册信息
 * @param req
 * @param res
 */
exports.registerInfo    = function ( req, res ) {
  /**
   * 生成密码的 md5 值
   */
  var user_name     = req.body.userName || ''
    , user_emil     = req.body.userEmil || ''
    , user_account  = req.body.userAccount || ''
    , user_password = req.body.userPassword || '';
  /**
   * 判断是否传入空值
   */
  if ( (user_password !== '') || (user_password !== null) || (user_password !== undefined) ) {
    var md5_user_password = crypto.createHash ( 'md5' );
    user_password         = md5_user_password.update ( user_password ).digest ( 'hex' );
  } else {
    req.flash ( 'error', '没有设置密码!' );
    return res.redirect ( 'back' );
  }
  if ( (user_name === '') || (user_name === null) || (user_name === undefined) ) {
    req.flash ( 'error', '没有设置姓名!' );
    return res.redirect ( 'back' );
  }
  if ( (user_emil === '') || (user_emil === null) || (user_emil === undefined) ) {
    req.flash ( 'error', '没有设置邮箱!' );
    return res.redirect ( 'back' );
  }
  if ( (user_account === '') || (user_account === null) || (user_account === undefined) ) {
    req.flash ( 'error', '没有设置账号!' );
    return res.redirect ( 'back' );
  } else {
    var md5_user_account = crypto.createHash ( 'md5' );
    user_account         = md5_user_account.update ( user_account ).digest ( 'hex' );
  }
  async.auto ( {
    /**
     * 检查用户是否存在
     */
    cheackByAccount  : function ( callback ) {
      User.cheackByAccount ( user_account, function ( err, data ) {
        if ( data.length > 0 ) {
          req.flash ( 'error', '账户已经存在!' );
          return res.redirect ( 'back' );
        } else {
          callback ( err, data );
        }
      } );
    },
    cheackByName     : function ( callback ) {
      User.cheackByName ( user_name, function ( err, data ) {
        if ( data.length > 0 ) {
          req.flash ( 'error', '姓名已经存在!' );
          return res.redirect ( 'back' );
        } else {
          callback ( err, data );
        }
      } );
    },
    cheackByEmil     : function ( callback ) {
      User.cheackByEmil ( user_emil, function ( err, data ) {
        if ( data.length > 0 ) {
          req.flash ( 'error', '邮箱已经存在!' );
          return res.redirect ( 'back' );
        } else {
          callback ( err, data );
        }
      } );
    },
    /**
     * 开始写入信息
     */
    registerUserInfo : [ 'cheackByAccount', 'cheackByName', 'cheackByEmil', function ( callback, result ) {
      User.registerUserInfo ( user_account, user_name, user_password, user_emil, function ( err, data ) {
        if ( err ) {
          req.flash ( 'error', '程序出错，请联系小康同学!' );
          return res.redirect ( 'back' );
        } else {
          callback ( err, data );
        }
      } );
    } ]
  }, function ( err, results ) {
    res.render ( 'client/waitState', { title : '瑞博科技｜日报', loadTagOjNew : null } );
  } );
};
/**
 * 进入审核页面
 * @param req
 * @param res
 */
exports.auditState      = function ( req, res ) {
  var user_id_cache = req.cookies.userid;
  async.auto ( {
    cheackAuditStateById : function ( callback ) {
      User.cheackAuditStateById ( user_id_cache, function ( err, data ) {
        if ( data.length < 1 ) {
          res.render ( 'client/noJurisdiction', { title : '瑞博科技｜日报', loadTagOjNew : null } );
        } else {
          callback ( err, data );
        }
      } );
    },
    queryNoAuditUser     : [ 'cheackAuditStateById', function ( callback, result ) {
      User.queryNoAuditUser ( null, function ( err, data ) {
        if ( err ) {
          data = [];
        }
        if ( data.length < 1 ) {
          data = [];
        }
        callback ( err, data );
      } );
    } ],
    queryAllDepartment   : [ 'cheackAuditStateById', function ( callback, result ) {
      User.queryAllDepartment ( null, function ( err, data ) {
        if ( err ) {
          data = [];
        }
        if ( data.length < 1 ) {
          data = [];
        }
        callback ( err, data );
      } );
    } ],
    queryAllGroup        : [ 'cheackAuditStateById', function ( callback, result ) {
      User.queryAllGroup ( null, function ( err, data ) {
        if ( err ) {
          data = [];
        }
        if ( data.length < 1 ) {
          data = [];
        }
        callback ( err, data );
      } );
    } ],
    loadTagJsFn          : [ 'cheackAuditStateById', 'queryNoAuditUser', function ( callback, result ) {
      loadTagJsFn ( function ( err, data ) {
        if ( data.length < 1 ) {
          req.flash ( 'error', '程序出错，请联系小康同学!' );
          return res.redirect ( 'back' );
        } else {
          callback ( err, data );
        }
      } );
    } ]
  }, function ( err, results ) {
    res.render ( 'client/auditUser', { title : '瑞博科技｜日报', noAuditUser : results.queryNoAuditUser, queryAllGroup : results.queryAllGroup, queryAllDepartment : results.queryAllDepartment, loadTagOjNew : results.loadTagJsFn } );
  } );
};
exports.postNoAuditUser = function ( req, res ) {
  var _user_id     = req.body.userId
    , groupArr     = req.body.groupArr
    , departmentId = req.body.department;
  async.auto ( {
    updateAuditStateById : function ( callback ) {
      User.updateAuditStateById ( _user_id, departmentId, function ( err, data ) {
        if ( data.length < 1 ) {
          res.render ( 'client/index', { title : '瑞博科技｜日报', loadTagOjNew : null } );
        } else {
          callback ( err, data );
        }
      } );
    },
    updateUserGroup      : [ 'updateAuditStateById', function ( callback, result ) {
      var _group_arr = groupArr.split ( "," );
      async.eachSeries ( _group_arr, function ( item, cb ) {
        User.updateUserGroup ( _user_id, item, function ( err, data ) {
          if ( data.length < 1 ) {
            req.flash ( 'error', '程序出错，请联系小康同学!' );
            return res.redirect ( 'back' );
          }
          cb();
        } );
      }, function ( err ) {
        console.log ( "err: " + err );
      } );
    } ]
  }, function ( err, results ) {
    req.flash ( 'error', '程序出错，请联系小康同学!' );
    return res.redirect ( 'back' );
  } );
};
/**
 * 准备离开
 * @param req
 * @param res
 */
exports.leave           = function ( req, res ) {
  res.clearCookie ( 'userName' );
  res.clearCookie ( 'passWord' );
  res.clearCookie ( 'userId' );
  res.clearCookie ( 'rb_user_id' );
  req.flash ( 'success', '退出成功!' );
  loadTagJsFn ( function ( loadTagOjNode ) {
    res.render ( 'client/index', { title : '瑞博科技｜日报', loadTagOjNew : loadTagOjNode } );
  } );
};
/**
 * 进入忘记密码页面
 * @param req
 * @param res
 */
exports.forgetPassword  = function ( req, res ) {
  res.render ( 'client/forgetPassword', { title : '瑞博科技｜日报', loadTagOjNew : null } );
};
/**
 * 进入注册页面
 * @param req
 * @param res
 */
exports.registerUser    = function ( req, res ) {
  res.render ( 'client/registerUser', { title : '瑞博科技｜日报', loadTagOjNew : null } );
};
exports.getRegisterInfo = function ( req, res ) {
  res.render ( 'client/registerUser', { title : '瑞博科技｜日报', loadTagOjNew : null } );
};
exports.verifyUserName  = function ( req, res ) {
  var userName = req.body.str;
  User.verifyUserName ( userName, function ( err, user ) {
    var isExist = true;
    if ( user.length < 1 ) {
      isExist = false;
    }
    console.log ( user );
    loadTagJsFn ( isIf, function ( loadTagOjNode ) {
      res.jsonp ( { status : 'json', isExist : isExist, loadTagOjNew : loadTagOjNode } );
    } );
  } );
};
