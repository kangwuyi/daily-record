var User = require('../../models/user')
  , object = require('../../models/api/object')
  , pagination = require('pagination-api')
  , express = require('express')
  , http = require("http")           //提供web服务
  , url = require("url")           //解析GET请求
  , query = require("querystring")  //解析POST请求
  , crypto = require('crypto')
  , async = require('async')
  , loadTagJsFn = require('./module/public/loadTagJs.js')
  , fs = require('fs')
  , pem = fs.readFileSync('server.pem')
  , key = pem.toString('ascii')
  , mailConfig = require('./module/mail/index').default;

/**
 * 开始注册信息
 * @param req
 * @param res
 */
exports.registerInfo = function (req, res) {
  /**
   * 生成密码的 md5 值
   */
  var user_name = req.body.userName || ''
    , user_emil = req.body.userEmil || ''
    , user_account = req.body.userAccount || ''
    , user_password = req.body.userPassword || '';
  /**
   * 判断是否传入空值
   */
  if ((user_password !== '') || (user_password !== null) || (user_password !== undefined)) {
    var md5_user_password = crypto.createHash('md5');
    user_password = md5_user_password.update(user_password).digest('hex');
  } else {
    req.flash('error', '没有设置密码!');
    return res.redirect('back');
  }
  if ((user_name === '') || (user_name === null) || (user_name === undefined)) {
    req.flash('error', '没有设置姓名!');
    return res.redirect('back');
  }
  if ((user_emil === '') || (user_emil === null) || (user_emil === undefined)) {
    req.flash('error', '没有设置邮箱!');
    return res.redirect('back');
  }
  if ((user_account === '') || (user_account === null) || (user_account === undefined)) {
    req.flash('error', '没有设置账号!');
    return res.redirect('back');
  } else {
    var md5_user_account = crypto.createHash('md5');
    user_account = md5_user_account.update(user_account).digest('hex');
  }
  async.auto({
    /**
     * 检查用户是否存在
     */
    cheackByAccount: function (callback) {
      User.cheackByAccount(user_account, function (err, data) {
        if (data.length > 0) {
          req.flash('error', '账户已经存在!');
          return res.redirect('back');
        } else {
          callback(err, data);
        }
      });
    },
    cheackByName: function (callback) {
      User.cheackByName(user_name, function (err, data) {
        if (data.length > 0) {
          req.flash('error', '姓名已经存在!');
          return res.redirect('back');
        } else {
          callback(err, data);
        }
      });
    },
    cheackByEmil: function (callback) {
      User.cheackByEmil(user_emil, function (err, data) {
        if (data.length > 0) {
          req.flash('error', '邮箱已经存在!');
          return res.redirect('back');
        } else {
          callback(err, data);
        }
      });
    },
    /**
     * 开始写入信息
     */
    registerUserInfo: ['cheackByAccount', 'cheackByName', 'cheackByEmil', function (callback, result) {
      User.registerUserInfo(user_account, user_name, user_password, user_emil, function (err, data) {
        if (err) {
          req.flash('error', '程序出错，请联系小康同学!');
          return res.redirect('back');
        } else {
          callback(err, data);
        }
      });
    }]
  }, function (err, results) {
    res.render('client/waitState', {title: '瑞博科技｜日报', loadTagOjNew: null});
  });
};
/**
 * 进入审核页面
 * @param req
 * @param res
 */
