var express = require('express')
var parseurl = require('parseurl')
var session = require('express-session')
var FileStore = require('session-file-store')(session)

var app = express()

app.use(session({ // Install session as middeleware on my app. Whenver connecting to the applicaion, session is created
    secret: 'aaaaaa@gmail.com',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
})) // You need to process the 'secret' option's value to var for security instead that  / The 2nd option means it doens't save session data until session data is changed / The 3rd one mean don't run session before session is needed. / The 4th one is session store at a file.

app.get('/', function(req, res, next){
    console.log(req.session);
    if(req.session.num === undefined){
        req.session.num = 1;
    } else {
        req.session.num = req.session.num + 1;
    }
    res.send(`Views : ${req.session.num}`);
}) // Whenever reloading web [Whenever req], + 1 / The session store the value to MemoryStore i.e. memory. When finishing nodejs, memory data is gone. It's default. So Store in a nonvolatile storage like files. $ npm install -s session-file-store and add store option in sessino()

app.listen(3000, function(){
    console.log('3000!');
})