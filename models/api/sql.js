(function () {
  var mysqlString;

  mysqlString = {
    rb_user       : {
      cheackByAccount      : function ( user_account ) {
        return "select * from rb_user where rb_user_account='" + user_account + "' ";
      },
      cheackByName         : function ( user_name ) {
        return "select * from rb_user where rb_user_name='" + user_name + "' ";
      },
      cheackByEmil         : function ( user_emil ) {
        return "select * from rb_user where rb_user_email='" + user_emil + "' ";
      },
      cheackByState        : function ( user_account ) {
        return "select * from rb_user where rb_user_state = '1' and rb_user_account = '" + user_account + "' ";
      },
      cheackAuditStateById : function ( user_id_cache ) {
        return "select * from rb_user where rb_user_type = '1' and rb_user_idcache = '" + user_id_cache + "' ";
      },
      updateAuditStateById : function ( _user_id,departmentId ) {
        return "UPDATE  `daily_report`.`rb_user` SET `rb_user_state` = '1' , `rb_department_id` = '" + departmentId + "' WHERE" + " `rb_user`.`rb_user_id` =  '" + _user_id + "';";
      },
      idByName             : function ( user_account ) {
        return "select rb_user_id from rb_user where rb_user_account='" + user_account + "' ";
      },
      idById               : function ( user_id ) {
        return "select * from rb_user where rb_user_id='" + user_id + "' ";
      },
      loginByNamePw        : function ( user_account, user_password ) {
        return "select * from rb_user where rb_user_account='" + user_account + "' and rb_user_pw='" + user_password + "' ";
      },
      allUser              : function () {
        return "select * from rb_user";
      },
      registerUserInfo     : function ( user_account, user_name, user_password, user_emil ) {
        return "INSERT INTO `rb_user` (`rb_user_id`, `rb_user_account`, `rb_user_name`, `rb_user_pw`, `rb_user_email`) VALUES (NULL, '" + user_account + "', '" + user_name + "', '" + user_password + "', '" + user_emil + "') ";
      },
      queryNoAuditUser     : function () {
        return "select * from rb_user where rb_user_state = '0'";
      },
      updateUserIdCache    : function ( user_id, user_id_cache ) {
        return "UPDATE  `daily_report`.`rb_user` SET `rb_user_idcache` = '" + user_id_cache + "' WHERE" + " `rb_user`.`rb_user_id` =  '" + user_id + "';";
      },
      cheackUserIdCache    : function ( user_id_cache ) {
        return "select * from rb_user where rb_user_idcache='" + user_id_cache + "'";
      }
    },
    rb_datenote   : {
      getDatenoteById         : function ( user_id ) {
        return "select * from rb_user u, rb_datenote dn,rb_group g where dn.rb_group_id = g.rb_group_id" +
          " and u.rb_user_id =" +
          " dn.rb_datenote_user_id and" +
          " u.rb_user_id='" + user_id + "' ";
      },
      queryAllDatenoteByGroup_id         : function ( group_id ) {
        return "select * from rb_user u, rb_datenote dn,rb_group g where dn.rb_group_id = g.rb_group_id" +
            " and u.rb_user_id =" +
            " dn.rb_datenote_user_id and" +
            " dn.rb_group_id='" + group_id + "' ";
      },
      getDatenoteByIdAndGroupId         : function ( userId, userGroupId ) {
        return "select * from rb_user u, rb_datenote dn,rb_group g where dn.rb_group_id = g.rb_group_id" +
          " and u.rb_user_id =" +
          " dn.rb_datenote_user_id and" +
          " u.rb_user_id='" + userId + "' and dn.rb_group_id = '" + userGroupId + "'";
      },
      getNoteDateByDataString : function ( user_id, dataString ) {
        return "select dn.rb_datenote_date from rb_user u, rb_datenote dn where u.rb_user_id =" +
          " dn.rb_datenote_user_id and u.rb_user_id='" + user_id + "' and FROM_UNIXTIME(floor(dn.rb_datenote_date/1000), '%Y-%m-%d') = '" + dataString + "'";
      },
      cheackNoteByDataGroupId : function ( user_id, dataString ,groupid) {
        return "select dn.rb_datenote_id,dn.rb_datenote_date from rb_user u, rb_datenote dn where u.rb_user_id =" +
          " dn.rb_datenote_user_id and dn.rb_group_id='" + groupid + "' and u.rb_user_id='" + user_id + "' and" +
          " FROM_UNIXTIME(floor(dn.rb_datenote_date/1000), '%Y-%m-%d') = '" + dataString + "'";
      },
      postAddProse            : function ( id, proseTitle, proseDate, proseDateNew, proseContent, groupId ) {
        return "UPDATE  `daily_report`.`rb_datenote` SET `rb_datenote_date` = '" + proseDateNew + "',`rb_datenote_title` = '" + proseTitle + "',`rb_datenote_content` = '" + proseContent + "' WHERE  `rb_datenote`.`rb_datenote_date` ='" + proseDate + "' and `rb_datenote`.`rb_datenote_user_id` =  '" + id + "' and `rb_datenote`.`rb_group_id` = '" + groupId + "';";
      },
      postProseById           : function ( id, proseContent ) {
        return "UPDATE  `daily_report`.`rb_datenote` SET `rb_datenote_content` = '" + proseContent + "' WHERE `rb_datenote`.`rb_datenote_id` =  '" + id + "';";
      },
      allUserForProse         : function ( err ) {
        return "select * from rb_datenote";
      }
    },
    rb_datestate  : {
      cheackDateState : function ( proseDateString, group_id ) {
        return "select * from rb_datestate where rb_datestate_datestring='" + proseDateString + "' and rb_group_id ='" + group_id + "'";
      },
      insterDateState : function ( proseDateString ,group_id) {
        return "INSERT INTO `rb_datestate` (`rb_datestate_id`,`rb_datestate_datestring`,`rb_group_id`) VALUES (NULL," +
          " '" + proseDateString + "','" + group_id + "'); ";
      }
    },
    rb_department : {
      queryAllDepartment  : function () {
        return "select * from rb_department";
      },
      queryDepartmentById : function ( user_id ) {
        return "select p.rb_department_id, p.rb_department_name from rb_user u,rb_department p where" +
          " u.rb_department_id =" +
          " p.rb_department_id and" +
          " u.rb_user_id = '" + user_id + "' ;";
      }
    },
    rb_group      : {
      queryAllGroup          : function () {
        return "select * from rb_group";
      },
      queryUserInfoByGroupId : function ( group_id ) {
        return "select u.rb_user_id,u.rb_user_name from rb_user_group ug,rb_user u where ug.rb_user_id = u.rb_user_id and ug.rb_group_id='" + group_id + "'";
      },
      queryAllGroupByDepartmentid : function ( department_id ) {
        return "select * from rb_group where rb_department_id='" + department_id + "'";
      }
    },
    rb_user_group : {
      queryAllUserByGroup : function () {
        return "select * from rb_user_group,rb_user where rb_user_group.rb_user_id = rb_user.rb_user_id;";
      },
      queryGroupById      : function ( user_id ) {
        return "select g.rb_group_id, g.rb_group_name, d.rb_department_name, d.rb_department_id from rb_department" +
          " d,rb_user_group rg,rb_group" +
          " g where" +
          " rg.rb_group_id" +
          " = g.rb_group_id and rg.rb_user_id = '" + user_id + "' and d.rb_department_id = g.rb_department_id;";
      } ,
      updateUserGroup    : function ( user_id, group_id ) {
        return "INSERT INTO `rb_user_group` (`rb_user_group_id`, `rb_user_id`, `rb_group_id`) VALUES (NULL, '" + user_id + "', '" + group_id + "') ";
      }
    },
    k_prose       : {
      getProse         : "select * from k_prose",
      getProseById     : function ( prose_ids ) {
        return "select * from k_prose where kt_prose_ids='" + prose_ids + "' ";
      },
      postAddProse     : function ( proseTitle, proseDate, proseContent ) {
        return "INSERT INTO `k_prose` (`kt_prose_ids`, `kt_prose_dates`, `kt_prose_titles`, `kt_prose_contents`) VALUES (NULL, '" + proseDate + "', '" + proseTitle + "', '" + proseContent + "'); ";
      },
      postEditProse    : function ( proseId, proseTitle, proseDate, proseContent ) {
        return "UPDATE  `daily_report_v2`.`k_prose` SET  `kt_prose_titles` =  '" + proseTitle + "',`kt_prose_dates` = '" + proseDate + "',`kt_prose_contents` = '" + proseContent + "' WHERE  `k_prose`.`kt_prose_ids` ='" + proseId + "';";
      },
      postDelProseById : function ( prose_ids ) {
        return "DELETE FROM `daily_report_v2`.`k_prose` WHERE `k_prose`.`kt_prose_ids` = '" + prose_ids + "' ";
      }
    }
  };

  module.exports = mysqlString;

}).call ( this );