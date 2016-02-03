/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50611
Source Host           : localhost:3306
Source Database       : daily_report

Target Server Type    : MYSQL
Target Server Version : 50611
File Encoding         : 65001

Date: 2016-02-02 16:12:12
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
) ENGINE=InnoDB AUTO_INCREMENT=331 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rb_datenote
-- ----------------------------
INSERT INTO `rb_datenote` VALUES ('303', '1453085557386', '<div>日报简单系统的实现：</div><div>1.部门分级管理</div><div>2.注册权限简单分配</div><div>3.审核功能</div><div>4.测试</div><div>5.再次测试</div><div>6.再次再次测试</div>', '33', '日报简单系统', '7');
INSERT INTO `rb_datenote` VALUES ('304', '1452999780000', '<div><br></div>', '33', '测试', '7');
INSERT INTO `rb_datenote` VALUES ('306', '1453110456000', '<div>上午：</div><div>&nbsp; &nbsp; &nbsp;编写验血验尿报告不同的颜色显示</div><div>下午：</div><div>	修改验血验尿报告的逻辑</div>', '35', '周一', '4');
INSERT INTO `rb_datenote` VALUES ('307', '1453110520894', '<div>monday</div>', '36', 'test', '4');
INSERT INTO `rb_datenote` VALUES ('311', '1453111215483', '<div>上午</div><div><br></div><div>下午</div>', '37', '您忘记输入标题了', '4');
INSERT INTO `rb_datenote` VALUES ('313', '1453178698830', ' ', '35', '没写日报标题╮(╯▽╰)╭', '4');
INSERT INTO `rb_datenote` VALUES ('314', '1453178698830', ' ', '36', '没写日报标题╮(╯▽╰)╭', '4');
INSERT INTO `rb_datenote` VALUES ('315', '1453178698830', ' ', '37', '没写日报标题╮(╯▽╰)╭', '4');
INSERT INTO `rb_datenote` VALUES ('316', '1453178698830', '<p>- observe bug 269 勾选中药汤剂</p>\r\n\r\n<p>&nbsp;</p>', '38', '您忘记输入标题了', '4');
INSERT INTO `rb_datenote` VALUES ('317', '1453187203010', ' ', '34', '没写日报标题╮(╯▽╰)╭', '5');
INSERT INTO `rb_datenote` VALUES ('318', '1453187203010', '<p>- update mai research notes</p>', '38', '您忘记输入标题了', '5');
INSERT INTO `rb_datenote` VALUES ('319', '1453187203010', ' ', '39', '没写日报标题╮(╯▽╰)╭', '5');
INSERT INTO `rb_datenote` VALUES ('320', '1453187203010', ' ', '40', '没写日报标题╮(╯▽╰)╭', '5');
INSERT INTO `rb_datenote` VALUES ('321', '1453217343651', '<p>1.更新汤宝app需求文档</p>\r\n\r\n<p>2.更新test case</p>\r\n\r\n<p>3.测试android app并登记bug279</p>\r\n\r\n<p>4.开会讨论需求流程工期</p>\r\n\r\n<p>5.登记下两周release的feature，并与kathy讨论需求以及需要提供的图片</p>\r\n\r\n<p>明天计划：</p>\r\n\r\n<p>1.熟悉护士端需求</p>\r\n\r\n<p>2.做护士端测试计划</p>\r\n\r\n<p>3.验证resolve的5个bug</p>', '42', '日报', '4');
INSERT INTO `rb_datenote` VALUES ('322', '1453168221000', '<p>1.更新日报系统的查看全部日报 API</p>\r\n\r\n<p>2.修正插入日报时的全组插入 BUG</p>\r\n\r\n<p>3.更新查看全部日报布局</p>', '33', '日报系统维护', '7');
INSERT INTO `rb_datenote` VALUES ('323', '1453170139000', '<p>完善gif动画显示，通过dma实现图像显示加快显示速度，开会讨论后续工作。<br />\r\n&nbsp;</p>', '39', 'gif，dma，开会', '6');
INSERT INTO `rb_datenote` VALUES ('324', '1453888385000', '<p>sdfsd</p>', '33', '您忘记输入标题了', '7');
INSERT INTO `rb_datenote` VALUES ('325', '1453974795000', '<p>wwwwwwwwwwwwww</p>', '33', '您忘记输入标题了', '7');
INSERT INTO `rb_datenote` VALUES ('326', '1454061205840', '<p>rrrrrrrr</p>', '33', '您忘记输入标题了', '7');
INSERT INTO `rb_datenote` VALUES ('327', '1454381154046', '<div>&nbsp;</div><div>但这样做出来的二进制文件不能正确还原。还</div>', '33', '您忘记输入标题了', '7');
INSERT INTO `rb_datenote` VALUES ('328', '1454284800000', '<div>dfg按错</div>', '33', '没写日报标题╮(╯▽╰)╭', '7');
INSERT INTO `rb_datenote` VALUES ('329', '1454198400000', '<div>dsfgdf设定v</div>', '33', '没写日报标题╮(╯▽╰)╭', '7');
INSERT INTO `rb_datenote` VALUES ('330', '1454112000000', '<div>阿萨德范德萨</div>', '33', '没写日报标题╮(╯▽╰)╭', '7');

