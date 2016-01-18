/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50611
Source Host           : localhost:3306
Source Database       : daily_report

Target Server Type    : MYSQL
Target Server Version : 50611
File Encoding         : 65001

Date: 2016-01-15 19:04:22
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for rb_datenote
-- ----------------------------
DROP TABLE IF EXISTS `rb_datenote`;
CREATE TABLE `rb_datenote` (
  `rb_datenote_id` int(50) NOT NULL AUTO_INCREMENT,
  `rb_datenote_date` varchar(100) DEFAULT NULL,
  `rb_datenote_content` longtext,
  `rb_datenote_user_id` int(50) DEFAULT NULL,
  `rb_datenote_title` varchar(100) DEFAULT NULL,
  `rb_group_id` int(50) DEFAULT NULL,
  PRIMARY KEY (`rb_datenote_id`)
) ENGINE=InnoDB AUTO_INCREMENT=303 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rb_datenote
-- ----------------------------
INSERT INTO `rb_datenote` VALUES ('295', '1452845242838', ' ', '8', 'zz', '1');
INSERT INTO `rb_datenote` VALUES ('296', '1452843079519', ' ', '1', '没写日报标题╮(╯▽╰)╭', '1');
INSERT INTO `rb_datenote` VALUES ('297', '1452843079519', ' ', '2', '没写日报标题╮(╯▽╰)╭', '1');
INSERT INTO `rb_datenote` VALUES ('298', '1452843086797', '<p>gf</p>', '8', 'gf', '2');
INSERT INTO `rb_datenote` VALUES ('299', '1452843086797', ' ', '1', '没写日报标题╮(╯▽╰)╭', '2');
INSERT INTO `rb_datenote` VALUES ('300', '1452843086797', ' ', '3', '没写日报标题╮(╯▽╰)╭', '2');
INSERT INTO `rb_datenote` VALUES ('301', '1452845257291', '<p>ss</p>', '8', 'ss', '2');
INSERT INTO `rb_datenote` VALUES ('302', '1452844267794', '<p>ee</p>', '8', 'ee', '3');

