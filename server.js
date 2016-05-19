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
var mailer         = require('express-mailer');

var morgan         = require("morgan");

var app            = express();
var api_router	   = require('./app/routes/api');
var db             = require('./app/config/db');
var port           = process.env.PORT || 8000;

// connect to db ===========================================
mongoose.connect(db.url);

// request body parsing middleware should be above methodOverride
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

//app.use(morgan("dev")); // for debugging

app.use(methodOverride('X-HTTP-Method-Override'));

app.use(compression()); // use compression
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

// mailer for mails from server ============================
mailer.extend(app, {
    from: 'info@soccerpc.nl',
    host: 'smtp.transip.email', // hostname
    secureConnection: true, // use SSL
    port: 465, // port for secure SMTP
    transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
    auth: {
        user: 'info@soccerpc.nl',
        pass: 'S4bAYath'
    }
});

// prerender node plugin ===================================
app.use(require('prerender-node'));

// routes ==================================================
app.use('/api/v1', api_router);

app.get('/*', function (req, res, next) {
    if (req.url.indexOf("/images/") === 0 || req.url.indexOf("/scripts/") === 0 || req.url.indexOf("/styles/") === 0 || req.url.indexOf("/media/") === 0) {
        res.setHeader("Cache-Control", "public, max-age=2592000");
        res.setHeader("Expires", new Date(Date.now() + 2592000000).toUTCString());
    }
    next();
});

app.get('*', function(req, res) {
    res.render('index');
});
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    if (err.status) {
        //console.log(err);
        app.mailer.send('mailer/error', {
            to: 'contact@mpbeta.nl', // REQUIRED. This can be a comma delimited string just like a normal email to field.
            subject: 'A 404 Error Has Occurred On soccerpc.nl', // REQUIRED.
            // All additional properties are also passed to the template as local variables.
            title: 'A 404 Error Has Occurred On soccerpc.nl',
            error: err
        }, function (err1) {
            if (err1) {
                // handle error
                console.log('Error sending error email\n\n' + err1 + '\n\n' + err);
            }

            console.log('Error email send to administrator\n\n' + err);
            res.send('Email Sent');
        });
        res.render('errors/404');
    } else {
        //console.log(err);
        app.mailer.send('mailer/error', {
            to: 'contact@mpbeta.nl', // REQUIRED. This can be a comma delimited string just like a normal email to field.
            subject: 'An Error Has Occurred On soccerpc.nl', // REQUIRED.
            // All additional properties are also passed to the template as local variables.
            title: 'An Error Has Occurred On soccerpc.nl',
            error: err
        }, function (err1) {
            if (err1) {
                // handle error
                console.log('Error sending error email\n\n' + err1 + '\n\n' + err);
            }

            console.log('Error email send to administrator\n\n' + err);
            res.send('Email Sent');
        });
        res.render('errors/500');
    }
});

// start localhost =========================================
app.listen(port, function(err) {
    if (err) {
        app.mailer.send('mailer/error', {
            to: 'contact@mpbeta.nl', // REQUIRED. This can be a comma delimited string just like a normal email to field.
            subject: 'An Error Has Occurred On soccerpc.nl', // REQUIRED.
            // All additional properties are also passed to the template as local variables.
            title: 'An Error Has Occurred On soccerpc.nl',
            error: err
        }, function (err1) {
            if (err1) {
                // handle error
                return console.log('Error sending error email\n\n' + err1 + '\n\n' + err);
            }

            console.log('Error email send to administrator\n\n' + err);
            return res.send('Email Sent');
        });
    }

    console.log('Server is live! Btw, port:' + port);
});

// expose app ==============================================
module.exports = app;