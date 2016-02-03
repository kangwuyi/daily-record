var express     = require ( 'express' )
  , router      = express.Router ()
  , passport    = require ( 'passport' )
  , Home        = require ( './api/home' )
  , Prose       = require ( './api/prose' )
  , User        = require ( './api/user' )
  , object      = require ( '../models/api/object' )
  , kcool       = require ( './api/module/config/kcool' )
  , loadTagJsFn = require ( './api/module/public/loadTagJs.js' );

//前台
router.get ( '/', Home.indexs );

//登录
/*router.post ( '/in/login', User.login );*/
router.post ( '/in/login', function ( req, res, next ) {
    passport.authenticate ( 'local', function ( err, user, info ) {
      if ( err ) {
        return next ( err );
      }
      if ( ! user ) {
        return res.redirect ( '/' );
      }
      if ( info ) {
        req.flash ( 'success', info.message );
        return res.redirect ( '/' );
      }
      req.logIn ( user, function ( err ) {
        if ( err ) {
          return next ( err );
        }
        req.session = {
          publicUserId  : user.rb_user_id,
          publicUserKpi : user.rb_user_type
        };
        res.cookie ( 'user_Hex', user.hmacHex );
        loadTagJsFn ( function ( err, data ) {
          if ( err ) {
            return res.redirect ( '/' );
          }
          if ( data.length < 1 ) {
            return res.redirect ( '/' );
          } else {
            return res.render ( 'client/in/index', { title : '瑞博科技｜日报', loadTagOjNew : data } );
          }
        } );
      } );
    } ) ( req, res, next );
  }
);
//
var isAuthenticated = function ( req, res, next ) {
  if ( req.isAuthenticated () ) return next ();
  res.redirect ( '/' );
};
//
router.post ( '/in/leave', User.leave );
router.get ( '/in/leave', User.leave );
router.get ( '/in/forgetPassword', User.forgetPassword );
router.get ( '/in/registerUser', User.registerUser );
router.get ( '/in/auditState', User.auditState );
router.post ( '/in/registerInfo', User.registerInfo );
router.get ( '/in/registerInfo', User.getRegisterInfo );
//
router.get ( '/in/prose', Prose.prose );
//
router.get ( '/in/proseById', Prose.proseById );
//
router.get ( '/in/allProse', Prose.allProse );
//
router.post ( '/in/postProseById', Prose.postProseById );
router.get ( '/in/postProseById', Home.indexs );
//
router.get ( '/in/toPoIndex', object.checkLogin );
//
router.post ( '/in/postNoAuditUser', User.postNoAuditUser );
//
router.get ( '/poProse', Prose.poProse );
//
router.post ( '/toAddProse', Prose.toAddProse );
router.get ( '/toAddProse', Home.indexs );
module.exports      = router;