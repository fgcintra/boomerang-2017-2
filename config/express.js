var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');

var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

//var home = require('../app/routes/home');

module.exports = function() {
   var app = express();

   //app.use(express.static('./public'));

   app.set('port', 3000);
   app.set('ip', '127.0.0.1'); 

   app.set('view engine', 'ejs');
   app.set('views', './app/views');

   app.use(cors());
   
   /* RTA para fazer com que todos os navegadores
      entendam os verbos HTTP DELETE e PUT.
   */
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(methodOverride());

   //home(app);

   app.use(cookieParser());
   app.use(session({
      // Coloque sua própria frase secreta aqui
      secret: 'Na rua dos bobos, número 0',
      resave: true,
      saveUninitialized: true
   }));
   app.use(passport.initialize());
   app.use(passport.session());

   /*
      Carrega todos os módulos de app/models,
      depois os módulos de app/controllers,
      e, por fim, os módulos de app/routes,
      "despejando" tudo na variável app
   */
   // cwd = change working directory
   load('models', { cwd: 'app' })
      .then('controllers')
      .then('routes')
      .into(app);

   return app;
};