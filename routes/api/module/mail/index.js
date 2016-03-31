exports.default = function (options, cb) {
  var nodemailer = require('nodemailer')
    , mailOptionConfig = require('./config').default
    , mailHtmlConfig = require('./html').default
    ,mailConfigServer = mailOptionConfig(nodemailer, options)
    ,mailHtmlConfigServer = mailHtmlConfig(mailConfigServer, options);
  mailHtmlConfigServer.transporter.sendMail(mailHtmlConfigServer.mailOptions, function (error, info) {
    if (error) {
      cb(true, 'Message sent: ' + error);
    } else {
      cb(true, 'Message sent: ' + info.response);
    }
    nodemailer = mailConfig = mailConfigServer = null;
  });
};

