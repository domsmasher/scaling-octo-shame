var express = require('express')
    , http = require('http')
    , path = require('path')
    , stylus = require('stylus')
    , nib = require('nib');

var app = express();

function compile(str, path) {
    return stylus(str)
        .set('filename', path)
        .use(nib());
}

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.compress());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('scalingoctoshame'));
app.use(express.session());
app.use(app.router);
app.use(stylus.middleware(
    { src: __dirname + '/public'
        , compile: compile
    }
))
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', function(req,res) {
    res.sendfile('public/index.html');
});

app.get('/:slug/', function(req,res) {
    res.sendfile('public/index.html');
});

app.get('/public/partials/:fileName', function (req, res) {
    if (req.param('fileName')) {
        fs.readFile('./public/partials/' + req.param('fileName'), function (err, html) {
            if (err) {
                throw err;
            }

            res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(html);
            res.end();
        });
    }
});

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