exports.auditState = function (req, res) {
  var user_id_cache = req.cookies.user_Hex;
  async.auto({
    cheackAuditStateById: function (callback) {
      User.cheackAuditStateById(user_id_cache, function (err, data) {
        if (data.length < 1) {
          res.render('client/noJurisdiction', {title: '瑞博科技｜日报', loadTagOjNew: null});
        } else {
          callback(err, data);
        }
      });
    },
    queryNoAuditUser: ['cheackAuditStateById', function (callback, result) {
      User.queryNoAuditUser(null, function (err, data) {
        if (err) {
          data = [];
        }
        if (data.length < 1) {
          data = [];
        }
        callback(err, data);
      });
    }],
    queryAllDepartment: ['cheackAuditStateById', function (callback, result) {
      User.queryAllDepartment(null, function (err, data) {
        if (err) {
          data = [];
        }
        if (data.length < 1) {
          data = [];
        }
        callback(err, data);
      });
    }],
    queryAllGroup: ['cheackAuditStateById', function (callback, result) {
      User.queryAllGroup(null, function (err, data) {
        if (err) {
          data = [];
        }
        if (data.length < 1) {
          data = [];
        }
        callback(err, data);
      });
    }],
    loadTagJsFn: ['cheackAuditStateById', 'queryNoAuditUser', function (callback, result) {
      loadTagJsFn(function (err, data) {
        if (data.length < 1) {
          req.flash('error', '程序出错，请联系小康同学!');
          return res.redirect('back');
        } else {
          callback(err, data);
        }
      });
    }]
  }, function (err, results) {
    res.render('client/auditUser', {
      title: '瑞博科技｜日报',
      noAuditUser: results.queryNoAuditUser,
      queryAllGroup: results.queryAllGroup,
      queryAllDepartment: results.queryAllDepartment,
      loadTagOjNew: results.loadTagJsFn
    });
  });
};
exports.postNoAuditUser = function (req, res) {
  var _user_id = req.body.userId
    , groupArr = req.body.groupArr
    , departmentId = req.body.department;
  async.auto({
    updateAuditStateById: function (callback) {
      User.updateAuditStateById(_user_id, departmentId, function (err, data) {
        if (data.length < 1) {
          res.render('client/index', {title: '瑞博科技｜日报', loadTagOjNew: null});
        } else {
          callback(err, data);
        }
      });
    },
    updateUserGroup: ['updateAuditStateById', function (callback, result) {
      var _group_arr = groupArr.split(",");
      async.eachSeries(_group_arr, function (item, cb) {
        User.updateUserGroup(_user_id, item, function (err, data) {
          if (data.length < 1) {
            req.flash('error', '程序出错，请联系小康同学!');
            return res.redirect('back');
          }
          cb();
        });
      }, function (err) {
        console.log("err: " + err);
      });
    }]
  }, function (err, results) {
    req.flash('error', '程序出错，请联系小康同学!');
    return res.redirect('back');
  });
};
/**
 * 准备离开
 * @param req
 * @param res
 */
exports.leave = function (req, res) {
  res.clearCookie('userName');
  res.clearCookie('passWord');
  res.clearCookie('userId');
  res.clearCookie('rb_user_id');
  req.flash('success', '退出成功!');
  /*loadTagJsFn ( function ( loadTagOjNode ) {
   res.render ( 'client/index', { title : '瑞博科技｜日报', loadTagOjNew : loadTagOjNode } );
   } );*/
  req.logout();
  res.redirect('/');
};
/**
 * 进入忘记密码页面
 * @param req
 * @param res
 */
exports.forgetPassword = function (req, res) {
  res.render('client/forgetPassword', {title: '瑞博科技｜日报', loadTagOjNew: null});
};

