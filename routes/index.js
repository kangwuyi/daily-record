var express = require ( 'express' );
var http    = require ( "http" );            //提供web服务
var url = require ( "url" );            //解析GET请求
var query = require ( "querystring" );    //解析POST请求
var router     = express.Router ();
var Home       = require ( './api/home' );
var Prose      = require ( './api/prose' );
var User       = require ( './api/user' );
var object     = require ( '../models/api/object' );

//前台
router.get ( '/', Home.indexs );

//登录
router.post ( '/in/login', User.login );
router.post ( '/in/leave', User.leave );
router.get ( '/in/leave', User.leave );
router.get ( '/in/forgetPassword', User.forgetPassword );
router.get ( '/in/registerUser', User.registerUser );
router.get ( '/in/auditState', User.auditState );
router.post ( '/in/registerInfo', User.registerInfo );
router.get ( '/in/registerInfo', User.getRegisterInfo );

router.get ( '/in/prose', Prose.prose );
router.get ( '/in/proseById', Prose.proseById );
router.get ( '/in/allProse', Prose.allProse );
router.post ( '/in/postProseById', Prose.postProseById );
router.get ( '/in/postProseById', Home.indexs );
router.get ( '/in/toPoIndex', object.checkLogin );
router.post ( '/in/postNoAuditUser', User.postNoAuditUser );
router.get ( '/poProse', Prose.poProse );
router.post ( '/toAddProse', Prose.toAddProse );
router.get ( '/toAddProse', Home.indexs );
module.exports = router;