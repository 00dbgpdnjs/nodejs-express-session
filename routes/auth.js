var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');
var template = require('../lib/template.js');

var authData = {
  email: 'egoing777@gmail.com',
  password: '111111',
  nickname: 'egoing'
}

router.get('/login', function(request, response){
  var title = 'WEB - login';
  var list = template.list(request.list);
  var html = template.HTML(title, list, `
    <form action="/auth/login_process" method="post">
      <p><input type="text" name="email" placeholder="email"></p>
      <p><input type="password" name="pwd" placeholder="password"></p>
      <p>
        <input type="submit" value="login">
      </p>
    </form>
  `, '');
  response.send(html);
});

router.post('/login_process', function(request, response){
  var post = request.body;
  var email = post.email;
  var password = post.pwd;
  if(email === authData.email && password === authData.password){
    // Success!
    request.session.is_logined = true;
    request.session.nickname = authData.nickname; // Store is_logined and nickname in a session file of a sissions folder
    // response.send('Welcome!');
    // response.redirect(`/`); // instead of the code above
    request.session.save(function(){
      response.redirect(`/`);
    }); // Instead of the code above cuz when giving properties to a session obj, like is_logined above, it takes time to reflect them in a session repository from memory, but redirect() ends in an instant, so call calback after reflecting it by using save(). In this project, the session repository is a file.
  } else {
    response.send('Who?');
  }   
});

router.get('/logout', function(request, response){
  request.session.destroy(function(err){ 
    // This callback is called after deleting session (=destroy(): Delete a session file of a sessions dir and a new session file is created by session() of main.js). 
    response.redirect('/');
  })
});
module.exports = router;