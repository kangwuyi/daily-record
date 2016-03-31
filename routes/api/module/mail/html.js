exports.default = function (mailConfigServer, options) {
  if( options['httpAddress'] === undefined ){
    options['httpAddress'] = 'http://localhost:3001'
  }
  if( options['httpFunction'] === undefined ){
    options['httpFunction'] = '/in/confirmPassword'
  }
  var contentString = '';
  options.forEach(function(key, index){
    if(index === 0){
      contentString += '?';
    }else{
      contentString += '&';
    }
    contentString += key[0] + '=' + key[1];
  });
  var httpGetString = options['httpAddress'] + options['httpFunction'] + contentString;
  mailConfigServer.mailOptions['html'] = '<a href="' + httpGetString +'">' + httpGetString + '</a>';
  return mailConfigServer;
};