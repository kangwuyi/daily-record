exports.isLoggedIn = function ( req, res, next ) {
  if ( req.isAuthenticated () )
    return next ();
  res.redirect ( '/' );
};
/**
 * Created by kahn1990.
 */
/**
 * @method : trim
 * @describe : 删除左右两端的空格
 * @param str
 * @returns {*}
 */
exports.trim                    = function ( str ) {
  return str.replace ( /(^\s*)|(\s*$)/g, "" );
};
/**
 * 去掉重复值
 * @param arr
 * @returns {Array}
 */
exports.unique                  = function ( arr ) {
  var result = [], hash = {};
  for ( var i = 0, elem; (elem = arr[ i ]) != null; i ++ ) {
    if ( ! hash[ elem ] ) {
      result.push ( elem );
      hash[ elem ] = true;
    }
  }
  return result;
};
/**
 * @method : ltrim
 * @describe : 删除左边的空格
 * @param str
 * @returns {*}
 */
exports.ltrim                   = function ( str ) {
  return str.replace ( /(^\s*)/g, "" );
};
/**
 * @method : rtrim
 * @describe : 删除右边的空格
 * @param str
 * @returns {*}
 */
exports.rtrim                   = function ( str ) {
  return str.replace ( /(\s*$)/g, "" );
};
/**
 * @method : format
 * @describe : 日期格式化
 * @param fmt
 * @returns {*}
 */
Date.prototype.format           = function ( fmt ) {
  var week = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', '星期日', '星期一', '星期二', '星期三',
    '星期四', '星期五', '星期六' ];
  var o    = {
    "M+" : this.getMonth () + 1, //月份
    "d+" : this.getDate (), //日
    "h+" : this.getHours (), //小时
    "m+" : this.getMinutes (), //分
    "s+" : this.getSeconds (), //秒
    "q+" : Math.floor ( (this.getMonth () + 3) / 3 ), //季度
    "S"  : this.getMilliseconds (), //毫秒
    "DD" : week[ this.getDay () + 7 ]
  };
  if ( /(y+)/.test ( fmt ) ) fmt = fmt.replace ( RegExp.$1, (this.getFullYear () + "").substr ( 4 - RegExp.$1.length ) );
  for ( var k in o )
    if ( new RegExp ( "(" + k + ")" ).test ( fmt ) ) fmt = fmt.replace ( RegExp.$1, (RegExp.$1.length == 1) ? (o[ k ]) : (("00" + o[ k ]).substr ( (k == "DD") ? 2 : ("" + o[ k ]).length )) );
  return fmt;
};
/**
 * @method : diff
 * @describe : 给日期类对象添加日期差方法，返回日期与diff参数日期的时间差，单位为天
 * @param date
 * @returns {number}
 */
Date.prototype.diff             = function ( date ) {
  return (this.getTime () - date.getTime ()) / (24 * 60 * 60 * 1000);
};
/**
 * @method : getNextDate
 * @describe : 日期加减函数
 * @param AddDayCount
 * @returns {Date}
 */
Date.prototype.getNextDate      = function ( AddDayCount ) {
  var dd = new Date ( this );
  dd.setDate ( dd.getDate () + AddDayCount );//获取AddDayCount天后的日期
  /*var y = dd.getFullYear();
   var m = dd.getMonth()+1;//获取当前月份的日期
   var d = dd.getDate();
   return y+"/"+m+"/"+d;*/
  return dd;
};
/**
 * @method : DateDiff
 * @describe : 日期差值
 * @param sDate1
 * @param sDate2
 * @returns {*}
 * @constructor
 */
exports.DateDiff                = function ( sDate1, sDate2 ) {
  var aDate, oDate1, oDate2, iDays;
  aDate  = sDate1.split ( "/" );
  oDate1 = new Date ( aDate[ 1 ] + '/' + aDate[ 2 ] + '/' + aDate[ 0 ] );    //转换为12/18/2006格式
  aDate  = sDate2.split ( "/" );
  oDate2 = new Date ( aDate[ 1 ] + '/' + aDate[ 2 ] + '/' + aDate[ 0 ] );
  iDays  = parseInt ( Math.abs ( oDate1 - oDate2 ) / 1000 / 60 / 60 / 24 );    //把相差的毫秒数转换为天数
  return iDays + 1
};
exports.searchInfoSerialization = function ( data, searchInfoFn ) {
  var dataResult = JSON.parse ( data );
  if ( dataResult.code == '000' ) {
    var obj2     = JSON.parse ( dataResult.result );
    var JosnList = [];
    obj2.sort ( function ( a, b ) {
      if ( a.leakTime < b.leakTime ) {
        return - 1;
      } else if ( a.leakTime > b.leakTime ) {
        return 1;
      }
      return 0;
    } );
    for ( var index = 0, len = obj2.length; index < len; index ++ ) {
      JosnList[ index ] = { "counts" : obj2[ index ].counts, "des" : obj2[ index ].desPub, "leakTime" : new Date ( obj2[ index ].leakTime ).format ( "yyyy.MM" ) };
    }
    var JosnList2 = JSON.stringify ( JosnList );
    searchInfoFn ( undefined, JosnList2 );
  } else {
    var JosnList2 = '[]'
    searchInfoFn ( undefined, JosnList2 );
  }
}