exports.forgetPasswordFn = function (req, res) {
  /**
   * 获取提交的用户名和邮箱
   */
  var user_account_forget = req.body.userAccountForget || ''
    , user_emil_forget = req.body.userEmilForget || '';
  /**
   * 判断用户有没有提交空值
   */
  /**
   * 判断是否传入空值
   */

  if ((user_account_forget === '') || (user_account_forget === null) || (user_account_forget === undefined)) {
    req.flash('error', '请输入账号!');
    return res.redirect('back');
  }
  if ((user_emil_forget === '') || (user_emil_forget === null) || (user_emil_forget === undefined)) {
    req.flash('error', '没有设置邮箱!');
    return res.redirect('back');
  }
  var md5_user_account = crypto.createHash('md5');
  var md5_user_account_forget = md5_user_account.update(user_account_forget).digest('hex');
  async.auto({
    cheackByAccount: function (callback) {
      User.cheackByAccount(md5_user_account_forget, function (err, data) {
        if (data.length <= 0) {
          callback(err, {status: false, content: '姓名不存在!'});
        } else {
          callback(err, {status: true, content: data});
        }
      });
    },
    cheackByEmil: ['cheackByAccount', function (callback) {
      User.cheackByEmil(user_emil_forget, function (err, data) {
        if (data.length <= 0) {
          callback(err, {status: false, content: '邮箱不存在!'});
        } else {
          callback(err, {status: true, content: data});
        }
      })
    }]
  }, function (err, results) {
    if (results.cheackByAccount.status === false || results.cheackByEmil.status === false) {
      var aa = [[results.cheackByAccount.status, results.cheackByAccount.content], [results.cheackByEmil.status, results.cheackByEmil.content]];
      var bb = '';
      aa.forEach(function (key, index) {
        if (key[0] === false) {
          if (index !== 0) {
            bb += '和';
          }
          bb += key[1];
        }
      });
      req.flash('error', bb);
      return res.redirect('back');
    } else {
      /**
       * 发送确认邮件
       */
      mailConfig(
        [
          ['userAccount', user_account_forget],
          ['userEmail', user_emil_forget]
        ],
        function(mailStatus, mailMessage){
        if (mailStatus === false) {
          console.error(mailMessage);
          return res.redirect('back');
        } else {
          console.log(mailMessage);
          res.render('client/forgetEmail', {
            title: '瑞博科技｜日报',
            loadTagOjNew: null,
            content: {
              userName: user_account_forget,
              userEmail: user_emil_forget
            }
          });
        }
      })
    }
  });
};
/**
 * 进入重新设置密码
 */
exports.confirmPassword = function (req, res) {
  var userAccount = req.query.userAccount || false,
    userEmail = req.query.userEmail || false;
  res.render('client/confirmPassword', {
    title: '瑞博科技｜日报',
    loadTagOjNew: null,
    content: {
      userAccount: userAccount,
      userEmail: userEmail
    }
  });
};
exports.refreshPassword = function (req, res) {
  var refreshPassword = req.body.userPassword || ''
    , confirmPassword = req.body.confirmPassword || ''
    , userAccount = req.body.userAccount || ''
    , userEmail = req.body.userEmail || '';
  if ((refreshPassword === '') || (refreshPassword === null) || (refreshPassword === undefined)) {
    req.flash('error', '密码不能为空!');
    return res.redirect('back');
  }
  if ((confirmPassword === '') || (confirmPassword === null) || (confirmPassword === undefined)) {
    req.flash('error', '密码不能为空!');
    return res.redirect('back');
  }
  var md5_user_account = crypto.createHash('md5');
  var userAccount = md5_user_account.update(userAccount).digest('hex');
  var md5_user_password = crypto.createHash('md5');
  refreshPassword = md5_user_password.update(refreshPassword).digest('hex');
  async.auto({
    resetPassword: function (callback) {
      User.resetPassword(userAccount, refreshPassword, userEmail, function (err, data) {
        if (data.length <= 0) {
          callback(err, {status: false, content: '姓名不存在!'});
        } else {
          callback(err, {status: true, content: data});
        }
      });
    }
  }, function (err, results) {
    res.render('client/index', {
      title: '瑞博科技｜日报',
      loadTagOjNew: null
    });
  });
};
/**
 * 进入注册页面
 * @param req
 * @param res
 */
exports.registerUser = function (req, res) {
  res.render('client/registerUser', {title: '瑞博科技｜日报', loadTagOjNew: null});
};
exports.getRegisterInfo = function (req, res) {
  res.render('client/registerUser', {title: '瑞博科技｜日报', loadTagOjNew: null});
};
exports.verifyUserName = function (req, res) {
  var userName = req.body.str;
  User.verifyUserName(userName, function (err, user) {
    var isExist = true;
    if (user.length < 1) {
      isExist = false;
    }
    console.log(user);
    loadTagJsFn(isIf, function (loadTagOjNode) {
      res.jsonp({status: 'json', isExist: isExist, loadTagOjNew: loadTagOjNode});
    });
  });
};
