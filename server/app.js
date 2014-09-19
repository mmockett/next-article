
var express = require('express');
var router = express.Router();
var swig = require('swig');

var app = express();

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/../static');

// not for production
app.set('view cache', false);
swig.setDefaults({ cache: false });

app.use(express.static(__dirname + '/../static'));

var latest  = require('./jobs/latest');
var popular = require('./jobs/popular');
var bertha  = require('./jobs/bertha');
var ft      = require('ft-api-client')(process.env.apikey);

GLOBAL.Promise = require('es6-promise').Promise;

var templates = { }

app.get('/latest', function(req, res, next) {
    res.send(latest.get()); 
});

app.get('/popular', function(req, res, next) {
    res.send(popular.get()); 
});

app.get('/bertha', function(req, res, next) {
    res.send(bertha.get()); 
});

app.get('/index', function(req, res, next) {
    res.render('components/index/base', { 
        latest: latest.get(),
        popular: popular.get(),
        bertha: bertha.get()
    });
});

app.get('/context', function(req, res, next) {
    res.render('components/context/base', { }) 
});

app.get('/stream/popular', function(req, res, next) {
    res.render('components/layout/base', { 
        title: 'Most popular',
        mode: 'compact',
        latest: latest.get(),
        popular: popular.get(),
        bertha: bertha.get(),
        stream: popular.get(),
        page: { id: 'popular' }
    });
});

app.get('/stream/latest', function(req, res, next) {
    res.render('components/layout/base', { 
        title: 'Latest',
        mode: 'compact',
        latest: latest.get(),
        popular: popular.get(),
        bertha: bertha.get(),
        stream: latest.get(),
        page: { id: 'latest' }
    });
});

app.get('/stream/picks', function(req, res, next) {
    res.render('components/layout/base', { 
        title: 'Editor\'s picks',
        mode: 'compact',
        latest: latest.get(),
        popular: popular.get(),
        bertha: bertha.get(),
        stream: bertha.get(),
        page: { id: 'picks' }
    });
});

// ft articles
app.get('/:id', function(req, res, next) {
    ft
        .get([req.params.id])
        .then(function (article) {
            res.render('components/layout/base', { 
                mode: 'expand',
                stream: article
            });
        }, function (err) {
            console.log(err);
        })
    
});

app.get('/', function(req, res, next) {
    res.render('components/layout/base', { });
});


// Start polling the data

latest.init();
popular.init();
bertha.init();

// 
var port = process.env.PORT || 3001;
app.listen(port, function() {
      console.log("Listening on " + port);
});