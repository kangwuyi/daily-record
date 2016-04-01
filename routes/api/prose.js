var kcool             = require ( './module/config/kcool' )
  , User              = require ( '../../models/user' )
  , express           = require ( 'express' )
  , http              = require ( "http" )           //提供web服务
  , url               = require ( "url" )           //解析GET请求
  , query             = require ( "querystring" )  //解析POST请求
  , Prose             = require ( '../../models/prose' )
  , object            = require ( '../../models/api/object' )
  , pagination        = require ( 'pagination-api' )
  , loadTagJsFn       = require ( './module/public/loadTagJs' )
  , crypto            = require ( 'crypto' )
  , async             = require ( 'async' )
  , fs                = require ( 'fs' )
  , pem               = fs.readFileSync ( 'server.pem' )
  , key               = pem.toString ( 'ascii' );
/**
 * 跳转到查看所有组别的全部日报
 * @param req
 * @param res
 */
exports.prose         = function ( req, res ) {
  var user_id_cache = req.cookies.user_Hex;
  if ( ! user_id_cache ) {
    req.flash ( 'error', '请先登录。' );
    res.render ( 'client/index', { title : '瑞博科技｜日报', loadTagOjNew : null } );
  } else {
    async.auto ( {
      cheackUserIdCache : function ( callback ) {
        User.cheackUserIdCache ( user_id_cache, function ( err, data ) {
          if ( err ) {
            req.flash ( 'error', '错误码：cheackUserIdCache，快联系小康同学!' );
            return res.redirect ( 'back' );
          } else {
            if ( data.length < 1 ) {
              req.flash ( 'error', '错误码：cheackUserIdCache，快联系小康同学!' );
              return res.redirect ( 'back' );
            } else {
              callback ( err, data );
            }
          }
        } );
      },
      getDatenoteById   : [ 'cheackUserIdCache', function ( callback, result ) {
        var user_id = result.cheackUserIdCache[ 0 ].rb_user_id;
        Prose.getDatenoteById ( user_id, function ( err, data ) {
          if ( err ) {
            req.flash ( 'error', '错误码：getDatenoteById，快联系小康同学!' );
            return res.redirect ( 'back' );
          } else {
            if ( data.length < 1 ) {
              callback ( err, { data : [], PostDataProse : [] } );
            } else {
              var PostDataProse = []
                , data_parent   = {};
              for ( var index = 0; index < data.length; index ++ ) {
                var dateGetTime         = data[ index ].rb_datenote_date;
                dateGetTime             = (typeof dateGetTime == Number) ? dateGetTime : Number ( dateGetTime );
                data[ index ].dataYear  = new Date ( dateGetTime ).format ( "yyyy" );
                data[ index ].dataMonth = new Date ( dateGetTime ).format ( "MM" );
                data[ index ].dataDay   = new Date ( dateGetTime ).format ( "dd" );
                PostDataProse.push ( new Date ( dateGetTime ).format ( "MM" ) );
              }
              PostDataProse             = kcool.unique ( PostDataProse );
              data_parent.data          = data;
              data_parent.PostDataProse = PostDataProse;
              callback ( err, data_parent );
            }
          }
        } );
      } ],
      loadTagJsFn       : [ 'cheackUserIdCache', 'getDatenoteById', function ( callback, result ) {
        loadTagJsFn ( function ( err, data ) {
          if ( data.length < 1 ) {
            req.flash ( 'error', '错误码：loadTagJsFn，请联系小康同学!' );
            return res.redirect ( 'back' );
          } else {
            callback ( err, data );
          }
        } );
      } ]
    }, function ( err, results ) {
      res.render (
        'client/in/dayReportMyself',
        {
          title         : '瑞博科技｜日报',
          PostGetProse  : results.getDatenoteById.data,
          PostDataProse : results.getDatenoteById.PostDataProse,
          loadTagOjNew  : results.loadTagJsFn
        }
      );
    } );
  }
};
/**
 * 按照组别查看日报
 * @param req
 * @param res
 */
