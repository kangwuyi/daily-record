var express       = require ( 'express' )
  , app           = express ()
  , path          = require ( 'path' )
  , flash         = require ( 'connect-flash' )
  , favicon       = require ( 'static-favicon' )
  , logger        = require ( 'morgan' )
  , cookieParser  = require ( 'cookie-parser' )
  , cookieSession = require ( 'cookie-session' )
  , bodyParser    = require ( 'body-parser' )
  , partials      = require ( 'express-partials' )	//模板
  , http          = require ( 'http' )
  , ejs           = require ( 'ejs' )
  , passport      = require ( 'passport' )
  , LocalStrategy = require ( 'passport-local' ).Strategy
  , session       = require ( 'express-session' )
  , RedisStore    = require ( 'connect-redis' ) ( session )
  , settings      = require ( './db' )	//加载
  , routes        = require ( './routes/index' )	//加载路由
  , UserDb        = require ( './models/user' )
  , crypto        = require ( 'crypto' )
  , async         = require ( 'async' )
  , fs            = require ( 'fs' )
  , pem           = fs.readFileSync ( 'server.pem' )
  , key           = pem.toString ( 'ascii' );


passport.use ( 'local', new LocalStrategy (
  {
    usernameField : 'username',
    passwordField : 'password'
  },
  function ( user_account, user_password, done ) {
    //实现用户名或邮箱登录
    //这里判断提交上的username是否含有@，来决定查询的字段是哪一个
    /*var criteria = (username.indexOf ( '@' ) === - 1) ? { username : username, passwordField : 'userPassword' } : { email : userName };*/
    if ( (user_account === '') || (user_account === null) || (user_account === undefined) ) {
      return done ( null, false, { message : '没有输入账号.' } );
    } else {
      var md5_user_account = crypto.createHash ( 'md5' );
      user_account         = md5_user_account.update ( user_account ).digest ( 'hex' );
    }
    if ( (user_password !== '') || (user_password !== null) || (user_password !== undefined) ) {
      var md5_user_password = crypto.createHash ( 'md5' );
      user_password         = md5_user_password.update ( user_password ).digest ( 'hex' );
    } else {
      return done ( null, false, { message : '没有输入密码.' } );
    }
    async.auto ( {
      cheackByAccount     : function ( callback ) {
        UserDb.cheackByAccount ( user_account, function ( err, data ) {
          if ( err ) {
            return done ( err );
          }
          if ( data.length < 1 ) {
            return done ( null, false, { message : '账户不存在.' } );
          } else {
            if ( data[ 0 ].rb_user_pw != user_password ) {
              return done ( null, false, { message : '密码错误.' } );
            }
            callback ( err, data );
          }
        } );
      },
      cheackByState       : [ 'cheackByAccount', function ( callback ) {
        UserDb.cheackByState ( user_account, function ( err, data ) {
          if ( err ) {
            return done ( err );
          }
          if ( data.length < 1 ) {
            return done ( null, false );
          } else {
            callback ( err, data );
          }
        } );
      } ],
      updateUserIdCache   : [ 'cheackByAccount', 'cheackByState', function ( callback, result ) {
        var user_id = result.cheackByAccount[ 0 ].rb_user_id
          , hmac    = crypto.createHmac ( 'sha1', key );
        hmac.update ( result.cheackByAccount[ 0 ].rb_user_id.toString () );
        var hmacHex = hmac.digest ( 'hex' );
        UserDb.updateUserIdCache ( user_id, hmacHex, function ( err, data ) {
          callback ( err, hmacHex );
        } );
      } ],
      cheackByAccountNext : [ 'cheackByAccount', 'cheackByState', 'updateUserIdCache', function ( callback ) {
        UserDb.cheackByAccount ( user_account, function ( err, data ) {
          if ( err ) {
            return done ( err );
          }
          if ( data.length < 1 ) {
            return done ( null, false, { message : '账户不存在.' } );
          } else {
            if ( data[ 0 ].rb_user_pw != user_password ) {
              return done ( null, false, { message : '密码错误.' } );
            }
            callback ( err, data );
          }
        } );
      } ]
    }, function ( err, results ) {
      if ( err ) {
        return done ( err );
      }
      results.cheackByAccountNext[ 0 ][ 'hmacHex' ] = results.updateUserIdCache;
      return done ( null, results.cheackByAccountNext[ 0 ] );
    } );
  }
) );

passport.serializeUser ( function ( user, done ) {//保存user对象
  done ( null, user.rb_user_account );
} );

passport.deserializeUser ( function ( user_account, done ) {//删除user对象
  User.cheackByAccount ( user_account, function ( err, user ) {
    done ( err, user );
  } );
} );

//
app.set ( 'views', path.join ( __dirname, 'views' ) );
app.set ( 'view engine', 'ejs' );
app.use ( flash () );
app.use ( cookieParser () ); //cookie解析的中间件
app.use ( cookieSession ( { secret : 'kangcool' } ) );
app.use ( favicon ( __dirname + '/public/favicon.ico' ) );
app.use ( logger ( 'dev' ) );
app.use ( bodyParser.json () );
app.use ( bodyParser.urlencoded ( { "limit" : "10000kb", extended : true } ) );
app.use ( session ( { //提供会话支持
  cookie            : {
    maxAge : 60000 * 20 //20 minutes
  },
  store             : new RedisStore ( {
    host : "127.0.0.1",
    port : 6379
    //db: "test_kcool"
  } ),
  secret            : 'kangcool',//这个是session加密需要的，随便写的。
  resave            : true,
  saveUninitialized : true
} ) );
app.use ( passport.initialize () );
app.use ( passport.session () );
app.use ( function ( req, res, next ) {
  var error                = req.flash ( 'error' );
  var success              = req.flash ( 'success' );
  res.locals.user          = req.session.user ? req.session.user : '';
  res.locals.allTag        = req.session.allTag ? req.session.allTag : '';
  res.locals.publicUserId  = req.session.publicUserId || '';
  res.locals.publicUserKpi = req.session.publicUserKpi ? req.session.publicUserKpi : '';
  res.locals.cache         = req.session.cache ? req.session.cache : '';
  res.locals.error         = error.length ? error : null;
  res.locals.success       = success ? success : null;//console.log('req.session.publicUserId:'+req.session.publicUserId+'+res.locals.publicUserId:'+res.locals.publicUserId)
  next ();
} );

app.use ( '/', routes );
app.use ( express.static ( path.join ( __dirname, 'public' ) ) );
app.use ( function ( req, res, next ) {
  var error        = req.flash ( 'error' );
  res.locals.error = error.length ? error : null;
  var err          = new Error ( 'Not Found' );
  err.status       = 404;
  res.render ( 'client/404', { title : '404: File Not Found' } );
  next ( err );
} );
if ( app.get ( 'env' ) === 'development' ) {
  app.use ( function ( err, req, res ) {
    res.status ( err.status || 500 );
    res.render ( 'error', {
      message : err.message,
      error   : err
    } );
  } );
}
app.use ( function ( err, req, res ) {
  res.status ( err.status || 500 );
  res.render ( 'error', {
    message : err.message,
    error   : {}
  } );
} );

var server = app.listen ( 3001, function () {
  console.log ( 'Listening on port %d', server.address ().port );
} );

module.exports = app;