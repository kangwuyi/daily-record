var userType = require ( '../../../../models/user' )
  , async    = require ( 'async' );
function loadTagJsFn ( fnCallBack ) {
  async.auto ( {
    /**
     * 查询所有部门
     */
    queryAllDepartment  : function ( callback ) {
      userType.queryAllDepartment ( 'err', function ( err, data ) {
        if ( err ) {
          fnCallBack ( err, [] );
        } else {
          if ( data.length < 1 ) {
            fnCallBack ( err, [] );
          } else {
            callback ( err, data );
          }
        }
      } );
    },
    queryAllGroup       : [ 'queryAllDepartment', function ( callback, result ) {
      userType.queryAllGroup ( null, function ( err, data ) {
        if ( err ) {
          fnCallBack ( err, [] );
        } else {
          if ( data.length < 1 ) {
            fnCallBack ( err, [] );
          } else {
            callback ( err, data );
          }
        }
      } );
    } ],
    queryAllUserByGroup : [ 'queryAllDepartment', 'queryAllGroup', function ( callback, result ) {
      userType.queryAllUserByGroup ( null, function ( err, data ) {
        if ( err ) {
          fnCallBack ( err, [] );
        } else {
          if ( data.length < 1 ) {
            fnCallBack ( err, [] );
          } else {
            callback ( err, data );
          }
        }
      } );
    } ]
  }, function ( err, results ) {
    var _department        = results.queryAllDepartment
      , _group             = results.queryAllGroup
      , _group_user        = results.queryAllUserByGroup
      , callBackData       = {
          ArrJson : []
        };
    _department.forEach ( function ( departmentItem ) {
      var departmentChildren = [];
      _group.forEach ( function ( groupItem ) {
        if ( departmentItem.rb_department_id === groupItem.rb_department_id ) {
          var groupChildren = [];
          _group_user.forEach ( function ( groupUserItem ) {
            if ( groupItem.rb_group_id === groupUserItem.rb_group_id ) {
              var groupUserIChildren = [
                {
                  "name"      : "日报",
                  "url"       : "/in/proseById?otherId=" + groupUserItem.rb_user_id+"&userGroupId=" + groupUserItem.rb_group_id,
                  "iclass"    : "icon-eye-open",
                  "tag_sign1" : 3
                }
                /*,{
                  "name"      : "加班",
                  "url"       : "/in/proseById?otherId=" + groupUserItem.rb_user_id+"&userGroupId=" + groupUserItem.rb_group_id,
                  "iclass"    : "icon-eye-open",
                  "tag_sign1" : 3
                }*/
              ];
              groupChildren.push ( {
                'name'   : groupUserItem.rb_user_name,
                'url'    : '#',
                'iclass' : 'icon-leaf',
                children : groupUserIChildren
              } )
            }
          } );
          departmentChildren.push ( {
            name     : groupItem.rb_group_name,
            url      : '#',
            iclass   : 'icon-double-angle-right',
            children : groupChildren
          } )
        }
      } );
      callBackData.ArrJson.push ( {
        name     : departmentItem.rb_department_name,
        url      : '#',
        iclass   : 'icon-tag',
        children : departmentChildren
      } )
    } );
    var callBackDataString = JSON.stringify ( callBackData );
    fnCallBack ( err, callBackDataString );
  } );
}
module.exports = loadTagJsFn;//导出该方法