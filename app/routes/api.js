var router = require('express').Router();

// Requires multiparty for uploading
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

//var NewsController = require('../controllers/NewsController');
var ClubController = require('../controllers/ClubController');
var MatchDataController = require('../controllers/MatchDataController');
var MatchesController = require('../controllers/MatchesController');
var PageController = require('../controllers/PageController');
var TeamDataController = require('../controllers/TeamDataController');
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

router.get('/clubs',                UserController.ensureAuthorized, ClubController.query);
router.get('/clubs/:_slug',         UserController.ensureAuthorized, ClubController.get);
router.post('/clubs',               UserController.ensureAuthorized, ClubController.post);
router.put('/clubs/:_slug',         UserController.ensureAuthorized, ClubController.put);
router.delete('/clubs/:_slug',      UserController.ensureAuthorized, ClubController.delete);

router.get('/matches',              UserController.ensureAuthorized, MatchesController.query);
router.get('/matches/:_id',         UserController.ensureAuthorized, MatchesController.query_team);
router.get('/match/:_id',           UserController.ensureAuthorized, MatchesController.get);
router.get('/toeschouwers/:_id',    MatchesController.toeschouwers_get);
router.put('/toeschouwers/:_id',    MatchesController.toeschouwers_put);
router.post('/matches',             UserController.ensureAuthorized, MatchesController.post);
router.put('/match/:_id',           UserController.ensureAuthorized, MatchesController.put);
router.delete('/match/:_id',        UserController.ensureAuthorized, MatchesController.delete);

router.get('/teamdata',             UserController.ensureAuthorized, TeamDataController.query);
router.get('/teamdata/:_slug',      UserController.ensureAuthorized, TeamDataController.get);
router.post('/teamdata',            UserController.ensureAuthorized, TeamDataController.post);
router.put('/teamdata/:_slug',      UserController.ensureAuthorized, TeamDataController.put);
router.delete('/teamdata/:_slug',   UserController.ensureAuthorized, TeamDataController.delete);

router.get('/matchdata',            UserController.ensureAuthorized, MatchDataController.query);
router.get('/matchdata/:_id',       UserController.ensureAuthorized, MatchDataController.get);
router.get('/matchdataid/:_id',     UserController.ensureAuthorized, MatchDataController.get_byid);
router.post('/matchdata',           UserController.ensureAuthorized, MatchDataController.post);
router.put('/matchdata/:_id',       UserController.ensureAuthorized, MatchDataController.put);
router.delete('/matchdata/:_id',    UserController.ensureAuthorized, MatchDataController.delete);

router.get('/pages',                PageController.query);
router.get('/pages/:_id',           PageController.get);
router.post('/pages',               UserController.ensureAuthorized, PageController.post);
router.put('/pages/:_id',           UserController.ensureAuthorized, PageController.put);
router.delete('/pages/:_id',        UserController.ensureAuthorized, PageController.delete);

router.post('/media/:slug',         UserController.ensureAuthorized, multipartMiddleware, UploadController.uploadFile);

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