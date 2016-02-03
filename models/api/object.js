var express           = require ( 'express' )
  , http              = require ( 'http' )
  , crypto            = require ( 'crypto' )
  , kcool             = require ( '../../public/lib/kcool' )
  , queryDb           = require ( '../../db' )
  , mysql             = queryDb.getMysqlConn ();
exports.queryMysql    = function ( sql, callback ) {
  mysql.query ( sql, function ( err, rows, fields ) {
    if ( err ) {
      throw err;
    } else {
      callback ( err, rows, fields );
    }
  } );
};
exports.checkLogin    = function ( req, res, next ) {
  if ( ! req.session.user ) {
    req.flash ( 'error', '未登录!' );
    res.redirect ( 'back' );//返回之前的页面
  }
  next ();
};
exports.checkNotLogin = function ( req, res, next ) {
  if ( req.session.user ) {
    req.flash ( 'error', '已登录!' );
    res.redirect ( 'back' );//返回之前的页面
  }
  next ();
};