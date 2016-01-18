$ ( function () {
  /**
   * 针对IE 678，如果没有cookie，则新建一个
   */
  if ( ! $.cookie ( "userId" ) ) {
    $.cookie ( "userId", "true", { path : "/" } );
  }
  if ( $.cookie ( "userId" ) == 0 ) {
    $.cookie ( "userId", "true", { path : "/" } );
  }
} );
/**
 * 保存用户信息
 */
$ ( ".loginBox" ).on ( 'click', '#login_submit', function () {
  var userName     = $ ( "#login_username" ).val ()
    , passWord     = $ ( "#password" ).val ()
    , md5_userName = hex_md5 ( userName )
    , md5_passWord = hex_md5 ( passWord );
  $.cookie ( "userId", "true", { expires : 7 } ); // 存储一个带7天期限的 cookie
  $.cookie ( "username", md5_userName, { expires : 7 } ); // 存储一个带7天期限的 cookie
  $.cookie ( "password", md5_passWord, { expires : 7 } ); // 存储一个带7天期限的 cookie
} );
/**
 * 处理登陆框动画
 */
$ ( function () {
  //得到焦点
  $ ( "#password" ).focus ( function () {
    var left_hand  = $ ( "#left_hand" ),
        right_hand = $ ( "#right_hand" );
    left_hand.animate ( {
      left : "150",
      top  : " -38"
    }, {
      step : function () {
        if ( parseInt ( left_hand.css ( "left" ) ) > 140 ) {
          $ ( "#left_hand" ).attr ( "class", "left_hand" );
        }
      }
    }, 2000 );
    right_hand.animate ( {
      right : "-64",
      top   : "-38px"
    }, {
      step : function () {
        if ( parseInt ( right_hand.css ( "right" ) ) > - 70 ) {
          $ ( "#right_hand" ).attr ( "class", "right_hand" );
        }
      }
    }, 2000 );
  } ).blur ( function () {
    $ ( "#left_hand" ).attr ( "class", "initial_left_hand" )
      .attr ( "style", "left:100px;top:-12px;" );
    $ ( "#right_hand" ).attr ( "class", "initial_right_hand" )
      .attr ( "style", "right:-112px;top:-12px" );
  } );
} );