var _handle = '';//储存电话是否填写正确
$ ( function () {
  $ ( ".signup-form" ).on ( "focus", function () {
    $ ( this ).parent ().addClass ( "border" );
  } )
    .on ( "blur", function () {
    $ ( this ).parent ().removeClass ( "border" );
  } )
} );

//表单验证
function showNotic ( _this ) {
  $ ( _this ).parents ( ".form-group" ).find ( ".error-notic" ).fadeIn ( 100 );
  $ ( _this ).focus ();
}//错误提示显示
function hideNotic ( _this ) {
  $ ( _this ).parents ( ".form-group" ).find ( ".error-notic" ).fadeOut ( 100 );
}//错误提示隐藏
var verify = {
  verifyEmail    : function ( _this ) {
    var validateReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var _value      = $ ( _this ).val ();
    if ( ! validateReg.test ( _value ) ) {
      showNotic ( _this )
    } else {
      hideNotic ( _this )
    }
  },//验证邮箱
  verifyMobile   : function ( _this ) {
    var validateReg = /^((\+?86)|(\(\+86\)))?1\d{10}$/;
    var _value      = $ ( _this ).val ();
    if ( ! validateReg.test ( _value ) ) {
      showNotic ( _this );
      _handle = false;
    } else {
      hideNotic ( _this );
      _handle = true;
    }
    return _handle
  },//验证手机号码
  PasswordLenght : function ( _this ) {
    var _length = $ ( _this ).val ().length;
    if ( _length < 6 ) {
      showNotic ( _this )
    } else {
      hideNotic ( _this )
    }
  },//验证设置密码长度
  VerifyCount    : function ( _this ) {
    var _count = "123456";
    var _value = $ ( _this ).val ();
    console.log ( _value )
    if ( _value != _count ) {
      showNotic ( _this )
    } else {
      hideNotic ( _this )
    }
  }//验证验证码
}