exports.default = function (nodemailer, options) {
  var verifyEmail = function ( _value ) {
    var validateReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if ( ! validateReg.test ( _value ) ) {
      return false;
    } else {
      return true;
    }
  };
  var emailAddress;
  options.forEach(function(key){
    if(verifyEmail(key[1]) === true){
      emailAddress = key[1];
    }
  });
  return {
    transporter: nodemailer.createTransport({
      service: '163',
      auth: {
        user: 'lianzixunyi@163.com',
        pass: 'lianzixunyi123',
        port: 465
      }
    }),
    mailOptions: {
      from: '"太一科技"<lianzixunyi@163.com>', // sender address
      to: emailAddress || '1605457871@qq.com', // list of receivers
      subject: 'Hello', // Subject line
      text: 'Hello world', // plaintext body
      html: ''
    }
  }
};