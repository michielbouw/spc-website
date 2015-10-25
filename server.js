// modules =================================================
var express        = require('express');
var mongoose       = require('mongoose');
var livereload     = require('connect-livereload');

var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var compression    = require('compression');

var consolidate    = require('consolidate');
var swig           = require('swig');

var multipart      = require('connect-multiparty');

var morgan         = require("morgan");
var formage        = require("formage");

var app         = express();
var api_router	= require('./app/routes/api');
var db          = require('./app/config/db');
var port        = process.env.PORT || 8000;

// connect to db ===========================================
mongoose.connect(db.url);

// request body parsing middleware should be above methodOverride
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

//app.use(morgan("dev")); // for debugging

app.use(methodOverride('X-HTTP-Method-Override'));

app.use(express.static(__dirname + '/build'));
app.use('/media', express.static(__dirname + '/media'));

// assign the template engine to .html files ===============
app.engine('html', consolidate.swig);

// set .html as the default extension ======================
app.set('view engine',  'html');
app.set('views',        'build');

// uploads direction =======================================
app.use(multipart({
    maxFilesSize: 104857600, // max 100MB upload files size
    uploadDir: './media',
    keepExtensions: true
}));

// Formage MongoDB admin panel =============================
//formage.init(app, express, require('./app/models'), {
//    title: 'MongoDB',
//    root: '/moadmin',
//    default_section: 'data tables',
//    username: 'beheerdb',
//    password: 'jemoeder'
//});

// routes ==================================================
app.use('/api/v1', api_router);
app.get('*', function(req, res) {
    res.render('index');
});
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    if (err.status) { console.log(err); res.render('errors/404'); }
    else { console.log(err); res.render('errors/500'); }
});

// add fixtures data =======================================
//require('./app/fixtures/fixtures')();

// start localhost =========================================
app.listen(port, function(err) {
    if (err)
        return console.log(err);

    console.log('Server is live! Btw, port:' + port);
});

// expose app ==============================================
module.exports = app;