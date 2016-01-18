var express                    = require ( 'express' )
  , http                       = require ( 'http' )
  , mysqlString                = require ( './api/sql' )
  , object                     = require ( './api/object' )
  , app                        = express ();
/**
 * 检查用户名是否存在
 * @param user_account
 * @param callback
 */
exports.cheackByAccount        = function ( user_account, callback ) {
  var sql = mysqlString.rb_user.cheackByAccount ( user_account );
  object.queryMysql ( sql, callback );
};
/**
 * 检查注册状态
 * @param user_account
 * @param callback
 */
exports.cheackByState          = function ( user_account, callback ) {
  var sql = mysqlString.rb_user.cheackByState ( user_account );
  object.queryMysql ( sql, callback );
};
/**
 * 检查用户名是否存在
 * @param user_name
 * @param callback
 */
exports.cheackByName           = function ( user_name, callback ) {
  var sql = mysqlString.rb_user.cheackByName ( user_name );
  object.queryMysql ( sql, callback );
};
/**
 * 检查邮箱是否存在
 * @param user_emil
 * @param callback
 */
exports.cheackByEmil           = function ( user_emil, callback ) {
  var sql = mysqlString.rb_user.cheackByEmil ( user_emil );
  object.queryMysql ( sql, callback );
};
/**
 * 根据用户 id cache 检查用户是否具有管理员权限
 * @param user_id_cache
 * @param callback
 */
exports.cheackAuditStateById   = function ( user_id_cache, callback ) {
  var sql = mysqlString.rb_user.cheackAuditStateById ( user_id_cache );
  object.queryMysql ( sql, callback );
};
exports.updateAuditStateById   = function ( _user_id,departmentId, callback ) {
  var sql = mysqlString.rb_user.updateAuditStateById ( _user_id,departmentId );
  object.queryMysql ( sql, callback );
};
exports.updateUserGroup   = function ( _user_id,group_id, callback ) {
  var sql = mysqlString.rb_user_group.updateUserGroup ( _user_id,group_id );
  object.queryMysql ( sql, callback );
};
/**
 * 开始注册信息
 * @param user_account
 * @param user_name
 * @param user_password
 * @param user_emil
 * @param callback
 */
exports.registerUserInfo       = function ( user_account, user_name, user_password, user_emil, callback ) {
  var sql = mysqlString.rb_user.registerUserInfo ( user_account, user_name, user_password, user_emil );
  object.queryMysql ( sql, callback );
};
/**
 * 通过用户名查找用户id
 * @param username
 * @param callback
 */
exports.idByName               = function ( username, callback ) {
  var sql = mysqlString.rb_user.idByName ( username );
  object.queryMysql ( sql, callback );
};
/**
 * 通过用户ID查找所有信息
 * @param user_id
 * @param callback
 */
exports.idById                 = function ( user_id, callback ) {
  var sql = mysqlString.rb_user.idById ( user_id );
  object.queryMysql ( sql, callback );
};
/**
 * 开始登陆
 * @param username
 * @param password
 * @param callback
 */
exports.loginByNamePw          = function ( username, password, callback ) {
  var sql = mysqlString.rb_user.loginByNamePw ( username, password );
  object.queryMysql ( sql, callback );
};
/**
 * 查找所有用户
 * @param err
 * @param callback
 */
exports.allUser                = function ( err, callback ) {
  var sql = mysqlString.rb_user.allUser ();
  object.queryMysql ( sql, callback );
};
/**
 * 查找所有尚未审核的账号
 * @param err
 * @param callback
 */
exports.queryNoAuditUser       = function ( err, callback ) {
  var sql = mysqlString.rb_user.queryNoAuditUser ();
  object.queryMysql ( sql, callback );
};
/**
 * 更新用户 ID 的 sha1 加密 cache
 * @param user_id
 * @param user_id_cache
 * @param callback
 */
exports.updateUserIdCache      = function ( user_id, user_id_cache, callback ) {
  var sql = mysqlString.rb_user.updateUserIdCache ( user_id, user_id_cache );
  object.queryMysql ( sql, callback );
};
/**
 * 根据 id cache 搜索用户信息
 * @param user_id_cache
 * @param callback
 */
exports.cheackUserIdCache      = function ( user_id_cache, callback ) {
  var sql = mysqlString.rb_user.cheackUserIdCache ( user_id_cache );
  object.queryMysql ( sql, callback );
};
/**
 * 查询所有部门
 * @param err
 * @param callback
 */
exports.queryAllDepartment     = function ( err, callback ) {
  var sql = mysqlString.rb_department.queryAllDepartment ();
  object.queryMysql ( sql, callback );
};
/**
 * 查询所有组
 * @param err
 * @param callback
 */
exports.queryAllGroup          = function ( err, callback ) {
  var sql = mysqlString.rb_group.queryAllGroup ();
  object.queryMysql ( sql, callback );
};
/**
 * 根据部门查询组
 * @param departmentid
 * @param callback
 */
exports.queryAllGroupByDepartmentid          = function ( departmentid, callback ) {
  var sql = mysqlString.rb_group.queryAllGroupByDepartmentid (departmentid);
  object.queryMysql ( sql, callback );
};
/**
 * 查询所有组和用户对应表
 * @param err
 * @param callback
 */
exports.queryAllUserByGroup    = function ( err, callback ) {
  var sql = mysqlString.rb_user_group.queryAllUserByGroup ();
  object.queryMysql ( sql, callback );
};
/**
 * 根据用户 ID 查询所属组和当前组所在的部门
 * @param user_id
 * @param callback
 */
exports.queryGroupById         = function ( user_id, callback ) {
  var sql = mysqlString.rb_user_group.queryGroupById ( user_id );
  object.queryMysql ( sql, callback );
};
/**
 * 根据用户 ID 查询所属部门
 * @param user_id
 * @param callback
 */
exports.queryDepartmentById    = function ( user_id, callback ) {
  var sql = mysqlString.rb_department.queryDepartmentById ( user_id );
  object.queryMysql ( sql, callback );
};
/**
 * 根据组 ID 查找组内所有用户信息
 * @param group_id
 * @param callback
 */
exports.queryUserInfoByGroupId = function ( group_id, callback ) {
  var sql = mysqlString.rb_group.queryUserInfoByGroupId ( group_id );
  object.queryMysql ( sql, callback );
};
exports.cheackDateState        = function ( proseDateString, group_id, callback ) {
  var sql = mysqlString.rb_datestate.cheackDateState ( proseDateString, group_id );
  object.queryMysql ( sql, callback );
};
exports.insterDateState        = function ( proseDateString,group_id, callback ) {
  var sql = mysqlString.rb_datestate.insterDateState ( proseDateString,group_id );
  object.queryMysql ( sql, callback );
};