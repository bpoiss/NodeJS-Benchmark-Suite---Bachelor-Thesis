require('./db');

var express = require('express');
var http = require('http');
var path = require('path');
var engine = require('ejs-locals');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var static = require('serve-static');

var app = express();
var routes = require('./routes');

app.set('port', process.env.PORT || 8080);
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon(__dirname + '/public/favicon.png'));
app.use(logger('dev'));
app.use(methodOverride());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Routes
app.use(routes.manageCookies);
app.get('/', routes.index);
app.post('/create', routes.create);
app.get('/done/:id', routes.done);
app.get('/delete/:id', routes.delete);
app.get('/edit/:id', routes.edit);
app.get('/export', routes.readCsv);
app.post('/update/:id', routes.update);

app.use(static(path.join(__dirname, 'public')));

http.createServer(app).listen(app.get('port'), function () {
    console.log('Server listening on localhost:' + app.get('port'));
});
