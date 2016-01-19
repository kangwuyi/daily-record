var express                        = require ( 'express' )
  , mysql                          = require ( 'mysql' )
  , http                           = require ( 'http' );
var queryDb                        = require ( '../db' );
mysql                              = queryDb.getMysqlConn ();
var mysqlString                    = require ( './api/sql' );
var object                         = require ( './api/object' );
var app                            = express ();
/**
 * 根据用户 ID 查找 所有日报信息
 * @param userid
 * @param callback
 */
exports.getDatenoteById            = function ( userid, callback ) {
  var sql = mysqlString.rb_datenote.getDatenoteById ( userid );
  object.queryMysql ( sql, callback );
};
/**
 * 根据用户 ID 和 组 ID 搜索用户信息
 * @param userId
 * @param userGroupId
 * @param callback
 */
exports.getDatenoteByIdAndGroupId  = function ( userId, userGroupId, callback ) {
  var sql = mysqlString.rb_datenote.getDatenoteByIdAndGroupId ( userId, userGroupId );
  object.queryMysql ( sql, callback );
};
/**
 * 根据日期字符串查询日报信息
 * @param userid
 * @param dataString
 * @param callback
 */
exports.getNoteDateByDataString    = function ( userid, dataString, callback ) {
  var sql = mysqlString.rb_datenote.getNoteDateByDataString ( userid, dataString );
  object.queryMysql ( sql, callback );
};
/**
 * 根据三个参数判断是否存在日报
 * @param userid
 * @param dataString
 * @param groupid
 * @param callback
 */
exports.cheackNoteByDataGroupId    = function ( userid, dataString, groupid, callback ) {
  var sql = mysqlString.rb_datenote.cheackNoteByDataGroupId ( userid, dataString, groupid );
  object.queryMysql ( sql, callback );
};
/**
 * 更新日报内容
 * @param userid
 * @param content
 * @param callback
 */
exports.postProseById              = function ( userid, content, callback ) {
  var sql = mysqlString.rb_datenote.postProseById ( userid, content );
  object.queryMysql ( sql, callback );
};
/**
 * 添加组内所有人的空白日报模版
 * @param sqlInsterString
 * @param callback
 */
exports.insterAllByUser            = function ( sqlInsterString, callback ) {
  object.queryMysql ( sqlInsterString, callback );
};
/**
 * 更新日报
 * @param id
 * @param proseTitle
 * @param proseDateOld
 * @param proseDate
 * @param proseContent
 * @param groupId
 * @param callback
 */
exports.addProse                   = function ( id, proseTitle, proseDateOld, proseDate, proseContent, groupId, callback ) {
  var sql = mysqlString.rb_datenote.postAddProse ( id, proseTitle, proseDateOld, proseDate, proseContent, groupId );
  object.queryMysql ( sql, callback );
};
/**
 * 查看所有人的日报
 * @param err
 * @param callback
 */
exports.allUserForProse            = function ( err, callback ) {
  var sql = mysqlString.rb_datenote.allUserForProse ( null );
  object.queryMysql ( sql, callback );
};
/**
 * 查找所有部门
 * @param err
 * @param callback
 */
exports.queryAllDepartment         = function ( err, callback ) {
  var sql = mysqlString.rb_department.queryAllDepartment ( null );
  object.queryMysql ( sql, callback );
};
/**
 * 根据组 ID 查询所有日报
 * @param group_id
 * @param callback
 */
exports.queryAllDatenoteByGroup_id = function ( group_id, callback ) {
  var sql = mysqlString.rb_datenote.queryAllDatenoteByGroup_id ( group_id );
  object.queryMysql ( sql, callback );
};

exports.queryAllDatenoteByGroup_idAndDate = function ( group_id, startTime, endTime, callback ) {
  var sql = mysqlString.rb_datenote.queryAllDatenoteByGroup_idAndDate ( group_id, startTime, endTime );
  object.queryMysql ( sql, callback );
};