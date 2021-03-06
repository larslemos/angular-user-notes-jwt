/*jshint node:true*/
'use strict';

var express = require('express');
var faker = require('faker');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var compress = require('compression');
var cors = require('cors');
var errorHandler = require('./utils/errorHandler')();
var expressJwt = require('express-jwt');
var four0four = require('./utils/404');
var favicon = require('serve-favicon');
var logger = require('morgan');
var port = process.env.PORT || 7203;
var routes;

//Mini DB
var user = {
    username: 'lars',
    password: 'p'
};

var jwtSecret = 'lemoslars';

var app = express();

var environment = process.env.NODE_ENV;
// app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(compress());
app.use(logger('dev'));
app.use(cors());
app.use(errorHandler.init);
app.use(expressJwt({ secret : jwtSecret}).unless({path: ['/']}));

// routes = require('./routes/index')(app);
console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

app.get('/ping', function(req, res, next) {
    console.log(req.body);
    res.send('pong');
});

app.get('/api/random-user', function(req, res, next) {
  var user = faker.helpers.createCard();
  user.avatar = faker.image.avatar();

  res.setHeader('Content-Type', 'application/json');
  res.json(user);
  // res.send(JSON.stringify(user));
  // res("Working");
});

app.post('/api/login', authenticate, function(req, res, next) {
  var token = jwt.sign({
      username: user.username,
  }, jwtSecret);
  res.send({
    token:token,
    user: user
  });
});

//UTIL FUNCTIONS
function authenticate(req, res, next) {
  var body = req.body;
  if(!body.username || !body.password) {
    console.warn("AUTHENTICATE: Empty fields");
    return res.status(400).end('Must provide username or password');
  }
  if(body.username !== user.username || body.password !== user.password) {
      console.warn("AUTHENTICATE: Wrong Credentials ");
      return res.status(401).end('Username or password incorret');
  }
    next();
}

switch (environment) {
    case 'build':
        console.log('** BUILD **');
        app.use(express.static('./build/'));
        // Any invalid calls for templateUrls are under app/* and should return 404
        app.use('/app/*', function(req, res, next) {
            four0four.send404(req, res);
        });
        // Any deep link calls should return index.html
        app.use('/*', express.static('./build/index.html'));
        break;
    default:
        console.log('** DEV **');
        app.use(express.static('./'));
        app.use(express.static('./bower_components'));
        app.use(express.static('./client'));
        app.use(express.static('./.tmp'));

        // All the assets are served at this point.
        // Any invalid calls for templateUrls are under app/* and should return 404
        app.use('/client/app/*', function(req, res, next) {
            four0four.send404(req, res);
        });

        // Any deep link calls should return index.html
        app.use('/', express.static('../client/index.html'));
          // app.use('/*', express.static('./client/app.html'));
        break;
}

app.listen(port, function() {
    console.log('Express server listening on port ' + port);
    console.log('env = ' + app.get('env') +
                '\n__dirname = ' + __dirname +
                '\nprocess.cwd = ' + process.cwd());
});
