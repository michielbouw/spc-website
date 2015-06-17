var router = require('express').Router();

// Requires multiparty for uploading
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

//var NewsController = require('../controllers/NewsController');
var UploadController = require('../controllers/UploadController');
var UserController = require('../controllers/UserController');

// Logging
router.use(function(req, res, next) {
    console.log('[api]', req.method, req.url);
    next();
});

//router.get('/news',                 NewsController.query);
//router.get('/news/:_slug',          NewsController.get);
//router.post('/news',                UserController.ensureAuthorized, NewsController.post);
//router.put('/news/:_slug',          UserController.ensureAuthorized, NewsController.put);
//router.delete('/news/:_slug',       UserController.ensureAuthorized, NewsController.delete);

router.post('/uploads/:slug',       multipartMiddleware, UploadController.uploadFile);

router.post('/login',               UserController.login);
router.post('/signin',              UserController.signin);
router.get('/me',                   UserController.ensureAuthorized, UserController.me);
router.get('/users',                UserController.ensureAuthorized, UserController.query);
router.get('/users/:_id',           UserController.ensureAuthorized, UserController.get);
router.put('/users/:_id',           UserController.ensureAuthorized, UserController.put);
router.delete('/users/:_id',        UserController.ensureAuthorized, UserController.delete);

// Global wildcard, catch-all address
router.get('*', function(req,res){
    res.json({error:true, msg:'No way essay'});
});

// Export yo
module.exports = router;