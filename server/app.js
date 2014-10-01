'use strict';

var express = require('express');
var swig = require('swig');
var dateFormat = require('dateformat');

var app = module.exports = express();

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/../static/bullpup/components');

// not for production
app.set('view cache', false);
swig.setDefaults({ cache: false });
swig.setFilter('resize', function(input, width) {
  return 'http://image.webservices.ft.com/v1/images/raw/' + encodeURIComponent(input) + '?width=' + width + '&source=docs&fit=scale-down';
});

app.use(express.static(__dirname + '/../static'));

app.use('/components', require('./components.js'));

var latest  = require('./jobs/latest');
var popular = require('./jobs/popular');
var bertha  = require('./jobs/bertha');
var ft      = require('ft-api-client')(process.env.apikey);
var themes  = require('./jobs/themes');

// Appended to all successful responeses
var responseHeaders = {
    'Cache-Control': 'max-age=120, public'
}

require('es6-promise').polyfill();

var templates = { };

var formatSection = function (s) {
    if(/(.*):(.*)/.test(s)) {
        var a = s.split(':')[1].replace(/"/g, '');
        console.log(123, a);
        return a;
    }
    return s;
};


app.get('/search', function(req, res, next) {

        var count = (req.query.count && parseInt(req.query.count) < 30) ? req.query.count : 10;

        ft
        .search(decodeURI(req.query.q), count)
        .then(function (articles) {

            var ids;
            if (articles[0] instanceof Object) {
                ids = articles.map(function (article) {
                    return article.id;
                });
            } else {
                ids = articles;
            }

            ft
                .get(ids)
                .then( function (articles) {
                    res.set(responseHeaders);
                    res.render('layout/base', {
                        mode: 'compact',
                        stream: articles,
                        context: formatSection(req.query.q)
                    });
                }, function(err) {
                    console.log(err);
                    res.send(404);
                });

        }, function (err) {
            console.log(err);
            res.send(404);
        });

});

// ft articles
app.get('/:id', function(req, res, next) {
    ft
        .get([req.params.id])
        .then(function (article) {
            res.set(responseHeaders);
            res.render('layout/base', {
                mode: 'expand',
                isArticle: true,
                stream: article
            });
        }, function (err) {
            console.log(err);
        });
});

// More-on
app.get('/more-on/:id', function(req, res, next) {
    ft
        .get([req.params.id])
        .then(function (article) {

            // ...
            ft
                .get(article[0].packages)
                .then(function (articles) {
                    res.set(responseHeaders);
                    res.render('more-on/base', {
                        mode: 'expand',
                        stream: articles
                    });
                }, function (err) {
                    console.error(err);
                });

        }, function (err) {
            console.error(err);
        });
});

app.get('/', function (req, res, next) {
  console.log('route: home');

  // console.log('themes: ', themes.get());

  res.render('home/base', {
    today : dateFormat(new Date(), 'dddd dS mmmm'),
    latest : latest.get(),
    analysis : '',
    comment : '',
    themes : themes.get()
  });

});


// Start polling the data

latest.init();
popular.init();
bertha.init();
themes.init();

//
var port = process.env.PORT || 3001;
app.listen(port, function() {
      console.log("Listening on " + port);
});
