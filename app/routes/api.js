var router = require('express').Router();

// Requires multiparty for uploading
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

//var NewsController = require('../controllers/NewsController');
var MatchesController = require('../controllers/MatchesController');
var PagesController = require('../controllers/PagesController');
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

router.get('/matches',              MatchesController.query);
router.get('/matches/:_id',         MatchesController.get);
router.get('/matches/:_id',         MatchesController.toeschouwers_get);
router.put('/matches/:_id',         MatchesController.toeschouwers_put);
router.post('/matches',             UserController.ensureAuthorized, MatchesController.post);
router.put('/matches/:_id',         UserController.ensureAuthorized, MatchesController.put);
router.delete('/matches/:_id',      UserController.ensureAuthorized, MatchesController.delete);

router.get('/pages',                PagesController.query);
router.get('/pages/:_id',           PagesController.get);
router.post('/pages',               UserController.ensureAuthorized, PagesController.post);
router.put('/pages/:_id',           UserController.ensureAuthorized, PagesController.put);
router.delete('/pages/:_id',        UserController.ensureAuthorized, PagesController.delete);

router.post('/media/:slug',         multipartMiddleware, UploadController.uploadFile);

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