exports.proseById     = function ( req, res ) {
  var userId      = req.query.otherId
    , userGroupId = req.query.userGroupId;
  async.auto ( {
    getDatenoteByIdAndGroupId : function ( callback ) {
      Prose.getDatenoteByIdAndGroupId ( userId, userGroupId, function ( err, data ) {
        if ( err ) {
          req.flash ( 'error', '程序出错，快联系小康同学!' );
          return res.redirect ( 'back' );
        } else {
          var PostDataProse = []
            , data_parent   = {};
          for ( var index = 0; index < data.length; index ++ ) {
            var dateGetTime         = data[ index ].rb_datenote_date;
            dateGetTime             = (typeof dateGetTime == Number) ? dateGetTime : Number ( dateGetTime );
            data[ index ].dataYear  = new Date ( dateGetTime ).format ( "yyyy" );
            data[ index ].dataMonth = new Date ( dateGetTime ).format ( "MM" );
            data[ index ].dataDay   = new Date ( dateGetTime ).format ( "dd" );
            PostDataProse.push ( new Date ( dateGetTime ).format ( "MM" ) );
          }
          PostDataProse             = kcool.unique ( PostDataProse );
          data_parent.data          = data;
          data_parent.PostDataProse = PostDataProse;
          callback ( err, data_parent );
        }
      } );
    },
    loadTagJsFn               : [ 'getDatenoteByIdAndGroupId', function ( callback, result ) {
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
    res.render (
      'client/in/dayReportMyself',
      {
        title         : '瑞博科技｜日报',
        PostGetProse  : results.getDatenoteByIdAndGroupId.data,
        PostDataProse : results.getDatenoteByIdAndGroupId.PostDataProse,
        loadTagOjNew  : results.loadTagJsFn
      }
    );
  } );
};
/**
 * 查看最近七天内的全部日报信息
 * @param req
 * @param res
 */
exports.allProse      = function ( req, res ) {
  var _userAccountmd5 = req.cookies.username
    , _data           = []
    , endTime         = req.query.endTime ? Number ( kcool.trim ( req.query.endTime ) ) : new Date ().getTime ()
    , startTime       = req.query.startTime ? Number ( kcool.trim ( req.query.startTime ) ) : new Date ( endTime ).getNextDate ( - 6 ).getTime ()
    , thisDateDiff    = Math.floor ( new Date ( endTime ).diff ( new Date ( startTime ) ) )
    , poDataList      = [];
  for ( var i = thisDateDiff; i >= 0; i -- ) {
    poDataList.push ( new Date ( startTime ).getNextDate ( i ).format ( 'yyyy-MM-dd' ) )
  }
  startTime = (new Date ( (new Date ( startTime )).format ( 'yyyy-MM-dd 00:00:00' ) )).getTime ();
  endTime   = (new Date ( (new Date ( endTime )).format ( 'yyyy-MM-dd 23:59:59' ) )).getTime ();
  Prose.queryAllDepartment ( null, function ( err_department, data_department ) {
    async.eachSeries ( data_department, function ( item_department, data_department_callback ) {
      var department_id = item_department.rb_department_id;
      User.queryAllGroupByDepartmentid ( department_id, function ( err_group, data_group ) {
        var _data_department = [];
        async.eachSeries ( data_group, function ( item_group, data_group_callback ) {
          var group_id = item_group.rb_group_id;
          async.auto ( {
            queryAllDatenoteByGroup_idAndDate : function ( auto_callback ) {
              var _data_group = [];
              Prose.queryAllDatenoteByGroup_idAndDate ( group_id, startTime, endTime, function ( err_datenote, data_datenote ) {
                async.eachSeries ( data_datenote, function ( item_datenote, _data_datenotecallback ) {
                  _data_group.push ( {
                    did      : item_datenote.rb_department_id,
                    gid      : item_datenote.rb_group_id,
                    uaccount : item_datenote.rb_user_account,
                    uid      : item_datenote.rb_user_id,
                    nid      : item_datenote.rb_datenote_id,
                    ncontent : item_datenote.rb_datenote_content,
                    ntitle   : item_datenote.rb_datenote_title,
                    ndate    : item_datenote.rb_datenote_date
                  } );
                  _data_datenotecallback ();
                }, function done () {
                  auto_callback ( null, _data_group );
                } );
              } );
            },
            queryUserInfoByGroupId            : function ( auto_callback ) {
              User.queryUserInfoByGroupId ( group_id, function ( err, data ) {
                if ( data.length < 1 ) {
                  data = [ { rb_user_id : 99999, rb_user_name : '暂无' } ];
                  auto_callback ( err, data );
                } else {
                  auto_callback ( err, data );
                }
              } );
            }
          }, function ( err, results ) {
            var _user_data   = []
              , user_arr     = results.queryUserInfoByGroupId
              , datenote_arr = results.queryAllDatenoteByGroup_idAndDate;
            user_arr.forEach ( function ( user_arr_item ) {
              var _user__datenotedata = [];
              poDataList.forEach ( function ( poDataList_item ) {
                var _poDataListSign = false;
                datenote_arr.forEach ( function ( datenote_arr_item ) {
                  if ( user_arr_item.rb_user_id === datenote_arr_item.uid
                    && new Date ( Number ( datenote_arr_item.ndate ) ).format ( 'yyyy-MM-dd' ) === poDataList_item ) {
                    _user__datenotedata.push ( datenote_arr_item );
                    _poDataListSign = true;
                  }
                } );
                if ( _poDataListSign === false ) {
                  _user__datenotedata.push ( {
                    did      : '',
                    gid      : '',
                    uaccount : user_arr_item.rb_user_account,
                    uid      : user_arr_item.rb_user_id,
                    nid      : 'inexistence',
                    ncontent : '',
                    ntitle   : '',
                    ndate    : new Date ( poDataList_item ).getTime ()
                  } )
                }
              } );

              _user__datenotedata.sort ( function ( a, b ) {
                if ( a.ndate > b.ndate ) {
                  return - 1;
                } else if ( a.ndate < b.ndate ) {
                  return 1;
                }
                return 0;
              } );
              _user_data.push ( {
                uid      : user_arr_item.rb_user_id,
                uname    : user_arr_item.rb_user_name,
                uaccount : user_arr_item.rb_user_account,
                children : _user__datenotedata
              } )
            } );
            _data_department.push ( {
              did      : item_group.rb_department_id,
              id       : item_group.rb_group_id,
              name     : item_group.rb_group_name,
              children : _user_data
            } );
            data_group_callback ();
          } );
        }, function done () {
          _data.push ( {
            id       : item_department.rb_department_id,
            name     : item_department.rb_department_name,
            children : _data_department
          } );
          data_department_callback ();
        } );
      } );
    }, function done () {
      loadTagJsFn ( function ( err, loadTagJsFn_data ) {
        if ( loadTagJsFn_data.length < 1 ) {
          req.flash ( 'error', '程序出错，请联系小康同学!' );
          return res.redirect ( 'back' );
        } else {
          res.render (
            'client/in/dayReportAll',
            {
              title           : '瑞博科技｜日报',
              _data           : _data,
              _userAccountmd5 : _userAccountmd5,
              poDataList      : poDataList,
              loadTagOjNew    : loadTagJsFn_data
            }
          );
        }
      } );
    } );
  } );
};
/**
 * 跳转到添加日报页面
 * @param req
 * @param res
 */
exports.poProse       = function ( req, res ) {
  var user_id_cache = req.cookies.user_Hex;
  async.auto ( {
    cheackUserIdCache   : function ( callback ) {
      User.cheackUserIdCache ( user_id_cache, function ( err, data ) {
        if ( err ) {
          req.flash ( 'error', '程序出错，快联系小康同学!' );
          return res.redirect ( 'back' );
        } else {
          if ( data.length < 1 ) {
            req.flash ( 'error', '程序出错，快联系小康同学!' );
            return res.redirect ( 'back' );
          } else {
            callback ( err, data );
          }
        }
      } );
    },
    queryGroupById      : [ 'cheackUserIdCache', function ( callback, result ) {
      var user_id = result.cheackUserIdCache[ 0 ].rb_user_id;
      User.queryGroupById ( user_id, function ( err, data ) {
        if ( err ) {
          req.flash ( 'error', '程序出错，快联系小康同学!' );
          return res.redirect ( 'back' );
        } else {
          if ( data.length < 1 ) {
            req.flash ( 'error', '程序出错，快联系小康同学!' );
            return res.redirect ( 'back' );
          } else {
            var groupArr        = []
              , dataObj         = {}
              , data_arr        = [];
            data.forEach ( function ( item ) {
              groupArr.push ( JSON.stringify ( {
                did   : item.rb_department_id,
                dname : item.rb_department_name
              } ) );
              data_arr.push ( {
                did   : item.rb_department_id,
                dname : item.rb_department_name,
                gid   : item.rb_group_id,
                gname : item.rb_group_name
              } )
            } );
            dataObj[ 'data_g' ] = data_arr;
            dataObj[ 'data_d' ] = kcool.unique ( groupArr );
            callback ( err, dataObj );
          }
        }
      } );
    } ],
    queryDepartmentById : [ 'cheackUserIdCache', function ( callback, result ) {
      var user_id = result.cheackUserIdCache[ 0 ].rb_user_id;
      User.queryDepartmentById ( user_id, function ( err, data ) {
        if ( err ) {
          req.flash ( 'error', '程序出错，快联系小康同学!' );
          return res.redirect ( 'back' );
        } else {
          if ( data.length < 1 ) {
            req.flash ( 'error', '程序出错，快联系小康同学!' );
            return res.redirect ( 'back' );
          } else {
            callback ( err, data );
          }
        }
      } );
    } ]
  }, function ( err, results ) {
    res.render (
      'client/po/add/dayReportEdit',
      {
        title        : '瑞博科技｜日报',
        group        : results.queryGroupById.data_g,
        department   : results.queryDepartmentById,
        department_g : results.queryGroupById.data_d,
        loadTagOjNew : results.loadTagJsFn
      }
    );
  } );
};
/**
 * 在前台页面通过双击鼠标修改的日报
 * @param req
 * @param res
 */
exports.postProseById = function ( req, res ) {
  var datenote_id      = req.body.datenote_id
    , datenote_content = req.body.datenote_content
    , date_time        = req.body.date_time
    , _group_id        = req.body.group_id
    , user_account     = req.body.user_account
    , dateSting        = (new Date ( Number ( date_time ) )).format ( 'yyyy-MM-dd' );
  if ( datenote_id === 'inexistence' ) {
    async.auto ( {
      /**
       * 根据 id cache 搜索用户信息
       * @param callback
       */
      idByName        : function ( callback ) {
        User.idByName ( user_account, function ( err, data ) {
          if ( err ) {
            req.flash ( 'error', '程序出错，错误码：idByName!' );
            return res.redirect ( 'back' );
          } else {
            if ( data.length < 1 ) {
              res.render ( 'client/index', { title : '瑞博科技｜日报', loadTagOjNew : null } );
            } else {
              callback ( err, data );
            }
          }
        } );
      },
      /**
       * 检查是否存在状态日期
       */
      cheackDateState : [ 'idByName', function ( callback, result ) {
        User.cheackDateState ( dateSting, _group_id, function ( err, data ) {
          if ( err ) {
            req.flash ( 'error', '程序出错，错误码：cheackDateState!' );
            return res.redirect ( 'back' );
          } else {
            callback ( err, data );
          }
        } );
      } ]
    }, function ( err, results ) {
      var _user_id = results.idByName[ 0 ].rb_user_id;

      /**
       * 不存在状态日期
       */
      if ( results.cheackDateState.length < 1 ) {
        async.auto ( {
          /**
           * 插入状态日期
           * @param callback
           */
          insterDateState                : function ( callback ) {
            User.insterDateState ( dateSting, _group_id, function ( err, data ) {
              if ( err ) {
                req.flash ( 'error', '程序出错，错误码：insterDateState!' );
                return res.redirect ( 'back' );
              } else {
                if ( data.length < 1 ) {
                  req.flash ( 'error', '程序出错，错误码：insterDateState!' );
                  return res.redirect ( 'back' );
                } else {
                  callback ( err, data );
                }
              }
            } );
          },
          /**
           * 插入自己的日报
           */
          interByGroupidAndUserIdAndTime : [ 'insterDateState', function ( callback, result ) {
            Prose.interByGroupidAndUserIdAndTime ( _group_id, _user_id, date_time, function ( err, data ) {
              if ( err ) {
                req.flash ( 'error', '程序出错，错误码：allUser!' );
                return res.redirect ( 'back' );
              } else {
                callback ( err, data );
              }
            } );
          } ],
          /**
           * 查询自己的最后一个日报的日期
           */
          getNoteDateByDataString        : [ 'insterDateState', 'interByGroupidAndUserIdAndTime',
            function ( callback, result ) {
              Prose.getNoteDateByDataString ( _user_id, dateSting, function ( err, data ) {
                if ( err ) {
                  req.flash ( 'error', '程序出错，错误码：getNoteDateByDataString!' );
                  return res.redirect ( 'back' );
                } else {
                  callback ( err, data );
                }
              } );
            } ],
          /**
           * 开始添加日报
           */
          addProse                       : [ 'insterDateState', 'interByGroupidAndUserIdAndTime',
            'getNoteDateByDataString',
            function ( callback, result ) {
              var getNoteDateByDataString = result.getNoteDateByDataString;
              var proseDateOld            = getNoteDateByDataString[ getNoteDateByDataString.length - 1 ].rb_datenote_date;
              Prose.addProse ( _user_id, '没写日报标题╮(╯▽╰)╭', proseDateOld, date_time, datenote_content, _group_id, function ( err, data ) {
                if ( err ) {
                  req.flash ( 'error', '程序出错，错误码：addProse!' );
                  return res.redirect ( 'back' );
                } else {
                  callback ( err, data );
                }
              } );
            } ]
        }, function ( err, results ) {
          if ( err ) {
            req.flash ( 'error', '程序出错，错误码：results!' );
            return res.redirect ( 'back' );
          }
          req.flash ( 'success', '添加成功!' );
          return res.redirect ( 'back' );
        } );
      } else {
        /**
         * 如果存在状态日期
         */
        async.auto ( {
          /**
           * 根据当前日期、组 ID、用户 ID 检查是否存在日报
           * @param callback
           */
          cheackNoteByDataGroupId : function ( callback ) {
            Prose.cheackNoteByDataGroupId ( _user_id, dateSting, _group_id, function ( err, data ) {
              if ( err ) {
                req.flash ( 'error', '程序出错，错误码：cheackNoteByDataGroupId!' );
                return res.redirect ( 'back' );
              } else {
                if ( data.length < 1 ) {
                  /**
                   * 如果不存在日报则插入
                   */
                  Prose.interByGroupidAndUserIdAndTime ( _group_id, _user_id, date_time, function ( err, data ) {
                    if ( err ) {
                      req.flash ( 'error', '程序出错，错误码：allUser!' );
                      return res.redirect ( 'back' );
                    } else {
                      Prose.cheackNoteByDataGroupId ( _user_id, dateSting, _group_id, function ( err, cheackNoteByDataGroupId ) {
                        if ( err ) {
                          req.flash ( 'error', '程序出错，错误码：cheackNoteByDataGroupId!' );
                          return res.redirect ( 'back' );
                        } else {
                          if ( data.length < 1 ) {
                            req.flash ( 'error', '程序出错，错误码：cheackNoteByDataGroupId!' );
                            return res.redirect ( 'back' );
                          } else {
                            callback ( err, cheackNoteByDataGroupId );
                          }
                        }
                      } );
                    }
                  } );
                } else {
                  callback ( err, data );
                }
              }
            } );
          },
          addProse                : [ 'cheackNoteByDataGroupId',
            function ( callback, result ) {
              var cheackNoteByDataGroupId = result.cheackNoteByDataGroupId
                , proseDateOld            = cheackNoteByDataGroupId[ cheackNoteByDataGroupId.length - 1 ].rb_datenote_date;
              Prose.addProse ( _user_id, '没写日报标题╮(╯▽╰)╭', proseDateOld, date_time, datenote_content, _group_id, function ( err, data ) {
                if ( err ) {
                  req.flash ( 'error', '程序出错，错误码：addProse!' );
                  return res.redirect ( 'back' );
                } else {
                  callback ( err, data );
                }
              } );
            } ]
        }, function ( err, results ) {
          if ( err ) {
            req.flash ( 'error', '程序出错，错误码：results!' );
            return res.redirect ( 'back' );
          }
          req.flash ( 'success', '添加成功!' );
          return res.redirect ( 'back' );
        } );
      }
    } );
  } else {
    Prose.postProseById ( datenote_id, datenote_content, function ( err, postProseById ) {
      return res.redirect ( 'back' );
    } )
  }
};
/**
 * 开始添加日报
 * @param req
 * @param res
 */
exports.toAddProse    = function ( req, res ) {
  var user_id_cache   = req.cookies.user_Hex
    , proseTitle      = req.body.proseTitle ? kcool.trim ( req.body.proseTitle ) : '您忘记输入标题了'
    , proseDate       = req.body.proseDatetime
    , departmentId    = req.body.uiSelect1BlogType || 9999
    , groupId         = req.body.uiSelect2BlogType || 9999
    , proseDateString = ( new Date ( Number ( proseDate ) ) ).format ( 'yyyy-MM-dd' )
    , proseContent    = req.body.editor1 ? kcool.trim ( req.body.editor1 ) : ' ';
  if ( departmentId === 9999 ) {
    req.flash ( 'error', '请选择部门标签' );
    return res.redirect ( 'back' );
  }
  if ( groupId === 9999 ) {
    req.flash ( 'error', '请选择组标签' );
    return res.redirect ( 'back' );
  }
  async.auto ( {
    /**
     * 根据 id cache 搜索用户信息
     * @param callback
     */
    cheackUserIdCache : function ( callback ) {
      User.cheackUserIdCache ( user_id_cache, function ( err, data ) {
        if ( err ) {
          req.flash ( 'error', '程序出错，错误码：cheackUserIdCache!' );
          return res.redirect ( 'back' );
        } else {
          if ( data.length < 1 ) {
            res.render ( 'client/index', { title : '瑞博科技｜日报', loadTagOjNew : null } );
          } else {
            callback ( err, data );
          }
        }
      } );
    },
    /**
     * 检查是否存在状态日期
     */
    cheackDateState   : [ 'cheackUserIdCache', function ( callback, result ) {
      User.cheackDateState ( proseDateString, groupId, function ( err, data ) {
        if ( err ) {
          req.flash ( 'error', '程序出错，错误码：cheackDateState!' );
          return res.redirect ( 'back' );
        } else {
          callback ( err, data );
        }
      } );
    } ]
  }, function ( err, results ) {
    var user_id = results.cheackUserIdCache[ 0 ].rb_user_id;
    /**
     * 不存在状态日期
     */
    if ( results.cheackDateState.length < 1 ) {
      async.auto ( {
        /**
         * 插入状态日期
         * @param callback
         */
        insterDateState                : function ( callback ) {
          User.insterDateState ( proseDateString, groupId, function ( err, data ) {
            if ( err ) {
              req.flash ( 'error', '程序出错，错误码：insterDateState!' );
              return res.redirect ( 'back' );
            } else {
              if ( data.length < 1 ) {
                req.flash ( 'error', '程序出错，错误码：insterDateState!' );
                return res.redirect ( 'back' );
              } else {
                callback ( err, data );
              }
            }
          } );
        },
        /**
         * 开始插入
         */
        interByGroupidAndUserIdAndTime : [ 'insterDateState', function ( callback, result ) {
          Prose.interByGroupidAndUserIdAndTime ( groupId, user_id, proseDate, function ( err, data ) {
            if ( err ) {
              req.flash ( 'error', '程序出错，错误码：allUser!' );
              return res.redirect ( 'back' );
            } else {
              callback ( err, data );
            }
          } );
        } ],
        /**
         * 查询自己的最后一个日报的日期
         */
        getNoteDateByDataString        : [ 'insterDateState', 'interByGroupidAndUserIdAndTime',
          function ( callback, result ) {
            Prose.getNoteDateByDataString ( user_id, proseDateString, function ( err, data ) {
              if ( err ) {
                req.flash ( 'error', '程序出错，错误码：getNoteDateByDataString!' );
                return res.redirect ( 'back' );
              } else {
                callback ( err, data );
              }
            } );
          } ],
        /**
         * 开始添加日报
         */
        addProse                       : [ 'insterDateState', 'interByGroupidAndUserIdAndTime',
          'getNoteDateByDataString',
          function ( callback, result ) {
            var getNoteDateByDataString = result.getNoteDateByDataString;
            var proseDateOld            = getNoteDateByDataString[ getNoteDateByDataString.length - 1 ].rb_datenote_date;
            Prose.addProse ( user_id, proseTitle, proseDateOld, proseDate, proseContent, groupId, function ( err, data ) {
              if ( err ) {
                req.flash ( 'error', '程序出错，错误码：addProse!' );
                return res.redirect ( 'back' );
              } else {
                callback ( err, data );
              }
            } );
          } ]
      }, function ( err, results ) {
        if ( err ) {
          req.flash ( 'error', '程序出错，错误码：results!' );
          return res.redirect ( 'back' );
        }
        req.flash ( 'success', '添加成功!' );
        return res.redirect ( 'back' );
      } );
    } else {
      /**
       * 如果存在状态日期
       */
      async.auto ( {
        /**
         * 根据当前日期、组 ID、用户 ID 检查是否存在日报
         * @param callback
         */
        cheackNoteByDataGroupId : function ( callback ) {
          Prose.cheackNoteByDataGroupId ( user_id, proseDateString, groupId, function ( err, data ) {
            if ( err ) {
              req.flash ( 'error', '程序出错，错误码：cheackNoteByDataGroupId!' );
              return res.redirect ( 'back' );
            } else {
              if ( data.length < 1 ) {
                /**
                 * 如果不存在日报则插入
                 */
                Prose.interByGroupidAndUserIdAndTime ( groupId, user_id, proseDate, function ( err, data ) {
                  if ( err ) {
                    req.flash ( 'error', '程序出错，错误码：allUser!' );
                    return res.redirect ( 'back' );
                  } else {
                    Prose.cheackNoteByDataGroupId ( user_id, proseDateString, groupId, function ( err, cheackNoteByDataGroupId ) {
                      if ( err ) {
                        req.flash ( 'error', '程序出错，错误码：cheackNoteByDataGroupId!' );
                        return res.redirect ( 'back' );
                      } else {
                        if ( data.length < 1 ) {
                          req.flash ( 'error', '程序出错，错误码：cheackNoteByDataGroupId!' );
                          return res.redirect ( 'back' );
                        } else {
                          callback ( err, cheackNoteByDataGroupId );
                        }
                      }
                    } );
                  }
                } );
              } else {
                callback ( err, data );
              }
            }
          } );
        },
        addProse                : [ 'cheackNoteByDataGroupId',
          function ( callback, result ) {
            var cheackNoteByDataGroupId = result.cheackNoteByDataGroupId
              , proseDateOld            = cheackNoteByDataGroupId[ cheackNoteByDataGroupId.length - 1 ].rb_datenote_date;
            Prose.addProse ( user_id, proseTitle, proseDateOld, proseDate, proseContent, groupId, function ( err, data ) {
              if ( err ) {
                req.flash ( 'error', '程序出错，错误码：addProse!' );
                return res.redirect ( 'back' );
              } else {
                callback ( err, data );
              }
            } );
          } ]
      }, function ( err, results ) {
        if ( err ) {
          req.flash ( 'error', '程序出错，错误码：results!' );
          return res.redirect ( 'back' );
        }
        req.flash ( 'success', '添加成功!' );
        return res.redirect ( 'back' );
      } );
    }
  } );
};