-- ----------------------------
-- Table structure for rb_datestate
-- ----------------------------
DROP TABLE IF EXISTS `rb_datestate`;
CREATE TABLE `rb_datestate` (
  `rb_datestate_id` int(50) NOT NULL AUTO_INCREMENT,
  `rb_datestate_datestring` varchar(50) DEFAULT NULL,
  `rb_group_id` int(50) DEFAULT NULL,
  PRIMARY KEY (`rb_datestate_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rb_datestate
-- ----------------------------
INSERT INTO `rb_datestate` VALUES ('15', '2016-01-15', '1');
INSERT INTO `rb_datestate` VALUES ('16', '2016-01-15', '2');
INSERT INTO `rb_datestate` VALUES ('17', '2016-01-15', '3');

-- ----------------------------
-- Table structure for rb_department
-- ----------------------------
DROP TABLE IF EXISTS `rb_department`;
CREATE TABLE `rb_department` (
  `rb_department_id` int(50) NOT NULL AUTO_INCREMENT,
  `rb_department_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`rb_department_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rb_department
-- ----------------------------
INSERT INTO `rb_department` VALUES ('1', 'app部门');
INSERT INTO `rb_department` VALUES ('2', '适当放松的');

-- ----------------------------
-- Table structure for rb_group
-- ----------------------------
DROP TABLE IF EXISTS `rb_group`;
CREATE TABLE `rb_group` (
  `rb_group_id` int(11) NOT NULL AUTO_INCREMENT,
  `rb_group_name` varchar(50) DEFAULT NULL,
  `rb_department_id` int(50) DEFAULT NULL,
  PRIMARY KEY (`rb_group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rb_group
-- ----------------------------
INSERT INTO `rb_group` VALUES ('1', '前端组', '1');
INSERT INTO `rb_group` VALUES ('2', 'ad组', '1');
INSERT INTO `rb_group` VALUES ('3', 'gg', '2');

-- ----------------------------
-- Table structure for rb_user
-- ----------------------------
DROP TABLE IF EXISTS `rb_user`;
CREATE TABLE `rb_user` (
  `rb_user_id` int(50) NOT NULL AUTO_INCREMENT,
  `rb_user_type` varchar(50) DEFAULT NULL COMMENT '用户类别',
  `rb_user_name` varchar(100) DEFAULT NULL,
  `rb_user_pw` varchar(100) DEFAULT NULL,
  `rb_user_typename` varchar(50) DEFAULT NULL,
  `rb_user_email` varchar(100) DEFAULT NULL,
  `rb_user_account` varchar(100) DEFAULT NULL,
  `rb_user_state` varchar(50) DEFAULT '0',
  `rb_department_id` int(50) NOT NULL,
  `rb_user_idcache` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`rb_user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rb_user
-- ----------------------------
INSERT INTO `rb_user` VALUES ('1', '1', 'amanda', 'amanda', '管理员', null, null, '0', '0', null);
INSERT INTO `rb_user` VALUES ('2', 'android', 'fanyu', 'fanyu', '安卓组', null, null, '0', '0', null);
INSERT INTO `rb_user` VALUES ('3', 'android', 'yanxu', 'yanxu', '安卓组', null, null, '0', '0', null);
INSERT INTO `rb_user` VALUES ('4', 'ios', 'wangliwei', 'wangliwei', 'ios组', null, null, '0', '0', null);
INSERT INTO `rb_user` VALUES ('5', 'ios', 'liting', 'liting', 'ios组', null, null, '0', '0', null);
INSERT INTO `rb_user` VALUES ('6', 'test', 'wangchunyan', 'wangchunyan', '测试组', null, null, '0', '0', null);
INSERT INTO `rb_user` VALUES ('7', 'backend', 'zoujinyong', 'zoujinyong', '后端组', null, null, '0', '0', null);
INSERT INTO `rb_user` VALUES ('8', '1', 'kangjian', '3ad7b64c7a8afc20e6e41f2ec4ba8d53', '前端组', null, '3ad7b64c7a8afc20e6e41f2ec4ba8d53', '1', '1', '2e08c953e72d838984612f84f7c53b5a0284d420');
INSERT INTO `rb_user` VALUES ('9', 'backend', 'qinhaofeng', 'qinhaofeng', '后端组', null, null, '0', '0', null);
INSERT INTO `rb_user` VALUES ('10', 'backend', 'yangjiansong', 'yangjiansong', '后端组', null, null, '0', '0', null);
INSERT INTO `rb_user` VALUES ('11', null, 'kangjian', '3ad7b64c7a8afc20e6e41f2ec4ba8d53', null, '1@qq.com', 'kangjiankjh', '0', '0', null);
INSERT INTO `rb_user` VALUES ('12', null, 'gdgdfg', 'd1976b7be96c8c12e550bc8141ad267f', null, 'dfg@wq.com', 'sdfsdfdfg', '0', '0', null);
INSERT INTO `rb_user` VALUES ('13', null, 'sdfsdf', '5ebe889af0996681cb07c774cfdf538f', null, 'sdf@qwq.com', 'dfgdfgsdf', '0', '0', null);
INSERT INTO `rb_user` VALUES ('14', null, 'dfgdf', 'd58e3582afa99040e27b92b13c8f2280', null, 'dfgdfgdfg@qq.com', 'sdfsdfdfgsdf', '0', '0', null);
INSERT INTO `rb_user` VALUES ('15', null, 'sds', 'aa29895c7948fc77fe827180da57de6d', null, 'sdvsdvsdv@sadf.com', 'asdasd', '0', '0', null);
INSERT INTO `rb_user` VALUES ('16', null, 'dass', '8c71fb3f7593543f2ad180d31148a7cf', null, 'asd@ss.com', 'sdfsdfdfgsdfsdf', '0', '0', null);
INSERT INTO `rb_user` VALUES ('17', null, 'sdfsdf', '4238c381a68edb351a7bd96634733288', null, 'sdfs@qq.com', 'dfgdf', '0', '0', null);
INSERT INTO `rb_user` VALUES ('18', null, 'sdfsdfsd', '39c8e9953fe8ea40ff1c59876e0e2f28', null, 'sdfsd@qq.com', 'sdfsdfsdf', '0', '0', null);
INSERT INTO `rb_user` VALUES ('19', null, 'sdfsd', '73a90acaae2b1ccc0e969709665bc62f', null, 'sdfsdf@qq.com', 'sdfsdfdfgsdfsd', '0', '0', null);
INSERT INTO `rb_user` VALUES ('20', null, 'sdfsdfsdf', '73a90acaae2b1ccc0e969709665bc62f', null, 'sdfsdfsadg@qq.com', 'sdfsdfsdffds', '0', '0', null);
INSERT INTO `rb_user` VALUES ('21', null, 'sadsadfsdf', '3ad7b64c7a8afc20e6e41f2ec4ba8d53', null, 'sdf@qq.cc', 'sdfsdfsdfaaa', '0', '0', null);
INSERT INTO `rb_user` VALUES ('22', null, 'fghgfdh', '8742b2d8e4457888a50a57e45cc8f1d1', null, 'gfdhdfgh@dsf.com', 'fghfghfgh', '0', '0', null);
INSERT INTO `rb_user` VALUES ('23', null, '萨的方法', '343b1c4a3ea721b2d640fc8700db0f36', null, 'sdfdsafgadgdfg@sdfsa.com', 'qqqqqq', '0', '0', null);
INSERT INTO `rb_user` VALUES ('24', null, '斯蒂芬森', '0b4e7a0e5fe84ad35fb5f95b9ceeac79', null, 'dsfsdfsd@dfsdf.com', '0b4e7a0e5fe84ad35fb5f95b9ceeac79', '0', '0', null);
INSERT INTO `rb_user` VALUES ('25', null, '斯蒂芬森asd', '5d793fc5b00a2348c3fb9ab59e5ca98a', null, 'dsfsdfsdd@dfsdf.com', '5d793fc5b00a2348c3fb9ab59e5ca98a', '0', '0', null);
INSERT INTO `rb_user` VALUES ('26', null, 'dsafdfdsfsdfsdfsd', '9cafeef08db2dd477098a0293e71f90a', null, 'sdfadfsadf2@QQ.COM', '9cafeef08db2dd477098a0293e71f90a', '0', '0', null);
INSERT INTO `rb_user` VALUES ('27', null, 'sdfsadfsadfsdfsdfsdfdsf', 'd785c99d298a4e9e6e13fe99e602ef42', null, 'safdsa@asdasda.com', 'd785c99d298a4e9e6e13fe99e602ef42', '0', '0', null);
INSERT INTO `rb_user` VALUES ('28', null, 'sdfsdfsdd', 'ff2f24f8b6d253bb5a8bc55728ca7372', null, 'sdfs@sdsa.cc', 'ff2f24f8b6d253bb5a8bc55728ca7372', '0', '0', null);
INSERT INTO `rb_user` VALUES ('29', null, 'sdfsdfsddd', 'ff2f24f8b6d253bb5a8bc55728ca7372', null, 'sdfds@sdsa.cc', 'dab5b23703d114558022b4b4c995379b', '0', '0', null);
INSERT INTO `rb_user` VALUES ('30', null, 'dsfdasdfdsaf', 'a3dcb4d229de6fde0db5686dee47145d', null, 'sdfsdfsdf@asd.comc', '7edc2ea51809c88875b577fe8261dd33', '0', '0', null);
INSERT INTO `rb_user` VALUES ('31', null, 'dsfdasdfddsaf', '5a22382a541d2c76b5fb4bcd4c8c5153', null, 'sdfsddfsdf@asd.comc', 'f1f15e640dbfd430047748cac58825d2', '0', '0', null);

-- ----------------------------
-- Table structure for rb_user_group
-- ----------------------------
DROP TABLE IF EXISTS `rb_user_group`;
CREATE TABLE `rb_user_group` (
  `rb_user_group_id` int(50) NOT NULL AUTO_INCREMENT,
  `rb_group_id` int(50) DEFAULT NULL,
  `rb_user_id` int(50) DEFAULT NULL,
  PRIMARY KEY (`rb_user_group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rb_user_group
-- ----------------------------
INSERT INTO `rb_user_group` VALUES ('1', '1', '8');
INSERT INTO `rb_user_group` VALUES ('2', '2', '8');
INSERT INTO `rb_user_group` VALUES ('3', '3', '8');
INSERT INTO `rb_user_group` VALUES ('4', '1', '1');
INSERT INTO `rb_user_group` VALUES ('5', '1', '2');
INSERT INTO `rb_user_group` VALUES ('6', '2', '1');
INSERT INTO `rb_user_group` VALUES ('7', '2', '3');