-- ----------------------------
-- Table structure for rb_datestate
-- ----------------------------
DROP TABLE IF EXISTS `rb_datestate`;
CREATE TABLE `rb_datestate` (
  `rb_datestate_id` int(50) NOT NULL AUTO_INCREMENT,
  `rb_datestate_datestring` varchar(50) DEFAULT NULL,
  `rb_group_id` int(50) DEFAULT NULL,
  PRIMARY KEY (`rb_datestate_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rb_datestate
-- ----------------------------
INSERT INTO `rb_datestate` VALUES ('18', '2016-01-18', '5');
INSERT INTO `rb_datestate` VALUES ('19', '2016-01-17', '5');
INSERT INTO `rb_datestate` VALUES ('20', '2016-01-18', '4');
INSERT INTO `rb_datestate` VALUES ('21', '2016-01-19', '4');
INSERT INTO `rb_datestate` VALUES ('22', '2016-01-19', '5');
INSERT INTO `rb_datestate` VALUES ('23', '2016-01-19', '7');
INSERT INTO `rb_datestate` VALUES ('24', '2016-01-19', '6');
INSERT INTO `rb_datestate` VALUES ('25', '2016-01-27', '7');
INSERT INTO `rb_datestate` VALUES ('26', '2016-01-28', '7');
INSERT INTO `rb_datestate` VALUES ('27', '2016-01-29', '7');
INSERT INTO `rb_datestate` VALUES ('28', '2016-02-02', '7');
INSERT INTO `rb_datestate` VALUES ('29', '2016-02-01', '7');
INSERT INTO `rb_datestate` VALUES ('30', '2016-01-31', '7');
INSERT INTO `rb_datestate` VALUES ('31', '2016-01-30', '7');

-- ----------------------------
-- Table structure for rb_department
-- ----------------------------
DROP TABLE IF EXISTS `rb_department`;
CREATE TABLE `rb_department` (
  `rb_department_id` int(50) NOT NULL AUTO_INCREMENT,
  `rb_department_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`rb_department_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rb_department
-- ----------------------------
INSERT INTO `rb_department` VALUES ('3', '太一工程');
INSERT INTO `rb_department` VALUES ('4', '行政部门');

-- ----------------------------
-- Table structure for rb_group
-- ----------------------------
DROP TABLE IF EXISTS `rb_group`;
CREATE TABLE `rb_group` (
  `rb_group_id` int(11) NOT NULL AUTO_INCREMENT,
  `rb_group_name` varchar(50) DEFAULT NULL,
  `rb_department_id` int(50) DEFAULT NULL,
  PRIMARY KEY (`rb_group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rb_group
-- ----------------------------
INSERT INTO `rb_group` VALUES ('4', '糖宝组', '3');
INSERT INTO `rb_group` VALUES ('5', '脉诊组', '3');
INSERT INTO `rb_group` VALUES ('6', '温灸组', '3');
INSERT INTO `rb_group` VALUES ('7', '网站组', '3');
INSERT INTO `rb_group` VALUES ('8', '行政组', '4');

-- ----------------------------
-- Table structure for rb_user
-- ----------------------------
DROP TABLE IF EXISTS `rb_user`;
CREATE TABLE `rb_user` (
  `rb_user_id` int(50) NOT NULL AUTO_INCREMENT,
  `rb_user_type` varchar(50) DEFAULT '2' COMMENT '用户类别',
  `rb_user_name` varchar(100) DEFAULT NULL,
  `rb_user_pw` varchar(100) DEFAULT NULL,
  `rb_user_typename` varchar(50) DEFAULT NULL,
  `rb_user_email` varchar(100) DEFAULT NULL,
  `rb_user_account` varchar(100) DEFAULT NULL,
  `rb_user_state` varchar(50) DEFAULT '0',
  `rb_department_id` int(50) NOT NULL,
  `rb_user_idcache` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`rb_user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rb_user
-- ----------------------------
INSERT INTO `rb_user` VALUES ('32', '1', 'admin', '3aa0e5b203b9d4cbba8f64719b3a431b', null, 'admin@taiyi-tech.com', '21232f297a57a5a743894a0e4a801fc3', '1', '4', '8919af3b391d5f7132b1e389ec208f1a63bb4fd5');
INSERT INTO `rb_user` VALUES ('33', '1', '康健', '3ad7b64c7a8afc20e6e41f2ec4ba8d53', null, 'kangjian@taiyi-tech.com', '3ad7b64c7a8afc20e6e41f2ec4ba8d53', '1', '3', '19935810e418c80a3c34571fc33a27a7e08c4b77');
INSERT INTO `rb_user` VALUES ('34', '2', '邹金勇', 'd568ac0df143a6e3c8100a0d50734f0d', null, 'chinazoujy@163.com', '2a788a18d827434b2d023b9b0dcfe97d', '1', '3', '779a5945143779a8752e507bb76f743c708c5022');
INSERT INTO `rb_user` VALUES ('35', '2', '闫旭', '46c78d0fa3e915bd3150d75d17e1d410', null, '18511310049@163.com', '9f209929b3f533d173e96c7a9a45d96a', '1', '3', '8a583f3c7a104914eb96225ac5d190b5f1a82ffb');
INSERT INTO `rb_user` VALUES ('36', '2', '樊宇', 'e10adc3949ba59abbe56e057f20f883e', null, 'fanyu@taiyi-tech.com', 'd06b215179da5aa872aa1e387a8be95b', '1', '3', '33d9c750e9997de77ee2826e2a7e491c84f6241b');
INSERT INTO `rb_user` VALUES ('37', '2', '王力伟', '2910615b6a7ee0f5257585e862e0ffb2', null, 'wanglw@taiyi-tech.com', 'a6c3748cc7db34f38816f7c1be48427a', '1', '3', 'a17134082a95a6abd71919c76799645f6513f8f8');
INSERT INTO `rb_user` VALUES ('38', '2', '葛云', '3aa0e5b203b9d4cbba8f64719b3a431b', null, 'geyun@taiyi-tech.com', '5c3c807ad97412b4e95a2e8f1a8cad3f', '1', '3', 'bbbf5d5679d31a0599fe4ba2aa7f5c241be56405');
INSERT INTO `rb_user` VALUES ('39', '2', '万敏', '88ebab4a06bb505cff2e1a0a5c4691ff', null, 'wanmin@taiyi-tech.com', '896b5b63f059b10fa80cc4959af0a7ec', '1', '3', '8d845205c70ba03027157f6f0497416fab103378');
INSERT INTO `rb_user` VALUES ('40', '2', 'Harrifinn', 'c04568c3f54726ee3febeab50e264316', null, 'qinhf@taiyi-tech.com', '6539724193246975da9f919c55acff64', '1', '3', '5ed1fae0eb210163290b7f960e24effd61759874');
INSERT INTO `rb_user` VALUES ('41', '2', '曹耀杰', '5928c0cb392e16af97517298244e3d2a', null, 'caoyj@taiyi-tech.com', '234f89028275dcec9aaf8bee449d6a43', '1', '3', '258db9b9e990db62acf12dcc61913230372c5d69');
INSERT INTO `rb_user` VALUES ('42', '2', '王春燕', 'de173dd0636de18e3dba78bb5e9154de', null, 'wangcy@taiyi-tech.com', 'f537e62c4271ca2fe3286ae9e76e707c', '1', '3', '8b3771abaa50967c44265cc933cf8d614c0f151c');
INSERT INTO `rb_user` VALUES ('43', '2', '杨健松', 'e10adc3949ba59abbe56e057f20f883e', null, 'yangjs@taiyi-tech.com', 'c1b66674b8cdfc59fa0d71fdb8d9341a', '1', '3', '5a3472e3efca85f927ad1e6418985240cbbd1690');
INSERT INTO `rb_user` VALUES ('44', '2', '王卫峰', '117d5c689ee4f668580e56f77b75fa83', null, 'wangwf@taiyi-tech.com', 'be300a4ede19b01c23e671db09502af1', '1', '3', '846710b499ec2febd75a889c69548c11f1393930');

-- ----------------------------
-- Table structure for rb_user_group
-- ----------------------------
DROP TABLE IF EXISTS `rb_user_group`;
CREATE TABLE `rb_user_group` (
  `rb_user_group_id` int(50) NOT NULL AUTO_INCREMENT,
  `rb_group_id` int(50) DEFAULT NULL,
  `rb_user_id` int(50) DEFAULT NULL,
  PRIMARY KEY (`rb_user_group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of rb_user_group
-- ----------------------------
INSERT INTO `rb_user_group` VALUES ('8', '8', '32');
INSERT INTO `rb_user_group` VALUES ('9', '7', '33');
INSERT INTO `rb_user_group` VALUES ('10', '4', '35');
INSERT INTO `rb_user_group` VALUES ('11', '4', '36');
INSERT INTO `rb_user_group` VALUES ('12', '4', '37');
INSERT INTO `rb_user_group` VALUES ('14', '5', '34');
INSERT INTO `rb_user_group` VALUES ('15', '4', '38');
INSERT INTO `rb_user_group` VALUES ('16', '5', '38');
INSERT INTO `rb_user_group` VALUES ('17', '6', '38');
INSERT INTO `rb_user_group` VALUES ('18', '6', '39');
INSERT INTO `rb_user_group` VALUES ('19', '5', '39');
INSERT INTO `rb_user_group` VALUES ('20', '5', '40');
INSERT INTO `rb_user_group` VALUES ('21', '4', '42');
INSERT INTO `rb_user_group` VALUES ('22', '5', '42');
INSERT INTO `rb_user_group` VALUES ('23', '6', '41');
INSERT INTO `rb_user_group` VALUES ('24', '4', '43');
INSERT INTO `rb_user_group` VALUES ('25', '5', '43');
INSERT INTO `rb_user_group` VALUES ('26', '6', '44');
